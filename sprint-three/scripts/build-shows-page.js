// LOCATION VARIABLES ***
const table = document.querySelector('.table__body');

// VARIABLE THAT HOLDS MY HTML TEMPLATE
const template = (tableObject) => {
  return `
  <tr class="table__row">
  <td data-th="DATES" class="table__row--data table__row--dates">${tableObject.date}</td>
  <td data-th="VENUE" class="table__row--data">${tableObject.place}</td>
  <td data-th="LOCATION" class="table__row--data">${tableObject.location}</td>
  <td class="table__row--data table__row--data-button"><button class="table__row--button">BUY TICKETS</button></td>
  </tr>
  <hr class="table__divider"/>
`;
};
// LOOPs OVER MY response.data (object gotten via API)USING map() METHOD TO EXTRACT ITS VALUES
// AND PLACE THEM INSIDE MY template USING "VALUES" AS PLACEHOLDER OF THE ACTUAL
// OBJECTS NAME response.data, THEN INSERT IT INTO THE DOM VIA innerHTML
axios
  .get('https://project-1-api.herokuapp.com/showdates?api_key=7d8d085e-486e-42dc-b836-58009cbfa68f')
  .then((response) => {
    let tableObject = response.data;
    let myTable = tableObject
      .map((values) => {
        return template(values);
      })
      .join('');
    table.innerHTML = myTable;
  })
  .catch((error) => {
    console.log(error);
  });
