// GLOBAL VARIABLES
let globalColor = "red";
let globalStorage = "64";
let globalStartTime;
let intervalWarning;
const globalPrices = { 64: "799", 128: "849", 256: "899" };
const globalColors = {
  red: "#be0b2b",
  mauve: "#d3cddb",
  green: "#aae1cc",
  yellow: "#ffe581",
  white: "#f9f6ef",
  black: "#202020"
}

const productSection = document.querySelector("#product");
const headerSection = document.querySelector("#header");
const profileSection = document.querySelector("#profile_container");
const adressSection = document.querySelector("#adress_container");
const shippingSection = document.querySelector("#shipping");
const footerSection = document.querySelector("#footer");
const finishSection = document.querySelector("#finish");
const thankyouSection = document.querySelector("#thankyou");

// START PRODUCT PAGE
const globalImages = {
  baseUrl: "https://images-na.ssl-images-amazon.com/images/I/",
  red: [
    "715HCLsOHbL._AC_SX679_.jpg",
    "81ODUtsIvGL._AC_SX679_.jpg",
    "71nuvX0UC2L._AC_SX679_.jpg",
    "81TVpK3RqJL._AC_SX679_.jpg",
    "71zl-f5Bw0L._AC_SX679_.jpg"
  ],
  mauve: [
    "71xn9bCRfhL._AC_SX679_.jpg",
    "71NUyj6UKZL._AC_SX679_.jpg",
    "71rdCP%2B35FL._AC_SX679_.jpg",
    "71ImjWD8YOL._AC_SX679_.jpg",
    "71xl5ut20eL._AC_SX679_.jpg"
  ],
  green: [
    "71Dh%2BNR7ivL._AC_SX679_.jpg",
    "71QavU1qoML._AC_SX679_.jpg",
    "71lUig-fuwL._AC_SX679_.jpg",
    "71pvSTiJv2L._AC_SX679_.jpg",
    "71M2RYC4PNL._AC_SX679_.jpg"
  ],
  yellow: [
    "71Z8C1zRgAL._AC_SX679_.jpg",
    "715mr2e667L._AC_SX679_.jpg",
    "71eDZ1oipzL._AC_SX679_.jpg",
    "81iNcAdEfDL._AC_SX679_.jpg",
    "71zQ3m%2BigPL._AC_SX679_.jpg"
  ],
  white: [
    "71kZfQA-Y7L._AC_SX679_.jpg",
    "719o5O7KNKL._AC_SX679_.jpg",
    "71PPFlDKQQL._AC_SX679_.jpg",
    "71%2BlqnNuA9L._AC_SX679_.jpg",
    "71N%2BbxT7c-L._AC_SX679_.jpg"
  ],
  black: [
    "71iO2R%2BCLjL._AC_SX679_.jpg",
    "719BufuTjsL._AC_SX679_.jpg",
    "71sjVOK0L1L._AC_SX679_.jpg",
    "81TsRv9t70L._AC_SX679_.jpg",
    "71Rv6QepJJL._AC_SX679_.jpg"
  ]
};

let globalAltImage = "0";

const productAltImages = document.querySelector(".product-alt-images");
productAltImages.addEventListener("mouseover", e => {
  const id = e.target.id.split("-");
  if (id[0] === "altimg") {
    e.target.classList.add("selected");
    changeProductImage(id[1]);
  }
});

productAltImages.addEventListener("mouseout", e => {
  const id = e.target.id.split("-");
  if (id[0] === "altimg") {
    e.target.classList.remove("selected");
  }
});

const productColors = document.querySelector(".product-colors");
productColors.addEventListener("click", e => {
  const id = e.target.id.split("-");
  if (id[0] === "color") changeColor(id[1]);
});

productColors.addEventListener("mouseover", e => {
  const id = e.target.id.split("-");
  if (id[0] === "color")  {
    e.target.classList.add("selected");
  }
});

productColors.addEventListener("mouseout", e => {
  const id = e.target.id.split("-");
  if (id[0] === "color")  {
    e.target.classList.remove("selected");
  }
});


const productImage = document.querySelector("#product-image");

function changeProductImage(index) {
  if (index === globalAltImage) return;
  globalAltImage = index;
  productImage.src = globalImages.baseUrl + globalImages[globalColor][index];
}

function changeColor(color) {
  if (color === globalAltImage) return;
  globalColor = color;
  const images = productAltImages.children;
  for (let i = 0; i < images.length; i++) {
    images[i].src = globalImages.baseUrl + globalImages[color][i];
  }
  productImage.src = globalImages.baseUrl + globalImages[color][globalAltImage];
}

const storageSelect = document.querySelector("#storage");
const productPrice = document.querySelector("#product-price");

storageSelect.addEventListener("change", e => {
  const storage = e.target.value;
  changeStorage(storage);
});

function changeStorage(storage) {
  if (storage === globalStorage) return;
  globalStorage = storage;
  productPrice.textContent = globalPrices[storage] + "€";
}

const productBuy = document.querySelector("#product-buy");
productBuy.addEventListener("click", () => {
  console.log("Product Buy Clicked");

  //Updates product details on FINISH and THANKYOU pages
  for (let i = 0; i < 2; i++) {
    finishSquareColor[i].style.backgroundColor = globalColors[globalColor]
    finishProductImage[i].src = globalImages.baseUrl + globalImages[globalColor][0];
    finishStorage[i].textContent = globalStorage;
    finishPrice[i].textContent = globalPrices[globalStorage];
  }

  productSection.classList.toggle("hidden");
  headerSection.classList.toggle("hidden");
  profileSection.classList.toggle("hidden");
  footerSection.classList.toggle("hidden");
  document.querySelector("#time-warning").classList.toggle("hidden");
  
  globalStartTime = new Date()
  
  intervalWarning = setInterval(timeWarning, 5000);

});
// FINISH PRODUCT PAGE

// Show message for time warning 
function timeWarning(){
  let elapsedTime = new Date(new Date() - globalStartTime);
  
  //Calling function if buying time exceeds five minutes
  if(elapsedTime.getMinutes() >= 5) {
    console.log("time passed 5 minutes");
    timeExceeded();
  }
  
  console.log("timeWarning works");
  document.querySelector("#time-warning").classList.replace("timeMessageOut", "timeMessageIn");
  document.querySelector(".elapsedTime").innerHTML = elapsedTime.getMinutes();
  let messaegOut = setTimeout(timeWarningOut, 1000);
}

function timeWarningOut(){
  document.querySelector("#time-warning").classList.replace("timeMessageIn", "timeMessageOut");
}

//After 5 minutes show expired time message and reload page to the beginning
function timeExceeded() {
  console.log("entered timeExceed function");
  setTimeout(function(){
      location.reload(true);
      alert("5 minutes has passed! Redirecting to product page");
    }, 5000);
}

///FORM PROFILE AND ADRESS///

 // VARIABLES//
    //var form = document.getElementById("form");
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var Cpassword = document.getElementById("cpassword");
    var errorUsername = document.getElementById("errorUsername");
    var errorEmail = document.getElementById("errorEmail");
    var errorPassword = document.getElementById("errorPassword");
    var errorCpassword = document.getElementById("errorCpassword");
    var checkUsername = false;
    var checkEmail = false;
    var checkPassword = false;
    var checkConPassword = false;    
    
    //ERROR STYLES//
    
    errorUsername.style.color = "red";
    errorUsername.style.fontSize ="11px";
    errorEmail.style.color = "red";
    errorEmail.style.fontSize ="11px";
    errorPassword.style.color = "red";
    errorPassword.style.fontSize ="11px";
    errorCpassword.style.color = "red";
    errorCpassword.style.fontSize ="11px";
    
    //EXPRESSIONS//
    var expressionUsernameSpace1 = /^\S/;
    var expressionUsernameSpace2 = /^[a-zA-Z0-9_]*$/;
    var expresionEmail = /\w+@\w+\.+[a-z]/;
    var expresionPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;


//VALIDATE PROFILE//
  function sendProfileForm(){
    event.preventDefault();
    
    var mensajeUsername = [];
    var mensajeEmail = [];
    var mensajePassword = [];
    var mensajeCpassword = [];

 //USERNAME VALIDATE REQUIRED AND 5-20 CHARACTERS WITHOUT BLANK SPACE//

    if(username.value === null || username.value ===""){
        mensajeUsername.push("Username is required");
    } else if (username.value.length < 5 || username.value.length > 20 ){
        mensajeUsername.push("Username must be 5-20 characters");
    }else if(!expressionUsernameSpace1.test(username.value)){
        mensajeUsername.push("Blank space is not allowed");
    }else if(!expressionUsernameSpace2.test(username.value)){
        mensajeUsername.push("Blank space is not allowed");
    }else{
      checkUsername = true;
    }

    errorUsername.innerHTML = mensajeUsername.join("");

    //EMAIL VALIDATE REQUIERED -  MAX LENGTH 50 //

    if(email.value === null || email.value ===""){
        mensajeEmail.push("Email is required");
    } else if (email.value.length >= 50 ){
        mensajeEmail.push("Email must be max. 50 characters");
    }else if(!expresionEmail.test(email.value)){
        mensajeEmail.push("Invalid email");
    }else {
      checkEmail = true;
    }
    errorEmail.innerHTML = mensajeEmail.join("");

    //PASSWORD REQUIRED - 1NUM - 1UPPERCASE - 1LOWERCASE - ONE SPECIAL CHARACTER//

    if(password.value === null || password.value ===""){
        mensajePassword.push("Password is required");
    }else if (password.value.length > 20 || password.value.length <= 7){
        mensajePassword.push("Password must be 8-20 characters");
    }else if(!expresionPassword.test(password.value)){
        mensajePassword.push("Password must contain at least one numeric <br> digit, one uppercase and one lowercase letter");
    } else{
      checkPassword = true;
    }
    errorPassword.innerHTML = mensajePassword.join("");

    //CONFIRM PASSWORD//
    if(Cpassword.value === null || Cpassword.value === ""){
        mensajeCpassword.push("Confirm password is required");
    }else if(Cpassword.value != password.value){
        mensajeCpassword.push("Password not matched");
    } else{
      checkConPassword = true;
    }
    errorCpassword.innerHTML = mensajeCpassword.join("");
    
    if(checkUsername == true && checkPassword == true && checkEmail == true && checkConPassword == true){
      document.querySelector("#hiddenSubmit1").click();
    }
  
};

//ADRESS//

//VAR ADRESS//
var firstName = document.getElementById("fname");
var lastName = document.getElementById("lname");
var birthday = document.getElementById("birthday");
var adress1 = document.getElementById("adress1");
var adress2 = document.getElementById("adress2");
var postalCode = document.getElementById("pcode");
var phone = document.getElementById("phone");
var errorFname = document.getElementById("errorFname");
var errorLname = document.getElementById("errorLname");
var errorBirthday = document.getElementById("errorBirthday");
var errorAdress1 = document.getElementById("errorAdress1");
var errorAdress2 = document.getElementById("errorAdress2");
var errorPostalCode = document.getElementById("errorPostalCode");
var errorPhone = document.getElementById("errorPhone");

//CHECK

var checkFirstName = false;
var checkLastName = false;
var checkBirthday = false;
var checkAdress1 = false;
var checkAdress2 = false;
var checkPostalCode = false;
var checkPhone = false;
//ERROR STYLES//

  errorFname.style.color = "red";
  errorFname.style.fontSize ="11px";
  errorLname.style.color = "red";
  errorLname.style.fontSize = "11px";
  errorBirthday.style.fontSize ="11px";
  errorBirthday.style.color = "red";
  errorBirthday.style.fontSize ="11px";
  errorAdress1.style.color = "red";
  errorAdress1.style.fontSize ="11px";
  errorAdress2.style.color = "red";
  errorAdress2.style.fontSize ="11px";
  errorPostalCode.style.color = "red";
  errorPostalCode.style.fontSize ="11px";
  errorPhone.style.color = "red";
  errorPhone.style.fontSize ="11px";


//EXPRESSIONS//
var expressionPcode = /[0-9]/;


//VALIDATE PROFILE//
function sendAdressForm(){
  event.preventDefault();

//ERROR MSG//

    var mensajeFname = [];
    var mensajeLname = [];
    var mensajeBirthday = [];
    var mensajeAdress1 = [];
    var mensajeAdress2 = [];
    var mensajePostalCode = [];
    var mensajePhone = [];


 //FIRST NAME VALIDATE REQUIRED MAX 20 //


    if(firstName.value === null || firstName.value ===""){
        mensajeFname.push("First name is required");
    } else if (firstName.value.length > 20 ){
        mensajeFname.push("First name must be max. 20 characters");
    }else {
      checkFirstName = true;
    }

    errorFname.innerHTML = mensajeFname.join("");

 //LAST NAME VALIDATE REQUIRED MAX 20 //


 if(lastName.value === null || lastName.value ===""){
    mensajeLname.push("Last name is required");
} else if (lastName.value.length > 20 ){
    mensajeLname.push("Last name must be max. 20 characters");
}else {
      checkLastName = true;
    }

errorLname.innerHTML = mensajeLname.join("");

 //BIRTHDAY VALIDATE REQUIRED//


 if(birthday.value === null || birthday.value ===""){
    mensajeBirthday.push("Birthday is required");
}else {
      checkBirthday = true;
    }

errorBirthday.innerHTML = mensajeBirthday.join("");


 //ADRESS 1 VALIDATE REQUIRED MAX 20 //


 if(adress1.value === null || adress1.value ===""){
    mensajeAdress1.push("Adress 1 is required");
} else if (adress1.value.length > 50 ){
    mensajeAdress1.push("Adress 1 must be max. 50 characters");
}else {
      checkAdress1 = true;
    }

errorAdress1.innerHTML = mensajeAdress1.join("");

 //ADRESS 2 VALIDATE REQUIRED MAX 20 //


 if (adress2.value.length > 50 ){
    mensajeAdress2.push("Adress 2 must be max. 50 characters");
}else {
      checkAdress2 = true;
    }

errorAdress2.innerHTML = mensajeAdress2.join("");

 //POSTAL CODE VALIDATE REQUIRED MAX 5 ONLY NUMBERS //


 if(postalCode.value === null || postalCode.value ===""){
    mensajePostalCode.push("Postal code is required");
} else if (postalCode.value.length > 5 ){
    mensajePostalCode.push("Postal code must be max. 5 digits");
} else if(!expressionPcode.test(postalCode.value)){
    mensajePostalCode.push("Postal code must be only digits");
}else {
      checkPostalCode = true;
    }

errorPostalCode.innerHTML = mensajePostalCode.join("");

// PHONE NUMBER//

if(phone.value === null || phone.value ===""){
    mensajePhone.push("Phone is required");
}else if(phone.value.length > 9){
    mensajePhone.push("Phone must be max. 9 digits");
}else if(!expressionPcode.test(phone.value)){
    mensajePhone.push("Phone must be only digits")
}else {
      checkPhone = true;
    }

errorPhone.innerHTML = mensajePhone.join("");

  if(checkFirstName == true && checkLastName == true && checkBirthday == true && checkAdress1 == true && checkAdress2 == true && checkPostalCode == true && checkPhone == true){
      document.querySelector("#hiddenSubmit2").click();
    }

}


//COUNTRY TO COUNTRY PHONE//


function code(){

var main = document.getElementById("country").value;
if(main === "andorra"){
    var array = ["AND +376","ESP +45","FRA +33","DEU +49","GRC +30"];
}else if(main==="espana"){
    var array = ["ESP +45","AND +376","FRA +33","DEU +49","GRC +30"];
} else if (main ==="francia"){
    var array = ["FRA +33","AND +376","ESP +45","DEU +49","GRC +30"];
} else if(main==="alemania"){
    var array= ["DEU +49","AND +376","ESP +44","FRA +33","GRC +30"];
}else if(main==="grecia"){
    var array = ["GRC +30","AND +376","ESP +45","FRA +33","DEU +49"];
} else{
    var array =[];
}

var string="";
for(let i=0;i< array.length;i++){
string=string + "<option>"+array[i]+"</option>";
}

string ="<select>"+string+"</select>";
document.getElementById("country-phone").innerHTML = string
   

}




//SHIPPING START

document
  .querySelector(".shipping__options")
  .addEventListener("click", event => {
    let deliveryDate = document.querySelector(".container__delivery__date");
    let actualDate = new Date();
    let monthArray = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let actualMonth = actualDate.getMonth();
    let month = monthArray[actualMonth];
    // let month = "December";
    let day = actualDate.getDate();
    // let day = 29;
    let ordinal;
    let year = actualDate.getFullYear();
    let deliveryStart = document.querySelector(".start__delivery__date");
    let deliveryEnd = document.querySelector(".end__delivery__date");
    let hour = actualDate.getHours();
    let tempDate = new Date(year, actualMonth + 1, 0);
    let lastDay = tempDate.getDate();
    let deliveryTimeStart;
    let deliveryTimeEnd;

    //check for the ordinal needed for the date
    //e.g. 25th

    switch (day) {
      case 1:
      case 21:
      case 31:
        ordinal = "st";
        break;

      case 2:
      case 22:
      case 32:
        ordinal = "nd";
        break;

      case 3:
      case 23:
      case 33:
        ordinal = "rd";
        break;

      default:
        ordinal = "th";
        break;
    }

    //Check the actual hour, to schedule a delivery

    if (hour >= 16 && hour < 22) {
      deliveryTimeStart = "16:00h";
      deliveryTimeEnd = "22:00h";
    } else if (hour < 16) {
      deliveryTimeStart = "10:00h";
      deliveryTimeEnd = "16:00h";
    } else {
      day++;
      deliveryTimeStart = "10:00h";
      deliveryTimeEnd = "16:00h";
    }

    //Check the shipment method, and once it is found;
    //check if the different days in the shipment method force to add a
    //month or even a year to the delivery date, preventing errors like
    //July 33rd or the month 13th.  And after that, add the
    //result to the customized delivery date

    //STILL IN PROGRESS. TO IMPROVE: Possiblity to create different functions for each check, to reduce code

    if (event.target.id === "shipment__1") {
      if (day + 1 > lastDay) {
        if (month === "December") {
          year++;
          actualMonth = -1;
        }
        month = monthArray[actualMonth + 1];
        day = 0;
      } else if (day + 2 > lastDay) {
        if (month === "December") {
          year++;
          actualMonth = -1;
        }
        month = monthArray[actualMonth + 1];
        day = -1;
      } else if (day + 3 > lastDay) {
        if (month === "December") {
          year++;
          actualMonth = -1;
        }
        month = monthArray[actualMonth + 1];
        day = -2;
      }
      deliveryStart.innerHTML = month + " " + (day + 3) + ordinal + ", " + year + " at " + deliveryTimeStart;
      deliveryEnd.innerHTML = month + " " + (day + 3) + ordinal + ", " + year + " at " + deliveryTimeEnd + ".";
      deliveryDate.classList.remove("hidden");
    }

    if (event.target.id === "shipment__2") {
      if (day + 1 > lastDay) {
        if (month === "December") {
          year++;
          actualMonth = -1;
        }
        month = monthArray[actualMonth + 1];
        day = 0;
      } else if (day + 2 > lastDay) {
        if (month === "December") {
          year++;
          actualMonth = -1;
        }
        month = monthArray[actualMonth + 1];
        day = -1;
      }
      deliveryStart.innerHTML =
        month +
        " " +
        (day + 2) +
        ordinal +
        ", " +
        year +
        " at " +
        deliveryTimeStart;
      deliveryEnd.innerHTML =
        month +
        " " +
        (day + 2) +
        ordinal +
        ", " +
        year +
        " at " +
        deliveryTimeEnd +
        ".";
      deliveryDate.classList.remove("hidden");
    }

    if (event.target.id === "shipment__3") {
      if (day + 1 > lastDay) {
        if (month === "December") {
          year++;
          actualMonth = -1;
        }
        month = monthArray[actualMonth + 1];
        day = 0;
      }

      deliveryStart.innerHTML =
        month +
        " " +
        (day + 1) +
        ordinal +
        ", " +
        year +
        " at " +
        deliveryTimeStart;
      deliveryEnd.innerHTML =
        month +
        " " +
        (day + 1) +
        ordinal +
        ", " +
        year +
        " at " +
        deliveryTimeEnd +
        ".";
      deliveryDate.classList.remove("hidden");
    }
  });

//Show or hide the gift section

document.querySelector("#gift").addEventListener("click", () => {
  document.querySelector(".container__gift__hidden").classList.toggle("hidden");
});

//SHIPING FINISH

//FOOTER
//Still work in progress
//vv need to complete de clear form vv
document.querySelector(".clear-input").addEventListener("click", () => {
  
  if (!profileSection.classList.contains("hidden")) {
    console.log("click reset on profile");
    document.querySelector("#hiddenReset1").click();
    sendProfileForm();
  } else if (!adressSection.classList.contains("hidden")) {
    console.log("click reset on adress");
    document.querySelector("#hiddenReset2").click();
  } else if (!shippingSection.classList.contains("hidden")) {
    console.log("clik on shipping");
    document.querySelector("#hiddenReset3").click();
  }
});

//Click of the hidden submit button in each form, to check if it is completed and customer is able to proceed.

document.querySelector(".submit .next-input").addEventListener("click", () => {

  if (!profileSection.classList.contains("hidden")) {
    console.log("click on profile");
    //document.querySelector("#hiddenSubmit1").click();
    sendProfileForm();
  } else if (!adressSection.classList.contains("hidden")) {
    console.log("click on adress");
    //document.querySelector("#hiddenSubmit2").click();
    sendAdressForm();
  } else if (!shippingSection.classList.contains("hidden")) {
    console.log("click on shipping");
    document.querySelector("#hiddenSubmit3").click();
  }
});

//Progress of the navigation bar, increase of the black line and black background adding.

let progressBar = document.querySelector(".purchase__header div:nth-child(2)");

document.querySelector("#profile_container form").addEventListener("submit", () => {
  event.preventDefault();
  console.log("Working profile");
  profileSection.className = "hidden";
  adressSection.classList.remove("hidden");
  progressBar.classList.add("extended1");
  document.querySelector(".purchase__header li:nth-child(2)").className +=
    "blackBg";
});
document.querySelector("#adress_container form").addEventListener("submit", () => {
  event.preventDefault();
  console.log("Working adress");
  adressSection.className = "hidden";
  shippingSection.classList.remove("hidden");
  progressBar.classList.replace("extended1", "extended2");
  document.querySelector(".purchase__header li:nth-child(3)").className +=
    "blackBg";
});
document.querySelector("#shipping form").addEventListener("submit", () => {
  event.preventDefault();
  console.log("Working on shipping");
  shippingSection.className = "hidden";
  finishSection.classList.remove("hidden");
  progressBar.classList.replace("extended2", "extended3");
  document.querySelector(".purchase__header li:nth-child(4)").className +=
    "blackBg";
  footerSection.classList.add("hidden");
  headerSection.classList.add("purchase__header__white");

  //Updating Shipping info on FINISH/THANKYOU pages
  let shipmentMethodSelect = document.getElementsByName("shipmentMethod");
  for (let i = 0; i < shipmentMethodSelect.length; i++) {
    if (shipmentMethodSelect[i].checked) {
      let finalShipping = shipmentMethodSelect[i].value;
      finishShippType[0].innerHTML =
        finalShipping.charAt(0).toUpperCase() + finalShipping.slice(1);
      finishShippType[1].innerHTML =
        finalShipping.charAt(0).toUpperCase() + finalShipping.slice(1);
      if (finalShipping === "free") {
        finishShippPrice[0].innerHTML = "0";
        finishShippPrice[1].innerHTML = "0";
      }
      if (finalShipping === "extra") {
        finishShippPrice[0].innerHTML = "4.99";
        finishShippPrice[1].innerHTML = "4.99";
      }
      if (finalShipping === "premium") {
        finishShippPrice[0].innerHTML = "9.99";
        finishShippPrice[1].innerHTML = "9.99";
      }
    }
  }
  for (let i = 0; i < 2; i++) {
    //Updating start delivery date
    finishFirstDate[i].innerHTML = document.querySelector(
      ".start__delivery__date"
    ).innerHTML;
    //Updating end delivery date
    finishSecondDate[i].innerHTML = document.querySelector(
      ".end__delivery__date"
    ).innerHTML;
    //Updating total price
    finishTotalPrice[i].innerHTML =
      parseFloat(finishShippPrice[0].innerHTML) +
      parseFloat(finishPrice[0].innerHTML);
  }
});

// FINISH PAGE
let finishSquareColor = document.querySelectorAll(".finish-square-color");
let finishProductImage = document.querySelectorAll(".finish-product-image");
let finishStorage = document.querySelectorAll(".finish-storage");
let finishPrice = document.querySelectorAll(".finish-price");
let finishTotalPrice = document.querySelectorAll(".finish-total-price");
let finishShippType = document.querySelectorAll(".finish-shipp-type");
let finishShippPrice = document.querySelectorAll(".finish-shipp-price");
let finishFirstDate = document.querySelectorAll(".finish-first-date");
let finishSecondDate = document.querySelectorAll(".finish-second-date");
let finishTime = document.querySelector("#finish-time");

// Checks if the terms and conditions check-box is checked before buy
document.querySelector("#buynow-button").addEventListener("click", function() {
  if (document.querySelector("#conditions").checked === false) {
    document.querySelector(".conditions-required").style.display = "block";
  } else {
    //If checked continues to the next page: Thankyou
    finishSection.classList.add("hidden");
    thankyouSection.classList.remove("hidden");
    clearInterval(intervalWarning);
  }
  const temp = new Date(new Date() - globalStartTime)
  finishTime.textContent = temp.getMinutes() + " minutes and " + temp.getSeconds() + " seconds."
});
