import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function CharacterDetail({ selectedId, addToFavourite, isAddToFavourite }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fecthData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);

        // find episodes
        const episodeId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodesData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );
        console.log([episodesData].flat());
        setEpisodes([episodesData].flat());
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) fecthData();
  }, [selectedId]);

  if (isLoading) return <p style={{ color: "white" }}>Data is Loading ...</p>;

  if (!character || !selectedId)
    return <p style={{ color: "white" }}>Please selected a character</p>;

  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo
        character={character}
        isAddToFavourite={isAddToFavourite}
        addToFavourite={addToFavourite}
      />

      <EpisodeList episodes={episodes} />
    </div>
  );
}

export default CharacterDetail;

function CharacterSubInfo({ character, isAddToFavourite, addToFavourite }) {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "👨‍🦰" : "👱🏻‍♀️"}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
          ></span>
          <span className=""> {character.status}</span>
          <span className=""> - {character.species}</span>
        </div>
        <div className="location">
          <p>Last known location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddToFavourite ? (
            <p>Already Added To Favourite ✅</p>
          ) : (
            <button
              onClick={() => addToFavourite(character)}
              className="btn btn--primary"
            >
              Add to Favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodeList({ episodes }) {
  const [sortBy, setSortBy] = useState(true);

  let sortedEpisodes;

  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>
          <span className="font-bold text-2xl">List of Episode :</span>{" "}
          <span>({episodes.length})</span>
        </h2>
        {sortedEpisodes.length > 1 && (
          <button onClick={() => setSortBy((is) => !is)}>
            <ArrowUpCircleIcon
              className="icon"
              style={{ rotate: sortBy ? "0deg" : "-180deg" }}
            />
          </button>
        )}
      </div>
      <ul className="pt-3 max-h-56 overflow-y-auto">
        {sortedEpisodes.map((item, index) => (
          <li key={item.id}>
            <div className="">
              <span style={{ color: "yellow" }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              &nbsp;
              {item.episode}: <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
