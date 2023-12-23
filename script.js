const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

yesBtn.addEventListener("click", () => {
  question.innerHTML = "Yay, see you on the 18th!";
  gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";

  // Hide the yes and no buttons
  document.querySelector('.btn-group').style.display = 'none';

  // Show the date-time picker
  document.querySelector('.date-time-picker').style.display = 'block';
});

// Add an event listener for the Submit button
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", () => {
  const datetime = document.getElementById("datetimeInput").value;
  const submissionMessage = document.getElementById("submissionMessage");

  // Check if the datetime input is not empty
  if (datetime === "") {
    submissionMessage.textContent = "Please complete the time selection.";
    submissionMessage.style.color = "red";
    return;
  }

  // Prepare the data in the format required by Google Forms
  const formData = new FormData();
  formData.append("entry.1094715592", datetime); // Replace 'entry.XXXXXXX' with the actual field name from your Google Form

  // Send the data using a POST request
  fetch("https://forms.gle/kCdThBcG5WVcLxTb8/formResponse", {
    method: "POST",
    body: formData,
    mode: "no-cors" // Google Forms doesn't support CORS, so we use 'no-cors' mode
  }).then(response => {
    // Notify the user of successful submission
    submissionMessage.textContent = "Your time has been successfully submitted.";
    submissionMessage.style.color = "green";
  }).catch(error => {
    // Handle any errors here
    console.error("Error:", error);
    submissionMessage.textContent = "Error submitting the form.";
    submissionMessage.style.color = "red";
  });
});

noBtn.addEventListener("mouseover", () => {
  const noBtnRect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - noBtnRect.width;
  const maxY = window.innerHeight - noBtnRect.height;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
});