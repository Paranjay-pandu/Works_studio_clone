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
  container: document,
  el: document.querySelector("#main"),
  smooth: true,
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

const cards = document.querySelectorAll("#card")
console.log(cards)

urls = [
  "https://works.studio/assets/imager/images/the-frost-house/44169/Thumbnail_e49f8295ccc5a85e1a76e2d68c06456f.jpg",
  "https://works.studio/assets/imager/images/public/37839/public-cover2_e49f8295ccc5a85e1a76e2d68c06456f.jpg",
  "https://works.studio/assets/imager/images/jeen-yuhs/35858/v1.5-home-image2_e49f8295ccc5a85e1a76e2d68c06456f.jpg",
  "https://works.studio/assets/imager/images/us-soccer/21753/NewThumb_e49f8295ccc5a85e1a76e2d68c06456f.jpg",
  "https://works.studio/assets/imager/images/between-places/40495/W%C3%98RKS_BetweenPlaces_Cover_240219_231911_e49f8295ccc5a85e1a76e2d68c06456f.jpg",
  "https://works.studio/assets/imager/images/converse-basketball-ho19/1766/Converse-Basketball-Identity-Shoe-Photgraphy_WORKS_e49f8295ccc5a85e1a76e2d68c06456f.jpg",
  "https://works.studio/assets/imager/images/versace-trigerca-identity/38005/versace-1.5_e49f8295ccc5a85e1a76e2d68c06456f.jpg",
  "https://works.studio/assets/imager/images/essentials-fear-of-god/44874/Thumbnail_New_e49f8295ccc5a85e1a76e2d68c06456f.jpg",
  "https://works.studio/assets/imager/images/Fear-of-God-Nike/38013/fog-1.5_e49f8295ccc5a85e1a76e2d68c06456f.jpg",
]
const page3 = document.querySelector("#page3 #cards")

  urls.forEach((url)=>{
  const card = document.createElement("div")
  card.id="card"
  card.style.cssText = `
    min-height: 60vh;
    width: 30vw;
    position: relative;
    background-color: black;
    margin-top: 20px;
    background-image: url(${url});
    background-size: cover;
    background-position: center;
  `
  card.setAttribute("data-scroll", "")
  page3.appendChild(card)
})