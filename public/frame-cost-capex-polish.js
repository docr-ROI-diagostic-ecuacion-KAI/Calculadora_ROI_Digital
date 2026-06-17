function docroiCampaignLabel(row, index) {
  const parts = [row.terminal, row.medium, row.support, row.format].filter(Boolean);
  if (parts.length) return parts.join(" · ");
  return row.channel || `Campana ${index + 1}`;
}

function docroiEnsureOpexRows() {
  if (!Array.isArray(state.opexRows)) state.opexRows = [];
  state.opexRows.forEach((row) => {
    if (!Object.prototype.hasOwnProperty.call(row, "linkedRevenue")) row.linkedRevenue = "";
  });
}

renderOpexCalculator = function renderOpexCalculatorWithMixedAssociation() {
  docroiEnsureOpexRows();
  const revenueNames = ["Mixto / varios", ...(state.revenueRows || []).map(docroiCampaignLabel)];
  const rows = state.opexRows.map((row, index) => `<tr>
    <td>${docroiCellInput("opexRows", index, "concept", row.concept, "text")}</td>
    <td>${docroiCellInput("opexRows", index, "description", row.description, "text")}</td>
    <td>${docroiSelect(revenueNames, row.linkedRevenue, `data-final-table="opexRows" data-row="${index}" data-key="linkedRevenue"`)}</td>
    <td>${docroiCellInput("opexRows", index, "unitCost", row.unitCost, "number")}</td>
    <td>${docroiCellInput("opexRows", index, "units", row.units, "number")}</td>
    <td class="calc-total" data-row-total="opexRows-${index}">${money(docroiOpexValue(row))}</td>
  </tr>`).join("");
  return `<div class="plain-note"><strong>Calculadora OPEX</strong><p>Define el coste operativo como coste por unidad x unidades. Puedes asociarlo a una campana concreta o marcar <b>Mixto / varios</b> cuando el coste, por ejemplo una creatividad o una herramienta, sirva a varias campanas.</p></div><div class="calc-table-wrap"><table class="calc-table"><thead><tr><th>Concepto</th><th>Descripcion</th><th>Asociado a ingreso</th><th>Coste unidad</th><th>Unidades</th><th>Total OPEX</th></tr></thead><tbody>${rows}</tbody></table></div><div class="table-actions"><button class="ghost-action" type="button" data-add-final-row="opexRows">Anadir linea OPEX</button></div>`;
};

function docroiBlankCapexLine() {
  return { category: "", concept: "", label: "", unit: "", units: "", unitInvestment: "" };
}

const docroiCapexTemplate = [
  { group: "Software Cliente" },
  { category: "Licencias", concept: "Aplicaciones", label: "N/A", unit: "Licencias", units: "", unitInvestment: "" },
  { category: "Licencias", concept: "Sistemas Operativos", label: "N/A", unit: "Licencias", units: "", unitInvestment: "" },
  { category: "Licencias", concept: "Licencias de acceso de cliente", label: "N/A", unit: "Licencias", units: "", unitInvestment: "" },
  { category: "Licencias", concept: "Otros", label: "N/A", unit: "Licencias", units: "", unitInvestment: "" },
  { group: "Software Servidor" },
  { category: "Software Servidor", concept: "Sistema operativo del servidor", label: "MGM-BBDD", unit: "Licencias", units: "", unitInvestment: "" },
  { category: "Software Servidor", concept: "Base de datos", label: "MGM-BBDD", unit: "Terabytes", units: "", unitInvestment: "" },
  { category: "Software Servidor", concept: "Application Server", label: "MGM-BBDD", unit: "Licencias", units: "", unitInvestment: "" },
  { group: "Hardware Servidor" },
  { category: "Hardware Servidor", concept: "Servidores", label: "MGM-BBDD", unit: "Maquinas + config", units: "", unitInvestment: "" },
  { category: "Hardware Servidor", concept: "Almacenamiento", label: "MGM-BBDD", unit: "Disco (TB)", units: "", unitInvestment: "" },
  { category: "Hardware Servidor", concept: "Equipos de red", label: "MGM-BBDD", unit: "LAN + Otros", units: "", unitInvestment: "" },
  { group: "Hardware Cliente" },
  { category: "Hardware Cliente", concept: "PCs", label: "N/A", unit: "Ordenadores", units: "", unitInvestment: "" },
  { category: "Hardware Cliente", concept: "Actualizaciones de PCs", label: "N/A", unit: "Aumento memoria", units: "", unitInvestment: "" },
  { category: "Hardware Cliente", concept: "Dispositivos Moviles", label: "N/A", unit: "Terminales + Tablets", units: "", unitInvestment: "" },
  { category: "Hardware Cliente", concept: "Otros", label: "N/A", unit: "Impresoras", units: "", unitInvestment: "" },
  { group: "Implementacion Inicial Trabajo / Servicios" },
  { category: "Ingenieria", concept: "Ingenieria", label: "N/A", unit: "Persona - Jornada", units: "", unitInvestment: "" },
  { category: "Desarrollo", concept: "Desarrollo", label: "SEO", unit: "Persona - Jornada", units: "", unitInvestment: "" },
  { category: "Desarrollo", concept: "Desarrollo", label: "MGM-LP", unit: "Persona - Jornada", units: "", unitInvestment: "" },
  { category: "Desarrollo", concept: "Desarrollo", label: "MGM-BBDD", unit: "Persona - Jornada", units: "", unitInvestment: "" },
  { category: "Desarrollo", concept: "Desarrollo", label: "RRSS-LP", unit: "Persona - Jornada", units: "", unitInvestment: "" },
  { category: "Laboratorio", concept: "Laboratorio de Pruebas", label: "N/A", unit: "Persona - Jornada", units: "", unitInvestment: "" },
  { category: "Piloto", concept: "Prueba piloto", label: "N/A", unit: "Persona - Jornada", units: "", unitInvestment: "" },
  { category: "Despliegue", concept: "Despliegue", label: "N/A", unit: "Persona - Jornada", units: "", unitInvestment: "" },
  { category: "Parametrizaciones", concept: "Parametrizaciones", label: "N/A", unit: "Persona - Jornada", units: "", unitInvestment: "" },
  { category: "Optimizacion", concept: "Optimizacion del rendimiento", label: "N/A", unit: "Persona - Jornada", units: "", unitInvestment: "" },
  { category: "Documentacion", concept: "Documentacion", label: "SEO", unit: "Persona - Jornada", units: "", unitInvestment: "" },
  { category: "Documentacion", concept: "Documentacion", label: "MGM-LP", unit: "Persona - Jornada", units: "", unitInvestment: "" },
  { category: "Documentacion", concept: "Documentacion", label: "MGM-BBDD", unit: "Persona - Jornada", units: "", unitInvestment: "" },
  { category: "Documentacion", concept: "Documentacion", label: "RRSS-LP", unit: "Persona - Jornada", units: "", unitInvestment: "" }
];

function docroiEnsureCapexTemplate() {
  if (!Array.isArray(state.capexRows) || !state.capexRows.length || state.capexRows.length <= 3) {
    state.capexRows = docroiCapexTemplate.filter((row) => !row.group).map((row) => ({ ...row }));
    saveState();
  }
  state.capexRows.forEach((row) => {
    if (!Object.prototype.hasOwnProperty.call(row, "label")) row.label = "";
  });
}

function docroiCapexRowsWithGroups() {
  const rows = [];
  let dataIndex = 0;
  docroiCapexTemplate.forEach((templateRow) => {
    if (templateRow.group) {
      rows.push({ type: "group", label: templateRow.group });
      return;
    }
    rows.push({ type: "row", index: dataIndex, row: state.capexRows[dataIndex] || { ...templateRow } });
    dataIndex += 1;
  });
  for (; dataIndex < state.capexRows.length; dataIndex += 1) rows.push({ type: "row", index: dataIndex, row: state.capexRows[dataIndex] });
  return rows;
}

function docroiCapexValue(row) {
  return n(row?.units) * n(row?.unitInvestment);
}

renderCapexCalculator = function renderCapexCalculatorStructured() {
  docroiEnsureCapexTemplate();
  const maintenanceRate = hasInput(state.capexMaintenanceRate) ? n(state.capexMaintenanceRate) : 10;
  const total = sum((state.capexRows || []).map(docroiCapexValue));
  const rows = docroiCapexRowsWithGroups().map((item) => {
    if (item.type === "group") return `<tr class="capex-group-row"><th colspan="8">${item.label}</th></tr>`;
    const row = item.row;
    const totalRow = docroiCapexValue(row);
    const annual = totalRow * maintenanceRate / 100;
    return `<tr>
      <td>${docroiCellInput("capexRows", item.index, "category", row.category, "text")}</td>
      <td>${docroiCellInput("capexRows", item.index, "concept", row.concept, "text")}</td>
      <td>${docroiCellInput("capexRows", item.index, "label", row.label, "text")}</td>
      <td>${docroiCellInput("capexRows", item.index, "unit", row.unit, "text")}</td>
      <td>${docroiCellInput("capexRows", item.index, "units", row.units, "number")}</td>
      <td>${docroiCellInput("capexRows", item.index, "unitInvestment", row.unitInvestment, "number")}</td>
      <td class="calc-total" data-row-total="capexRows-${item.index}">${money(totalRow)}</td>
      <td class="calc-total capex-annual">${money(annual)}</td>
    </tr>`;
  }).join("");
  return `<div class="plain-note capex-skip-note"><strong>Muchos proyectos no llevan inversion inicial.</strong><p>Si este caso no contempla CAPEX, pulsa <b>No tengo inversion</b> para continuar. Si si hay inversion, completa solo las lineas que apliquen.</p><button class="primary-action" type="button" data-no-capex>No tengo inversion</button></div><div class="capex-summary"><article><span>Total inversion</span><strong>${money(total)}</strong></article><article><span>Mantenimiento evolutivo</span><label><input data-capex-maintenance type="number" value="${maintenanceRate}">%</label></article></div><div class="calc-table-wrap capex-structured-wrap"><table class="calc-table capex-structured-table"><thead><tr><th>Software / bloque</th><th>Concepto</th><th>Etiqueta</th><th>Etiqueta de la unidad</th><th>Nº unidades</th><th>Inversion unidad</th><th>No recurrente CAPEX</th><th>Recurrencia anual OPEX</th></tr></thead><tbody>${rows}</tbody></table></div><div class="table-actions"><button class="ghost-action" type="button" data-add-final-row="capexRows">Anadir inversion</button></div>`;
};

function docroiSkipCapex() {
  state.capexRows = [];
  state.capexSkipped = true;
  saveState();
  if (typeof currentStep !== "undefined" && Array.isArray(steps)) currentStep = Math.min(currentStep + 1, steps.length - 1);
  renderCurrentStep();
  renderLive();
  renderReport();
  if (typeof docroiScheduleFrameBScroll === "function") docroiScheduleFrameBScroll();
}

const docroiCostCapexBindBase = bindInputs;
bindInputs = function bindInputsCostCapexPolish() {
  docroiCostCapexBindBase();
  document.querySelectorAll("[data-no-capex]").forEach((button) => button.addEventListener("click", docroiSkipCapex));
  document.querySelectorAll("[data-capex-maintenance]").forEach((input) => {
    input.addEventListener("input", () => {
      state.capexMaintenanceRate = input.value;
      saveState();
      renderCurrentStep();
      renderLive();
      renderReport();
    });
  });
};

function docroiApplyCostCapexRenderers() {
  if (!Array.isArray(steps)) return;
  const opexIndex = steps.findIndex((step) => Array.isArray(step) && /OPEX/i.test(step[0] || ""));
  const capexIndex = steps.findIndex((step) => Array.isArray(step) && /CAPEX/i.test(step[0] || ""));
  if (opexIndex >= 0) steps[opexIndex][3] = renderOpexCalculator;
  if (capexIndex >= 0) {
    steps[capexIndex][1] = "El CAPEX recoge inversiones iniciales: tecnologia, infraestructura, integraciones, desarrollo o activos reutilizables.";
    steps[capexIndex][2] = "Muchos proyectos no llevan inversion inicial. Si es tu caso, pulsa No tengo inversion y continua al siguiente apartado.";
    steps[capexIndex][3] = renderCapexCalculator;
  }
}

try {
  docroiApplyCostCapexRenderers();
  renderCurrentStep();
  renderLive();
  renderReport();
} catch {}
