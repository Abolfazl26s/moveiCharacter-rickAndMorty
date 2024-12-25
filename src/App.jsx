import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./Components/CharacterDetail";
import CharacterList from "./Components/CharacterList";
import Navbar, { Favourite } from "./Components/Navbar";
import Search from "./Components/Search";
import SearchResults from "./Components/SearchResults";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [favourite, setFavourite] = useState(
    () => JSON.parse(localStorage.getItem("FAVOURITES")) || []
  );

  const api = "https://rickandmortyapi.com/api/character";

  useEffect(() => {
    axios
      .get(api + "/?name=" + query)
      .then(({ data }) => setCharacters(data.results))
      .catch((err) => {
        setCharacters([]);
        toast.error(err.response.data.error);
      })
      .finally(setIsLoading(false));
  }, [query]);

  useEffect(() => {
    localStorage.setItem("FAVOURITES", JSON.stringify(favourite));
  }, [favourite]);

  const handelSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? "" : id));
  };

  const handelRemoveFavourite = (id) => {
    setFavourite((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };

  function handleAddToFavourite(char) {
    setFavourite((prevFav) => [...prevFav, char]);
    toast.success(`${char.name} Added to Favourite`);
  }

  const isAddToFavourite = favourite.map((fav) => fav.id).includes(selectedId);

  return (
    <>
      <Toaster position="top-left" reverseOrder={true} />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResults numOfResult={characters.length} />
        <Favourite
          handelRemoveFavourite={handelRemoveFavourite}
          ListOfFavourites={favourite}
        />
      </Navbar>
      <div className="main">
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handelSelectCharacter}
          selectedId={selectedId}
        />
        <CharacterDetail
          selectedId={selectedId}
          addToFavourite={handleAddToFavourite}
          isAddToFavourite={isAddToFavourite}
        />
      </div>
    </>
  );
}
export default App;
