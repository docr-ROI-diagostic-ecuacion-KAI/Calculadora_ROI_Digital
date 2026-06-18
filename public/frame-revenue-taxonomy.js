const docroiRevenueTaxonomy = {
  terminal: {
    title: "1. Terminal",
    shortTitle: "Terminal",
    question: "Desde donde interactua realmente este Buyer Persona?",
    help: "La terminal es la pantalla, dispositivo o entorno desde el que consume, compara o decide. Condiciona atencion, velocidad, profundidad e interaccion.",
    summary: "Dispositivo, pantalla o entorno. Define atencion, velocidad y profundidad.",
    options: ["smartphone", "tablet", "desktop", "monitor profesional", "smart TV", "asistente de voz", "aula", "eventos", "punto de venta", "Imprenta", "Radio", "Otros"]
  },
  medium: {
    title: "2. Medio",
    shortTitle: "Medio",
    question: "Por donde circula la comunicacion?",
    help: "El medio es el gran espacio de comunicacion: donde aparece la informacion, se genera atencion y empieza la relacion.",
    summary: "Gran canal de comunicacion: web, email, buscador, red social, streaming, radio, prensa o evento.",
    options: ["Prensa / Revistas", "Emisoras de Radio", "Email", "Web", "Blog", "Buscadores", "Redes sociales", "Mensajeria", "Podcast", "Streaming", "Apps", "IA conversacional", "Eventos digitales", "Eventos presenciales", "Comunidades digitales", "Programas de fidelizacion", "Ferias / Eventos comerciales", "Mass media digital", "Plataformas audiovisuales", "Otros"]
  },
  support: {
    title: "3. Soporte",
    shortTitle: "Soporte",
    question: "En que plataforma u organizacion concreta vive la interaccion?",
    help: "El soporte concreta el medio. No basta decir redes sociales: hay que saber si hablamos de LinkedIn, TikTok, Instagram, YouTube, WhatsApp o una web concreta.",
    summary: "Plataforma concreta donde ocurre la relacion: LinkedIn, YouTube, WhatsApp, landing, prensa o marketplace.",
    options: ["LinkedIn", "Instagram", "TikTok", "YouTube", "Facebook", "X", "WhatsApp", "Telegram", "Discord", "Twitch", "Spotify", "El Pais", "Newsletter", "Landing", "Blog", "ElPais.com", "Expansion", "Forbes", "Webinar", "Marketplace", "COPE", "Otros"]
  },
  format: {
    title: "4. Formato",
    shortTitle: "Formato",
    question: "Como aparece el mensaje ante la persona?",
    help: "El formato es la pieza concreta: post, reel, articulo, CTA, newsletter, demo o comparativa. Cambia engagement, profundidad, clic y conversion.",
    summary: "Pieza de interaccion: reel, articulo, CTA, demo, newsletter, comparativa, webinar o guia.",
    options: ["post", "articulo", "newsletter", "CTA", "secuencia automatizada", "reel", "short", "video largo", "carrusel", "infografia", "Folletos", "Anuncios en prensa", "Cunas de Radio", "podcast", "webinar", "demo", "Sample", "caso de uso", "comparativa", "FAQ", "landing", "gamificacion", "banner", "display", "encuesta", "guia PDF", "Otros"]
  },
  intention: {
    title: "5. Intencion relacional",
    shortTitle: "Intencion",
    question: "Para que usa esa combinacion canal + soporte + formato?",
    help: "La intencion explica si el canal sirve para aprender, comparar, comprar, confiar, automatizar, compartir o mantener relacion.",
    summary: "Motivo de uso: aprender, confiar, comprar, automatizar, recomendar o fidelizar.",
    options: ["aprender", "informarse", "resolver", "comparar", "confiar", "comprar", "reservar", "solicitar demo", "autoridad profesional", "automatizar", "delegar", "mejorar productividad", "pertenecer a comunidad", "recomendar", "seguimiento", "fidelizar", "Otros"]
  },
  customerType: ["Audiencia", "Lead", "Cliente nuevo", "Cliente pasivo", "Cliente activo", "Cliente insatisfecho"]
};

function docroiEscape(value) {
  return String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
}

function docroiTaxonomySelect(options, value, attrs) {
  return `<select ${attrs}>${["", ...options].map((option) => `<option value="${docroiEscape(option)}" ${String(value || "") === option ? "selected" : ""}>${docroiEscape(option || "Seleccionar")}</option>`).join("")}</select>`;
}

function docroiEnsureRevenueChannelContext() {
  if (!state.revenueChannelContext || typeof state.revenueChannelContext !== "object") state.revenueChannelContext = {};
  Object.keys(docroiRevenueTaxonomy).forEach((key) => {
    if (key === "customerType") return;
    if (!Array.isArray(state.revenueChannelContext[key])) state.revenueChannelContext[key] = [];
    const customKey = `${key}Custom`;
    if (!Array.isArray(state.revenueChannelContext[customKey])) state.revenueChannelContext[customKey] = [];
  });
}

docroiBlankRevenueCampaign = function docroiBlankRevenueCampaignWithTaxonomy() {
  return {
    customerType: "",
    convertible: true,
    capturedClients: "",
    conversion: "",
    arpu: "",
    channel: "",
    q: ["", "", "", ""]
  };
};

function docroiEnsureRevenueTaxonomyRows() {
  if (!Array.isArray(state.revenueRows)) state.revenueRows = [];
  if (!state.revenueRows.length) state.revenueRows.push(docroiBlankRevenueCampaign());
  state.revenueRows.forEach((row) => {
    if (!Object.prototype.hasOwnProperty.call(row, "customerType")) row.customerType = "";
    if (!Object.prototype.hasOwnProperty.call(row, "convertible")) row.convertible = true;
    if (!Object.prototype.hasOwnProperty.call(row, "capturedClients")) row.capturedClients = "";
    if (!Object.prototype.hasOwnProperty.call(row, "conversion")) row.conversion = "";
    if (!Object.prototype.hasOwnProperty.call(row, "arpu")) row.arpu = "";
  });
  docroiEnsureRevenueChannelContext();
}

function docroiSelectedValues(key) {
  docroiEnsureRevenueChannelContext();
  return state.revenueChannelContext[key] || [];
}

function docroiCustomValues(key) {
  docroiEnsureRevenueChannelContext();
  return state.revenueChannelContext[`${key}Custom`] || [];
}

function docroiFirstSelectedLabel(key) {
  const selected = docroiSelectedValues(key).filter((value) => value && value !== "Otros");
  const custom = docroiCustomValues(key).filter(Boolean);
  return selected[0] || custom[0] || "Selecciona";
}

function docroiTaxonomyHeroCards() {
  return ["terminal", "medium", "support", "format"].map((key) => {
    const item = docroiRevenueTaxonomy[key];
    return `<article><span>${item.shortTitle}</span><strong>${docroiEscape(docroiFirstSelectedLabel(key))}</strong><p>${item.summary}</p></article>`;
  }).join("");
}

function docroiTaxonomySection(key) {
  const item = docroiRevenueTaxonomy[key];
  const selected = docroiSelectedValues(key);
  const custom = docroiCustomValues(key);
  const chips = item.options.map((option) => `<button type="button" class="taxonomy-chip ${selected.includes(option) ? "selected" : ""}" data-taxonomy-key="${key}" data-taxonomy-value="${docroiEscape(option)}">${docroiEscape(option)}</button>`).join("");
  const customInputs = selected.includes("Otros") ? `<div class="taxonomy-custom-list" data-taxonomy-custom-list="${key}">${[...custom, ""].map((value, index) => `<input type="text" value="${docroiEscape(value)}" placeholder="Escribe otra opcion" data-taxonomy-custom="${key}" data-taxonomy-custom-index="${index}">`).join("")}</div>` : "";
  return `<section class="taxonomy-question-card"><h4>${item.title}</h4><strong>${item.question}</strong><p>${item.help}</p><div class="taxonomy-chip-row">${chips}</div>${customInputs}</section>`;
}

function docroiRevenueNumericRows() {
  return state.revenueRows.map((row, index) => `<tr>
    <td>${docroiTaxonomySelect(docroiRevenueTaxonomy.customerType, row.customerType, `data-final-table="revenueRows" data-row="${index}" data-key="customerType"`)}</td>
    <td><input data-final-table="revenueRows" data-row="${index}" data-key="convertible" type="checkbox" ${row.convertible === false || row.convertible === "false" ? "" : "checked"}></td>
    <td>${docroiCellInput("revenueRows", index, "capturedClients", row.capturedClients, "number")}</td>
    <td>${docroiCellInput("revenueRows", index, "conversion", row.conversion, "number")}</td>
    <td>${docroiCellInput("revenueRows", index, "arpu", row.arpu, "number")}</td>
    <td class="calc-total" data-row-total="revenueRows-${index}">${money(docroiRevenueValue(row))}</td>
  </tr>`).join("");
}

renderRevenueCalculator = function renderRevenueCalculatorWithTaxonomy() {
  docroiEnsureRevenueTaxonomyRows();
  return `<div class="plain-note revenue-taxonomy-note"><strong>Preguntas guia · arquitectura de canalidad</strong><p>Primero ordena la parte cualitativa sin forzar combinaciones imposibles. Despues calcula los ingresos con pocos datos defendibles: tipo de cliente, conversion, clientes captados y ARPU esperado.</p></div><div class="taxonomy-summary-band">${docroiTaxonomyHeroCards()}</div><div class="taxonomy-question-grid">${["terminal", "medium", "support", "format", "intention"].map(docroiTaxonomySection).join("")}</div><div class="plain-note revenue-taxonomy-note"><strong>Estimacion economica de ingresos</strong><p>Ahora traduce la canalidad en valor. Puedes anadir varios escenarios, pero ya no necesitas repetir terminal, medio, soporte y formato en cada fila.</p></div><div class="calc-table-wrap revenue-value-wrap"><table class="calc-table revenue-value-table"><thead><tr><th>Tipo cliente</th><th>Conv.</th><th>Clientes captados</th><th>% conversion</th><th>ARPU esperado</th><th>Valor esperado</th></tr></thead><tbody>${docroiRevenueNumericRows()}</tbody></table></div><div class="table-actions"><button class="ghost-action" type="button" data-add-final-row="revenueRows">Anadir escenario de ingreso</button></div>`;
};

function docroiToggleTaxonomyValue(key, value) {
  docroiEnsureRevenueChannelContext();
  const list = state.revenueChannelContext[key];
  const position = list.indexOf(value);
  if (position >= 0) list.splice(position, 1);
  else list.push(value);
  if (value === "Otros" && !list.includes("Otros")) state.revenueChannelContext[`${key}Custom`] = [];
  renderCurrentStep();
  renderLive();
  renderReport();
}

function docroiUpdateTaxonomyCustom(key, index, value) {
  docroiEnsureRevenueChannelContext();
  const list = state.revenueChannelContext[`${key}Custom`];
  list[index] = value.trim();
  state.revenueChannelContext[`${key}Custom`] = list.filter(Boolean);
  renderLive();
  renderReport();
}

function docroiApplyRevenueTaxonomyRenderer() {
  docroiEnsureRevenueTaxonomyRows();
  if (Array.isArray(steps)) {
    const revenueIndex = steps.findIndex((step) => Array.isArray(step) && /Ingresos/i.test(step[0] || ""));
    if (revenueIndex >= 0) {
      steps[revenueIndex][1] = "Ordena la canalidad antes de calcular valor: terminal, medio, soporte, formato e intencion relacional.";
      steps[revenueIndex][2] = "No buscamos permutaciones perfectas. Buscamos una lectura clara de donde vive la relacion y como puede convertirse en ingreso defendible.";
      steps[revenueIndex][3] = renderRevenueCalculator;
    }
  }
}

const docroiRevenueTaxonomyBindBase = bindInputs;
bindInputs = function bindInputsRevenueTaxonomy() {
  docroiRevenueTaxonomyBindBase();
  document.querySelectorAll(".revenue-value-table [data-final-table]").forEach((element) => {
    element.addEventListener("input", () => docroiFinalInputChange(element));
    element.addEventListener("change", () => docroiFinalInputChange(element));
  });
  document.querySelectorAll("[data-taxonomy-key]").forEach((button) => {
    button.addEventListener("click", () => docroiToggleTaxonomyValue(button.dataset.taxonomyKey, button.dataset.taxonomyValue));
  });
  document.querySelectorAll("[data-taxonomy-custom]").forEach((input) => {
    input.addEventListener("change", () => docroiUpdateTaxonomyCustom(input.dataset.taxonomyCustom, Number(input.dataset.taxonomyCustomIndex || 0), input.value));
    input.addEventListener("blur", () => docroiUpdateTaxonomyCustom(input.dataset.taxonomyCustom, Number(input.dataset.taxonomyCustomIndex || 0), input.value));
  });
};

try {
  docroiApplyRevenueTaxonomyRenderer();
  renderCurrentStep();
  renderLive();
  renderReport();
} catch {}
