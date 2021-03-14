//  LOCATION VARIABLES ***
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
    <div class="comment-body__interaction">
      <button id="like--button--${singleCommentObj.id}" class="comment-body__interaction--likes">Likes</button>
      <p>${singleCommentObj.likes}</p>
      <button id="remove--button--${singleCommentObj.id}" class="comment-body__interaction--delete">Delete</button>
    </div>
  </div>
  </article>
  <hr class="comment-container__divider"/>
  `;
};
// TAKES AN ARRAY OF OBJECTS, MODIFIES IT VIA .sort AND .map AND INSERTS IT INTO template FUNCTION
// USES innerHTML TO PLACE IT WITHIN THE DOM.
// MAPS OVER THE OBJECT ARRAY AGAIN USING addEvents AS FUNCTION REFERENCE.
const displayComment = (object) => {
  let staticComments = object
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((values) => {
      values.image = 'https://loremflickr.com/48/48';
      values.date = moment.unix(values.timestamp / 1000).fromNow();
      if (!values.likes) values.likes = ''; //MAKE values.likes EMPTY STRING WHEN VALUE IS 0
      return template(values);
    })
    .join('');
  conversation.innerHTML = staticComments;
  object.map(addEvents);
};
// Gets AN ARRAY OF OBJECTS FROM THE api AND ASSIGNS IT TO objectsArray
// CALLS displayComment WITH objectsArray AS A PARAMETER TO INSERT ITS CONTENT INTO THE DOM
let getRequest = axios
  .get('https://project-1-api.herokuapp.com/comments?api_key=7d8d085e-486e-42dc-b836-58009cbfa68f')
  .then((response) => {
    objectsArray = response.data;
    displayComment(objectsArray);
  })
  .catch((error) => {
    console.log(error);
  });
// EVENT HANDLER ON SUBMIT, TAKES THE VALUES FROM THE FORM VIA FormData Object and Object.fromEntries.
// POST THE VALUES TAKEN FROM FORM INTO THE api, PUSHES THE NEW OBJECT INTO objectArray AND CALLS displayComment
// WITH THE UPDATED ARRAY.
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
      console.log(objectsArray);
      displayComment(objectsArray);
    })
    .catch((error) => {
      console.log(error);
    });
  e.target.reset();
});
// LIKE FUNCTION
function like(event) {
  const id = event.target.id.split('--')[2];
  axios
    .put(`https://project-1-api.herokuapp.com/comments/${id}/like/?api_key=7d8d085e-486e-42dc-b836-58009cbfa68f`)
    .then((response) => {
      return axios.get('https://project-1-api.herokuapp.com/comments?api_key=7d8d085e-486e-42dc-b836-58009cbfa68f');
    })
    // line 83 Axios.get .then()
    .then((response) => {
      objectsArray = response.data;
      displayComment(objectsArray);
    })
    .catch((error) => {
      console.log(error);
    });
}
// REMOVE FUNCTION
function remove(event) {
  const id = event.target.id.split('--')[2];
  let commentArticle = document.getElementById(`${id}`);
  let result = confirm('Are you sure you want to delete this comment?');
  if (result) {
    axios
      .delete(`https://project-1-api.herokuapp.com/comments/${id}/?api_key=7d8d085e-486e-42dc-b836-58009cbfa68f`)
      .then((response) => {
        commentArticle.remove();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
//USE addEvents TO LOCATE THE BUTTONS AS displayComment IS AN ASYNCHRONOUS ACTION CALLBACK.
// THE BUTTON ID CANNOT BE REACH OUTSIDE OF THE FUNCTION.
function addEvents(commentObject) {
  const likeButton = document.querySelector(`#like--button--${commentObject.id}`);
  likeButton.addEventListener('click', like);
  const removeButton = document.querySelector(`#remove--button--${commentObject.id}`);
  removeButton.addEventListener('click', remove);
}
