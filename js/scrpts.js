// Seleccionar elementos del DOM
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

// Variables de estado
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Calcular la cantidad de tarjetas que caben en el carrusel a la vez
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insertar copias de las últimas tarjetas al principio del carrusel para el desplazamiento infinito
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insertar copias de las primeras tarjetas al final del carrusel para el desplazamiento infinito
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Desplazar el carrusel a la posición apropiada para ocultar las primeras tarjetas duplicadas en Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Agregar event listeners para los botones de flecha para desplazar el carrusel hacia la izquierda y hacia la derecha
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

// Función que se ejecuta cuando inicia el arrastre
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Registra la posición inicial del cursor y del desplazamiento del carrusel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

// Función que se ejecuta mientras se está arrastrando
const dragging = (e) => {
    if(!isDragging) return; // si isDragging es false, retorna desde aquí
    // Actualiza la posición de desplazamiento del carrusel según el movimiento del cursor
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

// Función que se ejecuta cuando termina el arrastre
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

// Función para el desplazamiento infinito del carrusel
const infiniteScroll = () => {
    // Si el carrusel está al principio, desplázate hasta el final
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // Si el carrusel está al final, desplázate al principio
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Limpiar el timeout existente y comenzar la reproducción automática si el mouse no está sobre el carrusel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

// Event listeners para el arrastre y el desplazamiento del carrusel
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

// Event listeners para activar/desactivar la reproducción automática cuando el mouse entra o sale del área del carrusel
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
// Función para buscar autores
function searchBooks() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".carousel .card");
    let foundCard = null;

    cards.forEach(card => {
        const author = card.querySelector("h2").textContent.toLowerCase();
        if (author.includes(input)) {
            foundCard = card; // Guarda la primera coincidencia
        }
    });

    if (foundCard) {
        foundCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    } else {
        // Opcional: Si no se encuentra ninguna coincidencia
        
        alert("No se encontró ningún autor con ese nombre.");
    }
}
