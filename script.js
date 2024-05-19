const firebaseConfig = {
  apiKey: "AIzaSyB9Pf1C6CGuh6ZiqK2-QT5QrPqpK_ZN1HY",
  authDomain: "papucrafts.firebaseapp.com",
  databaseURL:
    "https://papucrafts-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "papucrafts",
  storageBucket: "papucrafts.appspot.com",
  messagingSenderId: "212728383296",
  appId: "1:212728383296:web:e295d26991621fd88f5ca5",
  measurementId: "G-18WKFQ6GLJ",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const container = document.getElementById("container");
const btnLogin = document.querySelector("button");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

document.addEventListener("DOMContentLoaded", () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dashboard(user);
      document.querySelector("#login-box").classList.add("hidden");
    } else {
      document.querySelector("#login-box").classList.remove("hidden");
    }
  });
});

const logout = () => {
  //   ev.preventDefault();
  firebaseApp
    .auth()
    .signOut()
    .then(() => {
      alert("logout berhasil");
    })
    .catch((err) => {
      console.log(err);
    });

  document.querySelector("#login-box").classList.remove("hidden");
  document.querySelector("#profile").remove();
};

btnLogin.addEventListener("click", (ev) => {
  ev.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((credential) => {
      let user = credential.user;
      alert("login berhasil");
    })
    .catch((err) => {
      const { code, message } = err;
      console.log({ code, message });
    });
});

const dashboard = (user) => {
  return (container.innerHTML += `
    <div class="w-1/2 flex flex-col" id="profile">
        <h4 class="text-lg" id="email-user">${user.email}</h4>
        <h4 class="text-lg" id="uid-user">
          ${user.uid}
        </h4>
        <button id="logout" onclick="logout()">Logout</button>
      </div>
    `);
};
