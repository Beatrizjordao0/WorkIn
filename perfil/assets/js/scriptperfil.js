// lembrar pra matheus pra colocar:
        // - Upload de imagens
        // - Edição do nome do usuário
        // - Outras funcionalidades interativas do perfil

        
// const firebaseConfig = {
//   apiKey: "AIzaSyA3gOHi9Q6aHQ5seN5S9bbNmQpPQFMGXFs",
//   authDomain: "magnus-c4b38.firebaseapp.com",
//   projectId: "magnus-c4b38",
//   storageBucket: "magnus-c4b38.appspot.com",
//   messagingSenderId: "458576341456",
//   appId: "1:458576341456:web:6117f4a9160b8667b8f1d5"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   const db = firebase.firestore();




//Validação de Email
function validateEmail(email) {
  const re = /^[^@]+@\w+(\.\w+)+\w$/;

  if (re.test(email) == true) {
    return true
  } else {
    return false
  }
}


$(document).ready(function() {
  // Código para editar o perfil
  $("#saveProfileBtn").click(function() {
    var email = $("#newEmail").val();
    if (validateEmail(email) == true) {
    var newName = $("#newName").val();
    var newUser = $("#newUser").val();
    var newDescription = $("#newDescription").val();
    var newEmail = $("#newEmail").val();
    // var newDescription = $("#newDescription").val();
    // // var newCity = $("#newCity").val();
    // var newEmail = $("#newEmail").val();

    // Atualizar os elementos HTML
    $("#profileName").text(newName);
    $("#profileUser").text(newUser);
    // $("#profileDescription").text(newDescription);
    // // $("#profileCity").text(newCity);
    // $("#profileEmail").text(newEmail);


    const db = firebase.firestore();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          var usuariosLista = db.collection('users').doc(user.uid);

          usuariosLista.get().then((doc) => {
          if (doc.exists) {
            var setWithMerge = usuariosLista.set({
              username: newName,
              user: newUser,
              email: newEmail,
              description: newDescription,
              // description: newDescription,
              // city: newCity,
              // email: newEmail
          }, { merge: true });
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
      // Usuário está logado!
      console.log("Usuário logado:", user.uid);
      // Faça o que você precisa, por exemplo:
      // - Redirecione para a página home
      // - Exiba o nome do usuário
      // - Habilite conteúdo restrito
      } else {
      // Usuário não está logado
      console.log("Usuário não está logado.");
      // Faça o que você precisa, por exemplo:
      // - Redirecione para a página de login
      // - Desabilite conteúdo restrito
      }
  });

    setTimeout(function() {
      $('#editProfileModal').modal('hide'); 
    }, 100); // Atraso de 100 milissegundos
    } else {
      // let errorSpaceRegister = document.getElementById("emailMessage")
      //       // Criar a div para a mensagem "Gerando resposta..."
      //     const errorDivRegister = document.createElement('div');
      //     errorDivRegister.id = "errorDivRegister"
      //     errorDivRegister.innerHTML = `<p>*Insira um Email Válido</p>`;
      //     errorSpaceRegister.appendChild(errorDivRegister);
    }
    });

  // Código para editar o banner
  $("#saveBannerBtn").click(function() {
    var fileInput = document.getElementById('profileBannerUpload');
    if (fileInput.files && fileInput.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $('.profile-banner').attr('src', e.target.result);
      };
      reader.readAsDataURL(fileInput.files[0]);
    }

    setTimeout(function() {
      $('#profileBannerModal').modal('hide'); 
    }, 100); // Atraso de 100 milissegundos
  });

  // Código para editar a foto de perfil
  $("#saveProfilePicBtn").click(function() {
    var fileInput = document.getElementById('profilePicUpload');
    if (fileInput.files && fileInput.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $('.profile-pic').attr('src', e.target.result);
      };
      reader.readAsDataURL(fileInput.files[0]);
    }

    // Fechar o modal de edição da foto de perfil com um pequeno atraso
  setTimeout(function() {
    $('#profilePicModal').modal('hide'); 
  }, 100); // Atraso de 100 milissegundos
  });
});