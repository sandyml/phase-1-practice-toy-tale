let addToy = false;
// addevent listener listen for things that happen to the DOM, the actual page it loads
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form")
  form.addEventListener('submit', addNewToy)

  document.addEventListener("click", (event) => {
    if(event.target.matches(".like-btn")) {
      updateLikes(event)
    }
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys()
});

// On the index.html page, there is a div with the id "toy-collection.
// When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.

// get request get all of our toys from the data base then another function that will add one individual toy to the DOM at a time 
//const toyUrl = "http://localhost:3000/toys"
// function getToys() {
//   fetch("http://localhost:3000/toys")
//   //taking out response and converting it to json arrow funct implicitly returns response.json
//   .then(response => response.json())
//   // toy will be passed so that toy is going to represent one individual element in this array which is going to be one object pass it to showToy function as an argument
//   .then(data => data.forEach(toy => showToy(toy)))
//     // add to DOM
//     // take the arrays .then of objects and pass each objects to this function as an argument
// }

// get toys 
function getToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => data.forEach(toy => showToy(toy)))
}

function showToy(toy) {
  const toyCollection = document.getElementById("toy-collection")
  const div = document.createElement("div")
  div.classList.add("card")
  const h2 = createElement("h2")
  h2.textContent = toy.name
  const img = createElement("img")
  img.src = toy.image
  img.classList.add("toy-avatar")
  const p = createElement('p')
  p.textContent = `${toy.like} likes`
  p.id = toy.id
  const button = createElement("button")
  button.classList.add("like-btn")
  button.textContent = "like"
  button.id = toy.id
  // button 
  button.addEventListener('click', () => {
  })
  div.append(h2, img, p, button)
  toyCollection.append(div)
}

// will pass a toy object from db.json
// example:
/* <div class="card">
  <h2>Woody</h2>
  <img src="[toy_image_url]" class="toy-avatar" />
  <p>4 Likes</p>
  <button class="like-btn" id="[toy_id]">Like ❤️</button>
</div> */
function showToy(toy) {
  // append 
  const toyCollection = document.getElementById("toy-collection")
  const div = document.createElement("div")
  div.classList.add("card")
  // div.id = toy.id
  const h2 = document.createElement("h2")
  h2.textContent = toy.name
  // use dot notation to assign it to that 
  const img = document.createElement("img")
  img.src = toy.image
  img.classList.add("toy-avatar")
  const p = document.createElement('p')
  p.textContent = `${toy.likes} likes`
  p.id = toy.id
  const button = document.createElement("button")
  button.classList.add("like-btn")
  button.textContent = "like"
  button.id = toy.id
  // add event listener for the likes 
  button.addEventListener('click', (event) => {
  })
  // append everything above
  div.append(h2, img, p, button)
  // will add one toy to the DOM
  toyCollection.append(div)
}

// function that grabs form for add toy 
function addNewToy(event) {
  event.preventDefault()
  const [name, image] = event.target

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },

  body: JSON.stringify({
    // pass object in here 
    name: name.value,
    image: image.value,
    likes: 0
  })
})
  // response 
  .then(response => response.json())
  // will add to the DOM
  .then(response => showToy(response))
  // clear 'create a toy' form when submit "" empty strings will clear it up 
  name.value = ""
  image.value = ""
}

function updateLikes(event) {
  event.preventDefault()
    // fetch request which is a PATCH 
    fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: "PATCH", 
      headers: {
        "content-type": "application/json"
      },
      // what we want to change in the body
      body: JSON.stringify({
        likes: parseInt(event.target.parentElement.children[2].textContent.split(" ")[0], 10) + 1
      })
    })
    .then(response => response.json())
    .then(response => {
      // event.target.parentElement.children[2].textContent = `${response.likes} likes`
      // const card = document.querySelector(`div.card#${toy.id}`)
      const p = document.getElementById(response.id)
      p.textContent = `${response.likes} likes`
    })
}
