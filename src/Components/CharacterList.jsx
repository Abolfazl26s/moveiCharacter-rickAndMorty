import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Character from "./Character";

const CharacterList = ({
  characters,
  isLoading,
  onSelectCharacter,
  selectedId,
}) => {
  return (
    <div className="characters-list w-[100%] sm:w-[40%] sm:flex-initial max-h-[450px] overflow-y-auto">
      {isLoading ? (
        <p style={{ color: "white" }}>Data is Loading ...</p>
      ) : (
        characters.map((item) => (
          <Character
            key={item.id}
            item={item}
            onSelectCharacter={onSelectCharacter}
            selectedId={selectedId}
          >
            <button
              className="icon red"
              onClick={() => onSelectCharacter(item.id)}
            >
              {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </Character>
        ))
      )}
    </div>
  );
};

export default CharacterList;
