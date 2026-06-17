const docroiFrameCFeeds = [
  {
    title: "Frame C · Marco de decision",
    kicker: "Antes de calcular",
    lead: "Aqui no buscamos rellenar casillas: buscamos preparar una conversacion financiera que un CMO, CFO o CEO pueda entender.",
    cards: [
      { term: "WACC", what: "Es la referencia minima que debe superar el ROI. En sencillo: el coste de financiarse o el umbral de rentabilidad aceptable.", write: "Escribe 15 si quieres usar 15% como referencia financiera.", read: "Si ROI queda por encima del WACC, el proyecto crea valor. Si queda por debajo, hay que optimizar o pausar." },
      { term: "Empresa y sector", what: "Situa el caso. No es lo mismo calcular ROI en retail media, ecommerce, servicios B2B o automatizacion interna.", write: "Describe la empresa, mercado y territorio principal.", read: "El contexto ayuda a interpretar conversion, ARPU, coste y velocidad de retorno." },
      { term: "Narrativa del caso", what: "Es la hipotesis que quieres defender. Por ejemplo: captar clientes, recuperar carrito, mejorar conversion o automatizar una tarea.", write: "Explica que decision quieres tomar y por que importa.", read: "Un buen ROI empieza con una pregunta clara: invertir, escalar, corregir o detener." }
    ],
    note: "Pildora Doc ROI: ROI sin WACC dice cuanto ganas; ROI menos WACC dice si estas creando valor real."
  },
  {
    title: "Frame C · Audiencia y conversion",
    kicker: "Del mercado al cliente",
    lead: "Esta pantalla transforma una audiencia en clientes atribuibles. Es el puente entre actividad de marketing e ingreso defendible.",
    cards: [
      { term: "Audiencia media", what: "Es el volumen de personas, sesiones, impactos o contactos sobre los que trabaja la campana.", write: "Usa una media mensual razonable y luego ajusta los meses especiales.", read: "La audiencia no es ingreso: solo se convierte en valor cuando pasa por una conversion defendible." },
      { term: "Patron de evolucion", what: "Sirve para repartir la audiencia en el tiempo: estable, estacional, lanzamiento progresivo o pico final.", write: "Elige el patron que se parezca mas al caso real.", read: "Ayuda a no inventar 12 meses manualmente y permite explicar la curva del escenario." },
      { term: "Conversion", what: "Es el porcentaje de audiencia que se convierte en cliente, pedido, lead util o accion con valor.", write: "Escribe 3 para 3%, no 0,03.", read: "Pequenas variaciones de conversion cambian mucho el ROI, sobre todo si el ARPU es alto." }
    ],
    note: "Formula mental: clientes atribuibles = audiencia util x conversion. Despues esos clientes se convierten en ingresos con ARPU o ticket medio."
  },
  {
    title: "Frame C · Ingresos atribuibles",
    kicker: "Lo que vuelve a la empresa",
    lead: "Aqui se separa actividad de negocio. Solo debe entrar valor que puedas defender como atribuible al escenario.",
    cards: [
      { term: "Canal y medio", what: "Identifica de donde viene el valor: search, email, RRSS, retail media, afiliacion, evento u otro medio.", write: "Pon una linea por campana, fuente o bloque de valor.", read: "Esto ayuda a comparar que canal devuelve mas valor y merece reinversion." },
      { term: "Clientes captados", what: "Es la base sobre la que aplicas conversion y ARPU. No es lo mismo alcance que clientes potencialmente convertibles.", write: "Introduce clientes, leads o pedidos esperados que puedas justificar.", read: "Sin trazabilidad con CRM, pedido, ERP o facturacion, el ingreso queda como hipotesis." },
      { term: "ARPU esperado", what: "ARPU es ingreso medio por cliente. Tambien puedes usar ticket medio si el negocio funciona por pedido.", write: "Introduce el valor economico medio por cliente o pedido.", read: "Ingresos estimados = clientes convertidos x ARPU. Es el puente entre marketing y finanzas." }
    ],
    note: "Pildora Doc ROI: distingue recurrente de incremental. El incremental demuestra crecimiento; el recurrente protegido defiende continuidad."
  },
  {
    title: "Frame C · OPEX de campana",
    kicker: "El coste de operar",
    lead: "OPEX recoge lo que cuesta ejecutar, mantener y sostener la campana durante el periodo analizado.",
    cards: [
      { term: "Concepto OPEX", what: "Publicidad, agencia, creatividad, contenido, paid media, CRM, herramientas, fees o gestion recurrente.", write: "Crea una linea por gasto operativo relevante.", read: "En performance marketing, el OPEX se trata como coste que el retorno debe recuperar." },
      { term: "Coste unidad", what: "Es el precio de cada unidad de recurso: hora, jornada, licencia, pieza, campana, click o paquete.", write: "Introduce el coste unitario sin simbolos complicados.", read: "Coste total OPEX = coste unidad x unidades." },
      { term: "Asociado a ingreso", what: "Vincula el coste a una campana o fuente de ingreso para defender la trazabilidad.", write: "Selecciona la campana relacionada si aplica.", read: "Una buena lectura CFO conecta gasto, canal, cliente, ingreso y margen." }
    ],
    note: "Pildora Doc ROI: el presupuesto deja de defenderse por actividad y empieza a defenderse por creacion de valor."
  },
  {
    title: "Frame C · CAPEX e inversion inicial",
    kicker: "Lo que permite arrancar",
    lead: "CAPEX aparece cuando hay tecnologia, infraestructura, integraciones o activos que habilitan el proyecto mas alla del gasto corriente.",
    cards: [
      { term: "CAPEX", what: "Inversion activable: software, hardware, integraciones, automatizaciones, robots o desarrollo reutilizable.", write: "Incluye solo desembolsos que tengan sentido como inversion inicial.", read: "El CAPEX afecta al payback porque suele pagarse al inicio y hay que recuperarlo." },
      { term: "Unidades", what: "Cantidad de licencias, equipos, jornadas, integraciones o activos comprados.", write: "Escribe cuantas unidades se necesitan.", read: "Total CAPEX = unidades x inversion unitaria." },
      { term: "Horizonte", what: "El CAPEX obliga a mirar el plazo: no basta saber si vuelve el dinero, tambien cuando vuelve.", write: "Usa el CAPEX para entender desembolso inicial.", read: "Si el payback tarda demasiado, el proyecto puede ser viable pero exigir control." }
    ],
    note: "Regla practica: OPEX es gasto operativo del periodo; CAPEX es inversion que activa capacidad o infraestructura."
  },
  {
    title: "Frame C · Customer Equity y KAI·ROI",
    kicker: "Capacidad y valor",
    lead: "Esta parte conecta madurez de decision, dato, cliente, oferta, productividad y cartera con la capacidad de monetizar el dato.",
    cards: [
      { term: "KAI·ROI", what: "No sustituye el ROI financiero. Mide capacidad estructural para convertir dato, decision y ejecucion en valor repetible.", write: "Responde de 1 a 5 con criterio directivo, no tecnico.", read: "Si una dimension es debil, el sistema muestra donde reforzar antes de escalar." },
      { term: "SPO", what: "Integra cliente, oferta y satisfaccion. Si una pieza falla, la orquestacion baja.", write: "Valora comportamiento cliente, rentabilidad de oferta y uso real de satisfaccion.", read: "SPO ayuda a entender si la empresa prioriza bien clientes, productos y acciones." },
      { term: "Base economica", what: "Retorno bruto = valor capturable + eficiencia capturable. Si falta un dato, no se inventa el resultado.", write: "Completa valor potencial, porcentaje capturable, coste y WACC.", read: "Customer Equity ejecutivo = ROI - WACC. Es positivo cuando el escenario supera la referencia financiera." }
    ],
    note: "Pildora Doc ROI: KAI senala capacidad; ROI y Customer Equity senalan lectura financiera del escenario. No mezcles ambas cosas."
  },
  {
    title: "Frame C · Informe ejecutivo",
    kicker: "De los numeros a la decision",
    lead: "El resultado final debe explicar que significa cada numero, por que sale asi y que palanca puede mejorarlo.",
    cards: [
      { term: "ROI", what: "ROI = (Ingresos - OPEX - CAPEX) / (OPEX + CAPEX). Mide retorno sobre coste total.", write: "Revisa si los ingresos y costes estan bien clasificados.", read: "ROI positivo recupera coste; ROI superior al WACC empieza a crear valor defendible." },
      { term: "Customer Equity", what: "En esta lectura ejecutiva es ROI - WACC. Mide excedente financiero sobre la referencia declarada.", write: "Comprueba que el WACC sea razonable para el caso.", read: "Si es negativo, no significa que todo este mal: significa que todavia no supera el umbral financiero." },
      { term: "Payback", what: "Indica el mes aproximado en que la caja acumulada recupera la inversion.", write: "Miralo junto al ROI, no aislado.", read: "Un ROI alto con payback lento puede requerir caja, paciencia o escalado gradual." }
    ],
    note: "Decision Doc ROI: escala lo que crea valor, optimiza lo que queda cerca del umbral y pausa lo que consume capital sin aprendizaje suficiente."
  }
];

function docroiFrameCCard(card) {
  return `<article class="frame-c-card"><span>${card.term}</span><p><b>Que es:</b> ${card.what}</p><p><b>Que hago:</b> ${card.write}</p><p><b>Como leerlo:</b> ${card.read}</p></article>`;
}

function docroiCurrentFrameCGuide() {
  if (!Array.isArray(docroiFrameCFeeds)) return null;
  const maxIndex = docroiFrameCFeeds.length - 1;
  const index = Math.min(Math.max(Number(currentStep || 0), 0), maxIndex);
  return docroiFrameCFeeds[index];
}

docroiRenderGuidePanel = function docroiRenderGuidePanelFrameC() {
  const guide = docroiCurrentFrameCGuide();
  const resultTitle = document.getElementById("resultTitle");
  const strip = document.getElementById("kpiStrip");
  const read = document.getElementById("executiveRead");
  const mini = document.querySelector(".mini-chart");
  const eyebrow = document.querySelector(".live-panel .panel-heading .eyebrow");
  if (!guide || !resultTitle || !strip || !read) return;
  if (eyebrow) eyebrow.textContent = "Frame C · Feed formativo";
  resultTitle.textContent = guide.title;
  strip.className = "kpi-strip frame-c-feed";
  strip.innerHTML = guide.cards.map(docroiFrameCCard).join("");
  read.className = "executive-read learning-read frame-c-note";
  read.innerHTML = `<strong>${guide.kicker}</strong><p>${guide.lead}</p><small>${guide.note}</small>`;
  if (mini) mini.style.display = "none";
};

if (typeof renderLive === "function") {
  const docroiFrameCRenderLiveBase = renderLive;
  renderLive = function renderLiveWithFrameC() {
    if (typeof currentStep !== "undefined" && Array.isArray(steps) && currentStep !== steps.length - 1) {
      docroiRenderGuidePanel();
      if (typeof docroiSetReportVisibility === "function") docroiSetReportVisibility();
      return;
    }
    docroiFrameCRenderLiveBase();
  };
}

if (typeof renderCurrentStep === "function") {
  const docroiFrameCRenderCurrentStepBase = renderCurrentStep;
  renderCurrentStep = function renderCurrentStepWithFrameC() {
    docroiFrameCRenderCurrentStepBase();
    if (typeof currentStep !== "undefined" && Array.isArray(steps) && currentStep !== steps.length - 1) {
      docroiRenderGuidePanel();
    }
  };
}

try {
  renderCurrentStep();
  renderLive();
  renderReport();
} catch {}
