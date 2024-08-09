import React, { ReactNode } from "react";
import "./index.css";

const PinkContainer: React.FC<{
  containerStyle?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  children?: ReactNode;
  onClick?: () => void;
}> = ({ containerStyle, wrapperStyle, children, onClick }) => {
  return (
    <div className="pink-container" style={containerStyle} onClick={onClick}>
      <div className="pink-wrapper" style={wrapperStyle}>
        {children}
      </div>
    </div>
  );
};

export default PinkContainer;
