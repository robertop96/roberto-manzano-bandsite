// Conversation***************
const conversation = document.querySelector('.conversation__static'),
  form = document.querySelector('form');

// INTERACTIVE COMMENTS**********************
// ----------------------------------------------------------
// SUBMIT EVENT THAT:
// STOPS PAGE FROM RELOADING,
// CREATES A FormData OBJECT
// APPENDS DATE AND PHOTO PROPERTIES TO FormData
// RE-ASSIGNS FormData OBJECT (fluidObject) INTO A NORMAL OBJECT.
// CREATES ARTICLE Element, CREATES newArticle TO BE POPULATED BY fluidObject.
// FILLS newArticle with CommentsTemplate STRING AND PREPEND IT TO START OF THE COMMENT Selection.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const currentDate = new Date(),
    date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  let fluidObject = new FormData(e.target);
  fluidObject.append('date', date);
  fluidObject.append('photo', ' ');
  fluidObject = Object.fromEntries(fluidObject);
  const newArticle = document.createElement('article');
  const commentsTemplate = `
  <article>
  <figure>${fluidObject.photo}</figure>
  <div>
  <h3>${fluidObject.name}</h3>
  <div>${fluidObject.date}</div>
  <article>${fluidObject.comment}</article>
  </div>
  </article>
  `;
  newArticle.innerHTML += commentsTemplate;
  conversation.prepend(newArticle);
});

// STATIC COMMENTS**********************
// commentObject IS AN OBJECT THAT HOLDS THE staticComments.
const commentObject = [
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
// ------------------------------------------------
// 1-LOOPS USING .MAP METHOD OVER THE commentObject OBJECT
// AND PLACE ITS VALUES INTO A HTML TEMPLATE. THIS NEEDS TO BE
// RETURNED SO WE CAN ACCESS IT VIA staticComments VARIABLE.
const staticComments = commentObject
  .map((comment) => {
    return ` 
  <article>
  <figure>${comment.photo}</figure>
  <div>
  <h3>${comment.name}</h3>
  <div>${comment.date}</div>
  <article>${comment.comment}</article>
  </div>
  </article>
  `;
  })
  .join();
conversation.innerHTML += staticComments;
