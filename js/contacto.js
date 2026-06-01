// FUNCIÓN 1 - Verificar si un campo está vacío

function campoEstaVacio(valor) {
  // trim() elimina los espacios al inicio y al final
  if (valor.trim() === "") {
    return true;
  }
  return false;
}


// FUNCIÓN 2 - Verificar si un email tiene formato válido

function emailEsValido(email) {
  // Esta expresión regular verifica que tenga formato nombre@dominio.algo
  let formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (formatoEmail.test(email)) {
    return true; // si es correcto el email devuelve true y mientras sea true
  }
  return false; // si no es correcto devuelve false y error
}


// FUNCIÓN 3 - Mostrar un error debajo de un campo

function mostrarError(idCampo, mensaje) {
  const campo = document.getElementById(idCampo);

  // Le agrego una clase para que se ponga en rojo
  campo.classList.add("campo-error");
  campo.classList.remove("campo-ok");

  // Busco si ya existe un mensaje de error y lo borro
  let errorExistente = campo.parentElement.querySelector(".texto-error"); // busco el parrafo
  if (errorExistente !== null) { // si no es null es que existe
    errorExistente.remove(); // mientras el error existente sea diferente de null lo borro
  }

  // Creo el párrafo con el mensaje de error
  let parrafoError = document.createElement("p"); // creo el parrafo
  parrafoError.className = "texto-error"; // le pongo la clase
  parrafoError.textContent = mensaje; // le pongo el texto

  // Lo inserto después del campo
  campo.parentElement.appendChild(parrafoError); // inserto el parrafo
}


// FUNCIÓN 4 - Marcar un campo como correcto

function marcarCampoOk(idCampo) {
  const campo = document.getElementById(idCampo);

  // Le agrego clase verde y le quito la roja
  campo.classList.add("campo-ok");
  campo.classList.remove("campo-error");

  // Borro el mensaje de error si existía
  let errorExistente = campo.parentElement.querySelector(".texto-error");
  if (errorExistente !== null) {
    errorExistente.remove();
  }
}


// FUNCIÓN 5 - Validar todos los campos del formulario

function validarFormulario() {
  // Asume que todo está bien y va cambiando si encuentra errores
  let formularioValido = true;

  // Valido el campo Nombre
  let nombre = document.getElementById("nombre").value;
  if (campoEstaVacio(nombre)) {
    mostrarError("nombre", "El nombre es obligatorio.");
    formularioValido = false;
  } else {
    marcarCampoOk("nombre");
  }

  // Valido el campo Email
  let email = document.getElementById("email").value;
  if (campoEstaVacio(email)) {
    mostrarError("email", "El correo es obligatorio.");
    formularioValido = false;
  } else if (!emailEsValido(email)) {
    mostrarError("email", "Ingresa un correo válido (ej: nombre@dominio.com).");
    formularioValido = false;
  } else {
    marcarCampoOk("email");
  }

  // Valido el select de Tipo de Solicitud
  let tipo = document.getElementById("tipo-solicitud").value;
  if (campoEstaVacio(tipo)) {
    mostrarError("tipo-solicitud", "Debes seleccionar un tipo de solicitud.");
    formularioValido = false;
  } else {
    marcarCampoOk("tipo-solicitud");
  }

  // Valido el campo Mensaje
  let mensaje = document.getElementById("mensaje").value;
  if (campoEstaVacio(mensaje)) {
    mostrarError("mensaje", "El mensaje es obligatorio.");
    formularioValido = false;
  } else {
    marcarCampoOk("mensaje");
  }

  return formularioValido;
}


// FUNCIÓN 6 - Mostrar mensaje de éxito o error

function mostrarMensaje(tipo) {
  // Borro cualquier mensaje anterior
  let mensajeAnterior = document.getElementById("mensaje-resultado");
  if (mensajeAnterior !== null) {
    mensajeAnterior.remove();
  }

  // Creo el nuevo mensaje
  let div = document.createElement("div");
  div.id = "mensaje-resultado";

  // Condicional: pongo un mensaje distinto según si fue exitoso o no
  if (tipo === "exito") {
    div.className = "mensaje-exito";
    div.textContent = "✓ Mensaje enviado correctamente. ¡Gracias por contactarnos!";
  } else {
    div.className = "mensaje-error";
    div.textContent = "✗ Por favor completa todos los campos correctamente.";
  }

  // Lo inserto antes del formulario
  let formulario = document.getElementById("form-contacto");
  formulario.parentElement.insertBefore(div, formulario);
}


// FUNCIÓN 7 - Detectar "compra" o "venta" en el mensaje
//             y actualizar el campo tipo automáticamente

function detectarTipoEnMensaje() {
  let campoMensaje = document.getElementById("mensaje");
  let campoTipo = document.getElementById("tipo-solicitud");

  // Cada vez que el usuario escribe en el textarea
  campoMensaje.addEventListener("input", function() {
    let textoEscrito = campoMensaje.value.toLowerCase();

    // Condicional: si incluye "compra" actualizo el select a "Compra"
    if (textoEscrito.includes("compra")) {
      campoTipo.value = "adquisicion";
      campoTipo.title = "Tipo actualizado automáticamente a: Compra";

    // Condicional: si incluye "venta" actualizo el select a "Venta"
    } else if (textoEscrito.includes("venta")) {
      campoTipo.value = "exposicion";
      campoTipo.title = "Tipo actualizado automáticamente a: Venta";
    }
  });
}


// Inicio todo cuando la página termina de cargar

document.addEventListener("DOMContentLoaded", function() {

  // Activo la detección automática de tipo en el campo mensaje
  detectarTipoEnMensaje();

  // Agrego el evento submit al formulario
  let formulario = document.getElementById("form-contacto");

  formulario.addEventListener("submit", function(evento) {
    // Evito que la página se recargue
    evento.preventDefault();

    // Valido el formulario
    let esValido = validarFormulario();

    // Muestro el mensaje según el resultado
    if (esValido === true) {
      mostrarMensaje("exito");
      formulario.reset(); // Limpio el formulario

      // Le quito las clases verdes a los campos
      let campos = formulario.querySelectorAll(".campo-ok");
      campos.forEach(function(campo) {
        campo.classList.remove("campo-ok");
      });

    } else {
      mostrarMensaje("error");
    }
  });
});