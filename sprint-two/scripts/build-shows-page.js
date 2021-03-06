const table = document.querySelector('.table__body');

const template = (tableObjct) => {
  return `
<tr class="table__row">
  <td data-th="DATES" class="table__row--data">${tableObjct.dates}</td>
  <td data-th="VENUE" class="table__row--data">${tableObjct.venue}</td>
  <td data-th="LOCATION" class="table__row--data">${tableObjct.location}</td>
  <td class="table__row--button"><button>${tableObjct.button}</button></td>
</tr>
`;
};

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

let staticTable = showsObject
  .map((values) => {
    return template(values);
  })
  .join('');

table.innerHTML = staticTable;
