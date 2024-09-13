import React from 'react';
import CloseIcon from '../../assets/icons/closeIcon';
import './style.css';

export default function Tags({ tags, setTags }) {
  const addTags = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      setTags([...tags, { name: e.target.value }]);
      e.target.value = '';
    }
  };

  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="tags-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag.name}</span>{' '}
            <span onClick={() => removeTags(index)}>
              <CloseIcon className="tag-close-icon" />
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Appuyez sur Entrée pour ajouter un ingrédient"
        onKeyUp={addTags}
      />
    </div>
  );
}
