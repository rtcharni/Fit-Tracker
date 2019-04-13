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
    if (rminutes !== 1) {
      return rminutes + " minutes";
    }
    return rminutes + " minute";
  }
  if (rhours === 1) {
    if (rminutes === 0) {
      return rhours + " hour ";
    } else if (rminutes === 1) {
      return rhours + " hour " + rminutes + " minute";
    }
    return rhours + " hour " + rminutes + " minutes";
  }
  if (rhours > 1) {
    if (rminutes === 0) {
      return rhours + " hours";
    } else if (rminutes === 1) {
      return rhours + " hours " + rminutes + " minute";
    }
    return rhours + " hours " + rminutes + " minutes";
  }
};
