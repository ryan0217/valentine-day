import React from "react";
import { todayIsValentine } from "../../utils";

const HEART_RAIN_NUMBER = 40;
const HEART_RAIN_DURATION = HEART_RAIN_NUMBER * 200 + 5 * 1000;

export type HeartRainType = Record<"timestamp" | "number", number>;

const HeartContainer: React.FC<{
  isFinished: boolean;
  setHeartRains: React.Dispatch<React.SetStateAction<HeartRainType[]>>;
}> = ({ isFinished, setHeartRains }) => {
  const disabledRef = React.useRef(false);
  const showAlertRef = React.useRef(false);

  const handleClickHeart = () => {
    if (!isFinished || disabledRef.current) return;

    if (todayIsValentine() && !showAlertRef.current) {
      alert("袁维，七夕快乐！");
      showAlertRef.current = true;
    }

    startDroppingHeartRain();
  };

  const startDroppingHeartRain = () => {
    disabledRef.current = true;
    const timestamp = Date.now();

    setHeartRains((prev) => [
      ...prev,
      {
        timestamp,
        number: HEART_RAIN_NUMBER,
      },
    ]);

    setTimeout(() => {
      disabledRef.current = false;
    }, HEART_RAIN_DURATION / 4);

    setTimeout(() => {
      removeHeartRain(timestamp);
    }, HEART_RAIN_DURATION);
  };

  const removeHeartRain = (timestamp: number) => {
    setHeartRains((prev) => {
      return prev.filter((heartRain) => heartRain.timestamp !== timestamp);
    });
  };

  return (
    <div className="heart-container">
      <div className="heart" onClick={handleClickHeart}></div>
      <div className="heart bounce" onClick={handleClickHeart}></div>
    </div>
  );
};

export default HeartContainer;
