function getExpirationDate() {
  var date = new Date();
  date.setDate(date.getDate() + 30);
  return date;
}

export { getExpirationDate };
