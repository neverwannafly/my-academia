export const extractDateTime = (dateString) => (
  dateString.split('T')
);

export const readableDate = (date) => (
  new Date(date).toDateString()
);
