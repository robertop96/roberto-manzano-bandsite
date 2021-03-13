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

// displayTable IS A FUNCTION THAT:
// TAKES AN ARRAY OF OBJECTS AS A PARAMETER.
// CREATES StaticShowsObject VARIABLE AND ASSIGNS THE ARRAY OF OBJECTS TO IT.
// .map LOOPS THE ARRAY, UPDATING THE date PROPERTY INTO DESIRED FORMAT
// template FUNCTION TAKES AN OBJECT AS PARAMETER AND ASSIGNS ITS PROPERTIES TO A TEMPLATE
// .join() WILL CONCATENATE ALL THE ELEMENTS IN THE ARRAY
// StaticShowsObject IS INSERTED INTO THE DOM VIA innerHTML
const displayTable = (object) => {
  let StaticShowsObject = object
    .map((values) => {
      values.date = moment(values.date).format('ddd MMM D YYYY');
      return template(values);
    })
    .join('');
  table.innerHTML = StaticShowsObject;
};

// Gets AN ARRAY OF OBJECTS FROM THE api AND ASSIGNS IT TO myTable
// CALLS displayTable WITH myTable AS A PARAMETER TO INSERT ITS CONTENT INTO THE DOM
axios
  .get('https://project-1-api.herokuapp.com/showdates?api_key=7d8d085e-486e-42dc-b836-58009cbfa68f')
  .then((response) => {
    let myTable = response.data;
    displayTable(myTable);
  })
  .catch((error) => {
    console.log(error);
  });
