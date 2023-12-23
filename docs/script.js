document.addEventListener('DOMContentLoaded', function () {

  const wrapper = document.querySelector(".wrapper");
  const comment = document.querySelector(".comment");
  const question = document.querySelector(".question");
  const gif = document.querySelector(".gif");
  const yesBtn = document.querySelector(".yes-btn");
  const noBtn = document.querySelector(".no-btn");
  const submitBtn = document.querySelector(".submit-btn"); // Make sure this selector matches your HTML
  const firebaseConfig = {

    apiKey: "AIzaSyBzLwxX5bog5znLxT1KuRHpy9IwvEtR1LE",

    authDomain: "date-invitation.firebaseapp.com",

    projectId: "date-invitation",

    storageBucket: "date-invitation.appspot.com",

    messagingSenderId: "86439839042",

    appId: "1:86439839042:web:e139608d5c70f1db5db4db",

    measurementId: "G-TE14YMF5QM"

  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  document.getElementById("dateTimeForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const datetime = document.getElementById("datetimeInput").value;
    const submissionMessage = document.getElementById("submissionMessage");

    if (datetime === "") {
      submissionMessage.textContent = "Please complete the time selection.";
      submissionMessage.style.color = "red";
      return;
    }

    // Firebase Firestore reference
    const db = firebase.firestore();

    // Add data to Firestore
    db.collection("dates").add({
      datetime: datetime,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then(() => {
        submissionMessage.textContent = "Submission saved successfully";
        submissionMessage.style.color = "green";
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        submissionMessage.textContent = "Error submitting the form.";
        submissionMessage.style.color = "red";
      });
  });

  yesBtn.addEventListener("click", () => {
    comment.innerHTML = "YAY, I can't wait!";
    question.innerHTML = "I knew you would make the right choice!"
    gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";

    // Hide the yes and no buttons
    document.querySelector('.btn-group').style.display = 'none';

    // Show the date-time picker
    document.querySelector('.date-time-picker').style.display = 'block';
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