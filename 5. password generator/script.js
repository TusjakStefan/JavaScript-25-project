function generatePassword() {
    var length = document.getElementById("length").value;
    var includeUppercase = document.getElementById("uppercase").checked;
    var includeNumbers = document.getElementById("numbers").checked;
    var includeSpecial = document.getElementById("special").checked;

    var charset = "abcdefghijklmnopqrstuvwxyz";
    var uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numberCharset = "0123456789";
    var specialCharset = "!@#$%^&*()_-+=<>?";

    if (includeUppercase) {
        charset += uppercaseCharset;
    }
    if (includeNumbers) {
        charset += numberCharset;
    }
    if (includeSpecial) {
        charset += specialCharset;
    }

    var password = "";
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }

    document.getElementById("password").value = password;
}
