# Doc ROI · Calculadora ROI Digital V2

Calculadora formativa para estimar ROI, Customer Equity, LTV, Payback aproximado y grado de monetizacion del dato con estetica Doc ROI basada en la plantilla BuyerPersona.

## Stack

- Vite
- React
- TypeScript
- CSS propio
- Lucide React

## Instalacion

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

El proyecto incluye `base: '/Calculadora_ROI_Digital/'` en `vite.config.ts` para publicacion en GitHub Pages.

## Formula Ejecutiva

### Retorno bruto estimado

```text
Retorno bruto = (Ingreso potencial x % capturable) + (Eficiencia potencial x % capturable)
```

### Beneficio neto

```text
Beneficio neto = Retorno bruto - Coste atribuible
```

### ROI

```text
ROI = (Retorno bruto - Coste atribuible) / Coste atribuible
```

Se muestra en porcentaje.

### Customer Equity

```text
Customer Equity = ROI - WACC
```

Se muestra en porcentaje. Si es positivo, el ROI supera la referencia financiera declarada.

### LTV aproximado

```text
LTV = Ticket medio x Frecuencia x Vida media cliente x Margen bruto
```

### Payback aproximado

```text
Payback meses = Coste atribuible / (Retorno bruto / Periodo meses)
```

### Grado de monetizacion del dato

```text
Grado de monetizacion = promedio respuestas KAI / 5
```

Se muestra en porcentaje.

## Lectura KAI

La app conserva trazabilidad KAI·ROI como diagnostico de capacidad:

```text
psi_i = promedio(DataActivation_i, I_net_i)
SPO_i = CC_i x ABCD_i x NPS_i
KAI_i* = phi_i x u_i x f_i x psi_i x SPO_i x P_i x Gamma_g(i),t
```

Importante: KAI_i* no descuenta automaticamente el dinero del escenario. Funciona como diagnostico de capacidad estructural.

## Reglas de datos

- Un dato desconocido no se convierte en cero.
- Si falta un dato necesario, el indicador aparece como no calculable.
- ROI requiere retorno bruto y coste.
- Customer Equity requiere ROI y WACC.
- LTV requiere ticket, frecuencia, vida media y margen.
- Payback requiere retorno bruto positivo y coste.

## Identidad Visual

Basada en el modelo BuyerPersona:

- Hero pedagogico
- Ruta formativa
- Constructor guiado
- Panel lateral de signos vitales
- Feed formativo
- Cards ejecutivas
- Estetica Doc ROI negro, azul profundo, blanco y gris clinico
