/*
 * Palo Alto Theme
 *
 * Use this file to add custom Javascript to Palo Alto.  Keeping your custom
 * Javascript in this fill will make it easier to update Palo Alto. In order
 * to use this file you will need to open layout/theme.liquid and uncomment
 * the custom.js script import line near the bottom of the file.
 */

(function () {
  // Add custom code below this line
  // ^^ Keep your scripts inside this IIFE function call to
  // avoid leaking your variables into the global scope.
})();

document.addEventListener("DOMContentLoaded", () => {
  if (screen.width > 767) {
    const productTitleElement = document.querySelector(".product__title");
    const productTitle = productTitleElement
      ? productTitleElement.textContent.trim().toLowerCase()
      : "";

    const colorOptionElement = document.querySelector(
      '[data-option-name="Color"] .cp_option-value'
    );
    const initialColor = colorOptionElement
      ? colorOptionElement.textContent.trim().toLowerCase()
      : "";

    function getCleanAltText(altText) {
      return altText.split("#")[0].trim().toLowerCase();
    }

    function filterImages(selectedColor) {
      const mediaSlides = document.querySelectorAll(
        ".product-single__media-slide"
      );

      mediaSlides.forEach((slide) => {
        const img = slide.querySelector("img");

        if (img && img.alt) {
          const cleanAlt = getCleanAltText(img.alt);

          if (cleanAlt !== productTitle) {
            if (cleanAlt === selectedColor) {
              slide.style.display = "flex";
            } else {
              slide.style.display = "none";
            }
          } else {
            slide.style.display = "flex";
          }
        } else {
          slide.style.display = "flex";
        }
      });
    }

    if (initialColor) {
      filterImages(initialColor);
    }

    const colorSwatches = document.querySelectorAll(
      "input.swatch__input[data-single-option-selector]"
    );

    colorSwatches.forEach((input) => {
      const optionName = input.name.toLowerCase();

      if (optionName.includes("color") || optionName.includes("colour")) {
        input.addEventListener("change", (event) => {
          const selectedColor = event.target.value.trim().toLowerCase();
          filterImages(selectedColor);
        });
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll('.product__selectors input[type="radio"]')
    .forEach((radio) => {
      radio.addEventListener("change", (event) => {
        const radioFieldset = event.target.closest(".radio__fieldset");
        if (radioFieldset) {
          const optionValueElement =
            radioFieldset.querySelector(".cp_option-value");
          if (optionValueElement) {
            optionValueElement.textContent = event.target.value;
          }
        }
      });
    });
});
