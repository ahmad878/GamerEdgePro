
var firebaseConfig = {
    apiKey: "AIzaSyCISHVbwJDJ3tsdGjNGqwT4vAwE29GQKeA",
    authDomain: "gamer-edge-pro.firebaseapp.com",
    projectId: "gamer-edge-pro",
    storageBucket: "gamer-edge-pro.appspot.com",
    messagingSenderId: "1088900968945",
    appId: "1:1088900968945:web:4ac128b06ff3f46952d450"
  };
  
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const database = firebase.database()
  
  
  function register () {

    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value

  
  
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Erorr, there was a mistake(s) with the email or password.')
      return
      
    }

    
   
   
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      
      var user = auth.currentUser
  
    
      var database_ref = database.ref()
  
      var user_data = {
        email : email,
        full_name : full_name,
        last_login : Date.now()
      }
  
      database_ref.child('users/' + user.uid).set(user_data)
      
      alert('Registering worked')
      window.location.href = "index.html";

      
      
    })
    .catch(function(error) {
   
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  

  function login () {
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  

    if (validate_email(email) == false || validate_password(password) == false) {
      alert('please type in a valid email or password')
      return
      
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
   
      var user = auth.currentUser
  
      var database_ref = database.ref()
  
      
      var user_data = {
        last_login : Date.now()
      }
  
      
      database_ref.child('users/' + user.uid).update(user_data)
  
      alert('User has been logged in.')
      window.location.href = "index.html";
  
    })
    .catch(function(error) {
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      
      return true
    } else {
     
      return false
    }
  }
  
  function validate_password(password) {
    
    if (password < 8) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }