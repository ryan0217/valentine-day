import React, { ReactNode, useEffect } from "react";
import HeartRainItem from "./HeartRainItem";
import { randomNumber } from "../../utils/randomNumber";
import "./index.css";

const HeartRain: React.FC<{ number: number }> = ({ number }) => {
  const [queue, setQueue] = React.useState<ReactNode[]>([]);

  const init = () => {
    for (let i = 0; i < number; i++) {
      const delay = randomNumber(i * 200, i * 200 + 1000);
      setQueue((prev) => [...prev, <HeartRainItem key={i} delay={delay} />]);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return queue;
};

export default HeartRain;
