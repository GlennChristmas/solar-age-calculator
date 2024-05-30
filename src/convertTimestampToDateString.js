export function convertTimestampToDateString(timestamp) {
  let newTimestamp = timestamp;

  let date = new Date(newTimestamp);
  //Get day, month and year from the date object
  let day = String(date.getDate()).padStart(2, "0");
  //we have to add +1 as months are zero-based
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
