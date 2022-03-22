
window.onload = function() {

  const colorDivs = document.querySelectorAll(".color");
  const generateBtn = document.querySelector(".generate");
  const lockButton = document.querySelectorAll(".lock");

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
      const hexColor = chroma.random();
      return hexColor;
  }

  function randomColors() {
      initialColors = [];
      colorDivs.forEach((div, index) => {
          // get the div children element
          const hexText = div.children[0];
          // declare random constiable to get createcolor function
          const randomColor = createcolor();
          const icons = colorDivs[index].querySelectorAll(".lock");

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
          for (icon of icons) {
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
      const div = lockButton[index].parentElement.parentElement;
      const icon = lockButton[index].firstChild;
      icon.classList.toggle("fa-lock-open");
      icon.classList.toggle("fa-lock");
      div.classList.toggle("locked");
  }

  // implemente save to palette section
  const submitSave = document.querySelector(".submit-save");
  const saveInput = document.querySelector(".paletteName input");
  const currentHexes = document.querySelectorAll(".color h2");
  const libraryContainer = document.querySelector(".library-container");
  const libraryBtn = document.querySelector(".library");

  let savedPalettes = [];

  submitSave.addEventListener("click", savePalette);

  function savePalette(e) {
      const name = saveInput.value;
      const colors = [];
      currentHexes.forEach(hex => {
          colors.push(hex.innerText);
      });

      let paletteNr = savedPalettes.length;
      const paletteObj = {
          name,
          colors,
          nr: paletteNr
      };
      savedPalettes.push(paletteObj);
      //Save to localStorage
      savetoLocal(paletteObj);
      saveInput.value = "";
      //Generate the palette for Library

      const palette = document.createElement("div");
      palette.classList.add("my-palette");
      const title = document.createElement("h4");
      title.innerText = paletteObj.name;
      const preview = document.createElement("div");
      preview.classList.add("small-preview");
      paletteObj.colors.forEach(smallColor => {
          const smallDiv = document.createElement("div");
          smallDiv.style.backgroundColor = smallColor;
          preview.appendChild(smallDiv);
      });

      const paletteBtn = document.createElement("button");

      paletteBtn.classList.add("pick-palette-btn");
      paletteBtn.setAttribute("data-bs-dismiss", "modal");
      paletteBtn.style.backgroundColor = '#E13CE8';
      paletteBtn.classList.add(paletteObj.nr);
      paletteBtn.innerText = "Select";

      //adding event to the btn
      paletteBtn.addEventListener("click", e => {
          const paletteIndex = e.target.classList[1];
          initialColors = [];
          savedPalettes[paletteIndex].colors.forEach((color, index) => {
              initialColors.push(color);
              colorDivs[index].style.backgroundColor = color;
              const text = colorDivs[index].children[0];
              checkTextContrast(color, text);
              updateTextUI(index)
          });
      });

      //Append to Library
      palette.appendChild(title);
      palette.appendChild(preview);
      palette.appendChild(paletteBtn);
      libraryContainer.children[0].appendChild(palette);
  }

  function updateTextUI(index) {
      const activeDiv = colorDivs[index];
      const color = chroma(activeDiv.style.backgroundColor);
      const textHex = activeDiv.querySelector("h2");
      textHex.innerText = color.hex();
  }

  colorDivs.forEach((div, index) => {
      div.addEventListener("change", () => {
          updateTextUI(index);
      });
  });

  function savetoLocal(paletteObj) {
      let localPalettes;
      if (localStorage.getItem("palettes") === null) {
          localPalettes = [];
      } else {
          localPalettes = JSON.parse(localStorage.getItem("palettes"));
      }
      localPalettes.push(paletteObj);
      localStorage.setItem("palettes", JSON.stringify(localPalettes));
  }

  randomColors();
};