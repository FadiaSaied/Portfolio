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
let maxIndex = 3;
let carouselIndicator = document.querySelectorAll(".carousel-indicator");
let colorTheme = document.querySelectorAll("#theme-colors-grid button");

toggleTheme();
activeLinkOnscroll();
scrollToTop();
toggleSidebar();
chooseFontToSite();
selectedCards();
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
      if (window.scrollY > sections[i].offsetTop - 90) {
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
      chooseFont.forEach((btn) => {
        btn.classList.remove("active");
      });

      e.currentTarget.classList.add("active");
    });
  }
}

let fontSaved = localStorage.getItem("font");

if (fontSaved) {
  document.body.classList.remove(
    "font-cairo",
    "font-tajawal",
    "font-alexandria",
  );
  document.body.classList.add(`font-${fontSaved}`);
  chooseFont.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.font === fontSaved) {
      btn.classList.add("active");
    }
  });
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
      colorTheme.forEach((btn) => {
        btn.classList.remove("activeColor");
      });
      colorTheme[i].classList.add("activeColor");
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
   colorTheme.forEach((btn) => {
         btn.classList.remove('activeColor')
        if(btn.dataset.primary === colorPrimarySaved && btn.dataset.secondary === colorSecondarySaved && btn.dataset.accent === colorAccentSaved){
          btn.classList.add('activeColor')
        }
     
      });
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
      btnCards.forEach((btn) => btn.classList.remove("activeNavAndTaps"));

      btn.classList.add("activeNavAndTaps");
    });
  }
}

function carousel() {
  testimonialCard[currentIndex].scrollIntoView({
    behavior: "smooth",
    inline: "start",
  });
  removeActive();
  carouselIndicator[currentIndex].classList.add("activeIndicator");
}

btnNext.addEventListener("click", function () {
  if (currentIndex < maxIndex) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  carousel();
});

btnPrev.addEventListener("click", function () {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = 3;
  }
  carousel();
});

carouselIndicator.forEach((btn) => {
  btn.addEventListener("click", function () {
    currentIndex = btn.dataset.index;
    carousel();
    removeActive();
    btn.classList.add("activeIndicator");
  });
});

function removeActive() {
  for (let j = 0; j < carouselIndicator.length; j++) {
    carouselIndicator[j].classList.remove("activeIndicator");
  }
}
