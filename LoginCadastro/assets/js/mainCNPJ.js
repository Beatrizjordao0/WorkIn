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

// Validação de Número de Telefone (Brasil)
function validatePhoneNumber(phoneNumber) {
  const re = /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/;
  return re.test(phoneNumber);
}

// Validação de Nome de Usuário
function validateUsername(username) {
  return username.length >= 4;
}

// Validação de CNPJ
function validateCNPJ(cnpj) {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]+/g, '');

  // Valida se o CNPJ tem 14 dígitos
  if (cnpj.length !== 14) {
      return false;
  }

  // Verifica se todos os dígitos são iguais
  if (/(\d)\1{13}/.test(cnpj)) {
      return false;
  }

  // Calcula o primeiro dígito verificador
  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  let digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
      sum += numbers.charAt(length - i) * pos--;
      if (pos < 2) {
          pos = 9;
      }
  }

  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== parseInt(digits.charAt(0))) {
      return false;
  }

  // Calcula o segundo dígito verificador
  length = length + 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
      sum += numbers.charAt(length - i) * pos--;
      if (pos < 2) {
          pos = 9;
      }
  }

  result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== parseInt(digits.charAt(1))) {
      return false;
  }

  return true;
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

var provider = new firebase.auth.GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

firebase.auth().languageCode = 'it';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

// Função para fazer login.
function loginUser() {
    const email = document.getElementById('login-email').value;
    const cnpj = document.getElementById('login-cnpj').value;
    const cnpjValor = cnpj.toString()
    const password = document.getElementById('login-password').value; 

    console.log(cnpjValor)
    
  
    let errorSpaceLogin = document.getElementById("errorSpaceLogin")
    let errorDivLogin = document.getElementById("errorDivLogin")
    if (!errorDivLogin) {
      
    } else {
      while (errorDivLogin) {
        errorSpaceLogin.removeChild(errorDivLogin);
      }
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuário logado:", user);


        var usuariosLista = db.collection('users').doc(user.uid);

                  usuariosLista.get().then((doc) => {
                  if (doc.exists) {
                      const userData = doc.data()
                      // const city = userData.city
                      const pessoa = userData.pessoa

                      const pj = userData.cnpj


                      // if (pessoa === "juridica") {
                      //   redirectToHome(); 
                      // } else {
                      //   firebase.auth().signOut().then(() => {
                      //     // Sign-out successful.
                      //     console.log("Deslogado com sucesso!");
                      //     }).catch((error) => {
                      //         // An error happened.
                      //         console.log("Erro ao deslogar:", error);
                      //         });
                      //         let errorShow = "Esta conta não é de uma pessoa jurídica."
                      //         let errorSpaceLogin = document.getElementById("errorSpaceLogin")
                      //         // Criar a div para a mensagem "Gerando resposta..."
                      //         const errorDivLogin = document.createElement('div');
                      //         errorDivLogin.id = "errorDivLogin"
                      //         errorDivLogin.innerHTML = `<p>*${errorShow}</p>`;
                      //         errorSpaceLogin.appendChild(errorDivLogin);
                      // }


                      if (cnpj === pj) {
                        if (pessoa === "juridica") {
                          redirectToHome(); 
                        } else {
                          firebase.auth().signOut().then(() => {
                            // Sign-out successful.
                            console.log("Deslogado com sucesso!");
                            }).catch((error) => {
                                // An error happened.
                                console.log("Erro ao deslogar:", error);
                                });
                                let errorShow = "Esta conta não é de uma pessoa jurídica."
                                let errorSpaceLogin = document.getElementById("errorSpaceLogin")
                                // Criar a div para a mensagem "Gerando resposta..."
                                const errorDivLogin = document.createElement('div');
                                errorDivLogin.id = "errorDivLogin"
                                errorDivLogin.innerHTML = `<p>*${errorShow}</p>`;
                                errorSpaceLogin.appendChild(errorDivLogin);
                        }
                      } else {
                        firebase.auth().signOut().then(() => {
                          // Sign-out successful.
                          console.log("Deslogado com sucesso!");
                          }).catch((error) => {
                              // An error happened.
                              console.log("Erro ao deslogar:", error);
                              });
                              let errorShow = "Insira um CNPJ correto."
                              let errorSpaceLogin = document.getElementById("errorSpaceLogin")
                              // Criar a div para a mensagem "Gerando resposta..."
                              const errorDivLogin = document.createElement('div');
                              errorDivLogin.id = "errorDivLogin"
                              errorDivLogin.innerHTML = `<p>*${errorShow}</p>`;
                              errorSpaceLogin.appendChild(errorDivLogin);
                      }

                      console.log("Document data:", doc.data());
                  } else {
                      // doc.data() will be undefined in this case
                      console.log("No such document!");
                  }
              }).catch((error) => {
                  console.log("Error getting document:", error);
              });


        // redirectToHome(); 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let errorShow = ""

        if (errorMessage === "Firebase: The email address is badly formatted. (auth/invalid-email).") {
          let errorShow = "Endereço de Email mal formatado."
          let errorSpaceLogin = document.getElementById("errorSpaceLogin")
          // Criar a div para a mensagem "Gerando resposta..."
          const errorDivLogin = document.createElement('div');
          errorDivLogin.id = "errorDivLogin"
          errorDivLogin.innerHTML = `<p>*${errorShow}</p>`;
          errorSpaceLogin.appendChild(errorDivLogin);
        } else if (errorMessage === "Firebase: A non-empty password must be provided (auth/missing-password).") {
          let errorShow = "Insira a senha."
          let errorSpaceLogin = document.getElementById("errorSpaceLogin")
          // Criar a div para a mensagem "Gerando resposta..."
          const errorDivLogin = document.createElement('div');
          errorDivLogin.id = "errorDivLogin"
          errorDivLogin.innerHTML = `<p>*${errorShow}</p>`;
          errorSpaceLogin.appendChild(errorDivLogin);
        } else if (errorMessage === "Firebase: Error (auth/invalid-login-credentials).") {
          let errorShow = "Credenciais inválidos."
          let errorSpaceLogin = document.getElementById("errorSpaceLogin")
          // Criar a div para a mensagem "Gerando resposta..."
          const errorDivLogin = document.createElement('div');
          errorDivLogin.id = "errorDivLogin"
          errorDivLogin.innerHTML = `<p>*${errorShow}</p>`;
          errorSpaceLogin.appendChild(errorDivLogin);
        }
        // console.error("Erro de login:", errorMessage);
        // // Exiba uma mensagem de erro para o usuário
        // alert(`Erro ao fazer login: ${errorMessage}`); 

      // let errorSpaceLogin = document.getElementById("errorSpaceLogin")
      //   // Criar a div para a mensagem "Gerando resposta..."
      // const errorDivLogin = document.createElement('div');
      // errorDivLogin.id = "errorDivLogin"
      // errorDivLogin.innerHTML = `<p>*${errorMessage}</p>`;
      // errorSpaceLogin.appendChild(errorDivLogin);

      });
};

// Função para registrar um novo usuário.
function registerUser() {
  let errorSpaceRegister = document.getElementById("errorSpaceRegister")
  let errorDivRegister = document.getElementById("errorDivRegister")
  if (!errorDivRegister) {
    
  } else {
    errorSpaceRegister.removeChild(errorDivRegister);
  }

    const name = document.getElementById('registro-username').value;
    const email = document.getElementById('registro-email').value;
    const password = document.getElementById('registro-password').value;
    const telefone = document.getElementById('registro-telefone').value; 
    const cnpj = document.getElementById("registro-cnpj").value








    if (validateEmail(email) == true) {

      if(validateUsername(name) == true) {

        if (validatePhoneNumber(telefone) == true) {

          if (validateCNPJ(cnpj) == true) {

            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {

              //Pegar a data

              let currentdate = new Date()

              const dia = currentdate.getDate()
              const mesN = currentdate.getMonth()+1
              let mes = ""

              switch (mesN) {
                case 1:
                  mes = "Janeiro"
                  break
                case 2:
                  mes = "Fevereiro"
                  break
                case 3:
                  mes = "Março"
                  break
                case 4:
                  mes = "Abril"
                  break
                case 5:
                  mes = "Maio"
                  break
                case 6:
                  mes = "Junho"
                  break
                case 7:
                  mes = "Julho"
                  break
                case 8:
                  mes = "Agosto"
                  break
                case 9:
                  mes = "Setembro"
                  break
                case 10:
                  mes = "Outubro"
                  break
                case 11:
                  mes = "Novembro"
                  break
                case 12:
                  mes = "Dezembro"
                  break
                default:
                  mes = ""
                  break
              }

              const ano = currentdate.getFullYear()
              
                const user = userCredential.user;
        
                user.updateProfile({
                    username: name 
                }).then(() => {
                    console.log("Novo usuário registrado:", user);
        
                  
                    firebase.firestore().collection('users').doc(user.uid).set({
                        username: name,
                        email: email,
                        telefone: telefone,
                        cnpj: cnpj,
                        dia: dia,
                        mes: mes,
                        ano: ano,
                        pessoa: "juridica",
                    }).then(() => {
                        redirectToHome(); 
                    }).catch((error) => {
                      if (!errorDivRegister) {
    
                      } else {
                        errorSpaceRegister.removeChild(errorDivRegister);
                      }
                        // console.error("Erro ao salvar dados do usuário no Firestore:", error);
                        // // Exiba uma mensagem de erro para o usuário
                        // alert("Erro ao registrar: Erro interno. Por favor, tente novamente."); 
        
                      let errorSpaceRegister = document.getElementById("errorSpaceRegister")
                        // Criar a div para a mensagem "Gerando resposta..."
                      const errorDivRegister = document.createElement('div');
                      errorDivRegister.id = "errorDivRegister"
                      errorDivRegister.innerHTML = `<p>*Erro interno. Por favor tente novamente</p>`;
                      errorSpaceRegister.appendChild(errorDivRegister);
                    });
                }).catch((error) => {
                  if (!errorDivRegister) {
    
                  } else {
                    errorSpaceRegister.removeChild(errorDivRegister);
                  }
                    // console.error("Erro ao atualizar perfil do usuário:", error);
                    // // Exiba uma mensagem de erro para o usuário
                    // alert("Erro ao registrar: Erro interno. Por favor, tente novamente."); 
        
                    let errorSpaceRegister = document.getElementById("errorSpaceRegister")
                    // Criar a div para a mensagem "Gerando resposta..."
                  const errorDivRegister = document.createElement('div');
                  errorDivRegister.id = "errorDivRegister"
                  errorDivRegister.innerHTML = `<p>*Erro interno. Por favor tente novamente</p>`;
                  errorSpaceRegister.appendChild(errorDivRegister);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Erro ao registrar usuário:", error);
                // Exiba uma mensagem de erro para o usuário
                // alert(`Erro ao registrar: ${error.message}`);

                let errorShow = ""

                if (errorMessage === "Firebase: The email address is badly formatted. (auth/invalid-email).") {
                  let errorShow = "Endereço de Email mal formatado."
                  let errorSpaceRegister = document.getElementById("errorSpaceRegister")
                  // Criar a div para a mensagem "Gerando resposta..."
                  const errorDivRegister = document.createElement('div');
                  errorDivRegister.id = "errorDivLogin"
                  errorDivRegister.innerHTML = `<p>*${errorShow}</p>`;
                  errorSpaceRegister.appendChild(errorDivRegister);
                } else if (errorMessage === "Firebase: A non-empty password must be provided (auth/missing-password).") {
                  let errorShow = "Insira a senha."
                  let errorSpaceRegister = document.getElementById("errorSpaceRegister")
                  // Criar a div para a mensagem "Gerando resposta..."
                  const errorDivRegister = document.createElement('div');
                  errorDivRegister.id = "errorDivRegister"
                  errorDivRegister.innerHTML = `<p>*${errorShow}</p>`;
                  errorSpaceRegister.appendChild(errorDivRegister);
                } else if (errorMessage === "Firebase: Error (auth/invalid-login-credentials).") {
                  let errorShow = "Credenciais inválidos."
                  let errorSpaceRegister = document.getElementById("errorSpaceRegister")
                  // Criar a div para a mensagem "Gerando resposta..."
                  const errorDivRegister = document.createElement('div');
                  errorDivRegister.id = "errorDivRegister"
                  errorDivRegister.innerHTML = `<p>*${errorShow}</p>`;
                  errorSpaceRegister.appendChild(errorDivRegister);
                } else if (errorMessage === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                  let errorShow = "Digite uma senha com pelo menos 6 caractéres."
                  let errorSpaceRegister = document.getElementById("errorSpaceRegister")
                  // Criar a div para a mensagem "Gerando resposta..."
                  const errorDivRegister = document.createElement('div');
                  errorDivRegister.id = "errorDivRegister"
                  errorDivRegister.innerHTML = `<p>*${errorShow}</p>`;
                  errorSpaceRegister.appendChild(errorDivRegister);
                }
        
                // let errorSpaceRegister = document.getElementById("errorSpaceRegister")
                //   // Criar a div para a mensagem "Gerando resposta..."
                // const errorDivRegister = document.createElement('div');
                // errorDivRegister.id = "errorDivRegister"
                // errorDivRegister.innerHTML = `<p>*${error.message}</p>`;
                // errorSpaceRegister.appendChild(errorDivRegister);
            });

          } else {

            let errorSpaceRegister = document.getElementById("errorSpaceRegister")
            // Criar a div para a mensagem "Gerando resposta..."
          const errorDivRegister = document.createElement('div');
          errorDivRegister.id = "errorDivRegister"
          errorDivRegister.innerHTML = `<p>*Insira um número de CNPJ válido (XX.XXX.XXX/0000-XX)</p>`;
          errorSpaceRegister.appendChild(errorDivRegister);

          }


        } else {

                // alert(`Erro ao registrar: Coloque um email válido`);
        let errorSpaceRegister = document.getElementById("errorSpaceRegister")
          // Criar a div para a mensagem "Gerando resposta..."
        const errorDivRegister = document.createElement('div');
        errorDivRegister.id = "errorDivRegister"
        errorDivRegister.innerHTML = `<p>*Insira um número de telefone válido (XX) XXXXXXXXX</p>`;
        errorSpaceRegister.appendChild(errorDivRegister);

        }

      } else {

      // alert(`Erro ao registrar: Coloque um email válido`);
      let errorSpaceRegister = document.getElementById("errorSpaceRegister")
            // Criar a div para a mensagem "Gerando resposta..."
          const errorDivRegister = document.createElement('div');
          errorDivRegister.id = "errorDivRegister"
          errorDivRegister.innerHTML = `<p>*Insira um Nome Válido com 4 letras ou mais</p>`;
          errorSpaceRegister.appendChild(errorDivRegister);

      }
    } else {
      // alert(`Erro ao registrar: Coloque um email válido`);
      let errorSpaceRegister = document.getElementById("errorSpaceRegister")
            // Criar a div para a mensagem "Gerando resposta..."
          const errorDivRegister = document.createElement('div');
          errorDivRegister.id = "errorDivRegister"
          errorDivRegister.innerHTML = `<p>*Insira um Email Válido</p>`;
          errorSpaceRegister.appendChild(errorDivRegister);
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


function teste() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // IdP data available in result.additionalUserInfo.profile.
      // ...
      redirectToHome()
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

}

function hidePasswordLogin() {
  var input = document.getElementById("login-password");
  var btn = document.getElementById("passwordShowLogin");
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }

  if (btn.className === "bi bi-eye") {
    btn.className = "bi bi-eye-slash";
  } else {
    btn.className = "bi bi-eye";
  }
}

function hidePasswordRegister() {
  var input = document.getElementById("registro-password");
  var btn = document.getElementById("passwordShowRegister");
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }

  if (btn.className === "bi bi-eye") {
    btn.className = "bi bi-eye-slash";
  } else {
    btn.className = "bi bi-eye";
  }
}

function oi() {
  let currentdate = new Date()

  const dia = currentdate.getDate()
  const mesN = currentdate.getMonth()+1
  let mes = ""

  switch (mesN) {
    case 1:
      mes = "Janeiro"
      break
    case 2:
      mes = "Fevereiro"
      break
    case 3:
      mes = "Março"
      break
    case 4:
      mes = "Abril"
      break
    case 5:
      mes = "Maio"
      break
    case 6:
      mes = "Junho"
      break
    case 7:
      mes = "Julho"
      break
    case 8:
      mes = "Agosto"
      break
    case 9:
      mes = "Setembro"
      break
    case 10:
      mes = "Outubro"
      break
    case 11:
      mes = "Novembro"
      break
    case 12:
      mes = "Dezembro"
      break
    default:
      mes = ""
      break
  }

  const ano = currentdate.getFullYear()
}


function redirectToHome() {
    
  // window.location.href = '../perfil/index.html'; 
  window.location.href = '../perfil/indextJuridica.html'; 
};

