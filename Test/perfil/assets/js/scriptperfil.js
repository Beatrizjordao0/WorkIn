// lembrar pra matheus pra colocar:
        // - Upload de imagens
        // - Edição do nome do usuário
        // - Outras funcionalidades interativas do perfil


$(document).ready(function() {
  // Código para editar o perfil
  $("#saveProfileBtn").click(function() {
    var newName = $("#newName").val();
    var newDescription = $("#newDescription").val();
    var newCity = $("#newCity").val();
    var newEmail = $("#newEmail").val();

    // Atualizar os elementos HTML
    $("#profileName").text(newName);
    $("#profileDescription").text(newDescription);
    $("#profileCity").text(newCity);
    $("#profileEmail").text(newEmail);

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