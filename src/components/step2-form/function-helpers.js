export const countingPersonAge = ({ day, month, year }) => {
  if (!day || !month || !year) {
    return 0;
  }

  const currentDate = new Date();

  let age = currentDate.getFullYear() - +year;

  if (
    (+month === currentDate.getMonth() + 1 && +day > currentDate.getDate()) ||
    +month > currentDate.getMonth() + 1
  ) {
    age--;
  }

  return age;
};

export const isEmptyObject = (obj) => {
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      return false;
    }
  }
  return true;
};