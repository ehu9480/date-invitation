// Define handleClientLoad function
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

document.addEventListener('DOMContentLoaded', function () {
  // Your Firebase Config
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
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();

  // Calendar API variables
  var CLIENT_ID = '249426655213-dgldsj517o9prnmsb4kpfkbp51vnlooh.apps.googleusercontent.com';
  var API_KEY = 'AIzaSyA9WPV2-bNi0yrfdJUIMNkX56RzhsJe5Fk';
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
  var authorizeButton = document.getElementById('authorize-button');
  var signoutButton = document.getElementById('signout-button');

  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    });
  }

  // Event listeners for Yes/No buttons
  const yesBtn = document.querySelector(".yes-btn");
  const noBtn = document.querySelector(".no-btn");
  const comment = document.querySelector(".comment");
  const question = document.querySelector(".question");
  const gif = document.querySelector(".gif");


  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorizeButton.style.display = 'none';
      signoutButton.style.display = 'block';
      listUpcomingEvents();
    } else {
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
    }
  }

  function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }

  function listUpcomingEvents() {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function (response) {
      var events = response.result.items;
      appendPre('Upcoming events:');
      if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
          var event = events[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          appendPre(event.summary + ' (' + when + ')')
        }
      } else {
        appendPre('No upcoming events found.');
      }
    });
  }

  handleClientLoad(); // Call this function to initialize the Google API

  // Existing code for yes/no buttons, etc.
  // ...

  yesBtn.addEventListener("click", () => {
    comment.innerHTML = "YAY, I can't wait!";
    question.innerHTML = "I knew you would make the right choice!";
    gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";
    document.querySelector('.btn-group').style.display = 'none';
    document.querySelector('.date-time-picker').style.display = 'block';
    document.getElementById('calendar').style.display = 'block';
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