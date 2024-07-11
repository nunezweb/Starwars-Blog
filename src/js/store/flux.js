import { parse } from "query-string";
import CharacterCards from "../views/CharactersCards";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      detailedCharacters: {},
      descriptionCharacters: {},
      detailedStarships: {},
      characterscards: [],
      starshipscards: [],
      favoriteStore: JSON.parse(localStorage.getItem('favoriteStore')) || [],
      apiUrl: "https://swapi.tech/api",
    },
    actions: {
      getCharactersCards: async () => {
        const store = getStore();
        try {
          const response = await fetch(`${store.apiUrl}/people/?page=1&limit=10`);
          const data = await response.json();
          if (response.ok) {
            const detailedCharactersPromises = data.results.map(async (character) => {
              const charResponse = await fetch(character.url);
              const charData = await charResponse.json();
              if (charResponse.ok) {
                return { uid: character.uid, details: charData.result.properties, description: charData.result.description };
              } else {
                throw new Error('Error fetching character details');
              }
            });
            const detailedCharactersResults = await Promise.all(detailedCharactersPromises);
            const detailedCharacters = {};
            const descriptionCharacters = {};
            detailedCharactersResults.forEach((char) => {
              detailedCharacters[char.uid] = char.details;
              descriptionCharacters[char.uid] = char.description;
            });
            setStore({ characterscards: data.results, detailedCharacters, descriptionCharacters });
            return true;
          }
          setStore({ characterscards: [], detailedCharacters: {}, descriptionCharacters: {} });
          return false;
        } catch (error) {
          console.error("Error fetching characters:", error);
          setStore({ characterscards: [], detailedCharacters: {}, descriptionCharacters: {} });
          return false;
        }
      },
      getStarshipsCards: async () => {
        const store = getStore();
        try {
          const response = await fetch(`${store.apiUrl}/starships/?page=2&limit=10`);
          const data = await response.json();
          if (response.ok) {
            const detailedStarshipsPromises = data.results.map(async (starship) => {
              const shipResponse = await fetch(starship.url);
              const shipData = await shipResponse.json();
              if (shipResponse.ok) {
                return { uid: starship.uid, details: shipData.result.properties };
              } else {
                throw new Error('Error fetching starship details');
              }
            });
            const detailedStarshipsResults = await Promise.all(detailedStarshipsPromises);
            const detailedStarships = {};
            detailedStarshipsResults.forEach((ship) => {
              detailedStarships[ship.uid] = ship.details;
            });
            setStore({ starshipscards: data.results, detailedStarships });
            return true;
          }
          setStore({ starshipscards: [], detailedStarships: {} });
          return false;
        } catch (error) {
          console.error("Error fetching starships:", error);
          setStore({ starshipscards: [], detailedStarships: {} });
          return false;
        }
      },

      loadFavorites: () => {
				try {
					const favorites = JSON.parse(localStorage.getItem('favoriteStore')) || [];
					setStore({ favoriteStore: favorites });
				} catch (error) {
					console.error("Error loading favorites from localStorage:", error);
					setStore({ favoriteStore: [] });
				}
			},
      
      addFavoriteItem: (itemName) => {
        const store = getStore();
        const updateFavorites = [...store.favoriteStore, itemName];
        setStore({ favoriteStore: updateFavorites });
        localStorage.setItem('favoriteStore', JSON.stringify(updateFavorites));
      },

      deleteFavoriteItem: (itemName) => {
        const store = getStore();
        const updatedFavorites = store.favoriteStore.filter(fav => fav !== itemName);
        setStore({ favoriteStore: updatedFavorites });
        localStorage.setItem('favoriteStore', JSON.stringify(updatedFavorites));
      },

    },
  };
};

export default getState;
