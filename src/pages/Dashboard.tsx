// Dashboard.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Item from './../componets/ListItem';

const Dashboard: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    // Fetch favorites from local storage
    const favoritesFromStorage = localStorage.getItem('favorites');
    if (favoritesFromStorage) {
      setFavorites(JSON.parse(favoritesFromStorage));
    }
  }, []);

  const addToFavorites = (item: any) => {
    setFavorites(prevFavorites => [...prevFavorites, item]);
    localStorage.setItem('favorites', JSON.stringify([...favorites, item]));
  };

  const removeFromFavorites = (id: number) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="dashboard">
      <Link to="/list">Go to List Page</Link>
      <div className="favorites-list">
        <h2>Favorites</h2>
        {favorites.length === 0 ? (
          <p>No favorites added yet.</p>
        ) : (
          <ul className="photos-list">
            {favorites.map((favorite: any) => (
              <li key={favorite.id}>
                <Item
                  id={favorite.id}
                  title={favorite.title}
                  thumbnailUrl={favorite.thumbnailUrl}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  isFavorite={true}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
