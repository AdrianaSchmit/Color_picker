
// variables

var colorDivs = document.querySelectorAll(".color");
var generateBtn = document.querySelector(".generate");
var lockButton = document.querySelectorAll(".lock");



let initialColors;






// event listeners

generateBtn.addEventListener("click", randomColors);


lockButton.forEach((button, index) => {
  button.addEventListener("click", () => {
    toggleLockButton(index);
  });
}); 




//functions______________________________
  


function createcolor() {
    var hexColor = chroma.random();
    return hexColor;
}



function randomColors() {
  initialColors = [];
    colorDivs.forEach((div, index) => {
    // get the div children element
    var hexText = div.children[0];
    // declare random variable to get createcolor function
    var randomColor = createcolor();
    var icons = colorDivs [index].querySelectorAll(".lock");

        //Add it to the array
        if (div.classList.contains("locked")) {
          initialColors.push(hexText.innerText);
          return;
        } else {
          initialColors.push(chroma(randomColor).hex());
        }
  
    //Add the color to the bg
    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;
    
        //making  contrast for hex text
        checkTextContrast(randomColor, hexText); 
         //making  contrast for lock button
        for (icon of icons){
        checkTextContrast(randomColor, icon); 
        }
      
  }); 
 
  }



  function checkTextContrast(color, text) {
    const luminance = chroma(color).luminance();
    if (luminance > 0.5) {
      text.style.color = "black";
    } else {
      text.style.color = "white";
    }
  }


function toggleLockButton(index) {
  var div = lockButton[index].parentElement.parentElement;
  var icon = lockButton[index].firstChild;
  icon.classList.toggle("fa-lock-open");
  icon.classList.toggle("fa-lock");
  div.classList.toggle("locked");
}





// implemente save to palette 



var submitSave = document.querySelector(".submit-save");
var saveInput = document.querySelector(".panel input");
var currentHexes = document.querySelectorAll(".color h2");

let savedPalettes = [];



submitSave.addEventListener("click", savePalette);

function savePalette(e) {
  var name = saveInput.value;
  var colors = [];
  currentHexes.forEach(hex => {
    colors.push(hex.innerText);
  });


  let paletteNr = savedPalettes.length;  
  var paletteObj = { name, colors, nr: paletteNr };
  savedPalettes.push(paletteObj);
    //Save to localStorage
    savetoLocal(paletteObj);
    saveInput.value = "";

}

function savetoLocal(paletteObj) {
  let localPalettes;
  if (localStorage.getItem("palettes") === null) {
    localPalettes = [];
  } else {
    localPalettes = JSON.parse(localStorage.getItem("palettes"));
  }
  localPalettes.push(paletteObj);
  localStorage.setItem("palettes", JSON.stringify(localPalettes));
  console.log(localPalettes);
}
 


 


  randomColors();



 







