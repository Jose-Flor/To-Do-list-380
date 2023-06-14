function isValidPassword(password){
    pattern = /([A-Z].*[a-z]|[a-z].*[A-Z])/gm
    return pattern.test(password);
}

function checkPassword(){
    var password = document.getElementById("password").value;
    var passwordConfirmation = document.getElementById("password_confirmation").value;

    if (password === "" || passwordConfirmation === "") {
        document.getElementById("error").innerHTML = "Must enter password.";
    }// if
    else if (password !== passwordConfirmation){
        document.getElementById("error").innerHTML = "Passwords do not match.";
    }// else if
    else if (!isValidPassword(password)){
        document.getElementById("error").innerHTML = "Password must contain upper and lower case characters.";
    }// else if 
    else {
        document.getElementById("error").innerHTML = "Congrats, you're not a loser.";
    }// else
}
