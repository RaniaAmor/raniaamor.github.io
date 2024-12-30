// Replace this with your actual Google Apps Script Web App URL
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxPpZ8S4s_SuKFjKbii6GWd00xg42JR4iicxgkbHhb_2SXyHD5exgILYcIs_yJnF5emaw/exec";

/**
 * Function to sign up a new user
 * @param {string} email - User's email
 * @param {string} password - User's password
 */
function signUp(email, password) {
  fetch(WEB_APP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      action: "signUp",
      email: email,
      password: password,
    }),
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      console.log(data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

/**
 * Function to log in a user
 * @param {string} email - User's email
 * @param {string} password - User's password
 */
function login(email, password) {
  fetch(WEB_APP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      action: "login",
      email: email,
      password: password,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Login successful!");
        console.log("User logged in:", data);
      } else {
        alert(data.message);
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

/**
 * Function to fetch and display all courses
 */
function fetchCourses() {
  fetch(WEB_APP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      action: "getCourses",
    }),
  })
    .then(response => response.json())
    .then(courses => {
      console.log("Courses fetched:", courses);
      const coursesContainer = document.getElementById("courses");
      coursesContainer.innerHTML = ""; // Clear any existing content

      courses.forEach(course => {
        const courseElement = document.createElement("div");
        courseElement.classList.add("course-item");
        courseElement.innerHTML = `
          <h3>${course.courseName}</h3>
          <p>Coach: ${course.coach}</p>
          <p>Start Date: ${course.startDate}</p>
          <p>End Date: ${course.endDate}</p>
        `;
        coursesContainer.appendChild(courseElement);
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

// Event listeners for buttons (example usage)
document.getElementById("signUpButton").addEventListener("click", () => {
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;
  signUp(email, password);
});

document.getElementById("loginButton").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  login(email, password);
});

document.getElementById("fetchCoursesButton").addEventListener("click", fetchCourses);
