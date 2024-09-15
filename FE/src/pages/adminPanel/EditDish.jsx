import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Added useParams
import PlusIcon from '../../assets/icons/plusIcon';
import Tags from '../../components/ingredientTags/Tags';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';

export default function EditDish() {
  const navigate = useNavigate();
  const { dishId } = useParams(); // Get dishId from the URL params
  const [selected, setSelected] = useState('');
  const [tags, setTags] = useState([]);
  const imageInputRef = useRef();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileUploadPerc, setFileUploadPerc] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: [],
    dishImage: '',
    category: '',
    isOnMenuToday: false,
  });
  console.log(formData);

  const [uploadError, setUploadError] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
    ingredients: '',
    dishImage: '',
    category: '',
    isOnMenuToday: '',
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: tags,
    }));
  }, [tags]);

  useEffect(() => {
    // Fetch dish data by dishId when the component mounts
    const fetchDishData = async () => {
      const res = await fetch(`/api/v1/dishes/${dishId}`);
      const dishData = await res.json();

      setFormData({
        name: dishData?.data?.name,
        description: dishData?.data?.description,
        ingredients: dishData?.data?.ingredients,
        dishImage: dishData?.data?.dishImage,
        category: dishData?.data?.category,
        isOnMenuToday: dishData?.data?.isOnMenuToday,
      });
      setTags(dishData?.data?.ingredients); // Set ingredients tags
    };

    fetchDishData();
  }, [dishId]);

  const getSelectedValue = (e) => {
    setSelected(e.target.value);
    setFormData({ ...formData, category: e.target.value });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name) errors.name = 'Nom du plat est requis';
    if (!formData.description) errors.description = 'Description est requise';
    if (!tags.length) errors.ingredients = 'Ingrédients sont requis';
    if (!formData.dishImage) errors.dishImage = 'Image est requise';
    if (!formData.category) errors.category = 'Catégorie est requise';

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  console.log(formData);

  const handleSubmitImage = async (e) => {
    if (file !== null) {
      setLoading(true);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileUploadPerc(Math.round(progress));
        },
        (error) => {
          setUploadError('Image upload failed (must be less than 4 mb)');
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setFormData({ ...formData, dishImage: downloadUrl });
            setLoading(false);
          });
        },
      );
    } else {
      setUploadError('Sélectionnez une image');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmEdit = window.confirm(
      'Are you sure you want to edit this dish?',
    );

    if (confirmEdit) {
      if (validateForm()) {
        const res = await fetch(`/api/v1/admin/edit-dish/${dishId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.message === false) {
          console.log(data.message);
        }
        navigate('/all-dishes');
      } else {
        console.log('Form validation failed');
      }
    } else {
      console.log('Edit canceled by user');
    }
  };

  console.log(tags);

  return (
    <div className="max-w-6xl mx-auto my-14">
      <h1 className="text-center text-4xl font-semibold">Modifier le Plat</h1>
      <form className="flex flex-col items-center justify-center mt-5">
        <div className="w-44 h-48 border-dashed border-[#302e29] border relative rounded-md overflow-hidden">
          {!file && formData.dishImage && (
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${formData.dishImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            ></div>
          )}
          {!file && (
            <div
              onClick={() => !loading && imageInputRef.current.click()}
              className="w-full h-full flex items-center justify-center cursor-pointer"
            >
              <PlusIcon />
              <input
                type="file"
                multiple={false}
                onChange={(e) => setFile(e.target.files[0])}
                hidden
                accept="image/*"
                ref={imageInputRef}
              />
            </div>
          )}
          {file && fileUploadPerc === 0 && (
            <div className="h-full w-full flex justify-center items-center">
              <h1 className="text-center text-xs">
                Appuyez sur le bouton ci-dessous pour télécharger l'image
              </h1>
            </div>
          )}
          {file && fileUploadPerc > 0 && fileUploadPerc < 100 && (
            <div className="h-full w-full flex justify-center items-center">
              <h1 className="text-center">{fileUploadPerc}</h1>
            </div>
          )}
          {file && !uploadError && fileUploadPerc === 100 && (
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${formData.dishImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            ></div>
          )}
        </div>
        {file && !uploadError && fileUploadPerc !== 100 && (
          <button
            type="button"
            onClick={handleSubmitImage}
            className="bg-[#ADC6A1] text-white w-44 mt-2 py-2 rounded-md"
            disabled={loading}
          >
            Télécharger
          </button>
        )}

        {uploadError && <p className="text-red-700 text-xs">{uploadError}</p>}
        {formErrors.dishImage && (
          <p className="text-red-700 text-xs">{formErrors.dishImage}</p>
        )}

        <div className="w-full px-10 flex items-center flex-col md:flex-row gap-5 mt-5">
          <div className="w-full flex flex-col">
            <div className="flex flex-col gap-1 mb-2">
              <label className="text-lg font-semibold">
                Nom du Plat <span className="text-red-800">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                placeholder="Entrez le nom du plat"
                className="border placeholder:text-sm border-black border-solid p-2 rounded-md"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={loading}
              />
              {formErrors.name && (
                <p className="text-red-700 text-xs">{formErrors.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <label className="text-lg font-semibold">
                Ingrédients du Plat <span className="text-red-800">*</span>
              </label>
              <Tags tags={tags} setTags={setTags} disabled={loading} />
              {formErrors.ingredients && (
                <p className="text-red-700 text-xs">{formErrors.ingredients}</p>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold">
                  Catégorie du Plat <span className="text-red-800">*</span>
                </label>
                <select
                  onChange={getSelectedValue}
                  className="border p-2 rounded-md border-black border-solid"
                  disabled={loading}
                  value={formData.category}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="Entrée">Entrée</option>
                  <option value="Plat Principal">Plat Principal</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Boisson">Boisson</option>
                </select>
                {formErrors.category && (
                  <p className="text-red-700 text-xs">{formErrors.category}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold">
                  Au menu aujourd'hui <span className="text-red-800">*</span>
                </label>
                <select
                  value={formData.isOnMenuToday}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isOnMenuToday: e.target.value === 'true',
                    })
                  }
                  className="border p-2 rounded-md border-black border-solid"
                  disabled={loading}
                >
                  <option value="">Sélectionnez</option>
                  <option value="true">Oui</option>
                  <option value="false">Non</option>
                </select>
              </div>
            </div>
          </div>

          <div className="w-full flex gap-1 flex-col mb-4">
            <label className="text-lg font-semibold">
              Description <span className="text-red-800">*</span>
            </label>
            <textarea
              value={formData.description}
              name="descriptionPlat"
              id="descriptionPlat"
              placeholder="Description du plat"
              rows={6}
              className="border border-black w-full h-full px-2 placeholder:py-1 placeholder:text-sm resize-none rounded-md"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              disabled={loading}
            ></textarea>
            {formErrors.description && (
              <p className="text-red-700 text-xs">{formErrors.description}</p>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              className="border p-2 rounded-md bg-[#5AA39E] text-white font-semibold text-lg"
              disabled={loading}
            >
              Ajouter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
