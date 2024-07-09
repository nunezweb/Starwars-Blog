import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const StarshipDetails = () => {
  const { store } = useContext(Context);
  const [starshipDetails, setStarshipDetails] = useState(null);
  const [starshipDescription, setStarshipDescription] = useState(null);
  const [error, setError] = useState(false);
  const params = useParams();
  function onImageError(event) {
    event.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAAAXNSR0IArs4c6QAAIABJREFUeF7t3QfsPEXZAODlU8GKghpNLFFjsMZeEhW72BsoCCJqxK4oERuKBbFgAwUVW8SCFUSxV7ChWBCNPVbUqLFhwy5f3sX7uf/l7nZ2b++2PZcYhN/u7Mzzzs68tzu7t12WZedkPgQIECAwOYHtTACTi7kGb07A+bU5654eaSRdYCTN6GknUS0CBAgQqClgWqoJZnMCBOoKjHyYGXnz6kbb9gQInCtgaNATCBAgQIAAAQItC0iwWgZVHAECBAgQIEBAgqUPECBAgAABAgRaFpBgtQyqOAIECBAgQICABEsfIECAAAECIxQwwXcbVP7d+js6AQIECBAg0HuB+ulS/T16j6CCBAgQIECAAIFuBdpNsNotrVsZRydAgAABAgQINBSQEjWEsxsBAgQIECBAYJGABEvfIECAAAECExX4XxIgHWi7CzQTbbZX23VXHgECBAgQIECglwJSpV6GRaUIECBAgACBIQtIsIYcPXUnQIAAAQIEeikgweplWFSKAAECBAgQGLKABGvI0VN3AgQGK2DwHWzoVJxAkoBzPInJRgQIEBiggBF+gEFT5bEIOP3GEkntIECAwNQFzGhT7wG9an+vu2OvK9erMKoMAQKZAUMnIDAQgWmcrNNo5UC6nGoSIECAAAEC4xCQYI0jjlpBgAABAgQI9EhAgtWjYKgKAQIECBAgMA4BCdY44qgVBAgQIECAQI8EJFg9CoaqECBAgAABAuMQkGCNI45aQYAAAQIECPRIQILVo2CoCgECBAgQIDAOAQnWOOKoFQQIECBAgECPBCRYPQqGqhAgQIAAAQLjEJBgjSOOWkGAQE8FDLI9DYxqEVizgHN/zcCKJ0CAAAECBKYnIMGaXsy1mAABAgQIEFizgARrzcCKJ0CAAIEKATORLjJCAd16hEGdfJP06sl3AQAECBDoWsBU1HUEFhxfYHoamFWrJbCrCtqfAIFJCAx/sBx+CybR0TSSAAECBAgQGJKABGtI0RpoXXWygQZOtQkQIECgsYC5rzGdHQkQIECAAAEC8wUkWHoGAQIrCBhCVsCzKwECIxYwOjYMLriGcHYjQIAAAQITEJAnTCDImjgmAafsmKKpLQQIjFfAaD3e2GoZAQIECBAYgcAwU5Vh1noE3UUTCBAgQIAAgfEKSLDGG1stI0CAAAECBDoSkGB1BO+wBAgQIECAwHgFJFjjja2WESBAgAABAh0JSLA6gndYAgQIECBAYLwCEqzxxlbLCBAgQIAAgY4EJFgdwTssAQIECBAgMF4BCdZ4Y6tlBAgQIECAQEcCEqyO4B2WQP8FDA/9j5EaEiDQVwEjaF8jo14ECBAgQIDAYAUkWIMNnYoTIECAAAECfRWQYPU1MupFgAABAgQIDFZAgjXY0Kk4AQIECBAg0FcBCVZfI6NeBAgQIECAwGAFJFiDDZ2KEyBAgAABAn0VkGD1NTLqRYAAAQIECAxWQII12NCpOAECBAgQINBXAQlWXyOjXgQIECBAgMBgBSRYgw2dihMgQIAAAQJ9FZBg9TUy6kWAAAECSwVMYDpInwX0zz5HR90IECBAgACBQQpIsAYZts1XWkfZvLkjEiBAYHMCRvm2rYm2Lao8AgQIECBAYPICEqzJdwEABAgQIECAQNsCEqy2RZVHgACBNQj8b7A2bK+BV5EEWhdwprZOqkACBAgQSBMwBaU52WqIAnr3EKOmzgQIECDQmoCJsDVKBRUE9CvdgQABAgQIECDQsoAEq2VQxREgQIAAAQIEJFj6AAECBAgQIECgZQEJVsugiiPQXwGne39jo2YECIxNwIg7tohqDwECBAgQINC5gASr8xCoAAECBAgQIDA2ge22y7Jzzhlbq7SHAAECBAgQINChgCtYHeI7NAECBAgQINBcoM9JTJ/r1lzcngQIECBAgMAABMabhoy3ZQPoVqpIgAABAgQIjFNAgjXOuGoVAQIEWhcY7IQx2Iq3HkIFblBAt9sgtkMRIECAAAEC0xDoNsHq9ujTiHC5lcynGXetJkCAAIGNCphuN8rtYI0E9NJGbHYiMEYBw8EYozrONumr44yrVhEgQIAAAQIdCkiwOsR3aAIECBAgQGCcAhKsccZVqwgQIECAAIEOBSRYHeI7NAECBAgQIDBOgR4nWD2u2jj7glYRIECAAAECLQnIYlqCVAwBAgQIECBAYCYgwdIXCBAgQIAAAQItC0iwWgZVHAECBAgQIEBAgqUPECBAgAABAgRaFpBgtQyqOAIExiFgcBxHHLWCQFcCaxlD1lJoV0KTPa4oTjb0Gk6AAAECKwuYRVcmVAABAgQIECBAYFsBCZYeQYAAAQIECBBoWUCC1TKo4ggQIECAAAECEix9gAABAgQIECDQsoAEq2VQxREgQIAAAQIEJFj6AAECBAgQIECgZQEJVsugiiNAgAABAgQISLD0AQIECBAgQCBdQOaQZIUpiclGBAgQIECAAIF0AQlWupUtCRAgQIAAAQJJAhKsJCYbESBAgAABAgTSBSRY6Va2JECAAAECBAgkCUiwkphsRIAAAQIECBBIF5BgpVvZkgABAgQIECCQJCDBSmKyUSMBvasRm50IECDQmYBxuzV6lK1RrlqQUKwqaH8CBAgQINAXAbN6XyKhHgQIECBAgMBoBCRYowmlhhAgQIAAAQJ9EZBg9SUS6kGAwGIBI5XeQYDAwAQMWwMLmOoSGLqAQWfoEVR/AgRSBIx1KUq2IUCAAAECBAjUEJBg1cCyKQECBAgQIEAgRUCClaLU6TZC1Cm/gxOYhIBxZhJh1shmAg1Pj4a7NaujvQgQIECAAIExCEgfqqJIqErI3wkQIECAAAECNQUkWDXBbE6AAAECBLoQMGF3od78mOLV3M6eBAgQIECAAIG5AhIsHYMAAQIECBAg0LKABKtlUMURaEvAydmWpHIIECCweQFj+ObNHZEAAQIECBAYuYAEa+QB1jwCBAgQIEBg8wISrM2bOyIBAgQIEEgXMFOnW/VoS2HrUTBUhQABAgQIEBiHgARrHHHUCgIECBAgQKBHAhKsHgVDVQgQIECAAIFxCEiwxhFHrehKwBnUlbzjEiBQQ8BQVQOrpU2ZtwSpGAIE+iBgSOtDFNSBAIEsMxrpBQQIECBAgACBlgUkWC2DLioO9IagHYYAAQIECPRAwLzfgyCoAgECBAgQIDAugXMTLGnWuKKa2hpxT5WyHQECBAgQqCVgiq3FZWMCBAgQIECAQLWABKvayBYEOhZwmnYcAIcnQIBAbQEjd20yOxAgQIAAAQIElgtIsPQQAgQIECBAwHLslvuABKtlUMURIECAAAECBCRY+gABAgQIEBiiQKMZvNFOQ9TpvM6kOw+BChAgQIDA1AVMxuPrAWI6vphqEQECBHogYHrpQRBUoUMBZ0CH+A5NgAABAgQIjFNAgjXOuGoVAQIECBAg0KGABKtDfIcmQIDAaATMJqMJpYa0I+CUaMdRKQQIEJgrYJDVMQhMU8C5P824azUBAgQIECCwRoGEBCthkzVWUNEECPRUwNDQ08CoFoGOBIwJ28D3jqNuhepu31G3c1gCBAgQIEBgQgLykwkFe2pN1bnPG3EmUzsLtJcAga4Ezh1vjbpd+TsuAQIECBAgMEIBqdUIg6pJBFIEnPwpSrYhQIBAMwFjbDM3exEgQIAAAQIEFgpMOMGacNOdEAQIECBAgMBaBWQZa+VVOIEeCjjrexgUVSJAYGwChtqxRVR7CBAgQIBAGwIyhJUU8a3EZ2cCBAgQmJqAiXNqEW/WXv2kmZu9CBAgQIAAAQILBSRYOgcBAgQIECBAoGUBCVbLoIojQIAAAQIECEiw9AECBAgQIEBgRAL9SG36UYsRhVVTCBAgQIDAKARkCCuFEd9KfHYmQIAAAQLjEJAQtBtHnu16Ko0AAQIECBAgkEmwdAICBAgQWF3AbLK6oRJGJeCUGFU419wYvWXNwIonQIAAgbULbGgu29Bh1s7lAAQIECAwMYH/TWCmsomFfhDN1SsHESaVJECAAAECBIYkIMEaUrTUlQABAgQIEBiEgARrEGFSSQIECBAgQGBIAhKsIUVLXQkQIECAAIFBCEiwBhEmlSRAgAABAgSGJCDBGlK01JUAAQIECBD4r0AHKUyNQ9bYtKWIbv6ILVVcMQSmLODEnXL0tZ0AgfoCRs36ZvYgQGDMAkbFMUd3/W3Tf9ZvPJAj6AoDCZRqEiBAgAABAsMRkGANJ1ZqSoAAAQIECAxEQII1kECpJgECBAgQIDAcAQnWcGKlpgQIbAkYunSGNAE9Jc3JVu0L6HvtmyqRAAECBAgQmLiABGviHUDzCRAgQIAAgfYFJpVgPfvZz86e8pSnZNtvv30u+d3vfjfbc889s69//eu1ZL/xjW9k17rWtfJ9vvnNb2bXvva1F+8/R3j//ffP9thjj+x617tettNOO2U77LBDvv8555yT/elPf8rOPPPM7FOf+lT2mte8JqluxfrUasiSjV/72tdmD3vYw2oXV7cu0ea//vWv2R//+Mfs9NNPz173utdlJ5544tLjfvSjH83ucIc75NvEfo95zGOyN7/5zcl1vc51rpPd//73z+5yl7tkV7jCFbKLXvSi2fnOd758/3/+85/ZWWedlX3729/Oy4z6LPqU+1NyBZZs+LOf/Sx78IMfnH384x/Pt4o+8NCHPjT////4xz+yF7zgBdkzn/nMWod6wAMekB199NHZjjvumO/3sY99LNttt93OU0bd2M0K+Pvf/56dffbZ2fe///287DD70Y9+tLSOTY81r9CmfbUK8VGPelTufbGLXSzf9G9/+1sWMY//Nu9zqUtdKvvwhz+c3fCGN0zavur48fe3vOUt2T777JNtt912ed98yUtekj31qU+du2vd+i47fjE+5T4526+NvpliMNsmxsRb3vKWW7t85Stfye50pztlv/nNb5KLKZ8LVTvG+PSXv/wlC4NPfOITSWPyquPTvDoVy6yqc9XfF53/Vfv5e32BSSdYcfK84x3vyPbee+9acrUSrELJT3rSk7LHP/7x2WUve9l8wKz6xIR6yimn5IP6qaeeunDzNier2UGaTlqr1iVictppp2VPeMITFra56QB2s5vdLJ+cbn/722cXvOAFq/jzhPfHP/5x9sIXvjA75phjzrO9BGs+4S9+8YvsaU97WvaGN7xhI322aV+t6gDve9/7srvd7W7bbPb+978/u/vd775w11e84hXZIx7xiOz//u//8m2qtl9Wh2te85r5l41ddtkl3yz6YnwxWDQWNKnvouP3LcGKJPOoo47Kdt55560q/+53v8se+9jHZm9961urQrn197oJVrng+PIVX1YOOeSQhcdsOj4ta4QEKznEvdpw0glWROIPf/hDflVr3gSaMvhUXsHKsiyumBx55JHZrW996/MkVv/+97/zb//xiasoF7rQhc6zTQwk8a35RS960dwqrZrUzCu06aTVVl2+9rWvZfvtt9/cK3hNBrADDzwwT64ufelLb9Pc2RW0iEN8LnzhC29dzZptGInum970pnz/4rflMSdYxX65bMRa1mcPOuighUlWW/0k6ta0ry5rVyTjxx13XHalK10p+89//pOfk/G/X/7yl9lDHvKQ7IMf/ODc3eOq6Otf//r8S1R8Fl39SZkFnvjEJ+ZfrmJMqErWmtY3ZYzrwxWsYuIa8YgENs7dSK723XffFM58m1UTrCgjrmTGlcSnP/3pc4/bZHyqaoAEq0qon3+ffIIVYYnBPr4Zpt4qrHMFK5KrY489Nr8dOLtqFZNXJBAxMRx//PHbTNo3velN81tC97jHPbZJBuKkju0POOCA2j0prtjE1YTLX/7y+b4pSWHlQRb0nJRvvsWyr3zlK2e3ve1t80Hy5je/eXaBC1wg/3MMnieddFJ2r3vd6zxVqTuAHXroofkVsUieZmXHRBm3AGMSLcY9bvPc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";
  }

  useEffect(() => {
    const fetchStarshipDetails = async (uid) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch(`${store.apiUrl}/starships/${uid}`);
        const data = await response.json();
        if (response.ok) {
          setStarshipDetails(data.result.properties);
          setStarshipDescription(data.result.description);
          setError(false); // es false
        } else {
          console.error("Error fetching starship details:", data.message);
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching starship details:", error);
        setError(true);
      }
    };

    if (params.uid) {
      fetchStarshipDetails(params.uid);
    }
  }, [params.uid, store.apiUrl]);

  if (error) {
    return (
      <div className="container text-center py-5 my-5">
        <div className="row justify-content-center">
          <div className="col-6r text-white">
            <h1>Error loading data</h1>
            <button
              className="bookmarkBtn mt-3"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!starshipDetails) {
    return (
      <div className="container py-5 my-5">
        <div className="row align-items-center">
          <div className="spinnerContainer">
            <div className="spinner"></div>
            <div className="loader">
              <p>loading</p>
              <div className="words">
                <span className="word">May the Force be with you.</span>
                <span className="word">I've got a bad feeling about this</span>
                <span className="word">Patience, young padawan.</span>
                <span className="word">It's a trap.</span>
                <span className="word">May the Force be with you</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col">
            <img onError={onImageError}
              src={`https://starwars-visualguide.com/assets/img/starships/${params.uid}.jpg`}
              className="card-img-top"
              alt="Star Wars"
            />
          </div>
          <div className="col d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-white">{starshipDetails.name}</h1>
            <p className="text-white">{starshipDescription}</p>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <hr className="separator-red" />
        <div className="row text-center text-danger">
          <div className="col-2">
            <h2 className="fs-3">Model</h2>
            <p className="fs-5">{starshipDetails.model}</p>
          </div>
          <div className="col-2">
            <h2 className="fs-3">Manufacturer</h2>
            <p className="fs-5">{starshipDetails.manufacturer}</p>
          </div>
          <div className="col-2">
            <h2 className="fs-3">Length</h2>
            <p className="fs-5">{starshipDetails.length}</p>
          </div>
          <div className="col-2">
            <h2 className="fs-3">Passengers</h2>
            <p className="fs-5">{starshipDetails.passengers}</p>
          </div>
          <div className="col-2">
            <h2 className="fs-3">Atmosphering Speed</h2>
            <p className="fs-5">{starshipDetails.max_atmosphering_speed}</p>
          </div>
          <div className="col-2">
            <h2 className="fs-3">Cargo Capacity</h2>
            <p className="fs-5">{starshipDetails.cargo_capacity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarshipDetails;
