const Character = ({ item, children }) => {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      {children}
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
