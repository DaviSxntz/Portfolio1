// Atualiza ano no footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Smooth scroll ao clicar no menu
document.querySelectorAll('.nav-link[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      const offset = 80; // compensar header fixo
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }

    // se estiver no mobile, fecha o menu ao clicar
    const nav = document.querySelector(".nav");
    nav?.classList.remove("open");
  });
});

// Menu mobile
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// Reveal no scroll com IntersectionObserver
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // fallback simples
  revealElements.forEach((el) => el.classList.add("visible"));
}

// Parallax suave com o mouse
const parallaxItems = document.querySelectorAll(".parallax");
const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {
  const { innerWidth, innerHeight } = window;
  const xNorm = (e.clientX / innerWidth - 0.5) * 2; // -1 a 1
  const yNorm = (e.clientY / innerHeight - 0.5) * 2;

  parallaxItems.forEach((item, index) => {
    const intensity = (index + 1) * 6;
    const translateX = -xNorm * intensity;
    const translateY = -yNorm * intensity;
    item.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
  });

  // Atualiza posição do brilho do cursor
  if (cursorGlow) {
    document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
  }
});

// Envio real da "Mensagem rápida" para o WhatsApp
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const mensagem = document.getElementById("mensagem")?.value.trim() || "";

    if (!nome || !mensagem) {
      alert("Por favor, preencha pelo menos seu nome e a mensagem.");
      return;
    }

    const phone = "5586999473909"; // seu número com DDI + DDD
    let texto = `Nova mensagem pelo portfólio:%0A%0A`;
    texto += `👤 Nome: ${nome}%0A`;
    if (email) {
      texto += `✉️ E-mail: ${email}%0A`;
    }
    texto += `%0A💬 Mensagem:%0A${mensagem}`;

    const url = `https://wa.me/${phone}?text=${texto}`;

    window.open(url, "_blank");

    contactForm.reset();
  });
}