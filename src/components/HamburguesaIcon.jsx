import React from "react";

const HamburgesaIcon = ({ active, hover }) => {
  return (
    <span
      className={`${
        active ? "active" : ""
      } burgerIcon cursor-pointer z-[101] flex flex-col justify-between relative w-7 h-6`}
    >
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index + 1}
          className={`${hover ? "bg-[--primary]" : ""}  ${
            active ? "bg-[--primary]" : ""
          } bg-[--bg] lineBurger lineBurger${index + 1}`}
        />
      ))}
    </span>
  );
};

export default HamburgesaIcon;
