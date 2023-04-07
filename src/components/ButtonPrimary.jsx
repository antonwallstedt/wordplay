import React from "react";

const ButtonPrimary = ({ text, icon, handleClick, edit }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        "transition-duration-150 marker: rounded-lg bg-orange-400 px-4 py-2 text-center font-semibold leading-tight drop-shadow-md transition ease-in-out hover:bg-orange-300 focus:outline-none active:bg-orange-400 " +
        edit
      }
    >
      {icon}
      {text}
    </button>
  );
};

export default ButtonPrimary;
