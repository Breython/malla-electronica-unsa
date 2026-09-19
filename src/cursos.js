// src/cursos.js
export const planDeEstudios = [
  // --- PRIMER AÑO - Semestre 1 ---
  { id: "2501101", label: "Metodología del Trabajo Académico", sem: 1, prq: [] },
  { id: "2501102", label: "Intro. a la Ing. Electrónica", sem: 1, prq: [] },
  { id: "2501103", label: "CAD para Sist. Electrónicos", sem: 1, prq: [] },
  { id: "2501104", label: "Cálculo I", sem: 1, prq: [] },
  { id: "2501107", label: "Estadística y Mod. Probabilísticos", sem: 1, prq: [] },
  { id: "2501177", label: "Física I (Mecánica)", lab: { id: "2501175", label: "Lab. Física I (Mecánica)" }, sem: 1, prq: [] },
  { id: "2501176", label: "Programación para Electrónica I", lab: { id: "2501174", label: "Lab. Programación para Electrónica I" }, sem: 1, prq: [] },

  // --- PRIMER AÑO - Semestre 2 ---
  { id: "2501208", label: "Lingüística, Comp. y Redacción", sem: 2, prq: [] },
  { id: "2501209", label: "Realidad Nacional", sem: 2, prq: [] },
  { id: "2501210", label: "Álgebra Lineal", sem: 2, prq: ["2501104"] },
  { id: "2501211", label: "Cálculo II", sem: 2, prq: ["2501104"] },
  { id: "2501213", label: "Inglés Básico", sem: 2, prq: [] },
  { id: "2501288", label: "Física II (Elec. y Mag.)", lab: { id: "2501276", label: "Lab. Física II" }, sem: 2, prq: ["2501177"] },
  { id: "2501287", label: "Prog. para Electrónica II", lab: { id: "2501286", label: "Lab. Prog. para Electrónica II" }, sem: 2, prq: ["2501176"] },

  // --- SEGUNDO AÑO - Semestre 3 ---
  { id: "2502115", label: "Fundamentos Ciencia de Datos", sem: 3, prq: [] },
  { id: "2502116", label: "Química para Control de Procesos", lab: { id: "2502177", label: "Lab. Química para Control" }, sem: 3, prq: [] },
  { id: "2502117", label: "Ciudadanía e Interculturalidad", sem: 3, prq: [] },
  { id: "2502118", label: "Matemáticas Discretas", sem: 3, prq: ["2501210"] },
  { id: "2502119", label: "Ecuaciones Diferenciales", sem: 3, prq: ["2501211"] },
  { id: "2502120", label: "Física III (Fluidos y Termo)", lab: { id: "2502178", label: "Lab. Física III" }, sem: 3, prq: ["2501288"] },
  { id: "2502121", label: "Circuitos Eléctricos I", lab: { id: "2502179", label: "Lab. Circuitos Eléctricos I" }, sem: 3, prq: ["2501288"] },

  // --- SEGUNDO AÑO - Semestre 4 ---
  { id: "2502222", label: "Ecología y Conservación Amb.", sem: 4, prq: [] },
  { id: "2502223", label: "Matemática Aplicada a la Ing.", sem: 4, prq: ["2502119"] },
  { id: "2502224", label: "Física IV (Ondas y Ópticas)", lab: { id: "2502280", label: "Lab. Física IV" }, sem: 4, prq: ["2502120"] },
  { id: "2502225", label: "Circuitos Eléctricos II", lab: { id: "2502281", label: "Lab. Circuitos Eléctricos II" }, sem: 4, prq: ["2502121"] },
  { id: "2502226", label: "Electrónica Digital", lab: { id: "2502287", label: "Lab. Electrónica Digital" }, sem: 4, prq: ["2502121", "2502115"] },
  { id: "2502227", label: "Circuitos Electrónicos I", lab: { id: "2502282", label: "Lab. Circuitos Electrónicos I" }, sem: 4, prq: ["2502121"] },

  // --- TERCER AÑO - Semestre 5 ---
  { id: "2503128", label: "Ética General y Deontología", sem: 5, prq: [] },
  { id: "2503129", label: "Campos Electromagnéticos", sem: 5, prq: ["2502224"] },
  { id: "2503130", label: "Teoría de Control I", lab: { id: "2503183", label: "Lab. Teoría de Control I" }, sem: 5, prq: ["2502223"] }, // Corregido
  { id: "2503131", label: "Máquinas Eléctricas", lab: { id: "2503184", label: "Lab. Máquinas Eléctricas" }, sem: 5, prq: ["2502225"] },
  { id: "2503132", label: "Instalaciones Eléctricas Ind.", lab: { id: "2503185", label: "Lab. Instalaciones Eléctricas Ind." }, sem: 5, prq: ["2502225"] },
  { id: "2503133", label: "Sist. Basados en Microcontrolador", lab: { id: "2503188", label: "Lab. Sist. Microcontrolador" }, sem: 5, prq: ["2502226"] },
  { id: "2503134", label: "Circuitos Electrónicos II", lab: { id: "2503189", label: "Lab. Circuitos Electrónicos II" }, sem: 5, prq: ["2502227"] },

  // --- TERCER AÑO - Semestre 6 ---
  { id: "2503235", label: "Procesos Estocásticos", sem: 6, prq: ["2503129"] },
  { id: "2503236", label: "Teoría de Control II", lab: { id: "2503290", label: "Lab. Teoría de Control II" }, sem: 6, prq: ["2503130"] },
  { id: "2503237", label: "Accionamientos Eléctricos", lab: { id: "2503291", label: "Lab. Accionamientos Eléctricos" }, sem: 6, prq: ["2503131", "2503132"] },
  { id: "2503238", label: "Inteligencia Artificial en Electrónica", lab: { id: "2503292", label: "Lab. Intel. Artificial" }, sem: 6, prq: ["2503133", "2502115"] },
  { id: "2503239", label: "Circuitos Electrónicos III", lab: { id: "2503293", label: "Lab. Circuitos Electrónicos III" }, sem: 6, prq: ["2503134"] },
  { id: "2503240", label: "Arquitectura de Computadoras (E)", lab: { id: "2503294", label: "Lab. Arq. Computadoras" }, sem: 6, prq: ["2503133"] },
  { id: "2503241", label: "Formulación y Gestión Proy. (E)", sem: 6, prq: [] },
  { id: "2503242", label: "Seguridad Ind. e Higiene (E)", sem: 6, prq: [] },

  // --- CUARTO AÑO - Semestre 7 ---
  { id: "2504143", label: "Políticas Públicas y Anticorrupción", sem: 7, prq: [] },
  { id: "2504144", label: "Sistemas de Telecomunicaciones", lab: { id: "2504195", label: "Lab. Sist. Telecomunicaciones" }, sem: 7, prq: ["2503235", "2503239"] },
  { id: "2504145", label: "Sistemas de Control Tiempo Discreto", lab: { id: "2504196", label: "Lab. Control Tiempo Discreto" }, sem: 7, prq: ["2503236"] },
  { id: "2504146", label: "Instrumentación, Sensores y Act.", lab: { id: "2504197", label: "Lab. Instru., Sensores y Act." }, sem: 7, prq: ["2503237"] },
  { id: "2504147", label: "Microelectrónica", lab: { id: "2504198", label: "Lab. Microelectrónica" }, sem: 7, prq: ["2503238"] },
  { id: "2504148", label: "Tec. Elec. en Energías Renov. (E)", lab: { id: "2504199", label: "Lab. Energías Renovables" }, sem: 7, prq: ["2503237"] }, // Corregido
  { id: "2504149", label: "Ingeniería Biomédica (E)", lab: { id: "2504150", label: "Lab. Ingeniería Biomédica" }, sem: 7, prq: ["2503239"] },

  // --- CUARTO AÑO - Semestre 8 ---
  { id: "2504250", label: "Des. Emocional y Liderazgo", sem: 8, prq: [] },
  { id: "2504251", label: "Sistemas de Control Avanzado", lab: { id: "2504258", label: "Lab. Sist. Control Avanzado" }, sem: 8, prq: ["2504145"] },
  { id: "2504252", label: "Selección y Prog. de PLC", lab: { id: "2504259", label: "Lab. Selección y Prog. PLC" }, sem: 8, prq: ["2504146", "2503237"] },
  { id: "2504253", label: "Elect. de Potencia e Industrial", lab: { id: "2504260", label: "Lab. Elect. Potencia e Ind." }, sem: 8, prq: ["2504146"] },
  { id: "2504254", label: "Proc. Digital de Señales", lab: { id: "2504261", label: "Lab. Proc. Digital Señales" }, sem: 8, prq: ["2504147"] },
  { id: "2504255", label: "Mecanismos y Robótica (E)", lab: { id: "2504262", label: "Lab. Mecanismos y Robótica" }, sem: 8, prq: ["2504145"] },
  { id: "2504256", label: "Tópicos de Cálculo Avanzado (E)", sem: 8, prq: ["2504144", "2503134"] },
  { id: "2504257", label: "Líneas de Transmisión y Antenas", lab: { id: "2504263", label: "Lab. Líneas Transmisión" }, sem: 8, prq: ["2504144"] },

  // --- QUINTO AÑO - Semestre 9 ---
  { id: "2505158", label: "Intro. Metodología de Inv.", sem: 9, prq: [] },
  { id: "2505159", label: "Control de Procesos", lab: { id: "2505166", label: "Lab. Control de Procesos" }, sem: 9, prq: ["2504251"] },
  { id: "2505160", label: "Comunicación y Supervisión PLC", lab: { id: "2505167", label: "Lab. Com. y Sup. PLC" }, sem: 9, prq: ["2504252"] },
  { id: "2505161", label: "Sist. Control Electrohidráulico", lab: { id: "2505168", label: "Lab. Sist. Control Electrohidráulico" }, sem: 9, prq: ["2504253"] },
  { id: "2505162", label: "Proc. Digital de Imágenes", lab: { id: "2505169", label: "Lab. Proc. Digital Imágenes" }, sem: 9, prq: ["2504254"] },
  { id: "2505163", label: "Comunicaciones Inalámbricas (E)", lab: { id: "2505170", label: "Lab. Com. Inalámbricas" }, sem: 9, prq: ["2504257"] },
  { id: "2505164", label: "Tec. Ingeniería Aeronáutica (E)", lab: { id: "2505171", label: "Lab. Tec. Ing. Aeronáutica" }, sem: 9, prq: ["2504251"] },
  { id: "2505165", label: "Redes de Telecomunicaciones", lab: { id: "2505172", label: "Lab. Redes Telecomunicaciones" }, sem: 9, prq: ["2504257"] },

  // --- QUINTO AÑO - Semestre 10 ---
  { id: "2505266", label: "Comunicaciones Ópticas", sem: 10, prq: ["2505165"] },
  { id: "2505267", label: "Trabajo de Investigación", sem: 10, prq: ["2505158"] },
  { id: "2505268", label: "Prácticas Pre-Profesionales", sem: 10, prq: [] },
  { id: "2505269", label: "Inst. Sist. Aire Acondicionado (E)", lab: { id: "2505274", label: "Lab. Inst. Aire Acondicionado" }, sem: 10, prq: ["2505161"] },
  { id: "2505270", label: "Ingeniería de Sonido y Acústica (E)", lab: { id: "2505275", label: "Lab. Ing. Sonido" }, sem: 10, prq: ["2505162"] },
  { id: "2505271", label: "Fund. Vehículos Eléctricos (E)", sem: 10, prq: ["2505161"] },
  { id: "2505272", label: "Legis. Ind. Laboral y Tributaria (E)", sem: 10, prq: ["2505158"] },
  { id: "2505273", label: "Gestión Empresarial (E)", sem: 10, prq: ["2505158"] }
];