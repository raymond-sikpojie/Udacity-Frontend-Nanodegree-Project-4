import { checkForName } from "./js/nameChecker";
import { handleSubmit } from "./js/formHandler";

const proxy = "https://cors-anywhere.herokuapp.com/";

// console.log(checkForName);
let form = document.querySelector(".form");

form.addEventListener("click", handleSubmit);

console.log("CHANGE");
