import React from "react";

const ButtonSecondary = ({ text, icon, handleClick, edit }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        "transition-duration-150 marker: rounded-lg bg-stone-300 px-4 py-2 text-center font-semibold leading-tight drop-shadow-md transition ease-in-out hover:bg-stone-200 focus:outline-none active:bg-stone-300 " +
        edit
      }
    >
      {icon}
      {text}
    </button>
  );
};

export default ButtonSecondary;
