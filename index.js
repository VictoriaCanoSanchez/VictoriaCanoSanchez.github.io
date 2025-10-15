// Breakpoint para móvil
var SMALL_SCREEN_QUERY = "(max-width: 768px)";
function isSmall() { return window.matchMedia(SMALL_SCREEN_QUERY).matches; }

// Abrir/cerrar barra lateral en móvil
function w3_open() {
  var sb = document.getElementById("barra");
  var ov = document.getElementById("overlay");
  if (sb) sb.style.display = "block";
  if (ov) ov.style.display = "block";
  document.body.classList.add("drawer-open");
  document
    .querySelectorAll('header .w3-button[aria-controls="barra"]')
    .forEach(b => b.setAttribute("aria-expanded", "true"));
}
function w3_close() {
  var sb = document.getElementById("barra");
  var ov = document.getElementById("overlay");
  if (isSmall()) { if (sb) sb.style.display = "none"; }
  if (ov) ov.style.display = "none";
  document.body.classList.remove("drawer-open");
  document
    .querySelectorAll('header .w3-button[aria-controls="barra"]')
    .forEach(b => b.setAttribute("aria-expanded", "false"));
}
function toggleMenu() {
  document.body.classList.contains("drawer-open") ? w3_close() : w3_open();
}

// Marcar enlace activo
function setActiveLink(sectionId) {
  var links = document.getElementsByClassName("enlace-menu");
  for (var i = 0; i < links.length; i++) {
    links[i].classList.remove("w3-white-active");
    links[i].removeAttribute("aria-current");
  }
  var active = Array.prototype.find.call(
    links,
    l => l.getAttribute("href") === "#" + sectionId
  );
  if (active) {
    active.classList.add("w3-white-active");
    active.setAttribute("aria-current", "page");
  }
}

// Mostrar sección
function showSection(sectionId) {
  var sections = document.getElementsByClassName("seccion");
  for (var i = 0; i < sections.length; i++) { sections[i].style.display = "none"; }
  var target = document.getElementById(sectionId);
  if (target) target.style.display = "block";
  setActiveLink(sectionId);
}

// Navegación (cambia hash)
function navigate(sectionId) {
  if (history.pushState) history.pushState(null, "", "#" + sectionId);
  else location.hash = sectionId;
  showSection(sectionId);
  if (isSmall()) w3_close(); // en móvil, cerrar la barra al navegar
}

// Init
window.onload = function () {
  var hash = window.location.hash.replace("#", "");
  showSection(hash || "acerca"); // mostrar "acerca" por defecto

  // En desktop asegurar barra visible
  if (!isSmall()) {
    var sb = document.getElementById("barra");
    if (sb) sb.style.display = "block";
  }
};

// Reaccionar a cambios del hash
window.addEventListener("hashchange", function () {
  var hash = window.location.hash.replace("#", "") || "acerca";
  showSection(hash);
  if (isSmall()) w3_close();
});

// Gestionar resize (restaurar estados)
window.addEventListener("resize", function () {
  if (!isSmall()) {
    document.body.classList.remove("drawer-open");
    var ov = document.getElementById("overlay"); if (ov) ov.style.display = "none";
    var sb = document.getElementById("barra"); if (sb) sb.style.display = "block";
  } else {
    // en móvil, la barra empieza oculta
    var sb = document.getElementById("barra"); if (sb) sb.style.display = "none";
  }
});

// Cerrar con Escape
document.addEventListener("keydown", function (e) { if (e.key === "Escape") w3_close(); });

