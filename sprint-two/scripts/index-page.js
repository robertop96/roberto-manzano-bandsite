const conversation = document.querySelector('.conversation-posted'),
  form = document.querySelector('form');

const template = (singleCommentObj) => {
  return `<article class="comment">
  <figure class="comment__figure" >${singleCommentObj.photo}</figure>
  <div class="comment__body">
    <h3 class="comment__body--title">${singleCommentObj.name}</h3>
    <div class="comment__body--date">${singleCommentObj.date}</div>
    <article class="comment__body--comment"><p>${singleCommentObj.comment}</p></article>
  </div>
</article>
  `;
};
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
  fluidObject.append('photo', 'picuture');
  fluidObject = Object.fromEntries(fluidObject);
  commentObject.unshift(fluidObject); /*  REQUISITE, UNSHIFT INSTEAD OF PUSH ( ADDED TO THE TOP);  */
  displayComment(commentObject); /* REQUISITE */

  // const commentsTemplate = template(fluidObject);
  // conversation.innerHTML = commentsTemplate + conversation.innerHTML;
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

let displayComment = (object) => {
  const staticComments = object
    .map((comment) => {
      return template(comment);
    })
    .join('');
  conversation.innerHTML = staticComments; /* PREFER += */
};

displayComment(commentObject);
