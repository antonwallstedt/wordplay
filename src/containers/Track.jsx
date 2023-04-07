import React, { useState } from "react";
import ButtonSecondary from "../components/ButtonSecondary";
import { AiOutlineDelete } from "react-icons/ai";

// * Input card for the users
const Track = ({ id, onDelete, isPlayingAll, inputText }) => {
  const [text, setText] = useState(inputText);

  const handleDelete = () => {
    onDelete(id);
  };

  const handleChange = ({ target }) => {
    setText(target.value);
  };

  const highlightWord = (word, index) => {
    return (
      <span
        key={index}
        className="m-1.5 items-center justify-center text-center font-jetbrains text-2xl font-semibold drop-shadow-md"
      >
        {word}
      </span>
    );
  };

  return (
    <div className="mb-10 flex flex-col items-center justify-between rounded-3xl bg-gradient-to-b from-stone-400 to-stone-500 px-10 py-5 drop-shadow-lg">
      <div className="flex items-center justify-center">
        {text.split(" ").map((word, index) => highlightWord(word, index))}
      </div>
      <input
        className="mt-5 w-full rounded-md p-1 indent-2 drop-shadow-md"
        maxLength="48"
        placeholder={text}
        onChange={handleChange}
      />
      <div className="float-left mt-5 flex gap-4">
        <ButtonSecondary text="Play" />
        <ButtonSecondary text="Stop" />
        <ButtonSecondary
          edit="float-right"
          icon={<AiOutlineDelete size="20px" />}
          handleClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default Track;
