export const DateFormat = {
  ToDate: (date) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString().slice(0, 19).replace("T", " ");
    } else {
      console.error("Invalid date:", date);
      return "";
    }
  },
};
