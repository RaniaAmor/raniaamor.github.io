// Replace this with your Web App URL
const YOUR_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwx6vVWC_QRizfzOeryL7yzEtdFRgihBBRmDLa5ulC8f3BSHG5Y3CUI1fJLSBCHvKCs4Q/exec";

// Function to sign up a new user
function signUp(email, password) {
  fetch(YOUR_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      action: "signUp",
      email: email,
      password: password,
    }),
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

// Function to log in a user
function login(email, password) {
  fetch(YOUR_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      action: "login",
      email: email,
      password: password,
    }),
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

// Example usage
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  signUp(email, password);
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  login(email, password);
});
