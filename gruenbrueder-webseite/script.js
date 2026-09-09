document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (menu) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  document.getElementById("year").textContent = new Date().getFullYear();

  const form = document.getElementById("bookingForm");
  const success = document.getElementById("successMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const subject = encodeURIComponent(`Termin-Anfrage – ${data.get("name")}`);
    const body = encodeURIComponent(
`Hallo Grünbrüder,

ich möchte einen Termin bzw. ein Angebot anfragen.

Name: ${data.get("name")}
Telefon: ${data.get("phone")}
E-Mail: ${data.get("email") || "-"}
Leistung: ${data.get("service")}
Wunschtermin: ${data.get("date")}
Wunschzeit: ${data.get("time") || "-"}
Beschreibung:
${data.get("message") || "-"}

Viele Grüße
${data.get("name")}`
    );

    // HIER eure echte E-Mail-Adresse eintragen:
    window.location.href = `mailto:info@gruenbrueder.de?subject=${subject}&body=${body}`;
    success.hidden = false;
  });
});
