import React, { ReactNode } from "react";
import "./index.css";

const InterestContainer: React.FC<{
  text: string;
  containerStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  children?: ReactNode;
  onClick?: () => void;
}> = ({ text, containerStyle, textStyle, children, onClick }) => {
  return (
    <div
      className="page-info-container"
      style={containerStyle}
      onClick={onClick}
    >
      <h2 className="page-info" style={textStyle}>
        {text}
      </h2>
      {children}
    </div>
  );
};

export default InterestContainer;
