// LOCATION VARIABLES ***
const conversation = document.querySelector('.conversation-container-posted');
const form = document.querySelector('form');
// Array THAT HOLDS ALL MY COMMENT OBJECTS
let objectsArray;

// VARIABLE THAT HOLDS MY HTML TEMPLATE
const template = (singleCommentObj) => {
  return `
  <article id="${singleCommentObj.id}" class="comment-container">
  <figure class="comment-container__picture">
    <img class="comment-container__picture-img" src="${singleCommentObj.image}" alt="profile picture" />
  </figure>
  <div class="comment-body">
    <h3 class="comment-body__name">${singleCommentObj.name}</h3>
    <div class="comment-body__date">${singleCommentObj.date}</div>
    <article class="comment-body__comment"><p>${singleCommentObj.comment}</p></article>
    <div onClick="myFunction()" class="comment-body__interaction">
      <div class="comment-body__interaction--likes">Likes</div>
      <button  class="comment-body__interaction--delete">Delete</button>
    </div>
  </div>
  </article>
  <hr class="comment-container__divider"/>
  `;
};

// displayComment IS A FUNCTION THAT:
// TAKES AN ARRAY OF OBJECTS AS A PARAMETER.
// CREATES staticComments VARIABLE AND ASSIGNS THE ARRAY OF OBJECTS TO IT.
// .sort WILL RE-ARRANGE THE ORDER OF THE OBJECTS USING timestamp AS THE ORDER
// .map LOOPS THE ARRAY, CREATING AN image AND A date PROPERTY INSIDE EACH OBJECT
// template FUNCTION TAKES AN OBJECT AS PARAMETER AND ASSIGNS ITS PROPERTIES TO A TEMPLATE
// .join() WILL CONCATENATE ALL THE ELEMENTS IN THE ARRAY
// staticComments IS INSERTED INTO THE DOM VIA innerHTML
const displayComment = (object) => {
  let staticComments = object
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((values) => {
      values.image = 'https://loremflickr.com/48/48';
      values.date = moment.unix(values.timestamp / 1000).fromNow();
      return template(values);
    })
    .join('');
  conversation.innerHTML = staticComments;
};

// Gets AN ARRAY OF OBJECTS FROM THE api AND ASSIGNS IT TO objectsArray
// CALLS displayComment WITH objectsArray AS A PARAMETER TO INSERT ITS CONTENT INTO THE DOM
axios
  .get('https://project-1-api.herokuapp.com/comments?api_key=7d8d085e-486e-42dc-b836-58009cbfa68f')
  .then((response) => {
    objectsArray = response.data;
    displayComment(objectsArray);
  })
  .catch((error) => {
    console.log(error);
  });

// INTERACTIVE COMMENTS**********************

// SUBMIT EVENT THAT:
// STOPS PAGE FROM RELOADING AND CREATES A NEW FormData CALLED fluidObject
// RE-ASSIGNS fluidObject BY USING THE Object.fromEntries() METHOD
// ( Object.fromEntries() ) METHOD TAKES A LIST OF KEY-VALUE PAIRS AND RETURNS A NEW OBJECT WITH THOSE PROPERTIES
// ------------------------------------------------------------------------------------------------------------------
// Posts THE PROPERTIES OF fluidObject.
// .then RECEIVES THE OBJECT OBJECT POSTED AS A RESPONSE, THAT OBJECT IS PUSHED TO objectsArray.
// ObjectsArray NOW HOLDS THE NEW OBJECT AND ALL PREVIOUS OBJECTS FROM THE Get REQUEST.
// objectsArray GETS INSERTED INTO THE DOM VIA displayComment FUNCTION.
// PUSHES fluidObject into commentObject (contains all pre-made objects)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let fluidObject = new FormData(e.target);
  fluidObject = Object.fromEntries(fluidObject);
  axios
    .post('https://project-1-api.herokuapp.com/comments?api_key=7d8d085e-486e-42dc-b836-58009cbfa68f&content-type=application/json', {
      name: fluidObject.name,
      comment: fluidObject.comment,
    })
    .then((response) => {
      objectsArray.push(response.data);
      displayComment(objectsArray);
    })
    .catch((error) => {
      console.log(error);
    });
});

// DELETE FUNCTION
function myFunction() {
  const commentArticle = event.path[3];
  const id = commentArticle.getAttribute('id');
  axios
    .delete(`https://project-1-api.herokuapp.com/comments/${id}/?api_key=7d8d085e-486e-42dc-b836-58009cbfa68f`)
    .then((response) => {
      commentArticle.remove();
    })
    .catch((error) => {
      console.log(error);
    });
}

// LIKE FUNCTION
