if (localStorage.getItem("loggedInUser")) {
    window.location.href = "home.html";
  }
  
  document.getElementById("login-form").style.display = "block";
  
  function toggleForm() {
    const login = document.getElementById("login-form");
    const register = document.getElementById("register-form");
    const title = document.getElementById("form-title");
    const msg = document.getElementById("message");
    msg.textContent = "";
    if (login.style.display === "none") {
      login.style.display = "block";
      register.style.display = "none";
      title.textContent = "Đăng nhập";
    } else {
      login.style.display = "none";
      register.style.display = "block";
      title.textContent = "Đăng ký";
    }
  }
  
  function register() {
    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value;
  
    if (!username || !password) {
      showMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }
  
    let users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[username]) {
      showMessage("Tên đăng nhập đã tồn tại");
      return;
    }
  
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    showMessage("Đăng ký thành công! Bạn có thể đăng nhập", "green");
    toggleForm();
  }
  
  function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;
    const remember = document.getElementById("remember-me").checked;
  
    let users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[username] === password) {
      if (remember) {
        localStorage.setItem("loggedInUser", username);
      }
      window.location.href = "home.html";
    } else {
      showMessage("Sai tên đăng nhập hoặc mật khẩu");
    }
  }
  
  function showMessage(msg, color = "red") {
    const message = document.getElementById("message");
    message.style.color = color;
    message.textContent = msg;
  }