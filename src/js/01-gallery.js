// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
console.log(galleryItems);


import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const gallery = document.querySelector(".gallery");

const addItems = galleryItems
  .map(
    (item) =>
      `<li class="gallery__item"> <a class="gallery__link" href="${item.original}"> <img class="gallery__image" src="${item.preview}" alt="${item.description}" /> </a></li>`
  )
  .join("");

gallery.insertAdjacentHTML("afterbegin", addItems);

// console.log(addItems);

let lightbox = new SimpleLightbox(".gallery li a", {
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
  scrollZoom: false,
});