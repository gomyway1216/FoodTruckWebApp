/**
 * Returns the day of the week
 * @param {*} date 
 */
export const getWeekDay = (date) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = date.getDay();
  return days[day];
};