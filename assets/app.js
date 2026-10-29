(function () {
  const cfg = window.ZECP_CONFIG || {};
  const ca = String(cfg.tokenCA || "").trim();
  const sol = cfg.solMint || "So11111111111111111111111111111111111111112";
  const validCa = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(ca);
  const swapUrl = validCa
    ? `https://swap.pump.fun/?input=${encodeURIComponent(sol)}&output=${encodeURIComponent(ca)}`
    : "https://swap.pump.fun/";
  const displayCa = validCa ? ca : "Add the $ZECP mint in assets/config.js";

  document.querySelectorAll("[data-ca]").forEach((el) => {
    el.textContent = displayCa;
  });
  document.querySelectorAll("[data-pumpswap]").forEach((el) => {
    el.setAttribute("href", swapUrl);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  const qrHost = document.getElementById("ca-qr");
  if (qrHost && window.QRCode) {
    qrHost.innerHTML = "";
    new QRCode(qrHost, {
      text: validCa ? ca : swapUrl,
      width: 150,
      height: 150,
      colorDark: "#17110c",
      colorLight: "#f3eadb",
      correctLevel: QRCode.CorrectLevel.M,
    });
  }

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!validCa) return;
      try {
        await navigator.clipboard.writeText(ca);
        const label = btn.querySelector("[data-copy-label]") || btn;
        const prev = label.textContent;
        label.textContent = "Copied";
        setTimeout(() => {
          label.textContent = prev;
        }, 1600);
      } catch (_) {}
    });
  });

  const menu = document.querySelector(".menu");
  const links = document.querySelector(".links");
  if (menu && links) {
    menu.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      });
    });
  }

  const pdf = document.getElementById("save-pdf");
  if (pdf) {
    pdf.addEventListener("click", () => window.print());
  }
})();
