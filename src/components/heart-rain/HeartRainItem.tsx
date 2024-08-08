import React from "react";
import { randomNumber } from "../../utils/randomNumber";
import "./index.css";

const HeartRainItem: React.FC<{ delay: number }> = ({ delay }) => {
  const rainRef = React.useRef<HTMLDivElement | null>(null);
  const timerId = React.useRef<number | undefined>(undefined);

  const { startPosition, endPosition, duration } = {
    startPosition: [`${randomNumber(0, window.innerWidth)}px`, "-30px"],
    endPosition: [
      `${randomNumber(0, window.innerWidth)}px`,
      `${window.innerHeight + 50}px`,
    ],
    duration: `${randomNumber(4, 4.5)}s`,
  };

  const setEndPosition = () => {
    if (!rainRef.current) return;

    rainRef.current.style.left = endPosition[0];
    rainRef.current.style.top = endPosition[1];
  };

  React.useEffect(() => {
    window.clearTimeout(timerId.current);
    timerId.current = setTimeout(setEndPosition, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      className="heart-rain-item"
      style={{
        left: startPosition[0],
        top: startPosition[1],
        transition: `all ${duration} linear`,
      }}
      ref={rainRef}
    >
      ❤️
    </span>
  );
};

export default HeartRainItem;
