import React from "react";
import TempPage from "./pages/temp-page";
import ClickedPage from "./pages/clicked-page";
import StyleContainer from "./components/style-container";
import HeartContainer from "./components/heart-container";
import HeartRain from "./components/heart-rain";
import { HeartRainType } from "./components/heart-container/HeartContainer";
import { calcValentineOffset, isPC } from "./utils";

const SHOW_STYLE_INTERVAL = 100;

const isPrd = import.meta.env.MODE === "production";
const valentineOffset = calcValentineOffset();
const isTempForbidden = isPrd && valentineOffset < 0;
const isPc = isPC();

const STYLE_STRING = `/*
* 先给页面中的所有元素都加上过渡效果
* 不然等会儿页面样式会很生硬 */
* {
  -webkit-transition: all .5s;
  transition: all .5s;
}

/*
* Emmmm，就是说，这个背景比你还白
* 不能忍，还是换个颜色好点 */
.root-container {
  background-color: #2f4f4f;
  color: #fff;
}

/*
* 你视力咋样，会不会感觉字有点小？
* 问题不大，我把字体调大点
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
.token.selector { color: #859900; }
.token.property { color: #bb8900; }
.token.punctuation { color: #ffff00; }
.token.function { color: #2aa198; }
.token.comment { color: #b1b1b1; }

/* 重点来咯，现在开始教你画大心心 */

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
  background-color: #fff;
}

/* 然后画个方块，当左右心室 */
.heart {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 100px;
  height: 100px;
  background-color: #e88d8d;
  border-radius: 20px;
  cursor: pointer;
}

/* 再来画个左右心房 */
.heart::before, .heart:after {
  content: '';
  position: absolute;
  background-color: #e88d8d;
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

/*
* 现在大心心是有了，但是它不会动哎
* 来给心脏施点魔法，赋予它Power吧 */
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
  const [password, setPassword] = React.useState("");
  const [hasClickedPage, setHasClickedPage] = React.useState(false);
  const [styleCode, setStyleCode] = React.useState("");
  const [isFinished, setIsFinished] = React.useState(false);
  const [heartRains, setHeartRains] = React.useState<HeartRainType[]>([]);

  const isForbidden = isTempForbidden && password !== "2333";

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

  const goToNextStep = () => {
    window.alert("打开音量体验更佳");
    setHasClickedPage(true);
    playMusic();
    startCourse();
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

  const startCourse = async () => {
    await gradualShowStyle(0);
    setIsFinished(true);
  };

  const inputPwd = () => {
    const pwd = window.prompt("请输入帅气的密码 (4位数字)");
    setPassword(pwd || "");
  };

  const resetTitle = () => {
    if (isTempForbidden) {
      document.title = "Emmmm";
    } else if (valentineOffset === 0) {
      document.title = "嗨呀，今天七夕耶";
    } else if (valentineOffset > 0) {
      document.title = `七夕已经过去${valentineOffset}天了`;
    }
  };

  React.useEffect(() => {
    if (isTempForbidden) {
      inputPwd();
    }

    resetTitle();
  }, []);

  if (isForbidden) return <TempPage />;

  return !hasClickedPage ? (
    <ClickedPage onClick={goToNextStep} />
  ) : (
    <div
      className="root-container"
      style={{ flexDirection: isPc ? "row" : "column" }}
    >
      <StyleContainer code={styleCode} />

      <HeartContainer isFinished={isFinished} setHeartRains={setHeartRains} />

      {heartRains.map(({ timestamp, number }) => (
        <HeartRain key={timestamp} number={number} />
      ))}
    </div>
  );
}

export default App;
