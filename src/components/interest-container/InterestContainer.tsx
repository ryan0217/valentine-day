import React from "react";

const InterestContainer: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="interest-container" onClick={onClick}>
      <h2 className="interest-info">
        啊，页面卡住了，需要美丽的人摁一下才能好
      </h2>
    </div>
  );
};

export default InterestContainer;
