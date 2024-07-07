import CharacterCards from "../views/CharactersCards";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      detailedCharacters: {},
      descriptionCharacters: {},
      detailedStarships: {},
      characterscards: [],
      starshipscards: [],
      favoriteStore: [],
      storeClicUid: null,
      apiUrl: "https://swapi.tech/api",
    },
    actions: {
      getStoreClicUid: (uid) => {
        setStore({ storeClicUid: uid });
      },
      getCharactersCards: async () => {
        const store = getStore();
        try {
          const response = await fetch(`${store.apiUrl}/people/?page=1&limit=10`);
          const data = await response.json();
          if (response.ok) {
            // Crear un array de promesas para obtener los detalles de cada personaje
            const detailedCharactersPromises = data.results.map(async (character) => {
              const charResponse = await fetch(character.url);
              const charData = await charResponse.json();
              if (charResponse.ok) {
                return { uid: character.uid, details: charData.result.properties, description: charData.result.description };
              } else {
                throw new Error('Error fetching character details');
              }
            });

            // Resolver todas las promesas en paralelo
            const detailedCharactersResults = await Promise.all(detailedCharactersPromises);

            // Crear los objetos detailedCharacters y descriptionCharacters
            const detailedCharacters = {};
            const descriptionCharacters = {};
            detailedCharactersResults.forEach((char) => {
              detailedCharacters[char.uid] = char.details;
              descriptionCharacters[char.uid] = char.description;
            });

            // Actualizar el store con los resultados
            setStore({ characterscards: data.results, detailedCharacters, descriptionCharacters });
            console.log("Contenido completo del store1:", getStore());
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
            // Crear un array de promesas para obtener los detalles de cada nave
            const detailedStarshipsPromises = data.results.map(async (starship) => {
              const shipResponse = await fetch(starship.url);
              const shipData = await shipResponse.json();
              if (shipResponse.ok) {
                return { uid: starship.uid, details: shipData.result.properties };
              } else {
                throw new Error('Error fetching starship details');
              }
            });
      
            // Resolver todas las promesas en paralelo
            const detailedStarshipsResults = await Promise.all(detailedStarshipsPromises);
      
            // Crear el objeto detailedStarships
            const detailedStarships = {};
            detailedStarshipsResults.forEach((ship) => {
              detailedStarships[ship.uid] = ship.details;
            });
      
            // Actualizar el store con los resultados
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
      
      favorite: (favoriteName) => {
        const store = getStore();
        if (store.favoriteStore.includes(favoriteName)) {
          setStore({
            favoriteStore: store.favoriteStore.filter(
              (nameCharacter) => nameCharacter !== favoriteName
            ),
          });
        } else {
          setStore({ favoriteStore: [...store.favoriteStore, favoriteName] });
        }
      },
    },
  };
};

export default getState;
