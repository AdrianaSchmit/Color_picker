
// variables

var colorDivs = document.querySelectorAll(".color");

//functions______________________________
  


function createcolor() {
    var hexColor = chroma.random();
    return hexColor;
}
/* var randomHex = createcolor();
console.log(randomHex); */

function randomColors() {
    colorDivs.forEach((div) => {
    // get the div children element
    var hexText = div.children[0];
    // declare random variable to get createcolor function
    var randomColor = createcolor();
  
    //Add the color to the bg
    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;
 
  });
  }
  
  randomColors();