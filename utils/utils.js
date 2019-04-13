export const ConvertCommaToDot = value => {
  const newStringValue = value.replace(",", ".");
  return newStringValue;
};

export const ConvertMinToDaysHoursMin = valueMIN => {
  const num = valueMIN;
  //   const days = num / 24 / 60;
  //   const rdays = Math.floor(days);
  const hours = num / 60;
  let rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  //   if (rdays > 0) {
  //     rhours = rhours - rdays * 24;
  //   }
  if (rhours === 0) {
    return rminutes + " minute(s)";
  }
  return (
    // num +
    // " minutes = " +
    // rdays +
    // " day(s) " +
    rhours + " hour(s) " + rminutes + " minute(s)"
  );
};
