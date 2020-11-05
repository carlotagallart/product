//ADRESS//

//VAR ADRESS//
var form2 = document.getElementById("form2");
var firstName = document.getElementById("fname");
var lastName = document.getElementById("lname");
var birthday = document.getElementById("birthday");
var adress1 = document.getElementById("adress1");
var adress2 = document.getElementById("adress2");
var pCode = document.getElementById("pcode");
var country = document.getElementById("country");
var countryPhone = document.getElementById("country-phone");
var phone = document.getElementById("phone");

//ERROR STYLES//

errorFname.style.color = "red";
errorFname.style.fontSize ="11px";
errorLname.style.color = "red";
errorLname.style.fontSize ="11px";
errorBirthday.style.fontSize ="11px";
errorBirthday.style.color = "red";
errorBirthday.style.fontSize ="11px";
errorAdress1.style.color = "red";
errorAdress1.style.fontSize ="11px";
errorAdress2.style.color = "red";
errorAdress2.style.fontSize ="11px";
errorPcode.style.color = "red";
errorPcode.style.fontSize ="11px";
errorCountry.style.color = "red";
errorCountry.style.fontSize ="11px";
errorPcountry.style.color = "red";
errorPcountry.style.fontSize ="11px";

//EXPRESSIONS//

//VALIDATE PROFILE//
form2.addEventListener("submit", function(e){
    e.preventDefault();
    var mensajerequired = [];
    var mensajeFname = [];
    var mensajeLname = [];
    var mensajeBirthday = [];
    var mensajeAdress1 = [];
    var mensajeAdress2 = [];
    var mensajePcode = [];
    var mensajeCountry = [];
    var mensajePcountry = [];


    if(firstName.value===""|| lastName.value===""|| birthday.value===""|| adress1.value==="" || adress2.value==="" || pCode.value==="" || country.value==="" || phone.value===""){
        mensajerequired.push("Required field");
    }
    errorFname.innerHTML = mensajerequired.join("");
    errorLname.innerHTML = mensajerequired.join("");
    errorBirthday.innerHTML = mensajerequired.join("");
    errorAdress1.innerHTML = mensajerequired.join("");
    errorAdress2.innerHTML = mensajerequired.join("");
    errorPcode.innerHTML = mensajerequired.join("");
    errorCountry.innerHTML = mensajerequired.join("");
    errorPcountry.innerHTML = mensajerequired.join("");

 //FIRST NAME VALIDATE REQUIRED MAX 20 //


    if(firstName.value === null || firstName.value ===""){
        mensajeFname.push("First name is required");
    } else if (firstName.value.length > 20 ){
        mensajeFname.push("First name must be max. 20 characters");
    }

    errorFname.innerHTML = mensajeFname.join("");


    console.log("enviando");

});