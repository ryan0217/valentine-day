import React from "react";
import PageInfo from "../../components/page-info";

const ClickedPage: React.FC<{ isPrd: boolean; onClick: () => void }> = ({
  isPrd,
  onClick,
}) => {
  return (
    <PageInfo
      text={isPrd ? "啊，页面卡住了，需要美丽的人摁一下才能好" : "Emmmm"}
      containerStyle={{ cursor: "pointer" }}
      onClick={onClick}
    />
  );
};

export default ClickedPage;
