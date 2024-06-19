// Selecciona todos los elementos con la clase "arrow"
let arrow = document.querySelectorAll(".arrow");

// Itera sobre todos los elementos "arrow"
for (var i = 0; i < arrow.length; i++) {
  // Agrega un evento de clic a cada elemento "arrow"
  arrow[i].addEventListener("click", (e)=>{
    // Obtiene el elemento padre del padre del elemento "arrow" clicado
    let arrowParent = e.target.parentElement.parentElement;
    // Añade o remueve la clase "showMenu" del elemento padre
    arrowParent.classList.toggle("showMenu");
  });
}

// Selecciona el elemento con la clase "sidebar"
let sidebar = document.querySelector(".sidebar");

// Selecciona el botón de menú de la barra lateral
let sidebarBtn = document.querySelector(".bx-menu");

// Agrega un evento de clic al botón de menú
sidebarBtn.addEventListener("click", ()=>{
  // Añade o remueve la clase "close" del elemento "sidebar"
  sidebar.classList.toggle("close");
});
