// ListingPage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Item from './../componets/ListItem';

const ListingPage: React.FC = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(()=>{
    // Fetch favorites from local storage
    const favoritesFromStorage = localStorage.getItem('favorites');
    if (favoritesFromStorage) {
      setFavorites(JSON.parse(favoritesFromStorage));
    }
  },[])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`);
        const data = await response.json();
        setPhotos(prevPhotos => [...prevPhotos, ...data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  const addToFavorites = (item: any) => {
    setFavorites(prevFavorites => [...prevFavorites, item]);
    localStorage.setItem('favorites', JSON.stringify([...favorites, item]));
  };

  const removeFromFavorites = (id: number) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 ||
      loading
    ) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="listing-page">
      <Link to="/">Back to Dashboard</Link>
      <h1>Listing Page Component</h1>
      <div className="photos-list">
        {photos.map((photo: any) => (
          <div key={photo.id}>
            <Item
              id={photo.id}
              title={photo.title}
              thumbnailUrl={photo.thumbnailUrl}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              isFavorite={favorites.some(fav => fav.id === photo.id)}
            />
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default ListingPage;
