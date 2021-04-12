const body = document.querySelector("body");

const IMG_CNT = 3;

function showImage(imgNumber) {
  const image = new Image();
  image.src = `img/bg/bg_${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function generateRandomN() {
  const num = Math.floor(Math.random() * IMG_CNT); //0 ~ (IMG_CNT)-1
  return num;
}
function init() {
  const randomN = generateRandomN();
  showImage(randomN);
}

init();
