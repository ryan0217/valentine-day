import React from "react";
import "./index.css";

const PinkButton: React.FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => {
  return (
    <button className="pink-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default PinkButton;
