import Character from "./Character";

const CharacterList = ({
  characters,
  isLoading,
  onSelectCharacter,
  selectedId,
}) => {
  return (
    <div className="characters-list max-h-[450px] overflow-y-auto">
      {isLoading ? (
        <p style={{ color: "white" }}>Data is Loading ...</p>
      ) : (
        characters.map((item) => (
          <Character
            key={item.id}
            item={item}
            onSelectCharacter={onSelectCharacter}
            selectedId={selectedId}
          />
        ))
      )}
    </div>
  );
};

export default CharacterList;
