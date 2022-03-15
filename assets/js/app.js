
// variables

var colorDivs = document.querySelectorAll(".color");
var lockButton = document.querySelectorAll(".lock");

//functions______________________________
  


function createcolor() {
    var hexColor = chroma.random();
    return hexColor;
}
/* var randomHex = createcolor();
console.log(randomHex); */

function randomColors() {
    colorDivs.forEach((div, index) => {
    // get the div children element
    var hexText = div.children[0];
    // declare random variable to get createcolor function
    var randomColor = createcolor();
    var icons = colorDivs [index].querySelectorAll(".lock");
  
    //Add the color to the bg
    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;
    
        //making  contrast for hex text
        checkTextContrast(randomColor, hexText); 
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



  randomColors();
