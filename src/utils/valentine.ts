export const todayIsValentine = () => {
  const date = new Date();
  return date.getMonth() === 7 && date.getDate() === 10;
};

export const calcValentineOffset = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const valentineDate = new Date(currentYear, 7, 10);

  const timeOffset = today.getTime() - valentineDate.getTime();

  const dayOffset = Math.floor(timeOffset / (1000 * 60 * 60 * 24));

  return dayOffset;
};
