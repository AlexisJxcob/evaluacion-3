// galeria.js - Script de la Página de Galería


// Guardo los datos de todas las obras en un array
// Cada obra tiene sus propios datos
let obras = [
    {
    id: 1,
    titulo: "Esplendor Abstracto",
    tecnica: "Óleo sobre lienzo",
    anio: "2024",
    descripcion: "Una exploración vibrante del color y la forma.",
    imagen: "/./img/obra1.png"
    },
    {
    id: 2,
    titulo: "Mirada Urbana",
    tecnica: "Fotografía digital",
    anio: "2024",
    descripcion: "Un registro íntimo de la ciudad contemporánea.",
    imagen: "/./img/obra2.jpg"
    },
    {
    id: 3,
    titulo: "Naturaleza Viva",
    tecnica: "Técnica mixta",
    anio: "2025",
    descripcion: "La intersección entre lo orgánico y lo sintético.",
    imagen: "/./img/obra3.png"
    },
{
    id: 4,
    titulo: "Luz Interior",
    tecnica: "Acuarela sobre papel",
    anio: "2025",
    descripcion: "La transparencia del agua como metáfora interior.",
    imagen: "/./img/obra4.png"
},
{
    id: 5,
    titulo: "Fragmentos",
    tecnica: "Collage digital",
    anio: "2025",
    descripcion: "Piezas de realidades distintas ensambladas.",
    imagen: "/./img/obra5.png"
},
{
    id: 6,
    titulo: "Silencio Roto",
    tecnica: "Escultura en bronce",
    anio: "2025",
    descripcion: "El instante previo a la palabra capturado en metal.",
    imagen: "/./img/obra6.png"
},
{
    id: 7,
    titulo: "Geometría Viva",
    tecnica: "Serigrafía",
    anio: "2026",
    descripcion: "Formas geométricas que respiran emoción.",
    imagen: "/./img/obra7.png"
},
{
    id: 8,
    titulo: "Horizonte",
    tecnica: "Fotografía análoga",
    anio: "2026",
    descripcion: "La línea entre lo conocido y lo desconocido.",
    imagen: "/./img/obra8.png"
}
];


// FUNCIÓN 1 - Abrir el modal con detalles de la obra


function abrirModal(idObra) {
  // Busco la obra que coincida con el id 
    let obra = null;
    for (let i = 0; i < obras.length; i++) {
    if (obras[i].id === idObra) {
        obra = obras[i];
    }
    } // el usuario hace click en la obra y este algoritmo se ejecuta

  // Si no encuentra la obra no hace nada
    if (obra === null) {
    return;
    }

  // Busco los elementos del modal en el HTML y los traigo
let modal = document.getElementById("modal-obra"); // esto busca el id en el html
let imgModal = document.getElementById("modal-imagen");
let tituloModal = document.getElementById("modal-titulo");
let tecnicaModal = document.getElementById("modal-tecnica");
let anioModal = document.getElementById("modal-anio");
let descripcionModal = document.getElementById("modal-descripcion");

  // Pongo los datos de la obra dentro del modal
    imgModal.src = obra.imagen;
    imgModal.alt = obra.titulo;
    tituloModal.textContent = obra.titulo;
    tecnicaModal.textContent = obra.tecnica;
    anioModal.textContent = obra.anio;
    descripcionModal.textContent = obra.descripcion;

  // Muestro el modal quitándole la clase "oculto"
    modal.classList.remove("oculto");

  // Evito que la página haga scroll mientras el modal está abierto
    document.body.style.overflow = "hidden";
}

// ─────────────────────────────────────────────
// FUNCIÓN 2 - Cerrar el modal
// ─────────────────────────────────────────────
function cerrarModal() {
    let modal = document.getElementById("modal-obra");

  // Oculto el modal agregándole la clase "oculto"
    modal.classList.add("oculto");

  // Vuelvo a permitir el scroll en la página
    document.body.style.overflow = "";
}

// ─────────────────────────────────────────────
// FUNCIÓN 3 - Eliminar una obra de la grilla
// ─────────────────────────────────────────────
function eliminarObra(boton) {
  // El botón está dentro de la tarjeta, así que busco la tarjeta padre
    let tarjeta = boton.closest(".obra-card");

  // Confirmo antes de borrar
    let confirmar = confirm("¿Seguro que quieres eliminar esta obra?");

    if (confirmar === true) {
    // Elimino la tarjeta del HTML
    tarjeta.remove();
    }
}

// ─────────────────────────────────────────────
// FUNCIÓN 4 - Agregar una obra nueva al HTML (DOM)
// ─────────────────────────────────────────────
function agregarTarjetaAlDOM(obra) {
  // Busco el contenedor de la grilla
    let grilla = document.getElementById("galeria-grid");

  // Creo el elemento article para la tarjeta
    let tarjeta = document.createElement("article");
    tarjeta.className = "obra-card";

  // Le pongo el contenido HTML a la tarjeta
    tarjeta.innerHTML =
    '<div class="obra-card-imagen-wrapper">' +
        '<img src="' + obra.imagen + '" alt="' + obra.titulo + '" class="obra-card-imagen" />' +
    '</div>' +
    '<div class="obra-card-info">' +
        '<h5 class="titulo-obra">' + obra.titulo + '</h5>' +
        '<p class="obra-card-descripcion">' + obra.tecnica + ' — ' + obra.anio + '</p>' +
        '<button class="btn-eliminar" onclick="eliminarObra(this)">Eliminar</button>' +
    '</div>';

  // Le agrego el evento de clic para abrir el modal
    let imgWrapper = tarjeta.querySelector(".obra-card-imagen-wrapper");
    imgWrapper.addEventListener("click", function() {
    abrirModal(obra.id);
    });

  // Agrego la tarjeta al final de la grilla
    grilla.appendChild(tarjeta);
}

// ─────────────────────────────────────────────
// FUNCIÓN 5 - Cargar todas las obras en la grilla
// ─────────────────────────────────────────────
function cargarGaleria() {
  // Recorro el arreglo de obras y agrego cada una al HTML
    for (let i = 0; i < obras.length; i++) {
    agregarTarjetaAlDOM(obras[i]);
    }
}

// ─────────────────────────────────────────────
// FUNCIÓN 6 - Cerrar el modal si hago clic fuera de él
// ─────────────────────────────────────────────
function cerrarModalAlClickFuera(evento) {
    let modal = document.getElementById("modal-obra");

  // Si el usuario hizo clic exactamente en el fondo oscuro (no en el contenido)
    if (evento.target === modal) {
    cerrarModal();
    }
}

// ─────────────────────────────────────────────
// Inicio todo cuando la página termina de cargar
// ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {
  // Cargo las obras en la grilla
    cargarGaleria();

  // Agrego el evento al botón de cerrar modal
    let btnCerrar = document.getElementById("btn-cerrar-modal");
    btnCerrar.addEventListener("click", function() {
    cerrarModal();
    });

  // Cierro el modal si hago clic en el fondo oscuro
    let modal = document.getElementById("modal-obra");
    modal.addEventListener("click", cerrarModalAlClickFuera);

  // Cierro el modal si presiono la tecla Escape
    document.addEventListener("keydown", function(evento) {
    if (evento.key === "Escape") {
        cerrarModal();
    }
    });
});