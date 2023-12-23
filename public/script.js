document.addEventListener('DOMContentLoaded', function () {

  const wrapper = document.querySelector(".wrapper");
  const question = document.querySelector(".question");
  const gif = document.querySelector(".gif");
  const yesBtn = document.querySelector(".yes-btn");
  const noBtn = document.querySelector(".no-btn");
  const submitBtn = document.querySelector(".submit-btn"); // Make sure this selector matches your HTML

  yesBtn.addEventListener("click", () => {
    question.innerHTML = "Yay, see you on the 18th!";
    gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";

    // Hide the yes and no buttons
    document.querySelector('.btn-group').style.display = 'none';

    // Show the date-time picker
    document.querySelector('.date-time-picker').style.display = 'block';
  });

  document.getElementById("dateTimeForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    const datetime = document.getElementById("datetimeInput").value;
    const submissionMessage = document.getElementById("submissionMessage");

    if (datetime === "") {
      submissionMessage.textContent = "Please complete the time selection.";
      submissionMessage.style.color = "red";
      return;
    }

    // Send the data to the server
    fetch('/submit-datetime', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ datetime }),
    })
      .then(response => response.json())
      .then(data => {
        submissionMessage.textContent = data.message;
        submissionMessage.style.color = "green";
      })
      .catch((error) => {
        console.error('Error:', error);
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
});