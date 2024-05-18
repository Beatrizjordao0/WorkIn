// Declaração de Variáveis
const loginBtn = document.querySelector("#login");
const registerBtn = document.querySelector("#register");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

const email = document.getElementById('login-email').value;

//Validação de Email
function validateEmail(email) {
  const re = /^[^@]+@\w+(\.\w+)+\w$/;

  if (re.test(email) == true) {
    return true
  } else {
    return false
  }
}


// Função do Botão de Login
loginBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "#21264D";
    registerBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    
    loginForm.style.left = "50%";
    registerForm.style.left = "-50%";
    
    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;
    
    document.querySelector(".col-1").style.borderRadius = "0 30% 20% 0";
});

// Função do Botão de Cadastro
registerBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    registerBtn.style.backgroundColor = "#21264D";
    
    loginForm.style.left = "-50%";
    registerForm.style.left = "50%";
    
    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;
    
    document.querySelector(".col-1").style.borderRadius = "0 20% 30% 0";
});

//Configuração do Firebase - Substitua pelas suas credenciais
const firebaseConfig = {
    apiKey: "AIzaSyA3gOHi9Q6aHQ5seN5S9bbNmQpPQFMGXFs",
    authDomain: "magnus-c4b38.firebaseapp.com",
    projectId: "magnus-c4b38",
    storageBucket: "magnus-c4b38.appspot.com",
    messagingSenderId: "458576341456",
    appId: "1:458576341456:web:6117f4a9160b8667b8f1d5"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const user = auth.currentUser;
const db = firebase.firestore();

// Função para fazer login.
function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuário logado:", user);
        redirectToHome(); 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Erro de login:", errorMessage);
        // Exiba uma mensagem de erro para o usuário
        alert(`Erro ao fazer login: ${errorMessage}`); 
      });
};

// Função para registrar um novo usuário.
function registerUser() {
    const username = document.getElementById('registro-username').value;
    const email = document.getElementById('registro-email').value;
    const password = document.getElementById('registro-password').value;
    const telefone = document.getElementById('registro-telefone').value; 

    if (validateEmail(email) == true) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          const user = userCredential.user;
  
          user.updateProfile({
              displayName: username 
          }).then(() => {
              console.log("Novo usuário registrado:", user);
  
            
              firebase.firestore().collection('users').doc(user.uid).set({
                  username: username,
                  email: email,
                  telefone: telefone 
              }).then(() => {
                  redirectToHome(); 
              }).catch((error) => {
                  console.error("Erro ao salvar dados do usuário no Firestore:", error);
                  // Exiba uma mensagem de erro para o usuário
                  alert("Erro ao registrar: Erro interno. Por favor, tente novamente."); 
              });
          }).catch((error) => {
              console.error("Erro ao atualizar perfil do usuário:", error);
              // Exiba uma mensagem de erro para o usuário
              alert("Erro ao registrar: Erro interno. Por favor, tente novamente."); 
          });
      })
      .catch((error) => {
          console.error("Erro ao registrar usuário:", error);
          // Exiba uma mensagem de erro para o usuário
          alert(`Erro ao registrar: ${error.message}`);
      });
    } else {
      alert(`Erro ao registrar: Coloque um email válido`);
    }
    
};

// Função para redefinir senha.
function resetPassword() {
    const email = document.getElementById('login-email').value;

    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        console.log("E-mail de redefinição de senha enviado!");
        alert("Um e-mail de redefinição de senha foi enviado para o seu endereço de e-mail. Verifique sua caixa de entrada.");
      })
      .catch((error) => {
        console.error("Erro ao enviar e-mail de redefinição de senha:", error);
        alert("Ocorreu um erro ao enviar o e-mail de redefinição de senha. Por favor, tente novamente.");
      });
}

function redirectToHome() {
    
  // window.location.href = '../perfil/index.html'; 
  window.location.href = '../perfil/index.html'; 
};

