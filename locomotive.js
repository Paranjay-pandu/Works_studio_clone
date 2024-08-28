function loading() {
  const loader = gsap.timeline();

  loader.to("#yellowdiv", {
    y: "-100%",
    delay: 0.5,
    ease: "expo.out",
  });

  loader.to(
    "#loader video",
    {
      y: "-100%",
      delay: 0.6,
      ease: "expo.out",
      duration: 0.7,
    },
    "anim"
  );

  loader.to(
    "#loader h1",
    {
      color: "black",
      delay: 0.6,
      duration: 0.7,
    },
    "anim"
  );
  loader.to("#loader", {
    display: "none",
    opacity: 0,
  });
}
document.addEventListener("DOMContentLoaded", loading());

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  lerp: 0.08,
});

const page = document.querySelector("#page2");
const elems = document.querySelectorAll("#elem");

elems.forEach(function (ele) {
  ele.addEventListener("mouseenter", function () {
    let url = ele.getAttribute("data-img");
    page.style.backgroundImage = `url(${url})`;
    console.log("Clicked");
  });
});