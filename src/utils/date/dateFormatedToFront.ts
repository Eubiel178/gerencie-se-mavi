import moment from "moment";

export const dateFormatedToFront = (
  date: string | undefined,
  hasHour = false
) => {
  const dateMoment = moment(date);
  // return dateMoment.format("DD/MM/YYYY HH:mm");

  return dateMoment.format(hasHour ? "DD/MM/YYYY HH:mm" : "DD/MM/YYYY");
};
