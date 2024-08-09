import React from "react";
import PinkContainer from "../../components/pink-container";
import PinkButton from "../../components/pink-button";
import { isPC } from "../../utils";
import "./index.css";

const isPc = isPC();

const ClickedPage: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <PinkContainer wrapperStyle={{ alignItems: isPc ? "center" : "start" }}>
      <h2 style={{ margin: "0 auto 30px" }}>
        有只小可爱正在玩{isPc ? "电脑" : "手机"}
      </h2>

      <h4>你先前问过我，能不能给你写个爱心的代码</h4>
      <h4 style={{ marginBottom: "20px" }}>我回你的是：以后一定</h4>

      <h4>后面你又问了我一次能不能教你写代码</h4>
      <h4 style={{ marginBottom: "20px" }}>
        其实我一直在写的，只是不方便告诉你
      </h4>

      <h4 style={{ marginBottom: "20px" }}>
        现在直接满足你，学不会的话我弹你 <em>810</em> 个脑瓜嘣儿
      </h4>

      <div className="btn-wrapper">
        <PinkButton text="START" onClick={onClick} />
      </div>
    </PinkContainer>
  );
};

export default ClickedPage;
