function docroiMaturitySelect(value) {
  const options = [
    ["", "Seleccionar"],
    ["Baja", "Baja"],
    ["Media", "Media"],
    ["Alta", "Alta"]
  ];
  return `<div class="field"><label for="meta-digitalMaturity">Madurez digital</label><select id="meta-digitalMaturity" data-path="meta.digitalMaturity">${options.map(([optionValue, label]) => `<option value="${optionValue}" ${String(value || "") === optionValue ? "selected" : ""}>${label}</option>`).join("")}</select><small>Elige una referencia sencilla: baja, media o alta.</small></div>`;
}

renderContext = function renderContextWithSimpleMaturity() {
  if (!state.meta) state.meta = {};
  state.meta.email = "";
  state.meta.rgpdConsent = false;
  return `<div class="field-grid">${input("meta.project", "Empresa", "Nombre de la empresa o unidad evaluada.", "text")}${input("meta.country", "Pais o territorio", "Mercado principal del diagnostico.", "text")}${input("meta.sector", "Sector", "Actividad principal de la organizacion.", "text")}${input("meta.companySize", "Tamano de empresa", "Pyme, mid-market, enterprise u otra referencia ejecutiva.", "text")}${docroiMaturitySelect(readPath("meta.digitalMaturity"))}${input("meta.wacc", "WACC o referencia financiera (%)", "Escribe 10 para 10%.")}<div class="field full"><label for="notes">Narrativa del caso</label><textarea id="notes" data-path="notes" rows="4" placeholder="">${displayValue(state.notes)}</textarea><small>Explica que escenario se quiere evaluar y por que importa para negocio.</small></div></div>`;
};

function docroiScrollToFrameB() {
  const workspace = document.querySelector(".workspace");
  if (!workspace) return;
  const top = workspace.getBoundingClientRect().top + window.scrollY - 18;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

function docroiScheduleFrameBScroll() {
  window.setTimeout(docroiScrollToFrameB, 80);
  window.setTimeout(docroiScrollToFrameB, 260);
}

const docroiUxBindBase = bindInputs;
bindInputs = function bindInputsWithSelectSupport() {
  docroiUxBindBase();
  document.querySelectorAll("select[data-path]").forEach((element) => {
    element.addEventListener("change", () => {
      setVal(element.dataset.path, element.value);
      changed(false);
    });
  });
};

const docroiUxRenderCurrentStepBase = renderCurrentStep;
renderCurrentStep = function renderCurrentStepWithSimpleMaturity() {
  docroiUxRenderCurrentStepBase();
  if (Array.isArray(steps)) {
    const contextIndex = steps.findIndex((step) => Array.isArray(step) && /Contexto/i.test(step[0] || ""));
    if (contextIndex >= 0 && currentStep === contextIndex) {
      const stepContent = document.getElementById("stepContent");
      if (stepContent) stepContent.innerHTML = `<h2 class="step-title">${currentStep + 1}. ${steps[currentStep][0]}</h2><p class="step-intro">${steps[currentStep][1]}</p><div class="reflection"><strong>Reflexion:</strong> ${steps[currentStep][2]}</div>${renderContext()}`;
      bindInputs();
    }
  }
};

document.addEventListener("click", (event) => {
  const stepButton = event.target.closest("#stepNav button[data-step], #prevStep, #nextStep");
  if (!stepButton) return;
  docroiScheduleFrameBScroll();
}, true);

try {
  if (Array.isArray(steps)) {
    const contextIndex = steps.findIndex((step) => Array.isArray(step) && /Contexto/i.test(step[0] || ""));
    if (contextIndex >= 0) steps[contextIndex][3] = renderContext;
  }
  renderCurrentStep();
  renderLive();
  renderReport();
} catch {}
