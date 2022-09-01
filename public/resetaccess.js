$(document).ready(function () {

   $('#resetForm').on('submit', function (e) {
        e.preventDefault();

       var email = $('#loginEmail').val();

       firebase.auth().sendPasswordResetEmail(email).then(function() {
        $("#userinfo").html("<div class='success'>Reset Password Email Sent</div>"); 
          // Email sent.
        }).catch(function(error) {
          // An error happened.
        $("#userinfo").html("<div class='fail'>Error Sending Reset Email</div>"); 
        });

  });

});


