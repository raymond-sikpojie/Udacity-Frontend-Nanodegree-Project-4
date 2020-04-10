function checkForSentence(inputText) {
  let formText = document.querySelector(".text").value;
  if (formText.length <= 0) {
    alert("Enter a sentence or url");
  }
}

export { checkForSentence };
