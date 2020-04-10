// Get UI variables
const polarity = document.querySelector(".polarity");
const subjectivity = document.querySelector(".subjectivity");
const polarityConfidence = document.querySelector(".pol-confidence");
const subjectivityConfidence = document.querySelector(".sub-confidence");

function handleSubmit(event) {
  event.preventDefault();
  // check what text was put into the form field
  let formText = document.querySelector(".text").value;
  Client.checkForSentence(formText);

  postInputData({ text: formText });
  getAnalysis();
}

const postInputData = (data) => {
  fetch("http://localhost:8081/inputData", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getAnalysis = () => {
  fetch("http://localhost:8081/analysis")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      //Update user interface here.
      polarity.textContent = `Polarity: ${data.polarity}`;
      subjectivity.textContent = `Subjectivity: ${data.subjectivity}`;
      polarityConfidence.textContent = `Polarity Confidence: ${Math.round(
        data.polarity_confidence
      )}`;
      subjectivityConfidence.textContent = `Subjectivity Confidence: ${Math.round(
        data.subjectivity_confidence
      )}`;
    })
    .catch((error) => {
      console.log(error);
    });
};
export { handleSubmit };
