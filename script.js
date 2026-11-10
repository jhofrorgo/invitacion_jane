/* =========================================================
   INVITACIÓN JANE VICTORIA · 9 AÑITOS
   JavaScript de Animaciones, Galería y Efectos
   ========================================================= */

// Fecha actualizada: 16 de Noviembre de 2026 a las 4:00 PM
const EVENT_DATE = new Date("2026-11-16T16:00:00-05:00").getTime();
// Número de confirmación actualizado
const WHATSAPP_PHONE = "573007088198";

document.documentElement.classList.add("js");

function startAnimations() {
  initPersonalization();
  initMagicParticles();
  initCountdown();
  initRevealAnimations();
  initRsvp();
  initCalendarButton();
  initGallery(); // Iniciar Galería de Fotos interactiva
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startAnimations);
} else {
  startAnimations();
}

/* ---------- PERSONALIZACIÓN POR URL ---------- */
function initPersonalization() {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("invitado") || params.get("n") || params.get("nombre");
  const guestCount = params.get("cupos") || params.get("c") || params.get("pases");

  const greetingContainer = document.getElementById("personalized-greeting");
  const nameDisplay = document.getElementById("guest-name-display");
  const ticketsDisplay = document.getElementById("guest-tickets-display");
  const rsvpNameInput = document.getElementById("guestName");
  const rsvpGuestsInput = document.getElementById("guests");

  if (guestName) {
    nameDisplay.textContent = guestName;
    if (rsvpNameInput) rsvpNameInput.value = guestName;

    if (guestCount) {
      const count = parseInt(guestCount, 10);
      const textoCupo = (count === 1) ? "pase reservado" : "pases reservados";
      ticketsDisplay.innerHTML = `<strong>${count}</strong> ${textoCupo}`;
      
      if (rsvpGuestsInput) {
        rsvpGuestsInput.value = count;
        rsvpGuestsInput.setAttribute("max", count);
      }
    } else {
      ticketsDisplay.style.display = "none";
    }
    greetingContainer.style.display = "block";
  }
}

/* ---------- GALERÍA DE FOTOS (CARRUSEL) ---------- */
function initGallery() {
  const track = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');

  if (!track || !nextBtn || !prevBtn) return;

  nextBtn.addEventListener('click', () => {
    // Desplaza el ancho aproximado de una imagen + espacio
    track.scrollBy({ left: 280, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -280, behavior: 'smooth' });
  });
}

/* ---------- PARTÍCULAS MÁGICAS ---------- */
function initMagicParticles() {
  let container = document.querySelector(".magic-particles");
  if (!container) {
    container = document.createElement("div");
    container.className = "magic-particles";
    document.body.prepend(container);
  }

  container.innerHTML = "";
  const count = window.innerWidth < 720 ? 20 : 35;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    particle.className = "magic-particle";
    particle.style.setProperty("--size", `${(Math.random() * 3 + 2).toFixed(1)}px`);
    particle.style.setProperty("--left", `${(Math.random() * 100).toFixed(1)}%`);
    particle.style.setProperty("--top", `${(Math.random() * 100).toFixed(1)}%`);
    particle.style.setProperty("--duration", `${(Math.random() * 4 + 4).toFixed(1)}s`);
    particle.style.setProperty("--delay", `${(-Math.random() * 6).toFixed(1)}s`);
    particle.style.setProperty("--drift", `${(Math.random() * 30 - 15).toFixed(1)}px`);
    container.appendChild(particle);
  }
}

/* ---------- CUENTA REGRESIVA ---------- */
function initCountdown() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function update() {
    const diff = EVENT_DATE - Date.now();
    if (diff <= 0) return;

    daysEl.textContent = String(Math.floor(diff / 86400000)).padStart(2, "0");
    hoursEl.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0");
    minutesEl.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    secondsEl.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

/* ---------- AGREGAR AL CALENDARIO ---------- */
function initCalendarButton() {
  const btn = document.getElementById("addToCalendarBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const isAndroid = /android/i.test(navigator.userAgent || navigator.vendor || window.opera);
    // Título y detalles adaptados para Jane Victoria
    const titulo = "Partida+de+Torta+Sorpresa+-+Jane+Victoria";
    const ubicacion = "Carrera+18a+%23+7b-26+Cabecera+Primera+Etapa%2C+Piedecuesta";
    const descripcion = "%C2%A1Est%C3%A1s+invitado+a+celebrar+los+9+a%C3%B1itos+de+Jane+Victoria!+Te+espero+para+una+tarde+m%C3%A1gica.";
    
    // Fechas en formato UTC (21:00 UTC = 16:00 Colombia)
    const fechaInicio = "20261116T210000Z";
    const fechaFin = "20261117T000000Z";

    if (isAndroid) {
      const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${fechaInicio}/${fechaFin}&details=${descripcion}&location=${ubicacion}`;
      window.open(googleCalUrl, '_blank');
    } else {
      const icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//JaneVictoria//Cumpleanos//ES",
        "CALSCALE:GREGORIAN",
        "BEGIN:VEVENT",
        "SUMMARY:Partida de Torta Sorpresa - Jane Victoria",
        "DTSTART:20261116T210000Z",
        "DTEND:20261117T000000Z",
        "LOCATION:Carrera 18a # 7b-26 Cabecera Primera Etapa, Piedecuesta",
        "DESCRIPTION:¡Estás invitado a celebrar los 9 añitos de Jane Victoria! Te espero para una tarde mágica.",
        "STATUS:CONFIRMED",
        "SEQUENCE:0",
        "BEGIN:VALARM",
        "TRIGGER:-PT2H",
        "DESCRIPTION:Recordatorio de evento",
        "ACTION:DISPLAY",
        "END:VALARM",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = "Cumpleanos_Jane_Victoria.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  });
}

/* ---------- ANIMACIONES DE ENTRADA ---------- */
function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el) => observer.observe(el));
}

/* ---------- RSVP (CONFIRMACIÓN WHATSAPP) ---------- */
function initRsvp() {
  const modal = document.getElementById("rsvpModal");
  const openBtn = document.getElementById("openRsvp");
  const closeBtn = document.getElementById("closeRsvp");
  const form = document.getElementById("rsvpForm");

  if (!modal || !openBtn) return;

  openBtn.addEventListener("click", () => modal.classList.add("show"));
  closeBtn?.addEventListener("click", () => modal.classList.remove("show"));

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("guestName")?.value || "";
    const attendance = document.getElementById("attendance")?.value || "";
    const guests = document.getElementById("guests")?.value || "1";
    const message = document.getElementById("message")?.value || "";

    const text = `🎀 *Confirmación Cumpleaños Jane Victoria* 🎀\n\n*Nombre:* ${name}\n*Asistencia:* ${attendance}\n*Personas:* ${guests}\n${message ? `*Mensajito:* ${message}` : ""}`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, "_blank");
  });
}