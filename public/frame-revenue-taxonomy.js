const docroiRevenueTaxonomy = {
  terminal: [
    "Small Screen - smartphone",
    "Small Screen - smartwatch",
    "Middle Screen - tablet",
    "Middle Screen - portatil",
    "Big Screen - desktop",
    "Big Screen - monitor profesional",
    "Big Screen - smart TV",
    "asistente de voz",
    "aula",
    "evento presencial",
    "punto de venta"
  ],
  medium: [
    "Email",
    "Web",
    "Buscadores",
    "Redes sociales",
    "Mensajeria",
    "Podcast",
    "Streaming",
    "Apps",
    "IA conversacional",
    "Eventos digitales",
    "Comunidades",
    "Prensa digital",
    "Canales audiovisuales",
    "LMS",
    "CRM"
  ],
  support: [
    "LinkedIn",
    "Instagram",
    "TikTok",
    "YouTube",
    "Facebook",
    "X",
    "WhatsApp",
    "Telegram",
    "Discord",
    "Twitch",
    "Spotify",
    "Newsletter",
    "Landing",
    "Blog",
    "ElPais.com",
    "Expansion",
    "Forbes",
    "TechCrunch",
    "Webinar",
    "LMS",
    "CRM",
    "Marketplace"
  ],
  format: [
    "post",
    "articulo",
    "newsletter",
    "CTA",
    "secuencia automatizada",
    "reel",
    "short",
    "video largo",
    "carrusel",
    "infografia",
    "podcast",
    "webinar",
    "demo",
    "caso de uso",
    "comparativa",
    "FAQ",
    "landing"
  ],
  customerType: [
    "Audiencia",
    "Lead",
    "Cliente nuevo",
    "Cliente pasivo",
    "Cliente activo",
    "Cliente insatisfecho"
  ]
};

function docroiTaxonomySelect(options, value, attrs) {
  return `<select ${attrs}>${["", ...options].map((option) => `<option value="${option}" ${String(value || "") === option ? "selected" : ""}>${option || "Seleccionar"}</option>`).join("")}</select>`;
}

docroiBlankRevenueCampaign = function docroiBlankRevenueCampaignWithTaxonomy() {
  return {
    terminal: "",
    medium: "",
    support: "",
    format: "",
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
  state.revenueRows.forEach((row) => {
    if (!Object.prototype.hasOwnProperty.call(row, "terminal")) row.terminal = "";
    if (!Object.prototype.hasOwnProperty.call(row, "support")) row.support = "";
    if (!Object.prototype.hasOwnProperty.call(row, "format")) row.format = "";
    if (!Object.prototype.hasOwnProperty.call(row, "medium")) row.medium = row.medium || "";
    if (!Object.prototype.hasOwnProperty.call(row, "customerType")) row.customerType = "";
    if (!Object.prototype.hasOwnProperty.call(row, "convertible")) row.convertible = true;
    if (!Object.prototype.hasOwnProperty.call(row, "capturedClients")) row.capturedClients = "";
    if (!Object.prototype.hasOwnProperty.call(row, "conversion")) row.conversion = "";
    if (!Object.prototype.hasOwnProperty.call(row, "arpu")) row.arpu = "";
  });
}

renderRevenueCalculator = function renderRevenueCalculatorWithTaxonomy() {
  docroiEnsureRevenueTaxonomyRows();
  const rows = state.revenueRows.map((row, index) => `<tr>
    <td>${docroiTaxonomySelect(docroiRevenueTaxonomy.terminal, row.terminal, `data-final-table="revenueRows" data-row="${index}" data-key="terminal"`)}</td>
    <td>${docroiTaxonomySelect(docroiRevenueTaxonomy.medium, row.medium, `data-final-table="revenueRows" data-row="${index}" data-key="medium"`)}</td>
    <td>${docroiTaxonomySelect(docroiRevenueTaxonomy.support, row.support, `data-final-table="revenueRows" data-row="${index}" data-key="support"`)}</td>
    <td>${docroiTaxonomySelect(docroiRevenueTaxonomy.format, row.format, `data-final-table="revenueRows" data-row="${index}" data-key="format"`)}</td>
    <td><input data-final-table="revenueRows" data-row="${index}" data-key="convertible" type="checkbox" ${row.convertible === false || row.convertible === "false" ? "" : "checked"}></td>
    <td>${docroiTaxonomySelect(docroiRevenueTaxonomy.customerType, row.customerType, `data-final-table="revenueRows" data-row="${index}" data-key="customerType"`)}</td>
    <td>${docroiCellInput("revenueRows", index, "capturedClients", row.capturedClients, "number")}</td>
    <td>${docroiCellInput("revenueRows", index, "conversion", row.conversion, "number")}</td>
    <td>${docroiCellInput("revenueRows", index, "arpu", row.arpu, "number")}</td>
    <td class="calc-total" data-row-total="revenueRows-${index}">${money(docroiRevenueValue(row))}</td>
  </tr>`).join("");
  return `<div class="plain-note revenue-taxonomy-note"><strong>Mapa de interaccion y valor</strong><p>Antes de estimar ingresos, define donde ocurre la relacion: terminal, medio, soporte y formato. Asi la atribucion no queda flotando: conecta canal, contexto, tipo de cliente y valor economico esperado.</p></div><div class="calc-table-wrap revenue-taxonomy-wrap"><table class="calc-table revenue-taxonomy-table"><thead><tr><th>Terminal</th><th>Medio</th><th>Soporte</th><th>Formato</th><th>Conv.</th><th>Tipo cliente</th><th>Clientes captados</th><th>% conversion</th><th>ARPU esperado</th><th>Valor esperado</th></tr></thead><tbody>${rows}</tbody></table></div><div class="table-actions"><button class="ghost-action" type="button" data-add-final-row="revenueRows">Anadir interaccion</button></div>`;
};

function docroiApplyRevenueTaxonomyRenderer() {
  docroiEnsureRevenueTaxonomyRows();
  if (Array.isArray(steps)) {
    const revenueIndex = steps.findIndex((step) => Array.isArray(step) && /Ingresos/i.test(step[0] || ""));
    if (revenueIndex >= 0) {
      steps[revenueIndex][1] = "Ordena la interaccion antes de calcular valor: terminal, medio, soporte, formato, tipo de cliente y conversion esperada.";
      steps[revenueIndex][2] = "Piensa donde aparece realmente el mensaje y que pieza concreta puede convertirse en cliente, pedido o ingreso atribuible.";
      steps[revenueIndex][3] = renderRevenueCalculator;
    }
  }
}

const docroiRevenueTaxonomyBindBase = bindInputs;
bindInputs = function bindInputsRevenueTaxonomy() {
  docroiRevenueTaxonomyBindBase();
  document.querySelectorAll(".revenue-taxonomy-table [data-final-table]").forEach((element) => {
    element.addEventListener("input", () => docroiFinalInputChange(element));
    element.addEventListener("change", () => docroiFinalInputChange(element));
  });
};

try {
  docroiApplyRevenueTaxonomyRenderer();
  renderCurrentStep();
  renderLive();
  renderReport();
} catch {}
