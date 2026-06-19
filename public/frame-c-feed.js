const docroiFrameCFeeds = [
  {
    title: "Frame C · Contexto ejecutivo",
    kicker: "Vitamina formativa · Portada del caso",
    lead: "Esta pantalla no pide datos por burocracia. Sirve para que el calculo tenga contexto de negocio: que empresa evaluas, en que mercado compite, que madurez tiene y bajo que referencia financiera debe defenderse.",
    cards: [
      { term: "Empresa", what: "Es la unidad que estas evaluando: puede ser una empresa completa, una marca, una division, una tienda, un area comercial o un proyecto concreto.", write: "Escribe un nombre reconocible. Ejemplo: Doc ROI, Unidad Ecommerce, Campana Retail Media Q3 o Proyecto CRM.", read: "Ese nombre aparecera en el informe para que el resultado no quede abstracto.", watch: "No pongas solo 'empresa'. El informe pierde trazabilidad." },
      { term: "Pais o territorio", what: "Indica el mercado principal donde ocurre el caso. El territorio condiciona precio, conversion, coste de medios, poder adquisitivo y madurez digital.", write: "Usa una referencia simple: Espana, Mexico, LATAM, Madrid, Andalucia, Europa o mercado B2B internacional.", read: "Ayuda a explicar por que una conversion o un ARPU pueden ser razonables en un contexto y no en otro.", watch: "No mezcles territorios si tienen precios o costes muy distintos." },
      { term: "Sector", what: "Situa la actividad economica. No se interpreta igual un ROI en educacion, retail, salud privada, B2B industrial, ecommerce o servicios profesionales.", write: "Pon el sector con lenguaje normal: retail, moda, formacion, seguros, SaaS, consultoria, turismo, alimentacion, banca.", read: "El sector ayuda a leer el ciclo de venta, la recurrencia, el margen y la velocidad de retorno.", watch: "Evita categorias demasiado amplias como 'servicios' si puedes concretar un poco mas." },
      { term: "Tamano de empresa", what: "No mide calidad; mide escala. Una pyme, una empresa mid-market y una enterprise tienen estructuras de coste, decision y riesgo diferentes.", write: "Usa pyme, mid-market, enterprise, startup, universidad, grupo empresarial o unidad de negocio.", read: "Sirve para ajustar expectativas: una empresa grande puede necesitar mas CAPEX y mas tiempo; una pequena puede decidir mas rapido.", watch: "No lo uses como juicio. Es solo contexto ejecutivo." },
      { term: "Madurez digital", what: "Resume el punto de partida: baja, media o alta. Indica cuanto dato, automatizacion, CRM, analitica o trazabilidad tiene ya la organizacion.", write: "Baja si casi todo es manual; media si hay herramientas pero poca conexion; alta si datos, procesos y decisiones ya estan integrados.", read: "Una madurez baja no impide ROI, pero suele exigir mas esfuerzo de implantacion y aprendizaje.", watch: "No pongas alta por deseo. Pon lo que podrias defender ante un comite." },
      { term: "WACC o referencia financiera", what: "Es el liston minimo que debe superar el ROI. Si no conoces el WACC real, funciona como umbral financiero de exigencia.", write: "Escribe 10, 12, 15 o 20 segun el nivel de exigencia. Si dudas, usa 15 como referencia prudente para clase.", read: "Customer Equity compara ROI contra este liston. Si ROI es 22% y WACC 15%, el excedente es positivo.", watch: "Escribe 15 para 15%, no 0,15." },
      { term: "Horizonte de analisis", what: "Es el periodo sobre el que quieres evaluar el caso. No todos los proyectos se juzgan en el mismo plazo.", write: "Usa 3 o 6 meses para campanas cortas, 12 meses para un caso anual, 24 o 36 meses para inversiones largas.", read: "El horizonte afecta al payback y a la lectura temporal del retorno.", watch: "No compares un ROI de 3 meses con uno de 24 meses sin decirlo." },
      { term: "Narrativa del caso", what: "Es la historia ejecutiva que da sentido al calculo: que decision quieres tomar y que hipotesis quieres comprobar.", write: "Ejemplo: queremos saber si una campana de captacion compensa su coste; o si una automatizacion libera suficiente valor para financiarse.", read: "Una buena narrativa convierte numeros en decision: invertir, escalar, corregir o pausar.", watch: "Si no puedes contar el caso en tres lineas, probablemente el calculo esta mal enfocado." }
    ],
    note: "Medicina Doc ROI: antes de calcular, define el caso. El ROI no empieza en Excel; empieza en una pregunta ejecutiva bien formulada."
  },
  {
    title: "Frame C · Audiencia y conversion",
    kicker: "Vitamina formativa · Del alcance al cliente",
    lead: "Esta pantalla convierte una poblacion potencial en una hipotesis de clientes atribuibles. La clave no es inflar audiencia: es defender que parte de esa audiencia puede convertirse en valor.",
    cards: [
      { term: "Audiencia media", what: "Es el volumen base de personas, contactos, sesiones, impactos o registros sobre los que trabaja el escenario.", write: "Pon una media mensual razonable. Puede venir de Analytics, CRM, impresiones, base de datos, visitas, asistentes o audiencia estimada.", read: "Audiencia no es ingreso. Solo es el punto de partida para estimar conversion.", watch: "No confundas audiencia total con audiencia util. Si solo una parte puede comprar, usa esa parte." },
      { term: "Meses del escenario", what: "Sirve para distribuir el potencial en el tiempo. Un caso anual no se comporta igual que una campana de Black Friday o un lanzamiento.", write: "Marca los meses que realmente participan en el escenario. Si es anual, usa 12; si es campana corta, usa los meses activos.", read: "La curva mensual ayuda a entender caja, esfuerzo comercial y payback.", watch: "No pongas 12 meses si la accion solo vive 2 meses." },
      { term: "Patron de evolucion", what: "Describe la forma de la curva: estable, lanzamiento progresivo, pico inicial, pico final o estacionalidad.", write: "Elige el patron que mas se parezca al caso. Si no sabes, usa estable como hipotesis conservadora.", read: "El patron evita rellenar mes a mes sin criterio y hace mas facil explicar la logica del escenario.", watch: "No uses crecimiento progresivo si no hay razon comercial para esperar aprendizaje o escalado." },
      { term: "Ajuste mensual", what: "Permite corregir meses concretos por campanas, vacaciones, ferias, rebajas, temporada alta o caidas esperadas.", write: "Ajusta solo cuando tengas una razon: Navidad, vuelta al cole, feria sectorial, lanzamiento, cierre fiscal.", read: "Un ajuste bien explicado mejora la credibilidad del modelo.", watch: "Muchos ajustes sin explicacion parecen maquillaje del resultado." },
      { term: "Conversion", what: "Es el porcentaje de la audiencia util que termina en cliente, lead valido, pedido, reserva o accion economica medible.", write: "Escribe 2 para 2%, 5 para 5%. Si no tienes historico, usa un tramo prudente y explicalo.", read: "Clientes atribuibles = audiencia util x conversion. Pequenos cambios aqui pueden alterar mucho el ROI.", watch: "No uses conversion de clic si el resultado que valoras es venta. Cada conversion debe corresponder al objetivo real." },
      { term: "Fuente de la conversion", what: "Es la evidencia que respalda el porcentaje: historico propio, benchmark, experimento, media sectorial o hipotesis docente.", write: "Anota de donde sale: CRM 2025, Analytics, campana anterior, benchmark retail media, supuesto de clase.", read: "La fuente convierte una cifra en una hipotesis defendible.", watch: "Una conversion sin fuente no es necesariamente falsa, pero es mas debil ante direccion." }
    ],
    note: "Formula de bolsillo: clientes atribuibles = audiencia util x conversion. La pildora importante es no confundir visibilidad con valor."
  },
  {
    title: "Frame C · Ingresos y canalidad",
    kicker: "Vitamina formativa · De la interaccion al euro",
    lead: "Aqui separas dos cosas: primero entiendes donde vive la relacion con el Buyer Persona; despues traduces esa relacion en ingresos estimados con clientes, conversion y ARPU.",
    cards: [
      { term: "Terminal", what: "Es la pantalla, dispositivo o entorno desde el que la persona interactua: movil, ordenador, aula, evento, punto de venta, radio o imprenta.", write: "Selecciona todas las terminales relevantes. Si falta una, usa Otros y escribela.", read: "La terminal cambia la atencion: movil pide rapidez; escritorio permite analisis; evento permite confianza; punto de venta permite decision inmediata.", watch: "No pongas terminales por moda. Elige donde realmente decide o compara el Buyer Persona." },
      { term: "Medio", what: "Es el gran espacio por donde circula la comunicacion: web, email, buscadores, redes, podcast, streaming, prensa, radio, eventos o comunidad.", write: "Marca los medios que participan en la relacion, no todos los que existen.", read: "El medio ayuda a explicar como se genera atencion y donde empieza la oportunidad comercial.", watch: "No confundas medio con soporte. 'Redes sociales' es medio; LinkedIn o TikTok son soportes." },
      { term: "Soporte", what: "Es la plataforma concreta donde ocurre la interaccion: LinkedIn, Instagram, YouTube, WhatsApp, landing, newsletter, marketplace, prensa o webinar.", write: "Elige los soportes reales donde se publicara, conversara, captara o convertira.", read: "El soporte aterriza la estrategia. No es lo mismo una landing que un post, ni LinkedIn que TikTok.", watch: "Si dices 'web', intenta concretar: landing, blog, comparativa, ecommerce, area privada." },
      { term: "Formato", what: "Es la pieza que recibe la persona: articulo, reel, CTA, newsletter, demo, webinar, guia PDF, banner, encuesta o comparativa.", write: "Marca formatos que realmente puedan existir en el caso. Usa Otros si necesitas una pieza nueva.", read: "El formato cambia profundidad y conversion. Un reel genera atencion; una demo puede acercar la decision; una comparativa reduce incertidumbre.", watch: "No atribuyas venta directa a formatos que solo generan awareness si no hay una cadena intermedia." },
      { term: "Intencion relacional", what: "Explica para que usa esa interaccion el Buyer Persona: aprender, informarse, comparar, confiar, comprar, reservar, recomendar o fidelizar.", write: "Elige la intencion dominante. Puede haber varias, pero intenta identificar la principal.", read: "La intencion conecta UX y negocio: no se disena igual para aprender que para comprar.", watch: "Si la intencion es aprender, no esperes la misma conversion inmediata que si la intencion es comprar." },
      { term: "Tipo cliente", what: "Clasifica a quien estas convirtiendo: audiencia, lead, cliente nuevo, cliente activo, pasivo o insatisfecho.", write: "Elige el tipo que mejor describe el escenario economico.", read: "Un cliente nuevo suele tener coste de captacion; un cliente activo puede tener upsell; un pasivo puede tener reactivacion.", watch: "No mezcles clientes nuevos y recurrentes en la misma linea si tienen ARPU distinto." },
      { term: "Conv.", what: "El check indica si ese escenario debe convertirse en ingresos dentro del calculo.", write: "Dejalo marcado si esa fila debe contar. Desmarcalo si solo quieres registrar una interaccion cualitativa.", read: "Sirve para separar aprendizaje de monetizacion directa.", watch: "Si todo esta marcado, el modelo puede sobreestimar ingresos." },
      { term: "Clientes captados", what: "Es el numero de clientes, pedidos, leads cualificados o conversiones economicas esperadas para esa linea.", write: "Pon una cifra defendible. Puede venir de audiencia x conversion o de una estimacion comercial.", read: "Es una de las palancas mas sensibles del ROI.", watch: "No metas alcance, visitas o impresiones si todavia no son clientes o conversiones de valor." },
      { term: "% conversion", what: "Es la tasa que convierte la base de oportunidad en resultado economico.", write: "Escribe 3 para 3%. Si ya estas poniendo clientes captados finales, usa 100 o deja coherente la logica del caso.", read: "Permite modelar escenarios prudentes, medios y optimistas.", watch: "Evita duplicar conversion: si clientes captados ya son clientes finales, no vuelvas a reducirlos sin querer." },
      { term: "ARPU esperado", what: "Es el ingreso medio por cliente. En ecommerce puede ser ticket medio; en servicios puede ser cuota, proyecto o valor medio de contrato.", write: "Pon euros por cliente o pedido. Ejemplo: 60, 250, 1200.", read: "Valor esperado = clientes x conversion x ARPU.", watch: "Si el negocio tiene margen bajo, no confundas ingreso bruto con margen. Decide que quieres medir y dilo." }
    ],
    note: "Medicina Doc ROI: no intentamos combinar todo con todo. Primero ordenamos la canalidad; despues calculamos el valor economico con pocas variables defendibles."
  },
  {
    title: "Frame C · Gastos OPEX",
    kicker: "Vitamina formativa · El coste de operar",
    lead: "OPEX son los gastos necesarios para ejecutar y mantener la accion durante el periodo: medios, agencia, creatividad, herramientas, personas, contenido y gestion recurrente.",
    cards: [
      { term: "Concepto", what: "Describe el gasto operativo: paid media, creatividad, agencia, contenido, CRM, licencia mensual, email marketing, community, produccion, analitica o soporte.", write: "Una linea por gasto relevante. Si dos gastos tienen naturaleza distinta, separalos.", read: "Permite ver en que se consume el presupuesto y que parte pesa mas en el ROI.", watch: "No escondas costes pequenos si son recurrentes; pueden cambiar el payback." },
      { term: "Etiqueta o campana", what: "Sirve para conectar el gasto con la fuente de ingreso o con el bloque que lo necesita.", write: "Usa nombres claros: SEO, RRSS-LP, MGM-BBDD, LinkedIn Ads, Newsletter, Webinar, Mixto / varios.", read: "La etiqueta ayuda a defender trazabilidad: que coste sostiene que ingreso.", watch: "Si un gasto sirve para varias campanas, usa Mixto / varios y explicalo." },
      { term: "Unidad", what: "Es como se mide el recurso: horas, jornadas, piezas, campanas, licencias, paquetes, anuncios, meses o personas.", write: "Elige una unidad que tenga sentido para multiplicar por coste unitario.", read: "La unidad hace que el gasto sea auditable y no una cifra puesta a ojo.", watch: "No mezcles horas y paquetes en la misma linea." },
      { term: "Numero de unidades", what: "Cantidad del recurso que vas a necesitar: 10 horas, 4 piezas, 2 meses, 1 paquete, 3 campanas.", write: "Pon unidades completas o decimales si aplica.", read: "Coste total = unidades x coste unitario.", watch: "Revisa si el numero cubre todo el horizonte de analisis." },
      { term: "Coste por unidad", what: "Es lo que cuesta cada hora, pieza, licencia, campana o paquete.", write: "Introduce el coste en euros sin complicarlo. Ejemplo: 80 por hora, 500 por pieza, 1200 por campana.", read: "Ayuda a comparar si el gasto esta en medios, tecnologia, produccion o personas.", watch: "No introduzcas aqui el coste total si ya has puesto varias unidades, porque duplicarias el gasto." },
      { term: "Asociado a", what: "Conecta el gasto con ingresos, campana o bloque. Puede ser una fuente concreta o Mixto / varios.", write: "Selecciona la campana relacionada. Si afecta a varias, usa Mixto / varios.", read: "Esta relacion es oro para el comite: muestra que cada gasto tiene una razon de negocio.", watch: "Un coste sin asociacion puede ser valido, pero sera mas dificil de defender." },
      { term: "OPEX total", what: "Es la suma de todos los gastos operativos del escenario.", write: "No se escribe directamente si la tabla lo calcula; revisa que cada linea este bien.", read: "El ROI compara ingresos contra OPEX + CAPEX. Si el OPEX sube, el ROI baja salvo que tambien suban ingresos.", watch: "No olvides costes de gestion, medicion o mantenimiento si son necesarios para que el proyecto funcione." }
    ],
    note: "Pildora Doc ROI: un gasto no es malo por existir. Es malo cuando no se puede conectar con aprendizaje, conversion, eficiencia o valor economico."
  },
  {
    title: "Frame C · CAPEX e inversion",
    kicker: "Vitamina formativa · Lo que habilita capacidad",
    lead: "CAPEX no es gasto corriente: es inversion inicial o activo necesario para que el proyecto exista, escale o se automatice. Si tu caso no lleva inversion, puedes declararlo y seguir.",
    cards: [
      { term: "No tengo inversion", what: "Muchos casos de marketing, comunicacion o docencia no necesitan CAPEX. Funcionan solo con gastos operativos.", write: "Pulsa este boton si no contemplas inversion inicial.", read: "El modelo seguira calculando con OPEX e ingresos. No fuerza inversion donde no la hay.", watch: "No metas CAPEX solo por rellenar. Si no existe, mejor dejarlo claro." },
      { term: "Categoria", what: "Ordena la inversion: software cliente, software servidor, hardware, integracion, desarrollo, documentacion, despliegue o pruebas.", write: "Elige la familia que mejor explique el activo.", read: "La categoria ayuda a ver si la inversion crea tecnologia, infraestructura o capacidad operativa.", watch: "No mezcles hardware con servicios profesionales en una misma linea." },
      { term: "Concepto", what: "Describe el activo o trabajo: base de datos, servidor, desarrollo SEO, landing, integracion CRM, documentacion, pruebas o despliegue.", write: "Escribe un concepto concreto y entendible por negocio.", read: "El concepto aparece en la lectura de inversion y permite justificar el desembolso.", watch: "Evita conceptos genericos como 'varios' si el importe es alto." },
      { term: "Etiqueta de unidad", what: "Explica como se mide la inversion: licencias, terabytes, maquinas, persona-jornada, terminales, ordenadores o configuraciones.", write: "Usa la unidad que permita multiplicar cantidad por precio.", read: "Hace que el CAPEX sea transparente y comparable.", watch: "Si no puedes definir unidad, revisa si realmente es CAPEX o un coste general." },
      { term: "Nº de unidades", what: "Cantidad de activos, licencias, jornadas o paquetes que necesitas.", write: "Pon el numero real o estimado. Ejemplo: 1 servidor, 50 jornadas, 10 licencias.", read: "CAPEX no recurrente = unidades x inversion por unidad.", watch: "No olvides si el precio que tienes ya incluye todas las unidades." },
      { term: "Inversion unidad", what: "Coste de cada unidad de CAPEX.", write: "Introduce euros por unidad. Ejemplo: 320 por jornada, 2500 por servidor, 639 por licencia.", read: "Permite calcular la inversion inicial que el proyecto debe recuperar.", watch: "No mezcles coste anual recurrente con inversion inicial en este campo." },
      { term: "No recurrente", what: "Es el desembolso inicial de inversion. Normalmente ocurre al principio y afecta mucho al payback.", write: "La tabla lo calcula si unidades e inversion unidad estan bien.", read: "Cuanto mas CAPEX inicial, mas tarda la recuperacion si los ingresos llegan lentamente.", watch: "Un CAPEX alto puede ser correcto si crea capacidad reutilizable." },
      { term: "Recurrencia anual", what: "Algunas inversiones generan mantenimiento, soporte, actualizaciones o evolucion anual.", write: "Usa el porcentaje de mantenimiento si aplica. Por defecto puede ser 10% como aproximacion docente.", read: "La recurrencia anual recuerda que una inversion tambien puede tener coste de vida.", watch: "No confundas mantenimiento anual con el precio de compra inicial." }
    ],
    note: "Medicina Doc ROI: si OPEX mantiene la campana viva, CAPEX construye la capacidad. Uno opera; el otro habilita."
  },
  {
    title: "Frame C · Customer Equity y KAI·ROI",
    kicker: "Vitamina formativa · Capacidad de monetizar el dato",
    lead: "Esta pantalla ya no pide una base economica extra. Toma ingresos, OPEX, CAPEX, WACC y horizonte de los apartados anteriores, y anade la lectura KAI·ROI para explicar capacidad estructural.",
    cards: [
      { term: "Inteligencia / decision", what: "Evalua si la empresa decide con criterio, datos y prioridades compartidas, no solo por intuicion o urgencia.", write: "Responde de 1 a 5: 1 ausente, 3 parcial, 5 integrado.", read: "Una puntuacion baja indica que el ROI puede depender demasiado de personas concretas o decisiones aisladas.", watch: "No evalua personas; evalua sistema de decision." },
      { term: "Estructura", what: "Mide si existen procesos, reglas y responsabilidades que hacen repetible la ejecucion comercial y operativa.", write: "Puntua segun lo que existe hoy, no segun lo que se desea implantar.", read: "Sin estructura, incluso una buena campana puede no escalar ni repetirse.", watch: "Si cada equipo trabaja con criterios distintos, no pongas madurez alta." },
      { term: "Dato + IA", what: "Pregunta si los datos se capturan, ordenan, conectan y se convierten en informacion util para decidir.", write: "Valora CRM, analitica, dashboards, automatizacion, calidad de datos e IA aplicada.", read: "Cuando esta dimension es baja, la empresa puede tener datos pero no inteligencia accionable.", watch: "Tener muchas herramientas no equivale a tener buen dato." },
      { term: "SPO", what: "Integra cliente, oferta y satisfaccion. No sustituye la formula KAI·ROI; es una capa operativa para leer orquestacion comercial.", write: "Evalua si la empresa prioriza clientes, productos/servicios y experiencia de forma conectada.", read: "Si SPO es bajo, puede haber esfuerzo comercial sin foco economico claro.", watch: "No lo confundas solo con NPS. SPO es mas amplio." },
      { term: "Productividad", what: "Mide si la organizacion conoce el esfuerzo real que necesita para generar resultados: tiempos, SLAs, automatizacion, eficiencia y capacidad operativa.", write: "Puntua segun evidencias: dashboards, SLAs, tiempos medidos, automatizacion o productividad comercial.", read: "Productividad alta ayuda a que el ROI sea repetible, no solo puntual.", watch: "No confundas trabajar mucho con trabajar productivamente." },
      { term: "Cartera / contexto", what: "Evalua si se monitoriza la salud de la cartera: recurrencia, fuga, riesgo, crecimiento, valor y evolucion por segmento.", write: "Puntua si hay seguimiento real de clientes, segmentos o cohortes.", read: "Una cartera sana protege Customer Equity; una cartera opaca dificulta anticipar fuga o priorizar valor.", watch: "No basta conocer ventas totales; hay que entender calidad de cartera." },
      { term: "ROI", what: "En esta version se calcula de forma ejecutiva: ROI = (Ingresos - costes) / costes.", write: "No lo rellenas aqui. Sale de ingresos, OPEX y CAPEX ya declarados.", read: "ROI positivo significa que el escenario recupera costes y deja excedente.", watch: "Si el coste es cero o falta, el resultado no debe inventarse." },
      { term: "Customer Equity", what: "Se lee como excedente sobre la referencia financiera: Customer Equity = ROI - WACC.", write: "No lo escribes aqui. El sistema lo calcula con ROI y WACC.", read: "Si es positivo, el escenario supera el liston financiero. Si es negativo, necesita mejorar ingresos, coste, conversion o horizonte.", watch: "Un CE negativo no es fracaso automatico; es una senal para ajustar palancas." },
      { term: "Grado de monetizacion del dato", what: "Resume la madurez KAI·ROI en porcentaje: cuanto de la capacidad directiva, dato, cliente, oferta, productividad y cartera esta preparada para crear valor.", write: "Sale de las respuestas 1-5. No es contabilidad; es diagnostico de capacidad.", read: "Por debajo de 50% hay mucho recorrido; 50-75% indica buen camino; por encima de 75% muestra fortaleza para escalar.", watch: "No sustituye el ROI financiero. Explica por que el ROI puede ser mas o menos repetible." }
    ],
    note: "Pildora Doc ROI: ROI mide retorno economico; KAI·ROI explica capacidad para repetir, escalar y gobernar ese retorno."
  },
  {
    title: "Frame C · Informe ejecutivo",
    kicker: "Vitamina formativa · De los numeros a la decision",
    lead: "El informe no debe ser una tabla fria. Debe explicar que sale, por que sale, que palanca lo mueve y que decision conviene tomar.",
    cards: [
      { term: "Ingresos", what: "Son los euros estimados que el escenario puede generar a partir de clientes, conversion y ARPU.", write: "Revisa si los ingresos proceden de hipotesis defendibles y no de deseo comercial.", read: "Si los ingresos suben, ROI y Customer Equity suelen mejorar, siempre que el coste no suba igual o mas.", watch: "No mezcles ingresos brutos y margen sin decirlo." },
      { term: "Coste total", what: "Suma OPEX y CAPEX. Es el liston que el escenario debe recuperar.", write: "Comprueba que no falten costes de medios, produccion, herramientas, personas, mantenimiento o inversion.", read: "Un coste bien declarado da confianza al resultado aunque baje el ROI.", watch: "Un ROI precioso con costes incompletos no sirve para decidir." },
      { term: "ROI", what: "ROI = beneficio neto / coste total. Beneficio neto = ingresos - coste total.", write: "Mira si el ROI sale por ingresos altos, costes bajos o ambos.", read: "ROI positivo indica recuperacion; ROI alto indica potencial; ROI negativo indica que el escenario no compensa tal como esta.", watch: "El ROI no dice cuando recuperas el dinero; para eso mira payback." },
      { term: "Customer Equity", what: "Customer Equity ejecutivo = ROI - WACC. Mide cuanto excedente queda despues de superar la referencia financiera.", write: "Compara el resultado con el WACC declarado en contexto ejecutivo.", read: "Si ROI es 30% y WACC 15%, CE es +15 puntos. Si ROI es 8% y WACC 15%, CE es negativo.", watch: "No es una nota moral. Es una lectura financiera para decidir." },
      { term: "LTV", what: "LTV aproxima el valor de un cliente a lo largo del tiempo cuando hay recurrencia o relacion repetida.", write: "Interpreta LTV con cautela si el caso es de compra unica.", read: "Un LTV alto permite aceptar costes de captacion mayores, siempre que haya retencion real.", watch: "No uses LTV aspiracional si no tienes recurrencia demostrable." },
      { term: "Payback", what: "Indica el momento aproximado en que el flujo acumulado recupera el coste inicial.", write: "Leelo junto al horizonte: no es igual recuperar en 2 meses que en 22.", read: "Un payback corto reduce riesgo de caja; uno largo puede requerir paciencia, financiacion o fases.", watch: "Un ROI alto con payback largo todavia puede ser dificil de sostener." },
      { term: "Decision recomendada", what: "El informe debe terminar en accion: escalar, optimizar, testear, pausar o redefinir la hipotesis.", write: "Usa los indicadores para justificar una decision clara.", read: "La mejor calculadora no da solo numeros; ayuda a decidir el siguiente paso.", watch: "Evita decir 'depende' sin explicar de que depende." }
    ],
    note: "Decision Doc ROI: escala lo que crea valor, optimiza lo que queda cerca del umbral y pausa lo que consume capital sin aprendizaje suficiente."
  }
];

function docroiFrameCCard(card) {
  const watch = card.watch ? `<p class="frame-c-watch"><b>Cuidado:</b> ${card.watch}</p>` : "";
  return `<article class="frame-c-card"><span>${card.term}</span><p><b>Que es:</b> ${card.what}</p><p><b>Que pongo:</b> ${card.write}</p><p><b>Como se lee:</b> ${card.read}</p>${watch}</article>`;
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
