import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const refs = {
  galleryEl: document.querySelector(".gallery"),
};

refs.galleryEl.addEventListener("click", onGalleryClick);
function onGalleryClick(evt) {
  const isGalleryImage = evt.target.classList.contains("gallery__image");
  if (!isGalleryImage) {
    return;
  }
  evt.preventDefault();
  const urlEl = evt.target.dataset.source;
  // console.log(urlEl);

  const myModal = basicLightbox.create(
    `
<img width="1400" height="900" src="${urlEl}">
`,
    {
      onShow: myModalOpen,
    }
  );

  myModal.show();
  function myModalOpen(params) {
    window.addEventListener("keydown", onKeyDown);
  }

  function onKeyDown(evt) {
    // console.log(evt.code);
    if (evt.code === "Escape") {
      myModal.close(removeTargetKeyDown);
    }
  }

  function removeTargetKeyDown(params) {
    window.removeEventListener("keydown", onKeyDown);
  }
}

const cards = imagesCards(galleryItems);
function imagesCards(galleryEl) {
  return galleryEl
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
    <a class="gallery__link" href="large-image.jpg">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
    })
    .join("");
}
// console.log(cards);

refs.galleryEl.insertAdjacentHTML("beforeend", cards);
