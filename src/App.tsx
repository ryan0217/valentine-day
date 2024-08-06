import React from "react";
import InterestContainer from "./components/interest-container";
import HeartContainer from "./components/heart-container";
import StyleContainer from "./components/style-container";
import HeartRain from "./components/heart-rain";
import { calcValentineOffset, isPC, todayIsValentine } from "./utils";

type HeartRainType = Record<"timestamp" | "number", number>;

const SHOW_STYLE_INTERVAL = 100;
const HEART_RAIN_NUMBER = 30;
const HEART_RAIN_DURATION = HEART_RAIN_NUMBER * 200 + 5 * 1000;

const valentineOffset = calcValentineOffset();
const isPc = isPC();

const STYLE_STRING = `/*
* 你现在肯定在用${isPc ? "电脑" : "手机"}，我在你脑壳上装了个监控hhhh
* 你先前问过我，能不能给你写个爱心的代码
* 我回你的是：以后一定
* 后面你又问了我一次能不能教你写代码
* 我当时就想给你个脑瓜嘣儿，我一直都在写这个教程
* 但是又不好直接告诉你
* 现在直接满足你，学不会的话我弹你810个脑瓜嘣儿

* 先来整点前置工作
* 给页面中的所有元素都加上过渡效果
* 不然等会儿页面样式会很生硬 */
* {
  -webkit-transition: all .5s;
  transition: all .5s;
}

/*
* Emmmm，就是说，这个背景比你还白
* 不能忍，还是换个颜色好点 */
.root-container {
  background-color: darkslategray;
  color: #fff;
}

/*
* 你视力咋样，会不会感觉字有点小？
* 问题不大，我把字体调大点。
* 整个边框，再调整下宽高 */
.style-container {
  overflow: auto;
  line-height: 1.5;
  font-size: ${isPc ? "16px" : "14px"};
  border: 1px solid;
  ${
    isPc
      ? `width: 49%;
  max-height: 100%;`
      : `width: 100%;
  max-height: 49%;`
  }
}

/*
* 一大堆的英文数字好像看着眼花，颜色也不够个性
* 来搞点不一样的 */
.token.selector { color: rgb(133,153,0) }
.token.property { color: rgb(187,137,0) }
.token.punctuation { color: yellow }
.token.function { color: rgb(42,161,152) }
.token.comment { color: rgb(177,177,177) }

/* 差不多就这样吧，现在开始教你画大心心 */

/* 首先，来一个画板 */
.heart-container {
  position: relative;
  ${
    isPc
      ? `width: 49%;
  height: 100%;`
      : `width: 100%;
  height: 49%;`
  }
  background-color: white;
}

/* 然后再画一个方块，当左右心室 */
.heart {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 100px;
  height: 100px;
  background: #E88D8D;
  border-radius: 20px;
}

/* 来画个左右心房 */
.heart::before, .heart:after {
  content: '';
  position: absolute;
  background: #E88D8D;
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
.heart::before {
  top: 1px;
  left: -38px;
}
.heart::after {
  top: -38px;
  right: -1px;
}

/* 给心脏赋予Power，一起扑通扑通！ */
@keyframes throb {
  0% {
    transform: translate(-50%, -50%) scale(1) rotate(45deg);
    opacity: 1;
  }

  100% {
    transform: translate(-50%, -50%) scale(1.65) rotate(45deg);
    opacity: 0;
  }
}

.bounce {
  animation: throb 1s infinite linear;
  opacity: 0.2;
}

/*
* 哦耶耶，大功告成
* 对了，要不要试试戳戳爱心，可能有惊喜？*/
`;

function App() {
  const flagRef = React.useRef(false);

  const [hasClickedPage, setHasClickedPage] = React.useState(false);
  const [styleCode, setStyleCode] = React.useState("");
  const [isFinished, setIsFinished] = React.useState(false);
  const [heartRains, setHeartRains] = React.useState<HeartRainType[]>([]);

  const gradualShowStyle = (index: number) => {
    return new Promise<void>((resolve) => {
      const char = STYLE_STRING[index];
      if (!char) {
        resolve();
        return;
      }

      setStyleCode((prev) => prev + char);

      if (char === "\n") {
        console.log();
      }

      setTimeout(() => {
        gradualShowStyle(index + 1).then(() => resolve());
      }, SHOW_STYLE_INTERVAL);
    });
  };

  const handleClickHeart = () => {
    if (!isFinished) return;

    if (todayIsValentine() && !flagRef.current) {
      alert("袁维，七夕快乐！");
      flagRef.current = true;
    }

    startDroppingHeartRain();
  };

  const startDroppingHeartRain = () => {
    const timestamp = Date.now();

    // if (
    //   !heartRains.length ||
    //   timestamp - heartRains[heartRains.length - 1].timestamp >
    //     HEART_RAIN_DURATION / 2
    // ) {
    setHeartRains((prev) => [
      ...prev,
      {
        timestamp,
        number: HEART_RAIN_NUMBER,
      },
    ]);

    setTimeout(() => {
      removeHeartRain(timestamp);
    }, HEART_RAIN_DURATION);
    // }
  };

  const removeHeartRain = (timestamp: number) => {
    setHeartRains((prev) => {
      return prev.filter((heartRain) => heartRain.timestamp !== timestamp);
    });
  };

  const clickPage = () => {
    setHasClickedPage(true);
    playMusic();
    init();
  };

  const playMusic = () => {
    const audio = document.getElementById("dehorsAudio") as HTMLAudioElement;
    if (audio === null) {
      console.error("Failed to get audio element");
      return;
    }

    audio.play().catch((error) => {
      console.error("Failed to play music", error);
    });
  };

  const init = async () => {
    await gradualShowStyle(0);
    setIsFinished(true);
  };

  React.useEffect(() => {
    if (valentineOffset < 0) {
      document.title = `距离七夕还有${-valentineOffset}天`;
    } else if (valentineOffset === 0) {
      document.title = "袁维，七夕快乐！";
    } else if (valentineOffset > 0) {
      document.title = `七夕已经过去${valentineOffset}天`;
    }
  }, []);

  if (valentineOffset < 0) {
    return (
      <div className="interest-container">
        <h2 className="interest-info">七夕还有{-valentineOffset}天哦</h2>
      </div>
    );
  }

  return !hasClickedPage ? (
    <InterestContainer onClick={clickPage} />
  ) : (
    <div
      className="root-container"
      style={{ flexDirection: isPc ? "row" : "column" }}
    >
      <StyleContainer code={styleCode} />

      <HeartContainer onClick={handleClickHeart} />

      {heartRains.map((heartRain) => (
        <HeartRain key={heartRain.timestamp} number={heartRain.number} />
      ))}
    </div>
  );
}

export default App;
