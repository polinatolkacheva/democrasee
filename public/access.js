$(document).ready(function () {
   $('#loginForm').on('submit', function (e) {
        e.preventDefault();

       var email = $('#loginEmail').val();
       var password = $('#loginPassword').val();

      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
          var user = userCredential.user;
          var data = { uid: user.uid };
          userCredential.user.getIdToken().then((idToken) => {
            window.location = '../events?token='+idToken+'&user='+email;
            return false;
        });
                  
       })
      .catch((error) => {
       // console.log(JSON.stringify(error));
        $("#userinfo").html("<div class='fail'>Invalid Username or Password</div>");        
      });

  });

});


