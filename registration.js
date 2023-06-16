function isValidPassword(password){
    pattern = /([A-Z].*[a-z]|[a-z].*[A-Z])/gm
    return pattern.test(password);
}

function isValidEmail(email){
    pattern = /([a-zA-Z]).*\@([a-zA-Z]).*/gm
    return pattern.test(email);
}

function checkCredentials(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var passwordConfirmation = document.getElementById("password_confirmation").value;

    if (!isValidEmail(email)){
        document.getElementById("error").innerHTML = "Invalid email";
    }// if
    else if (password === "" || passwordConfirmation === "") {
        document.getElementById("error").innerHTML = "Must enter password.";
    }// else if
    else if (password !== passwordConfirmation){
        document.getElementById("error").innerHTML = "Passwords do not match.";
    }// else if
    else if (!isValidPassword(password)){
        document.getElementById("error").innerHTML = "Password must contain upper and lower case characters.";
    }// else if 
    else {
        document.getElementById("error").innerHTML = "Registration success";
    }// else
}
