const generateRandomNumber = () => {
  return parseFloat((Math.random() * 8 + 2).toFixed(0));
};

export const generateRandomMultiplication = () => {
  const num1 = generateRandomNumber();
  const num2 = generateRandomNumber();
  return [num1, num2, num1 * num2];
};

export const showMultiplicationModal = () => {
  const isConfirmed = window.confirm("请确认你的能力足以计算十以内的乘法运算");

  if (!isConfirmed) {
    window.alert("啧啧啧，小菜鸡");
  } else {
    const [num1, num2, result] = generateRandomMultiplication();
    const userResult = Number(window.prompt(` 请回答：${num1} * ${num2} = ?`));
    if (userResult !== result) {
      window.alert("啊咧？不会吧不会吧，还有人不会乘法啊");
    } else {
      window.alert("哇，你这么厉害的嘛，太强了👍");
    }
  }
};
