/* Time */
const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

let countDown = new Date("Dec 5, 2026 14:00:00").getTime(),
  x = setInterval(function () {
    let now = new Date().getTime(),
      distance = countDown - now;

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("dias").innerText = 0;
      document.getElementById("horas").innerText = 0;
      document.getElementById("minutos").innerText = 0;
      document.getElementById("segundos").innerText = 0;
      console.log("¡El tiempo ha terminado!");
      return; // Termina la ejecución de la función
    }

    const dias = Math.floor(distance / day);
    const horas = Math.floor((distance % day) / hour);
    const minutos = Math.floor((distance % hour) / minute);
    const segundos = Math.floor((distance % minute) / second);

    document.getElementById("dias").innerText = dias;
    document.getElementById("horas").innerText = horas;
    document.getElementById("minutos").innerText = minutos;
    document.getElementById("segundos").innerText = segundos;

    console.log(dias, horas, minutos, segundos);
  }, second);

if (segundos == 0) {
  (document.getElementById("dias").innerText = "00"),
    (document.getElementById("horas").innerText = "00"),
    (document.getElementById("minutos").innerText = "00"),
    (document.getElementById("segundos").innerText = "00");
}

/* music */
const music = document.getElementById("music");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
music.volume = 0.5;

playPauseBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
});

music.addEventListener("play", () => (playPauseBtn.textContent = "⏸"));
music.addEventListener("pause", () => (playPauseBtn.textContent = "▶"));

music.addEventListener("timeupdate", () => {
  const progress = (music.currentTime / music.duration) * 100;
  progressBar.style.width = progress + "%";
});

/* sobre */
const openBtn = document.getElementById("openEnvelope");
const envelope = document.querySelector(".envelope");
const screen = document.getElementById("envelopeScreen");
const invitation = document.getElementById("invitationContent");

openBtn.addEventListener("click", () => {
  envelope.classList.add("open");
  music.play();

  setTimeout(() => {
    screen.classList.add("fade-out");
    invitation.classList.remove("hidden");
  }, 1200);
});

/* galería */
const sliderTrack = document.getElementById("sliderTrack");
if (sliderTrack) {
  const total = sliderTrack.children.length;
  const contenedor = sliderTrack.parentElement;
  let actual = 0;
  const ajustarAltura = () => {
    const alto = sliderTrack.children[actual].offsetHeight;
    if (alto) contenedor.style.height = alto + "px";
  };
  window.addEventListener("load", ajustarAltura);
  window.addEventListener("resize", ajustarAltura);
  setInterval(() => {
    actual = (actual + 1) % total;
    sliderTrack.style.transform = `translateX(-${actual * 100}%)`;
    ajustarAltura();
  }, 3500);
}

/* confirmación por WhatsApp */
document.querySelectorAll(".rsvp-form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const datos = new FormData(form);
    let texto =
      `¡Hola! Confirmo mi asistencia a ${form.dataset.evento}.\n` +
      `Nombre: ${datos.get("nombre").trim()}\n` +
      `Número de asistentes: ${datos.get("personas")}`;
    const mensaje = (datos.get("mensaje") || "").trim();
    if (mensaje) texto += `\nMensaje: ${mensaje}`;
    window.open(
      `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(texto)}`,
      "_blank"
    );
  });
});
