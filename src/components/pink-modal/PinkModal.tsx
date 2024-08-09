import React from "react";

interface PinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const PinkModal: React.FC<PinkModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ffe4e1", // 浅粉色背景
    color: "#ff69b4", // 粉红色字体
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  };

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: "10px",
    fontSize: "16px",
    padding: "10px 20px",
    backgroundColor: "#ff69b4", // 粉红色
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={modalStyle}>
        <h2>{title}</h2>
        <div>{children}</div>
        <button style={buttonStyle} onClick={onClose}>
          关闭
        </button>
      </div>
    </>
  );
};

export default PinkModal;
