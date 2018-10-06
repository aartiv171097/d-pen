var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

$('#signup_form').submit(function(e){
	e.preventDefault();
	var name=$('#name').val();
	var email=$('#email').val();
	var password1=$('#pass').val();
	var password2=$('#pass2').val();


	//validation
    if(name=='')
    {
      $('#msgs').html('<div class="alert alert-danger" role="alert">Name is required!</div>');
      return;
    }
    if(email=='')
    {
    	$('#msgs').html('<div class="alert alert-danger" role="alert">email is required!</div>');
    	return;
    }
    if(!reg.test($('#email').val()))
    {
      console.log("hello");
    	$('#msgs').html('<div class="alert alert-danger" role="alert">Email is not valid!</div>');
    	return;
    }
     if(password1=='')
    {
    	$('#msgs').html('<div class="alert alert-danger" role="alert">password is required!</div>');
    	return;
    }
     if(password1.length < 6)
  {
    $('#msgs').html('<div class="alert alert-danger" role="alert">Password length should be minimum 6 characters!</div>');
    return;
  }
  if(password2=""||password2!=password1)
  {
  	 $('#msgs').html('<div class="alert alert-danger" role="alert">Passwords do not match</div>');
    return;
  }
  else{
  	$('#msgs').html('');
  }
    $.ajax({
    type: "POST",
    url: "/register",
    data: {name: name, email: email, password: password1},
    success: function(data)
    {
      if(data == 'email_found') {
        $('#msgs').html('<div class="alert alert-danger" role="alert">Email already exist!</div>');
      }
      else if(data == 'success') {
        $('#msgs').html('<div class="alert alert-success" role="alert">Account created you can login now!</div>');
      }
      else
      {
        $('#msgs').html('<div class="alert alert-danger" role="alert">Some error occured!</div>');
      }
    },
    error: function(data)
    {
      $('#msgs').html("<div class='alert alert-danger' role='alert'>Couldn't connect to server!</div>");
    }
  });
});

$('#login_form').submit(function(e){
  e.preventDefault();
  var email=$('#email').val();
  var password=$('#pass').val();
    //validation
    if(email=='')
    {
      $('#msgs').html('<div class="alert alert-danger" role="alert">email is required!</div>');
      return;
    }
    if(!reg.test($('#email').val()))
    {
      console.log("hello");
      $('#msgs').html('<div class="alert alert-danger" role="alert">Email is not valid!</div>');
      return;
    }
     if(password=='')
    {
      $('#msgs').html('<div class="alert alert-danger" role="alert">password is required!</div>');
      return;
    }
  else{
    $('#msgs').html('');
  }
    $.ajax({
    type: "POST",
    url: "/login",
    data: {email: email, password: password},
    success: function(data)
    {
      if(data == 'wrong') {
        $('#msgs').html('<div class="alert alert-danger" role="alert">Wrong email or password!</div>');
      }
      else if(data == 'success') {
        window.location="/";
      }
    },
    error: function(data)
    {
      $('#msgs').html("<div class='alert alert-danger' role='alert'>Couldn't connect to server!</div>");
    }
  });
});
