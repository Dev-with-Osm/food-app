import React from 'react';
import CloseIcon from '../../assets/icons/closeIcon';
import './style.css';

export default function Tags({ tags = [], setTags }) {
  const addTags = (e) => {
    const tagValue = e.target.value.trim();
    if (e.key === 'Enter' && tagValue !== '') {
      // Prevent duplicate tags
      if (
        !tags.find((tag) => tag.name.toLowerCase() === tagValue.toLowerCase())
      ) {
        setTags([...tags, { name: tagValue }]);
      }
      e.target.value = ''; // Clear input field
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
            <span onClick={() => removeTags(index)} className="tag-close-icon">
              <CloseIcon />
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
