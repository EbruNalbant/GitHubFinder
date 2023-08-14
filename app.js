import { Github } from "./github.js";
import { UI } from "./ui.js";

//create an instance of the class
const github = new Github();
const ui = new UI();

//! from HTML
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");
const themeBtn = document.querySelector("#theme-btn");
const body = document.querySelector("body");

//! Event listeners
searchButton.addEventListener("click", getInput);
themeBtn.addEventListener("click", changeTheme);

//! Functions
function getInput() {
  //if search term fill, it'll work
  if (searchInput.value) {
    //send an API request
    github
      .fetchUser(searchInput.value)
      .then((res) => {
        //if a user not found
        if (res.data.message === "Not Found") {
          ui.showAlert("User not found", "alert-info");
        } else {
          //if a user found
          ui.showAlert("User successfully found", "alert-success");
          ui.renderProfile(res.data);
          ui.renderProjects(res.repos);
        }
      })
      .catch((err) => console.log(err));

    return;
  }
  //if search term empty, it'll work
  ui.showAlert("Please enter name", "alert-warning");
}

//change the background
function changeTheme() {
  body.classList.toggle("bg-dark");
  body.classList.toggle("text-bg-dark");

  if (body.classList.contains("bg-dark")) {
    themeBtn.innerText = "Light Mode";
  } else {
    themeBtn.innerText = "Dark Mode";
  }
}
