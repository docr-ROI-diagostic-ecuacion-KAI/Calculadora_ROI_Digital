const docroiPercentRangeOptions = [0,10,20,30,40,50,60,70,80,90,100];
const docroiMonthRangeOptions = [3,6,12,18,24,36];

function docroiReadEconomic(path) {
  return readPath(path);
}

function docroiMoneyField(path, label, help, actionLabel, actionKind) {
  const id = path.replaceAll(".", "-");
  return `<div class="field economic-guided-field"><label for="${id}">${label}</label><input id="${id}" data-path="${path}" type="number" value="${displayValue(docroiReadEconomic(path))}" placeholder=""><small>${help}</small>${actionLabel ? `<button class="ghost-action economic-helper" type="button" data-economic-helper="${actionKind}" data-target-path="${path}">${actionLabel}</button>` : ""}</div>`;
}

function docroiPercentRangeField(path, label, help) {
  const current = displayValue(docroiReadEconomic(path));
  const isPreset = docroiPercentRangeOptions.map(String).includes(String(current));
  const selectValue = current && !isPreset ? "custom" : current;
  const customValue = current && !isPreset ? current : "";
  const options = ["", ...docroiPercentRangeOptions.map(String), "custom"];
  const labels = { "": "Seleccionar tramo", custom: "Otro valor" };
  const id = path.replaceAll(".", "-");
  return `<div class="field economic-guided-field"><label for="${id}-range">${label}</label><select id="${id}-range" data-economic-range="${path}">${options.map((value) => `<option value="${value}" ${selectValue === value ? "selected" : ""}>${labels[value] || `${value}%`}</option>`).join("")}</select><input class="economic-custom-input ${selectValue === "custom" ? "" : "is-hidden"}" data-economic-custom="${path}" type="number" value="${customValue}" placeholder="Escribe el numero sin %"><small>${help}</small></div>`;
}

function docroiMonthRangeField(path, label, help) {
  const current = displayValue(docroiReadEconomic(path) || "12");
  const isPreset = docroiMonthRangeOptions.map(String).includes(String(current));
  const selectValue = current && !isPreset ? "custom" : current;
  const customValue = current && !isPreset ? current : "";
  const options = ["", ...docroiMonthRangeOptions.map(String), "custom"];
  const labels = { "": "Seleccionar horizonte", custom: "Otro numero de meses" };
  const id = path.replaceAll(".", "-");
  return `<div class="field economic-guided-field"><label for="${id}-months">${label}</label><select id="${id}-months" data-economic-range="${path}">${options.map((value) => `<option value="${value}" ${selectValue === value ? "selected" : ""}>${labels[value] || `${value} meses`}</option>`).join("")}</select><input class="economic-custom-input ${selectValue === "custom" ? "" : "is-hidden"}" data-economic-custom="${path}" type="number" value="${customValue}" placeholder="Ejemplo: 9"><small>${help}</small></div>`;
}

function docroiSetEconomicPath(path, value) {
  docroiEnsureObjects();
  const keys = path.split(".");
  const last = keys.pop();
  const target = keys.reduce((obj, key) => { if (!obj[key]) obj[key] = {}; return obj[key]; }, state);
  target[last] = value;
  saveState();
}

function docroiEconomicSourceTotals() {
  const financial = typeof docroiFinalFinancialCore === "function" ? docroiFinalFinancialCore() : (typeof docroiFinancialCore === "function" ? docroiFinancialCore() : null);
  return {
    revenue: financial?.totalRevenue ?? null,
    cost: financial?.totalCost ?? null,
    opex: financial?.totalOpex ?? null,
    capex: financial?.capex ?? null
  };
}

function docroiUseEconomicHelper(kind, path) {
  const totals = docroiEconomicSourceTotals();
  if (kind === "revenue" && totals.revenue !== null) docroiSetEconomicPath(path, Math.round(totals.revenue));
  if (kind === "cost" && totals.cost !== null) docroiSetEconomicPath(path, Math.round(totals.cost));
  if (kind === "efficiency") docroiSetEconomicPath(path, "0");
  renderCurrentStep();
  renderLive();
  renderReport();
}

docroiEconomicBlock = function docroiEconomicBlockGuided() {
  docroiEnsureObjects();
  if (!state.economic) state.economic = { incomePotential: "", incomeCapture: "", efficiencyPotential: "", efficiencyCapture: "", attributableCost: "", periodMonths: "12" };
  return `<section class="kai-economics economic-guided-block"><div><p class="eyebrow">Base economica ejecutiva</p><h3>Datos para ROI y Customer Equity</h3><p>No necesitas ser financiero. Esta parte convierte una hipotesis de negocio en una lectura sencilla: cuanto valor podria volver, que parte crees capturable, que eficiencia puede monetizarse y que coste debe recuperarse.</p></div><div class="economic-guided-help"><article><strong>Si no sabes el dato exacto</strong><p>Usa un tramo prudente. Mejor una hipotesis defendible que una cifra bonita imposible de explicar.</p></article><article><strong>Si ya has rellenado ingresos y costes</strong><p>Puedes usar los botones de ayuda para tomar valores calculados en las pantallas anteriores.</p></article></div><div class="field-grid">${docroiMoneyField("economic.incomePotential", "Valor economico potencial", "En euros. Puede ser ingreso, margen o valor que podria capturarse si el escenario funciona. Ejemplo: ventas atribuibles estimadas, margen recuperable o valor de oportunidad.", "Usar ingresos calculados", "revenue")}${docroiPercentRangeField("economic.incomeCapture", "Porcentaje capturable de ese valor", "Elige que parte del valor potencial crees razonablemente capturable. Si dudas, usa un tramo conservador: 10%, 20% o 30%.")}${docroiMoneyField("economic.efficiencyPotential", "Ahorro o eficiencia potencial", "En euros. Usalo si hay horas liberadas, automatizacion, menor coste operativo o productividad monetizable. Si no aplica, puedes dejarlo en 0.", "No contemplo eficiencia", "efficiency")}${docroiPercentRangeField("economic.efficiencyCapture", "Porcentaje capturable de la eficiencia", "Que parte de esa eficiencia crees que se convierte realmente en valor. 0% si no aplica; 100% solo si tienes mucha seguridad.")}${docroiMoneyField("economic.attributableCost", "Coste atribuible de la iniciativa", "En euros. Es el coste que el proyecto debe recuperar: normalmente OPEX + CAPEX, o solo la parte de coste que puedas asociar a esta iniciativa. No es una penalizacion: es el liston que debe superar el retorno.", "Usar coste total calculado", "cost")}${docroiMonthRangeField("economic.periodMonths", "Horizonte de analisis", "Periodo aproximado del caso. Usa 12 meses si evaluas un ano; 3 o 6 si es una campana corta; 24 o 36 si es una inversion larga.")}</div><div class="plain-note economic-guided-note"><strong>Lectura en pasito de bebe</strong><p>Retorno bruto = valor economico potencial x porcentaje capturable + eficiencia potencial x porcentaje capturable. ROI compara ese retorno contra el coste atribuible. Customer Equity compara el ROI con el WACC.</p></div></section>`;
};

renderEquity = function renderEquityExecutiveConversationGuidedEconomics() {
  docroiEnsureObjects();
  docroiSyncKaiUx();
  const result = calculate().kai;
  const answered = docroiKaiQuestions.filter((question) => hasInput(state.kaiUx?.[question.id])).length;
  return `<div class="kai-intro executive-kai-intro"><div><p class="eyebrow">Diagnosis cabinet</p><h3>Diagnostico C-Level</h3><p>Responde con criterio de direccion. Esta conversacion traduce Customer Equity a decisiones de negocio: clientes, datos, eficiencia, satisfaccion, oferta y valor economico.</p></div><a href="https://docroi.marketing/kai-equation/" target="_blank" rel="noopener">Ver base conceptual</a></div><div class="plain-note executive-note"><strong>${answered}/10 dimensiones respondidas</strong><p>La estructura formal KAI·ROI v1 queda custodiada internamente. En esta pantalla solo trabajamos con lenguaje de negocio y madurez ejecutiva.</p></div><div class="exec-question-list">${docroiKaiQuestions.map(docroiRatingQuestion).join("")}</div>${docroiEconomicBlock()}<div class="explainer-grid kai-summary"><div class="explainer"><span>Potencial de activacion</span><strong>${result.incomplete ? "Pendiente" : docroiFormatPercentDot(result.kaiStar, 3)}</strong></div><div class="explainer"><span>Orquestacion cliente-oferta</span><strong>${result.incomplete ? "Pendiente" : docroiFormatPercentDot(result.spo, 1)}</strong></div><div class="explainer"><span>Madurez ejecutiva</span><strong>${docroiFormatScore(result.maturityAverage)}/5</strong></div></div>`;
};

function docroiApplyEconomicRenderer() {
  if (!Array.isArray(steps)) return;
  const equityIndex = steps.findIndex((step) => Array.isArray(step) && /Customer Equity/i.test(step[0] || ""));
  if (equityIndex >= 0) {
    steps[equityIndex][1] = "Traduce la madurez KAI y una hipotesis economica sencilla en ROI y Customer Equity. El sistema no inventa datos: te ayuda a elegir tramos defendibles.";
    steps[equityIndex][2] = "Si no conoces una cifra exacta, usa un tramo prudente o recupera valores ya calculados en ingresos, OPEX y CAPEX.";
    steps[equityIndex][3] = renderEquity;
  }
  if (Array.isArray(docroiFrameCFeeds) && equityIndex >= 0) {
    docroiFrameCFeeds[equityIndex] = {
      title: "Frame C · ROI y Customer Equity sin miedo",
      kicker: "Pildora formativa",
      lead: "Esta pantalla no te examina de finanzas. Te ayuda a convertir una hipotesis de negocio en una lectura que pueda entender direccion: retorno, coste, WACC y decision.",
      cards: [
        { term: "Valor economico potencial", what: "Es el dinero que podria volver si el escenario funciona: ventas atribuibles, margen recuperable o valor de oportunidad.", write: "Si ya rellenaste ingresos, usa el boton de ingresos calculados. Si no, escribe una estimacion prudente en euros.", read: "No es promesa de venta. Es la base sobre la que preguntas: que parte puedo capturar de forma defendible?" },
        { term: "% capturable", what: "Es la parte del valor potencial que de verdad crees que puedes conseguir. Por eso lo ponemos por tramos.", write: "Empieza conservador: 10%, 20% o 30%. Usa 70%-100% solo si tienes evidencia fuerte.", read: "El ROI sube mucho si este porcentaje sube. La pregunta no es si nos gusta, sino si lo podemos defender." },
        { term: "Eficiencia", what: "Ahorro monetizable: horas liberadas, automatizacion, menos coste operativo o productividad que se pueda traducir a euros.", write: "Si no aplica, pulsa No contemplo eficiencia o usa 0%. Si aplica, piensa en horas ahorradas x coste hora.", read: "La eficiencia no es solo trabajar mas rapido: debe poder convertirse en valor economico." },
        { term: "Coste atribuible", what: "Es el liston que el proyecto debe recuperar: OPEX + CAPEX o la parte del coste que realmente pertenece a esta iniciativa.", write: "Si ya completaste OPEX/CAPEX, usa el boton de coste total. Si no, escribe el presupuesto que quieres que el retorno compense.", read: "No es malo tener coste. Lo importante es saber si el retorno lo supera y en cuanto tiempo." },
        { term: "WACC", what: "Es el umbral financiero: el coste minimo que debe superar el ROI para crear valor defendible.", write: "Si no tienes dato financiero, usa una referencia de practica: 10%-15% suele servir para simular una decision.", read: "ROI solo dice cuanto vuelve. ROI - WACC dice si el proyecto crea Customer Equity." }
      ],
      note: "Formula mental: retorno bruto menos coste te da beneficio. ROI compara beneficio con coste. Customer Equity compara ROI con WACC. Si no puedes explicar un dato, usa un tramo prudente."
    };
  }
}

const docroiEconomicGuidanceBindBase = bindInputs;
bindInputs = function bindInputsEconomicGuidance() {
  docroiEconomicGuidanceBindBase();
  document.querySelectorAll("[data-economic-range]").forEach((select) => {
    select.addEventListener("change", () => {
      const path = select.dataset.economicRange;
      const custom = document.querySelector(`[data-economic-custom="${path}"]`);
      if (select.value === "custom") {
        if (custom) custom.classList.remove("is-hidden");
        docroiSetEconomicPath(path, custom?.value || "");
      } else {
        if (custom) custom.classList.add("is-hidden");
        docroiSetEconomicPath(path, select.value);
        renderLive();
        renderReport();
      }
    });
  });
  document.querySelectorAll("[data-economic-custom]").forEach((input) => {
    input.addEventListener("input", () => {
      docroiSetEconomicPath(input.dataset.economicCustom, input.value);
      renderLive();
      renderReport();
    });
  });
  document.querySelectorAll("[data-economic-helper]").forEach((button) => {
    button.addEventListener("click", () => docroiUseEconomicHelper(button.dataset.economicHelper, button.dataset.targetPath));
  });
};

try {
  docroiApplyEconomicRenderer();
  renderCurrentStep();
  renderLive();
  renderReport();
} catch {}
