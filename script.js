// ============================================================
// Galería de fotos accesible — lógica de interacción
// Las funciones marcadas con 🔁 están reutilizadas (y adaptadas)
// de la tarea anterior de interactividad con JavaScript.
// ============================================================

// 🔁 Reutilizada: función que arranca todo cuando la página termina de cargar
window.addEventListener('load', inicializarGaleria);

function inicializarGaleria() {
  const figuras = document.querySelectorAll('.galeria figure');

  // Requisito del proyecto: el tabindex se asigna por código, no en el HTML
  asignarTabIndexAutomatico(figuras);

  figuras.forEach((figura) => {
    // 🔁 Reutilizada: reacción al movimiento / paso del ratón
    figura.addEventListener('mouseenter', manejarSeleccion);
    figura.addEventListener('mouseleave', manejarSalida);
    figura.addEventListener('mousemove', manejarMovimientoRaton);

    // Nuevo: la misma selección debe poder activarse desde el teclado
    figura.addEventListener('focus', manejarSeleccion);
    figura.addEventListener('blur', manejarSalida);
    figura.addEventListener('keydown', manejarTeclado);
  });
}

// Componente desafiante 1: agregar tabindex automáticamente por código
function asignarTabIndexAutomatico(figuras) {
  figuras.forEach((figura) => {
    figura.setAttribute('tabindex', '0');
  });
}

// 🔁 Reutilizada y adaptada: la misma función atiende mouseenter Y focus,
// así el ratón y el teclado disparan exactamente el mismo comportamiento.
function manejarSeleccion(evento) {
  const figura = evento.currentTarget;
  figura.classList.add('figura--activa');
  const texto = figura.querySelector('figcaption').textContent;
  actualizarCuaderno(texto);
}

function manejarSalida(evento) {
  const figura = evento.currentTarget;
  figura.classList.remove('figura--activa');
  figura.style.setProperty('--rotX', '0deg');
  figura.style.setProperty('--rotY', '0deg');
}

// Componente desafiante 2: equivalente de teclado para una interacción
// pensada originalmente solo para el ratón (Enter o Espacio activan la figura).
function manejarTeclado(evento) {
  if (evento.key === 'Enter' || evento.key === ' ') {
    evento.preventDefault(); // evita que la barra espaciadora desplace la página
    manejarSeleccion(evento);
  }
}

// 🔁 Reutilizada: pequeño efecto que seguía el cursor en la tarea anterior;
// aquí solo actualiza variables CSS (la media query de abajo lo desactiva
// si la persona activó "reducir movimiento" en su sistema).
function manejarMovimientoRaton(evento) {
  const figura = evento.currentTarget;
  const cuadro = figura.getBoundingClientRect();
  const x = ((evento.clientX - cuadro.left) / cuadro.width - 0.5) * 6;
  const y = ((evento.clientY - cuadro.top) / cuadro.height - 0.5) * -6;
  figura.style.setProperty('--rotY', x + 'deg');
  figura.style.setProperty('--rotX', y + 'deg');
}

function actualizarCuaderno(texto) {
  document.getElementById('nota-cuaderno').textContent = texto;
}