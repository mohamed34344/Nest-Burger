// ===== TOGGLE ANIMATION =====
const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// ===== FORMS =====
const loginForm = document.querySelector(".login form");
const registerForm = document.querySelector(".register form");

// ===== REGISTER =====
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = registerForm.querySelector('input[type="text"]').value;
  const email = registerForm.querySelector('input[type="email"]').value;
  const password = registerForm.querySelector('input[type="password"]').value;

  const user = {
    username: username,
    email: email,
    password: password,
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Registration successful ✅");

  container.classList.remove("active");
});

// ===== LOGIN =====
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = loginForm.querySelector('input[type="text"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    alert("No account");
    return;
  }

  if (username === savedUser.username && password === savedUser.password) {
    alert("Successful registration");

    window.location.href = "index.html";
  } else {
    alert("invalid data");
  }
});

function forgotPassword() {
  let username = prompt("Enter your username:");

  let savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    alert("No account");
    return;
  }

  if (username === savedUser.username) {
    alert("The password is:" + savedUser.password);
  } else {
    alert("Invalid username ");
  }
}
