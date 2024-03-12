
import React, { useState } from 'react';

interface ItemProps {
  id: number;
  title: string;
  thumbnailUrl: string;
  addToFavorites: (item: any) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: boolean;
}

const ListItem: React.FC<ItemProps> = ({ id, title, thumbnailUrl, addToFavorites, removeFromFavorites, isFavorite }) => {
  const [isInFavorites, setIsInFavorites] = useState(isFavorite);

  const handleToggleFavorite = () => {
    if (isInFavorites) {
      removeFromFavorites(id);
    } else {
      addToFavorites({ id, title, thumbnailUrl });
    }
    setIsInFavorites(!isInFavorites);
  };

  return (
    <div className="photo-item">
      <img src={thumbnailUrl} alt={title} />
      <div>
        <p>ID: {id}</p>
        <p>Title: {title}</p>
        <button onClick={handleToggleFavorite}>
          {isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
        </button>
      </div>
    </div>
  );
};

export default ListItem;
