// Conversation***************
// INTERACTIVE COMMENTS***

const conversation = document.querySelector('.conversation__static');
const form = document.querySelector('form');

// LISTENS TO THE SUBMIT EVENT WITHIN THE FROM Node, PREVENTS THE
// DEFAULT RELOAD OF THE PAGE, CREATE OBJECT DATE AND CONVERT THE
// DATE TO DESIRED VALUE, CREATED OBJECT TO HOLD COMMENT STRUCTURE
// AND PUSHED DATE AND PHOTO INTO OBJECT, CREATE NEW ARTICLE NODE
// AND CREATE TEMPLATE TO BE PUSHED INTO ARTICLE NODE. INSERT
// ARTICLE NODE IN FIRST POSITION OF THE COMMENT SECTION

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const currentDate = new Date();
  const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  let fluidCommentObject = new FormData(e.target);
  fluidCommentObject = Object.fromEntries(fluidCommentObject);
  fluidCommentObject.date = date;
  fluidCommentObject.photo = ' ';
  const newArticle = document.createElement('article');
  const commentsTemplate = `
  <figure>${fluidCommentObject.photo}</figure>
  <div>
  <h3>${fluidCommentObject.name}</h3>
  <div>${fluidCommentObject.date}</div>
  <article>${fluidCommentObject.comment}</article>
  </div>
  `;
  newArticle.innerHTML += commentsTemplate;
  // conversation.appendChild(newArticle);
  conversation.before(newArticle);
});

// STATIC COMMENTS***

// // fluidCommentObject IS AN OBJECT THAT HOLDS PROPERTIES
// TO BE USED AS COMMENT INFO
const fluidCommentObject = [
  {
    photo: 'picture',
    name: 'Michael Lyons',
    date: '12/18/2018',
    comment:
      'They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.',
  },
  {
    photo: 'picture',
    name: 'Gary Wong',
    date: '12/12/2018',
    comment:
      "Every time I see him shred I feel so motivated to get off my couch and hop on my board. he's so talented! I wish I can ride like him one day so I can really enjoy myself!",
  },
  {
    photo: 'picture',
    name: 'Theodore Duncan',
    date: '11/15/2018',
    comment:
      "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He's definitely my favorite ever!",
  },
];

// THIS LOOPS THROUGHOUT fluidCommentObject PROPERTIES,
// CREATES A ARTICLE NODE AND INSERTS THE PROPERTIES IN THE
// HTML TEMPLATE, THEN APPENDS THE TEMPLATE TO THE CONVERSATION
// SECTION.
fluidCommentObject.forEach((fluidCommentObject) => {
  const newArticle = document.createElement('article');
  let commentsTemplate = `
  <figure>${fluidCommentObject.photo}</figure>
  <div>
  <h3>${fluidCommentObject.name}</h3>
  <div>${fluidCommentObject.date}</div>
  <article>${fluidCommentObject.comment}</article>
  </div>
  `;
  newArticle.innerHTML += commentsTemplate;
  conversation.appendChild(newArticle);
});
console.log(document);
