function docroiFinalSetPath(path, value) {
  const keys = path.split(".");
  const last = keys.pop();
  const target = keys.reduce((obj, key) => { if (!obj[key]) obj[key] = {}; return obj[key]; }, state);
  target[last] = value;
  saveState();
}

function docroiAnalysisHorizonSelect(value) {
  const options = ["", "3", "6", "12", "18", "24", "36", "custom"];
  const current = displayValue(value || readPath("economic.periodMonths") || "12");
  const preset = options.includes(current) ? current : "custom";
  const customValue = preset === "custom" ? current : "";
  const labels = {
    "": "Seleccionar horizonte",
    "3": "3 meses",
    "6": "6 meses",
    "12": "12 meses",
    "18": "18 meses",
    "24": "24 meses",
    "36": "36 meses",
    custom: "Otro numero de meses"
  };
  return `<div class="field full analysis-horizon-field"><label for="meta-analysisHorizon">Horizonte de analisis</label><select id="meta-analysisHorizon" data-analysis-horizon>${options.map((option) => `<option value="${option}" ${preset === option ? "selected" : ""}>${labels[option]}</option>`).join("")}</select><input class="economic-custom-input ${preset === "custom" ? "" : "is-hidden"}" data-analysis-horizon-custom type="number" value="${customValue}" placeholder="Ejemplo: 9"><small>Periodo aproximado del caso. Usa 12 meses si evaluas un ano; 3 o 6 si es una campana corta; 24 o 36 si es una inversion larga.</small></div>`;
}

renderContext = function renderContextFinalScope() {
  if (!state.meta) state.meta = {};
  if (!state.economic) state.economic = {};
  state.meta.email = "";
  state.meta.rgpdConsent = false;
  return `<div class="field-grid">${input("meta.project", "Empresa", "Nombre de la empresa o unidad evaluada.", "text")}${input("meta.country", "Pais o territorio", "Mercado principal del diagnostico.", "text")}${input("meta.sector", "Sector", "Actividad principal de la organizacion.", "text")}${input("meta.companySize", "Tamano de empresa", "Pyme, mid-market, enterprise u otra referencia ejecutiva.", "text")}${docroiMaturitySelect(readPath("meta.digitalMaturity"))}${input("meta.wacc", "WACC o referencia financiera (%)", "Escribe 10 para 10%.")}<div class="field full"><label for="notes">Narrativa del caso</label><textarea id="notes" data-path="notes" rows="4" placeholder="">${displayValue(state.notes)}</textarea><small>Explica que escenario se quiere evaluar y por que importa para negocio.</small></div>${docroiAnalysisHorizonSelect(readPath("economic.periodMonths"))}</div>`;
};

renderEquity = function renderEquityWithoutEconomicBlock() {
  docroiEnsureObjects();
  docroiSyncKaiUx();
  const result = calculate().kai;
  const answered = docroiKaiQuestions.filter((question) => hasInput(state.kaiUx?.[question.id])).length;
  return `<div class="kai-intro executive-kai-intro"><div><p class="eyebrow">Diagnosis cabinet</p><h3>Diagnostico C-Level</h3><p>Responde con criterio de direccion. Esta conversacion traduce Customer Equity a decisiones de negocio: clientes, datos, oferta, satisfaccion, productividad, cartera y valor economico.</p></div><a href="https://docroi.marketing/kai-equation/" target="_blank" rel="noopener">Ver base conceptual</a></div><div class="plain-note executive-note"><strong>${answered}/10 dimensiones respondidas</strong><p>La estructura formal KAI·ROI v1 queda custodiada internamente. En esta pantalla solo trabajamos con lenguaje de negocio y madurez ejecutiva. El calculo financiero sale de ingresos, OPEX y CAPEX declarados en los apartados anteriores.</p></div><div class="exec-question-list">${docroiKaiQuestions.map(docroiRatingQuestion).join("")}</div><div class="explainer-grid kai-summary"><div class="explainer"><span>Potencial de activacion</span><strong>${result.incomplete ? "Pendiente" : docroiFormatPercentDot(result.kaiStar, 3)}</strong></div><div class="explainer"><span>Orquestacion cliente-oferta</span><strong>${result.incomplete ? "Pendiente" : docroiFormatPercentDot(result.spo, 1)}</strong></div><div class="explainer"><span>Madurez ejecutiva</span><strong>${docroiFormatScore(result.maturityAverage)}/5</strong></div></div>`;
};

function docroiFinalScopeFinancialCore() {
  const totalRevenue = sum((state.revenueRows || []).map(docroiRevenueValue));
  const totalOpex = sum((state.opexRows || []).map(docroiOpexValue));
  const capex = sum((state.capexRows || []).map(docroiCapexValue));
  const totalCost = totalOpex + capex;
  const netProfit = totalRevenue - totalCost;
  const roi = totalCost > 0 ? netProfit / totalCost : null;
  const wacc = hasInput(readPath("meta.wacc")) ? decimalFromPercentPath("meta.wacc") : null;
  const customerEquity = roi !== null && wacc !== null ? roi - wacc : null;
  const waccMultiple = roi !== null && wacc !== null && wacc > 0 ? roi / wacc : null;
  const horizon = Math.max(1, n(readPath("economic.periodMonths") || 12));
  const monthlyRevenue = months.map((_, index) => index < horizon ? totalRevenue / horizon : 0);
  const monthlyOpex = months.map((_, index) => index < horizon ? totalOpex / horizon : 0);
  const cashFlow = months.map((_, index) => monthlyRevenue[index] - monthlyOpex[index] - (index === 0 ? capex : 0));
  const accumulated = cashFlow.reduce((items, value, index) => { items.push(value + (items[index - 1] || 0)); return items; }, []);
  const monthlyRate = wacc !== null ? Math.pow(1 + wacc, 1 / 12) - 1 : null;
  const van = monthlyRate !== null ? cashFlow.reduce((total, value, index) => total + value / Math.pow(1 + monthlyRate, index + 1), 0) : null;
  const paybackIndex = accumulated.findIndex((value) => value >= 0);
  const payback = totalCost > 0 && paybackIndex >= 0 ? paybackIndex + 1 : null;
  return { totalRevenue, totalOpex, capex, totalCost, netProfit, roi, wacc, customerEquity, waccMultiple, monthlyRevenue, monthlyOpex, cashFlow, accumulated, van, payback, horizon };
}

docroiFinalFinancialCore = docroiFinalScopeFinancialCore;
docroiFinancialCore = docroiFinalScopeFinancialCore;

calculate = function calculateFinalScope() {
  const financial = docroiFinalScopeFinancialCore();
  return { ...financial, financial, kai: calculateKai() };
};

function docroiApplyFinalScope() {
  if (!Array.isArray(steps)) return;
  const contextIndex = steps.findIndex((step) => Array.isArray(step) && /Contexto/i.test(step[0] || ""));
  const equityIndex = steps.findIndex((step) => Array.isArray(step) && /Customer Equity/i.test(step[0] || ""));
  if (contextIndex >= 0) steps[contextIndex][3] = renderContext;
  if (equityIndex >= 0) {
    steps[equityIndex][0] = "Customer Equity";
    steps[equityIndex][1] = "Valora las capacidades KAI que ayudan a explicar si el negocio puede convertir dato, decision y ejecucion en Customer Equity.";
    steps[equityIndex][2] = "El calculo financiero no se pide aqui: se toma de ingresos, OPEX y CAPEX ya declarados.";
    steps[equityIndex][3] = renderEquity;
  }
  if (Array.isArray(docroiFrameCFeeds) && equityIndex >= 0) {
    docroiFrameCFeeds[equityIndex] = {
      title: "Frame C · Customer Equity",
      kicker: "Pildora formativa",
      lead: "En esta pantalla ya no pedimos otra base economica. El ROI se calcula con ingresos, gastos e inversion. Aqui solo se diagnostica la capacidad de la organizacion para convertir dato y decision en valor repetible.",
      cards: [
        { term: "Que se calcula fuera de aqui", what: "Ingresos declarados, OPEX y CAPEX alimentan ROI, VAN, payback y Customer Equity.", write: "Revisa que ingresos, gastos e inversion esten bien introducidos antes de mirar el informe.", read: "Si el resultado financiero parece raro, normalmente hay que revisar ingresos, coste o clasificacion OPEX/CAPEX." },
        { term: "Que se responde aqui", what: "Madurez de decision, dato, SPO, productividad y cartera. No es un examen personal.", write: "Responde de 1 a 5 pensando en la organizacion, no en una persona concreta.", read: "Las puntuaciones bajas muestran donde reforzar capacidades para que el ROI sea mas repetible." },
        { term: "Customer Equity", what: "Lectura ejecutiva: ROI menos WACC. Si es positivo, el escenario supera el umbral financiero.", write: "Asegurate de que el WACC esta informado en el contexto inicial.", read: "ROI dice si compensa. Customer Equity dice si compensa por encima de la referencia financiera." },
        { term: "Sin eficiencia en esta version", what: "La eficiencia operativa es poderosa, pero requiere otro nivel de datos: horas, coste hora, baremos y medicion real.", write: "En esta calculadora nos quedamos con ingresos, OPEX y CAPEX para no mezclar capas.", read: "Mas claridad ahora; mas profundidad despues." }
      ],
      note: "Regla de esta version: ingresos menos costes explican el ROI; KAI explica capacidad de monetizacion del dato. No duplicamos datos economicos."
    };
  }
}

const docroiFinalScopeBindBase = bindInputs;
bindInputs = function bindInputsFinalScope() {
  docroiFinalScopeBindBase();
  document.querySelectorAll("[data-analysis-horizon]").forEach((select) => {
    select.addEventListener("change", () => {
      const custom = document.querySelector("[data-analysis-horizon-custom]");
      if (select.value === "custom") {
        if (custom) custom.classList.remove("is-hidden");
        docroiFinalSetPath("economic.periodMonths", custom?.value || "");
      } else {
        if (custom) custom.classList.add("is-hidden");
        docroiFinalSetPath("economic.periodMonths", select.value || "12");
        renderLive();
        renderReport();
      }
    });
  });
  document.querySelectorAll("[data-analysis-horizon-custom]").forEach((input) => {
    input.addEventListener("input", () => {
      docroiFinalSetPath("economic.periodMonths", input.value);
      renderLive();
      renderReport();
    });
  });
};

try {
  docroiApplyFinalScope();
  renderCurrentStep();
  renderLive();
  renderReport();
} catch {}
