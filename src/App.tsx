import { ArrowLeft, ArrowRight, Download, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

const logoHeader = 'https://docroi.marketing/wp-content/uploads/2026/04/Logo_1_Doc_ROI.png';
const logoFooter = 'https://docroi.marketing/wp-content/uploads/2026/05/Logo_Negro_DoC_ROI.jpg';
const heroBg = 'https://docroi.marketing/wp-content/uploads/2026/05/Imagen2.png';

const steps = ['Contexto', 'Diagnostico KAI', 'Economia', 'LTV', 'Resultado'];
const kaiQuestions = [
  ['strategy', 'Inteligencia', 'phi_i', 'Tu empresa toma decisiones basadas en objetivos compartidos'],
  ['structure', 'Estructura', 'u_i', 'Las prioridades se deciden con criterios claros y repetibles'],
  ['operation', 'Factor operativo', 'f_i', 'La empresa mantiene una relacion activa y recurrente con clientes'],
  ['data', 'Dato + IA', 'psi_i', 'Los datos se convierten en informacion util para decidir'],
  ['customer', 'Cliente', 'CC_i', 'La empresa diferencia clientes por frecuencia, valor y actividad'],
  ['offer', 'Oferta', 'ABCD_i', 'Productos o servicios estan clasificados por rentabilidad e impacto'],
  ['nps', 'Satisfaccion', 'NPS_i', 'La satisfaccion se mide y se usa para mejorar decisiones'],
  ['spo', 'SPO', 'SPO_i', 'Existe una forma estructurada de priorizar clientes, oferta y acciones'],
  ['productivity', 'Productividad', 'P_i', 'La organizacion mide productividad y eficiencia operativa'],
  ['portfolio', 'Cartera', 'Gamma_g(i),t', 'La empresa monitoriza salud y evolucion de cartera']
] as const;

type KaiKey = typeof kaiQuestions[number][0];
type Data = {
  company: string;
  territory: string;
  sector: string;
  objective: string;
  revenuePotential: string;
  revenueCapture: string;
  efficiencyPotential: string;
  efficiencyCapture: string;
  cost: string;
  wacc: string;
  periodMonths: string;
  ticket: string;
  frequency: string;
  lifetime: string;
  grossMargin: string;
  cac: string;
  kai: Record<KaiKey, number | null>;
};

const initialData: Data = {
  company: '', territory: '', sector: '', objective: '', revenuePotential: '', revenueCapture: '', efficiencyPotential: '', efficiencyCapture: '', cost: '', wacc: '', periodMonths: '12', ticket: '', frequency: '', lifetime: '', grossMargin: '', cac: '',
  kai: Object.fromEntries(kaiQuestions.map(([key]) => [key, null])) as Record<KaiKey, number | null>
};

function toNumber(value: string) {
  if (!String(value || '').trim()) return null;
  const parsed = Number(String(value).replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
}
function asRate(value: string) {
  const n = toNumber(value);
  return n === null ? null : n / 100;
}
function euro(value: number | null) {
  return value === null || Number.isNaN(value) ? 'No calculable' : new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
}
function pct(value: number | null) {
  return value === null || Number.isNaN(value) ? 'No calculable' : `${(value * 100).toFixed(1).replace('.', ',')}%`;
}
function months(value: number | null) {
  return value === null || !Number.isFinite(value) ? 'No calculable' : `${value.toFixed(1).replace('.', ',')} meses`;
}
function formatNumber(value: string) {
  const digits = value.replace(/\D/g, '');
  return digits ? new Intl.NumberFormat('es-ES').format(Number(digits)) : '';
}

function compute(data: Data) {
  const revenue = toNumber(data.revenuePotential);
  const revenueCapture = asRate(data.revenueCapture);
  const efficiency = toNumber(data.efficiencyPotential);
  const efficiencyCapture = asRate(data.efficiencyCapture);
  const cost = toNumber(data.cost);
  const wacc = asRate(data.wacc);
  const period = toNumber(data.periodMonths) || 12;
  const ticket = toNumber(data.ticket);
  const frequency = toNumber(data.frequency);
  const lifetime = toNumber(data.lifetime);
  const margin = asRate(data.grossMargin);
  const cac = toNumber(data.cac);

  // Lectura ejecutiva acordada: el retorno financiero no se descuenta por KAI.
  const grossReturn = revenue !== null && revenueCapture !== null && efficiency !== null && efficiencyCapture !== null
    ? revenue * revenueCapture + efficiency * efficiencyCapture
    : null;
  const netBenefit = grossReturn !== null && cost !== null ? grossReturn - cost : null;
  const roi = netBenefit !== null && cost !== null && cost > 0 ? netBenefit / cost : null;
  const customerEquity = roi !== null && wacc !== null ? roi - wacc : null;
  const payback = grossReturn !== null && grossReturn > 0 && cost !== null ? cost / (grossReturn / period) : null;
  const ltv = ticket !== null && frequency !== null && lifetime !== null && margin !== null ? ticket * frequency * lifetime * margin : null;
  const ltvCac = ltv !== null && cac !== null && cac > 0 ? ltv / cac : null;

  const kaiValues = Object.values(data.kai).filter((v): v is number => typeof v === 'number');
  const kaiAverage = kaiValues.length ? kaiValues.reduce((s, v) => s + v, 0) / kaiValues.length : null;
  const monetization = kaiAverage === null ? null : kaiAverage / 5;
  const normalized = Object.fromEntries(Object.entries(data.kai).map(([k, v]) => [k, v ? v / 5 : null])) as Record<KaiKey, number | null>;
  const psi = normalized.data;
  const spo = normalized.customer !== null && normalized.offer !== null && normalized.nps !== null ? normalized.customer * normalized.offer * normalized.nps : null;
  const kaiParts = [normalized.strategy, normalized.structure, normalized.operation, psi, spo, normalized.productivity, normalized.portfolio];
  const kaiStar = kaiParts.every((v): v is number => v !== null) ? kaiParts.reduce((a, b) => a * b, 1) : null;

  return { grossReturn, netBenefit, roi, customerEquity, payback, ltv, ltvCac, kaiAverage, monetization, kaiStar, wacc };
}

function roiReading(value: number | null) {
  if (value === null) return 'Completa retorno y coste para calcular el ROI.';
  if (value < 0) return 'El escenario todavia no recupera el coste declarado. Hay que subir retorno capturable o revisar la inversion.';
  if (value === 0) return 'El escenario cubre el coste, pero aun no genera excedente economico.';
  return 'El escenario genera retorno positivo: recupera el coste y deja excedente economico antes de compararlo con el WACC.';
}
function ceReading(value: number | null) {
  if (value === null) return 'Completa ROI y WACC para calcular Customer Equity.';
  if (value < 0) return 'El ROI estimado no supera la referencia financiera. Todavia no crea Customer Equity suficiente.';
  if (value === 0) return 'El ROI iguala la referencia financiera. Cubre la exigencia minima, sin excedente estrategico.';
  return 'El ROI supera la referencia financiera. El escenario empieza a crear Customer Equity.';
}
function monetizationReading(value: number | null) {
  if (value === null) return 'Pendiente de completar el diagnostico KAI.';
  if (value <= .25) return 'Mucho recorrido de mejora. Hay base para ordenar dato, decision y ejecucion.';
  if (value <= .75) return 'Buen camino. Ya existe una base real para monetizar el dato y escalar palancas.';
  return 'Alta capacidad. Conviene reconocer lo conseguido, sostenerlo y hacerlo repetible.';
}

function Field({ label, value, onChange, help, percent }: { label: string; value: string; onChange: (v: string) => void; help?: string; percent?: boolean }) {
  return <label className="field"><span>{label}</span><input value={value} inputMode="decimal" placeholder={percent ? '25' : '100.000'} onChange={(e) => onChange(percent ? e.target.value.replace(/[^0-9,.]/g, '') : formatNumber(e.target.value))} />{help && <small>{help}</small>}</label>;
}
function TextField({ label, value, onChange, area }: { label: string; value: string; onChange: (v: string) => void; area?: boolean }) {
  return <label className="field"><span>{label}</span>{area ? <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} /> : <input value={value} onChange={(e) => onChange(e.target.value)} />}</label>;
}
function Teaching({ title, children }: { title: string; children: ReactNode }) {
  return <aside className="teaching-feed"><span>Feed formativo</span><h4>{title}</h4><p>{children}</p></aside>;
}
function Kpi({ title, value, text }: { title: string; value: string; text: string }) {
  return <article className="kpi"><span>{title}</span><strong>{value}</strong><p>{text}</p></article>;
}

export function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(initialData);
  const calc = useMemo(() => compute(data), [data]);
  const update = <K extends keyof Data>(key: K, value: Data[K]) => setData((prev) => ({ ...prev, [key]: value }));
  const updateKai = (key: KaiKey, value: number) => setData((prev) => ({ ...prev, kai: { ...prev.kai, [key]: value } }));

  return <div className="app-shell"><header className="doc-header"><div className="container header-inner"><img src={logoHeader} alt="Doc ROI" /><nav><a href="#calculadora">Calculadora</a><a href="#indicadores">Indicadores</a><a href="#metodo">Metodo</a></nav></div></header>
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,7,11,.96), rgba(0,59,92,.82)), url(${heroBg})` }}><div className="container hero-grid"><div><span className="eyebrow">Doc ROI · Calculadora ROI Digital</span><h1>Del retorno estimado al Customer Equity.</h1><p>Una calculadora formativa para entender ROI, Payback, LTV y capacidad de monetizacion del dato sin perder lectura ejecutiva.</p><div className="hero-actions"><a className="primary-btn" href="#calculadora">Iniciar calculo</a><a className="ghost-btn" href="#metodo">Ver metodo</a></div></div><div className="objective-panel"><h2>Objetivo clinico</h2><p>Convertir hipotesis economicas en indicadores claros para decidir si una iniciativa digital compensa, en cuanto tiempo se recupera y si supera la referencia financiera.</p><dl><div><dt>Dificultad</dt><dd>Ejecutiva aplicada</dd></div><div><dt>Resultado</dt><dd>ROI, CE, LTV, Payback</dd></div><div><dt>Uso</dt><dd>Decision, aprendizaje y briefing</dd></div></dl></div></div></section>
    <main><section className="route container" id="metodo"><span className="eyebrow">Ruta formativa</span><h2>De los datos a la decision</h2><div className="diiip">{['Datos','Retorno','ROI','Customer Equity','Decision'].map((x, i) => <div key={x}><span>{x}</span><p>{['inputs declarados','retorno bruto y beneficio','retorno sobre coste','ROI frente a WACC','lectura ejecutiva'][i]}</p></div>)}</div></section>
      <section className="builder container" id="calculadora"><div className="builder-head"><span className="eyebrow">Constructor guiado</span><h2>{steps[step]}</h2><p>Completa solo lo necesario. Si falta un dato, el indicador queda como no calculable; nunca convertimos desconocido en cero.</p></div><div className="progress-wrap"><div className="progress-meta"><span>Paso {step + 1} de {steps.length}</span><strong>{Math.round(((step + 1) / steps.length) * 100)}%</strong></div><div className="progress-track"><div style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div></div>
        <div className="builder-grid"><aside className="step-list">{steps.map((s, i) => <button key={s} className={i === step ? 'active' : ''} onClick={() => setStep(i)}><span>{i + 1}</span>{s}</button>)}</aside><main className="wizard-card">
          {step === 0 && <section className="form-section"><h3>Contexto del escenario</h3><p>Identifica el caso de negocio antes de entrar en numeros.</p><div className="form-grid two"><TextField label="Empresa o proyecto" value={data.company} onChange={(v) => update('company', v)} /><TextField label="Pais o territorio" value={data.territory} onChange={(v) => update('territory', v)} /><TextField label="Sector" value={data.sector} onChange={(v) => update('sector', v)} /><TextField label="Objetivo de negocio" value={data.objective} onChange={(v) => update('objective', v)} area /></div><Teaching title="Por que empezamos aqui">El ROI no vive solo en Excel. Depende del territorio, sector, objetivo y tipo de decision que quiere tomar la direccion.</Teaching></section>}
          {step === 1 && <section className="form-section"><h3>Diagnostico KAI C-Level</h3><p>Escala 1-5: 1 ausente, 3 parcial, 5 optimizado.</p><div className="kai-grid">{kaiQuestions.map(([key, name, symbol, question]) => <article className="kai-question" key={key}><div><strong>{name}</strong><span>({symbol})</span><p>{question}</p></div><div className="scale">{[1,2,3,4,5].map((v) => <button key={v} className={data.kai[key] === v ? 'selected' : ''} onClick={() => updateKai(key, v)}>{v}</button>)}</div></article>)}</div><Teaching title="Que mide esta parte">No evaluamos personas. Medimos capacidad de convertir dato, decision, SPO, productividad y cartera en monetizacion repetible.</Teaching></section>}
          {step === 2 && <section className="form-section"><h3>Economia del escenario</h3><p>Estos datos alimentan ROI, Customer Equity y Payback.</p><div className="form-grid two"><Field label="Ingreso o margen potencial" value={data.revenuePotential} onChange={(v) => update('revenuePotential', v)} /><Field label="% capturable" value={data.revenueCapture} onChange={(v) => update('revenueCapture', v)} percent /><Field label="Eficiencia economica potencial" value={data.efficiencyPotential} onChange={(v) => update('efficiencyPotential', v)} /><Field label="% eficiencia capturable" value={data.efficiencyCapture} onChange={(v) => update('efficiencyCapture', v)} percent /><Field label="Coste atribuible" value={data.cost} onChange={(v) => update('cost', v)} /><Field label="WACC o referencia financiera %" value={data.wacc} onChange={(v) => update('wacc', v)} percent /><Field label="Periodo de analisis en meses" value={data.periodMonths} onChange={(v) => update('periodMonths', v.replace(/\D/g, ''))} percent /></div><Teaching title="Formula principal">Retorno bruto = ingresos capturables + eficiencia capturable. ROI = beneficio neto / coste. Customer Equity = ROI - WACC.</Teaching></section>}
          {step === 3 && <section className="form-section"><h3>LTV y recuperacion</h3><p>Indicadores aproximados para entender valor de cliente y velocidad de recuperacion.</p><div className="form-grid two"><Field label="Ticket medio" value={data.ticket} onChange={(v) => update('ticket', v)} /><Field label="Frecuencia por periodo" value={data.frequency} onChange={(v) => update('frequency', v.replace(/[^0-9,.]/g, ''))} percent /><Field label="Vida media cliente" value={data.lifetime} onChange={(v) => update('lifetime', v.replace(/[^0-9,.]/g, ''))} percent /><Field label="Margen bruto %" value={data.grossMargin} onChange={(v) => update('grossMargin', v)} percent /><Field label="CAC opcional" value={data.cac} onChange={(v) => update('cac', v)} /></div><Teaching title="Lectura LTV">LTV = ticket x frecuencia x vida media x margen. Payback estima los meses para recuperar la inversion si el retorno se reparte linealmente.</Teaching></section>}
          {step === 4 && <section className="form-section"><h3>Resultado ejecutivo</h3><p>Lectura para direccion: compensacion economica, valor adicional y palancas.</p><div className="result-grid" id="indicadores"><Kpi title="ROI" value={pct(calc.roi)} text={roiReading(calc.roi)} /><Kpi title="Customer Equity" value={pct(calc.customerEquity)} text={ceReading(calc.customerEquity)} /><Kpi title="Retorno bruto" value={euro(calc.grossReturn)} text="Ingresos capturables mas eficiencia capturable. Es la base economica del escenario." /><Kpi title="Beneficio neto" value={euro(calc.netBenefit)} text="Retorno bruto menos coste atribuible. Ayuda a ver excedente antes de lectura financiera." /><Kpi title="LTV aproximado" value={euro(calc.ltv)} text="Valor estimado de cliente durante su relacion. Es orientativo y depende de recurrencia, margen y vida media." /><Kpi title="Payback aproximado" value={months(calc.payback)} text="Tiempo estimado para recuperar la inversion si el retorno se comporta de forma lineal." /><Kpi title="LTV/CAC" value={calc.ltvCac === null ? 'No calculable' : `${calc.ltvCac.toFixed(1).replace('.', ',')}x`} text="Relacion aproximada entre valor de cliente y coste de adquisicion." /><Kpi title="Grado de monetizacion del dato" value={pct(calc.monetization)} text={monetizationReading(calc.monetization)} /></div><Teaching title="Lectura final">Si ROI supera WACC, aparece Customer Equity positivo. Si no lo supera, hay que mejorar retorno, eficiencia, coste o capacidades KAI.</Teaching></section>}
          <div className="wizard-actions"><button className="secondary-btn" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft size={18}/>Anterior</button><button className="secondary-btn" onClick={() => setData(initialData)}><RotateCcw size={18}/>Reiniciar</button><button className="primary-btn small" disabled={step === steps.length - 1} onClick={() => setStep(step + 1)}>Siguiente<ArrowRight size={18}/></button></div></main><aside className="summary-panel"><h3>Signos vitales</h3><Kpi title="ROI" value={pct(calc.roi)} text="Retorno sobre coste." /><Kpi title="Customer Equity" value={pct(calc.customerEquity)} text="ROI menos WACC." /><Kpi title="Payback" value={months(calc.payback)} text="Recuperacion estimada." /><Kpi title="KAI" value={pct(calc.kaiStar)} text="Capacidad estructural formal." /><button className="primary-btn small" onClick={() => window.print()}><Download size={18}/>Descargar PDF</button></aside></div></section>
      <section className="faq container"><span className="eyebrow">Notas metodologicas</span><h2>Como leer los resultados</h2><details open><summary>ROI</summary><p>ROI = (retorno bruto - coste) / coste. Es la forma mas clara de ver si el escenario compensa economicamente.</p></details><details><summary>Customer Equity</summary><p>Customer Equity = ROI - WACC. Si es positivo, el escenario supera la referencia financiera declarada.</p></details><details><summary>LTV y Payback</summary><p>Son aproximaciones pedagogicas. Sirven para orientar decision, no sustituyen analitica real ni datos CRM.</p></details></section></main><footer className="footer"><div className="container footer-inner"><img src={logoFooter} alt="Doc ROI" /><p>Doc ROI · Calculadora ROI Digital. Diagnosticar el dato. Activar decisiones. Monetizar resultados.</p></div></footer></div>;
}
