// LOCATION VARIABLES ***
const conversation = document.querySelector('.conversation-container-posted');
const form = document.querySelector('form');
// TIME SMART TIME RELATED VARIABLES ***
const startDate = new Date(1.6151359e12);
const currentDate = new Date();
const fluidStartDate = currentDate - 1000;
// CALCULATES THE DIFFERENCE BETWEEN THE CURRENT DATE currentDate
// AND A DEFINED DATE startDate, THE DEFINED DATE IS SET TO SUNDAY 7 2021
const smartTime = (currentDate, startDate) => {
  const msInMinutes = 60 * 1000,
    msInHours = msInMinutes * 60,
    msInDays = msInHours * 24,
    msInMonths = msInDays * 30,
    msInYears = msInDays * 365;
  let difference = currentDate - startDate;
  if (difference < msInMinutes) {
    return Math.round(difference / 1000) + ' seconds ago';
  } else if (difference < msInHours) {
    return Math.round(difference / msInMinutes) + ' minutes ago';
  } else if (difference < msInDays) {
    return Math.round(difference / msInHours) + ' hours ago';
  } else if (difference < msInMonths) {
    return `approximately  ${Math.round(difference / msInDays)} days ago`;
  } else if (difference < msInYears) {
    return `approximately ${Math.round(difference / msInMonths)} months ago`;
  } else {
    return `approximately ${Math.round(difference / msInYears)} years ago`;
  }
};
// VARIABLE THAT HOLDS MY HTML TEMPLATE
const template = (singleCommentObj) => {
  return `
  <article class="comment-container">
  <figure class="comment-container__picture">
    <img class="comment-container__picture-img" src="${singleCommentObj.photo}" alt="profile picture" />
  </figure>
  <div class="comment-body">
    <h3 class="comment-body__name">${singleCommentObj.name}</h3>
    <div class="comment-body__date">${singleCommentObj.date}</div>
    <article class="comment-body__comment"><p>${singleCommentObj.comment}</p></article>
  </div>
  </article>
  <hr class="comment-container__divider"/>
  `;
};
// INTERACTIVE COMMENTS**********************
// ----------------------------------------------------------
// SUBMIT EVENT THAT:
// STOPS PAGE FROM RELOADING,
// CREATES A FormData OBJECT
// APPENDS DATE AND PHOTO PROPERTIES TO FormData OBJECT
// TRANSFORMS FormData OBJECT INTO A NORMAL OBJECT (fluidObject).
// PUSHES fluidObject into commentObject (contains all pre-made objects)
// CALLS FUNCTION displayComment WITH commentObject AS PARAMETER (displayComment inserts into DOM)
// RESETS THE FORM
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let fluidObject = new FormData(e.target);
  fluidObject.append('date', smartTime(currentDate, fluidStartDate));
  fluidObject.append('photo', 'https://loremflickr.com/48/48');
  fluidObject = Object.fromEntries(fluidObject);
  commentObject.unshift(fluidObject); /*  REQUISITE, UNSHIFT INSTEAD OF PUSH ( ADDED TO THE TOP);  */
  displayComment(commentObject); /* REQUISITE */
  form.reset();

  // const commentsTemplate = template(fluidObject);
  // conversation.innerHTML = commentsTemplate + conversation.innerHTML;
});
// STATIC COMMENTS**********************
// commentObject IS AN OBJECT THAT HOLDS THE PRE-MATE COMMENTS, (staticComments).
const commentObject = [
  {
    photo: 'https://picsum.photos/48/48',
    name: 'Michael Lyons',
    date: smartTime(currentDate, startDate),
    comment:
      'They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.',
  },
  {
    photo: 'https://source.unsplash.com/random/48x48',
    name: 'Gary Wong',
    date: smartTime(currentDate, startDate),
    comment:
      "Every time I see him shred I feel so motivated to get off my couch and hop on my board. he's so talented! I wish I can ride like him one day so I can really enjoy myself!",
  },
  {
    photo: 'http://placeimg.com/48/48/any',
    name: 'Theodore Duncan',
    date: smartTime(currentDate, startDate),
    comment:
      "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He's definitely my favorite ever!",
  },
];
// displayComment IS A FUNCTION THAT:
// TAKES AND OBJECT AS A PARAMATER.
// CREATES A staticComments VARIABLE AND ASSINGS IT THE OBJECT PARAMETER.
// LOOP THE OBJECT PARAMETER (given by the function) WITH map() METHOD AND TAKES VALUES FROM THE OBJECT.
// INSERT THOSE VALUES INTO A TEMPLATE VIA template FUNCTION
// template FUNCTION TAKES THE VALUES FROM map() METHOD AS A PARAMETER AND RETURNS THE TEMPLATE.
// USE join() TO PUT THE EVERYTHING INTO AN ARRAY.
// INSERTS staticComments INTO THE DOM VIA innerHTML.
let displayComment = (object) => {
  const staticComments = object
    .map((comment) => {
      return template(comment);
    })
    .join('');
  conversation.innerHTML = staticComments; /* PREFER += */
};
// CALLING THE FUNCTION
displayComment(commentObject);
