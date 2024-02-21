// GALLERY
const gallery = document.querySelector(".gallery");
const galleryBg = document.querySelector(".gallery-background");

// Gets data of mousepress
galleryBg.onmousedown = (e) => {
  gallery.dataset.mouseDownAt = e.clientX;
};

// Function for when mouse moves
galleryBg.onmousemove = (e) => {
  // Prevent movement when not pressedDown
  if (gallery.dataset.mouseDownAt === "0") return;

  let mouseMove = parseFloat(gallery.dataset.mouseDownAt) - e.clientX,
    maxMove = window.innerWidth / 2;

  let percentage = (mouseMove / maxMove) * -100,
    newPercentage = parseFloat(gallery.dataset.prevPercentage) + percentage;

  (newPercentage = Math.min(newPercentage, 30)),
    (newPercentage = Math.max(newPercentage, -70));

  gallery.dataset.percentage = newPercentage;

  gallery.animate(
    {
      transform: `translate(${newPercentage}%, 0%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of gallery.getElementsByClassName("gallery-img")) {
    image.animate(
      {
        objectPosition: `${70 + newPercentage}% center`,
      },
      { duration: 1000, fill: "forwards" }
    );
  }
};

window.onmouseup = () => {
  gallery.dataset.mouseDownAt = "0";
  gallery.dataset.prevPercentage = gallery.dataset.percentage;
};

// SCROLL SIDE BTN

const sideBtn = document.querySelector(".side-btn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    sideBtn.classList.add("active");
  } else {
    sideBtn.classList.remove("active");
  }
});
