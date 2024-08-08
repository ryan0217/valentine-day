import React from "react";
import Fireworks from "./fireworks";
import PageInfo from "../../components/page-info";
import { calcValentineOffset } from "../../utils";

const valentineOffset = calcValentineOffset();

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#ffe4e1",
  color: "#ff69b4",
  fontFamily: "Arial, sans-serif",
};

const textStyle: React.CSSProperties = {
  fontSize: "24px",
  marginBottom: "20px",
};

const buttonStyle: React.CSSProperties = {
  fontSize: "16px",
  padding: "10px 20px",
  backgroundColor: "#ff69b4",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s ease",
};

const TempPage: React.FC = () => {
  const [showFireworks, setShowFireworks] = React.useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "#ff1493";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "#ff69b4";
  };

  return showFireworks ? (
    <Fireworks />
  ) : (
    <PageInfo
      containerStyle={containerStyle}
      textStyle={textStyle}
      text={`过${-valentineOffset}天再回来看`}
    >
      <button
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setShowFireworks(true)}
      >
        放个烟花
      </button>
    </PageInfo>
  );
};

export default TempPage;
