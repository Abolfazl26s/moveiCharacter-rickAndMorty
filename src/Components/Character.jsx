import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Character = ({ item, onSelectCharacter, selectedId }) => {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      <button className="icon red" onClick={() => onSelectCharacter(item.id)}>
        {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
      </button>
    </div>
  );
};

export default Character;

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "👨‍🦰" : "👱🏻‍♀️"}</span>
      <span> {item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span className=""> {item.status}</span>
      <span className=""> - {item.species}</span>
    </div>
  );
}
