let html = document.documentElement;
let btnTheme = document.getElementById("theme-toggle-button");
let ourLinks = document.querySelectorAll(".nav-links a");
let sections = document.querySelectorAll("section");
let btnScroll = document.getElementById("scroll-to-top");
let btnSettingsOpen = document.getElementById("settings-toggle");
let btnSettingsClose = document.getElementById("close-settings");
let sideBar = document.getElementById("settings-sidebar");
let chooseFont = document.querySelectorAll("#chooseFont button");
let btnCards = document.querySelectorAll(".portfolio-filter");
let cards = document.querySelectorAll(".portfolio-item");
let btnNext = document.getElementById("next-testimonial");
let btnPrev = document.getElementById("prev-testimonial");
let testimonialCard = document.querySelectorAll(".testimonial-card");
let currentIndex = 0;
let carouselIndicator = document.querySelectorAll(".carousel-indicator");
let colorTheme = document.querySelectorAll("#theme-colors-grid button");

toggleTheme();
activeLinkOnscroll();
scrollToTop();
toggleSidebar();
chooseFontToSite();
selectedCards();
carousel();
carouselIndicators();
changeColorTheme();

function toggleTheme() {
  btnTheme.addEventListener("click", function () {
    html.classList.toggle("dark");
    if (html.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

function activeLinkOnscroll() {
  window.addEventListener("scroll", function () {
    for (let i = 0; i < sections.length; i++) {
      let id = sections[i].getAttribute("id");
      if (window.scrollY >= sections[i].offsetTop) {
        for (let j = 0; j < ourLinks.length; j++) {
          ourLinks[j].classList.remove("active");
          if (ourLinks[j].getAttribute("href") === `#${id}`) {
            ourLinks[j].classList.add("active");
          }
        }
      }
    }
  });
}

function scrollToTop() {
  window.addEventListener("scroll", function () {
    if (window.scrollY >= 300) {
      btnScroll.classList.remove("invisible", "opacity-0");
    } else {
      btnScroll.classList.add("invisible", "opacity-0");
    }
  });

  btnScroll.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function toggleSidebar() {
  btnSettingsOpen.addEventListener("click", function () {
    sideBar.classList.remove("translate-x-full");
  });
  btnSettingsClose.addEventListener("click", function () {
    sideBar.classList.add("translate-x-full");
  });
}

function chooseFontToSite() {
  let font;
  for (let i = 0; i < chooseFont.length; i++) {
    font = chooseFont[i];

    font.addEventListener("click", function (e) {
      let getFont = e.currentTarget.getAttribute("data-font");

      document.body.classList.remove(
        "font-cairo",
        "font-tajawal",
        "font-alexandria",
      );

      document.body.classList.add(`font-${getFont}`);

      localStorage.setItem("font", `${getFont}`);
    });
  }
}

let fontSaved = localStorage.getItem("font");

if (fontSaved) {
  document.body.classList.add(`font-${fontSaved}`);
}

function changeColorTheme() {
  for (let i = 0; i < colorTheme.length; i++) {
    colorTheme[i].addEventListener("click", function (e) {
      let colorPrimary = e.currentTarget.getAttribute("data-primary");
      let colorSecondary = e.currentTarget.getAttribute("data-secondary");
      let colorAccent = e.currentTarget.getAttribute("data-accent");

      html.style.setProperty("--color-primary", colorPrimary);
      html.style.setProperty("--color-secondary", colorSecondary);
      html.style.setProperty("--color-accent", colorAccent);

      localStorage.setItem("colorprimary", colorPrimary);
      localStorage.setItem("colorsecondary", colorSecondary);
      localStorage.setItem("coloraccent", colorAccent);
    });
  }
}

let colorPrimarySaved = localStorage.getItem("colorprimary");
let colorSecondarySaved = localStorage.getItem("colorsecondary");
let colorAccentSaved = localStorage.getItem("coloraccent");

if (colorPrimarySaved && colorSecondarySaved && colorAccentSaved) {
  html.style.setProperty("--color-primary", colorPrimarySaved);
  html.style.setProperty("--color-secondary", colorSecondarySaved);
  html.style.setProperty("--color-accent", colorAccentSaved);
}

function selectedCards() {
  for (let i = 0; i < btnCards.length; i++) {
    let btn = btnCards[i];

    btn.addEventListener("click", function (e) {
      let filterBtn = e.currentTarget.getAttribute("data-filter");

      for (let j = 0; j < cards.length; j++) {
        cards[j].classList.add("hidden");

        let filterCard = cards[j].getAttribute("data-category");

        if (filterBtn === "all" || filterBtn === filterCard) {
          cards[j].classList.remove("hidden");
        }
      }
    });
  }
}

function carousel() {
  btnNext.addEventListener("click", function () {
    if (currentIndex < testimonialCard.length - 3) {
      currentIndex++;
      testimonialCard[currentIndex].scrollIntoView({
        inline: "start",
        behavior: "smooth",
      });
    }
  });

  btnPrev.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      testimonialCard[currentIndex].scrollIntoView({
        inline: "start",
        behavior: "smooth",
      });
    }
  });
}

function carouselIndicators() {
  for (let i = 0; i < carouselIndicator.length; i++) {
    carouselIndicator[i].addEventListener("click", function () {
      for (let j = 0; j < carouselIndicator.length; j++) {
        carouselIndicator[j].classList.remove("active");
      }
      carouselIndicator[i].classList.add("active");
  
        currentIndex = i;
        testimonialCard[currentIndex].scrollIntoView({
          inline: "start",
          behavior: "smooth",
        });
      
    });
  }
}
