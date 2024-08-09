import React from "react";
import Fireworks from "../../components/fireworks";
import PinkContainer from "../../components/pink-container";
import PinkButton from "../../components/pink-button";
import { calcValentineOffset } from "../../utils";

const valentineOffset = calcValentineOffset();

const TempPage: React.FC = () => {
  const [showFireworks, setShowFireworks] = React.useState(false);

  return showFireworks ? (
    <Fireworks />
  ) : (
    <PinkContainer>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        过{-valentineOffset}天再回来看
      </h2>

      <PinkButton text="放个烟花" onClick={() => setShowFireworks(true)} />
    </PinkContainer>
  );
};

export default TempPage;
