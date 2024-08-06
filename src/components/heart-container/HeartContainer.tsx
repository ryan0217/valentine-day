import React from "react";

const HeartContainer: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="heart-container">
      <div className="heart" onClick={onClick}></div>
      <div className="heart bounce" onClick={onClick}></div>
    </div>
  );
};

export default HeartContainer;
