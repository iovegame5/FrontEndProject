import React, { createContext, useContext, useState, useEffect } from 'react';

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // ดึงข้อมูล Favorites จาก Local Storage 
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const addFavorite = (pokemon) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, pokemon];
      // บันทึกข้อมูล Favorites ใน Local Storage เมื่อมีการเปลี่ยนแปลง
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const removeFavorite = (pokemonId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((p) => p.id !== pokemonId);
      // บันทึกข้อมูล Favorites ใน Local Storage เมื่อมีการเปลี่ยนแปลง
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <PokemonContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </PokemonContext.Provider>
  );
};

const usePokemonContext = () => {
  return useContext(PokemonContext);
};

export { PokemonProvider, usePokemonContext };
