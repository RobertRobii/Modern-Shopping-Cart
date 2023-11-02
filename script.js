("use strict");

window.onload = function () {
  const homeDate = document.querySelector(".date");
  const deliveryDate = document.querySelector(".delivery-date");

  const getDate = function (date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    year = year < 10 ? "0" + year : year;

    if (homeDate) {
      homeDate.textContent = `${day}.${month}.${year}`;
    }
    if (deliveryDate) {
      deliveryDate.textContent = `${day + 3}.${month} - ${day + 5}.${month}`;
    }
  };

  getDate(new Date());

  // Switxch colors for items

  const colorBtns = document.querySelectorAll(".color");
  colorBtns.forEach((color) => {
    color.addEventListener("click", () => {
      let colorNameClass = color.className;
      if (!color.classList.contains("active-color")) {
        let colorName = colorNameClass.slice(
          colorNameClass.indexOf("-") + 1,
          colorNameClass.length
        );
        resetActiveBtns();
        color.classList.add("active-color");
        setNewColor(colorName);
      }
    });
  });

  // resetting all color btns
  const resetActiveBtns = function () {
    colorBtns.forEach((color) => {
      color.classList.remove("active-color");
    });
  };

  // set new color on the banner right
  const setNewColor = function (color) {
    const currentUrl = window.location.href;
    if (currentUrl === "http://127.0.0.1:5502/clothing.html") {
      document.querySelector(
        ".product-right img"
      ).src = `images/shirts/tshirt_${color}.png`;
    } else if (currentUrl === "http://127.0.0.1:5502/shoes.html") {
      document.querySelector(
        ".product-right img"
      ).src = `images/shoes/shoe_${color}.png`;
    }
  };
};
