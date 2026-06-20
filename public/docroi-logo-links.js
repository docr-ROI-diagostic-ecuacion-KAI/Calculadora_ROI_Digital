const docroiLogoTargetUrl = "https://el-botiquin-del-doc-roi.vercel.app/";

function docroiIsLogoElement(element) {
  if (!element) return false;
  const img = element.closest ? element.closest("img") : null;
  if (!img) return false;
  const src = String(img.getAttribute("src") || "").toLowerCase();
  const alt = String(img.getAttribute("alt") || "").toLowerCase();
  const classes = String(img.className || "").toLowerCase();
  return classes.includes("docroi-logo") || alt.includes("docroi") || src.includes("logo_negro_doc_roi") || src.includes("docroi");
}

function docroiMarkLogosAsLinks() {
  document.querySelectorAll("img").forEach((img) => {
    if (!docroiIsLogoElement(img)) return;
    img.style.cursor = "pointer";
    img.setAttribute("role", "link");
    img.setAttribute("tabindex", "0");
    img.setAttribute("title", "Ir al Botiquin del Doc ROI");
  });
}

document.addEventListener("click", (event) => {
  if (!docroiIsLogoElement(event.target)) return;
  event.preventDefault();
  window.location.href = docroiLogoTargetUrl;
});

document.addEventListener("keydown", (event) => {
  if ((event.key !== "Enter" && event.key !== " ") || !docroiIsLogoElement(event.target)) return;
  event.preventDefault();
  window.location.href = docroiLogoTargetUrl;
});

try {
  docroiMarkLogosAsLinks();
  new MutationObserver(docroiMarkLogosAsLinks).observe(document.body, { childList: true, subtree: true });
} catch {}
