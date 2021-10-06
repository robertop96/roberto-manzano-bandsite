// LOCATION VARIABLES ***
const table = document.querySelector('.table__body');
// OBJECT showsObject HOLD ALL THE SHOWS TO BE INSERTED INTO THE HTML TEMPLATE
let showsObject = [
  {
    dates: 'Mon Dec 17 2018',
    venue: 'Ronald Lane',
    location: 'San Francisco, CA',
    button: 'BUY TICKETS',
  },
  {
    dates: 'Tue Jul 18 2019',
    venue: 'Pier 3 East',
    location: 'San Francisco, CA',
    button: 'BUY TICKETS',
  },
  {
    dates: 'Fri Jul 22 2019',
    venue: 'View Loungue',
    location: 'San Francisco, CA',
    button: 'BUY TICKETS',
  },
  {
    dates: 'Mon Dec 17 2018',
    venue: 'Hyatt Agency',
    location: 'San Francisco, CA',
    button: 'BUY TICKETS',
  },
  {
    dates: 'Fri Sep 05 2019',
    venue: 'Moscow Center',
    location: 'San Francisco, CA',
    button: 'BUY TICKETS',
  },
  {
    dates: 'Wed Aug 11 2019',
    venue: 'Pres Club',
    location: 'San Francisco, CA',
    button: 'BUY TICKETS',
  },
];
// VARIABLE THAT HOLDS MY HTML TEMPLATE
const template = (tableObject) => {
  return `
  <tr class="table__row">
  <td data-th="DATES" class="table__row--data table__row--dates">${tableObject.dates}</td>
  <td data-th="VENUE" class="table__row--data">${tableObject.venue}</td>
  <td data-th="LOCATION" class="table__row--data">${tableObject.location}</td>
  <td class="table__row--data table__row--data-button"><button class="table__row--button">BUY TICKETS</button></td>
  </tr>
  <hr class="table__divider"/>
`;
};
// LOOPs OVER MY showsObject OBJECT USING map() METHOD TO EXTRACT ITS VALUES
// AND PLACE THEM INSIDE MY template USING "VALUES" AS PLACEHOLDER OF THE ACTUAL
// OBJECTS NAME showsObject, THEN INSERT IT INTO THE DOM VIA innerHTML
let staticTable = showsObject
  .map((values) => {
    return template(values);
  })
  .join('');
table.innerHTML = staticTable;
