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
      var newName = $("#newName").val();
      var newUser = $("#newUser").val();
      var newDescription = $("#newDescription").val();
      var newEmail = $("#newEmail").val();

      var newUser2 = $("#newUser2").val();
      var newPronouns = $("#newPronouns").val();
      var newEtnia = $("#newEtnia").val();
      var newGraduatedCourses = $("#newGraduatedCourses").val();
      var newSkills = $("#newSkills").val();
      var newInterests = $("#newInterests").val();
      var newJobTitle = $("#newJobTitle").val();
      var newCompany = $("#newCompany").val();
      var newJobPeriod = $("#newJobPeriod").val();
      var newJobDescription = $("#newJobDescription").val();
      var newLinkedinUrl = $("#newLinkedinUrl").val();
      var newGithubUrl = $("#newGithubUrl").val();
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
                emailContato: newEmail,
                description: newDescription,

                pronouns: newPronouns,
                etnia: newEtnia,
                graduatedCourses: newGraduatedCourses,
                skills: newSkills,
                interests: newInterests,
                workJob: newJobTitle,
                workCompany: newCompany,
                workPeriod: newJobPeriod,
                workDescription: newJobDescription,
                linkedinUrl: newLinkedinUrl,
                githubUrl: newGithubUrl,
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
      });

      $("#saveProfileBtn2").click(function() {
        var email = $("#newEmail").val();
        var newName = $("#newName").val();
        var newUser = $("#newUser").val();
        var newDescription = $("#newDescription").val();
        var newEmail = $("#newEmail").val();
  
        var newUser2 = $("#newUser2").val();
        var newPronouns = $("#newPronouns").val();
        var newEtnia = $("#newEtnia").val();
        var newGraduatedCourses = $("#newGraduatedCourses").val();
        var newSkills = $("#newSkills").val();
        var newInterests = $("#newInterests").val();
        var newJobTitle = $("#newJobTitle").val();
        var newCompany = $("#newCompany").val();
        var newJobPeriod = $("#newJobPeriod").val();
        var newJobDescription = $("#newJobDescription").val();
        var newLinkedinUrl = $("#newLinkedinUrl").val();
        var newGithubUrl = $("#newGithubUrl").val();

        var newGraduationLevel = $("#newGraduationLevel").val();
        // var newDescription = $("#newDescription").val();
        // // var newCity = $("#newCity").val();
        // var newEmail = $("#newEmail").val();
    
        // Atualizar os elementos HTML
        $("#profileName").text(newName);
        $("#profileUser").text(`@${newUser}`);
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
                  emailContato: newEmail,
                  description: newDescription,
  
                  pronouns: newPronouns,
                  etnia: newEtnia,
                  graduatedCourses: newGraduatedCourses,
                  skills: newSkills,
                  interests: newInterests,
                  workJob: newJobTitle,
                  workCompany: newCompany,
                  workPeriod: newJobPeriod,
                  workDescription: newJobDescription,
                  linkedinUrl: newLinkedinUrl,
                  githubUrl: newGithubUrl,

                  graduation: newGraduationLevel,
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

  const changeButton = document.getElementById('ver-mais');
  const imageFile = document.getElementById('inputImage');
  const image = document.getElementById('profilePic');

  //Imagem

  // changeButton.addEventListener('click', () => {
  //   imageFile.click();
  // });
  
  document.getElementById('imageSelector').addEventListener('click', function() {
    document.getElementById('inputImage').click(); 
});
  imageFile.addEventListener('change', () => {
    const file = imageFile.files[0];
    const reader = new FileReader();
    const fileName = file.name

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userId = user.uid
        const storageChild = firebase.storage().ref("user_photos/"+userId);
        // if (storageChild) {
        //   console.log("True")
        // } else {
        //   console.log("False")
        // }


        reader.onload = (event) => {
          image.style.backgroundImage = "url(" + event.target.result + ")";
        };
      
        reader.readAsDataURL(file);
    
        console.log(file.name)
        
    
        storageChild.list()
        .then(result => {
          if (result.prefixes.length === 0 && result.items.length === 0) {
            console.log("A pasta está vazia!");
                
            var storageRef = firebase.storage().ref("user_photos/"+userId+"/"+fileName);
        
        
            storageRef.put(file).then((snapshot) => {
              console.log('Uploaded a blob or file!');
            });

            var imagemPerfil = document.getElementById("profilePic")

            imagemPerfil.style.display = "inline"

          } else {
            console.log("A pasta contém arquivos!");

            // Verifica se há arquivos na pasta
            if (result.items.length > 0) {
              // Exclui o primeiro arquivo encontrado
            const itemRef = result.items[0];
            itemRef.delete()
            .then(() => {
              console.log(`Arquivo ${itemRef.name} deletado com sucesso!`);

            // Após excluir o arquivo, faça o upload do novo
            var storageRef = firebase.storage().ref("user_photos/" + userId + "/" + fileName);
              storageRef.put(file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
              })

              var imagemPerfil = document.getElementById("profilePic")

              imagemPerfil.style.display = "inline" 
            
            })
            .catch(error => {
              console.error(`Erro ao deletar o arquivo ${itemRef.name}:`, error);
            });



            }
          }
        })


      } else {
        console.log("No User")
      }

      })
  


  });

  // trocar entre adicionar e normais, nav

  const configuracoesTab = document.getElementById('configuracoes-tab');
  const configuracoesAdicionaisTab = document.getElementById('configuracoes-adicionais-tab');
  const configuracoesContent = document.getElementById('configuracoes-content');
  const configuracoesAdicionaisContent = document.getElementById('configuracoes-adicionais-content');
  
  configuracoesTab.addEventListener('click', () => {
    configuracoesContent.style.display = 'block';
    configuracoesAdicionaisContent.style.display = 'none';
    configuracoesTab.classList.add('active');
    configuracoesAdicionaisTab.classList.remove('active');
  });
  
  configuracoesAdicionaisTab.addEventListener('click', () => {
    configuracoesContent.style.display = 'none';
    configuracoesAdicionaisContent.style.display = 'block';
    configuracoesTab.classList.remove('active');
    configuracoesAdicionaisTab.classList.add('active');
  });




  configuracoesContent.style.display = 'block';
  configuracoesAdicionaisContent.style.display = 'none';


  const userBanner = document.getElementById('userBanner');
const uploadInput = document.getElementById('uploadBanner');

userBanner.addEventListener('click', () => {
  uploadInput.click();
});

uploadInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  const fileName = file.name

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const userId = user.uid
      const storageChild = firebase.storage().ref("user_banner/"+userId);
      // if (storageChild) {
      //   console.log("True")
      // } else {
      //   console.log("False")
      // }


      reader.onload = (e) => {
        userBanner.style.backgroundImage = `url(${e.target.result})`;
      }
    
      reader.readAsDataURL(file);
  
      console.log(file.name)
      
  
      storageChild.list()
      .then(result => {
        if (result.prefixes.length === 0 && result.items.length === 0) {
          console.log("A pasta está vazia!");
              
          var storageRef = firebase.storage().ref("user_banner/"+userId+"/"+fileName);
      
      
          storageRef.put(file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
          });

          var userBanner = document.getElementById("userBanner")

          userBanner.style.display = "inline"

        } else {
          console.log("A pasta contém arquivos!");

          // Verifica se há arquivos na pasta
          if (result.items.length > 0) {
            // Exclui o primeiro arquivo encontrado
          const itemRef = result.items[0];
          itemRef.delete()
          .then(() => {
            console.log(`Arquivo ${itemRef.name} deletado com sucesso!`);

          // Após excluir o arquivo, faça o upload do novo
          var storageRef = firebase.storage().ref("user_banner/" + userId + "/" + fileName);
            storageRef.put(file).then((snapshot) => {
              console.log('Uploaded a blob or file!');
            })

            var userBanner = document.getElementById("userBanner")

            userBanner.style.display = "inline" 
          
          })
          .catch(error => {
            console.error(`Erro ao deletar o arquivo ${itemRef.name}:`, error);
          });



          }
        }
      })


    } else {
      console.log("No User")
    }

    })



  // reader.onload = (e) => {
  //   userBanner.style.backgroundImage = `url(${e.target.result})`;
  // }
  
  // if (file) {
  //   reader.readAsDataURL(file);
  // }
});

// imageFile.addEventListener('change', () => {
//   const file = imageFile.files[0];
//   const reader = new FileReader();
//   const fileName = file.name

//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       const userId = user.uid
//       const storageChild = firebase.storage().ref("user_photos/"+userId);
//       // if (storageChild) {
//       //   console.log("True")
//       // } else {
//       //   console.log("False")
//       // }


//       reader.onload = (event) => {
//         image.style.backgroundImage = "url(" + event.target.result + ")";
//       };
    
//       reader.readAsDataURL(file);
  
//       console.log(file.name)
      
  
//       storageChild.list()
//       .then(result => {
//         if (result.prefixes.length === 0 && result.items.length === 0) {
//           console.log("A pasta está vazia!");
              
//           var storageRef = firebase.storage().ref("user_photos/"+userId+"/"+fileName);
      
      
//           storageRef.put(file).then((snapshot) => {
//             console.log('Uploaded a blob or file!');
//           });

//           var imagemPerfil = document.getElementById("profilePic")

//           imagemPerfil.style.display = "inline"

//         } else {
//           console.log("A pasta contém arquivos!");

//           // Verifica se há arquivos na pasta
//           if (result.items.length > 0) {
//             // Exclui o primeiro arquivo encontrado
//           const itemRef = result.items[0];
//           itemRef.delete()
//           .then(() => {
//             console.log(`Arquivo ${itemRef.name} deletado com sucesso!`);

//           // Após excluir o arquivo, faça o upload do novo
//           var storageRef = firebase.storage().ref("user_photos/" + userId + "/" + fileName);
//             storageRef.put(file).then((snapshot) => {
//               console.log('Uploaded a blob or file!');
//             })

//             var imagemPerfil = document.getElementById("profilePic")

//             imagemPerfil.style.display = "inline" 
          
//           })
//           .catch(error => {
//             console.error(`Erro ao deletar o arquivo ${itemRef.name}:`, error);
//           });



//           }
//         }
//       })


//     } else {
//       console.log("No User")
//     }

//     })



// });

