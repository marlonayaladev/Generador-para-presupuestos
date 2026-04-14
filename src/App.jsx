import React, { useState, useRef, useEffect } from 'react';

// ─── DATOS DEL SISTEMA ────────────────────────────────────────────────────────

const INSUMOS_DATA = {
  especifica1: {
    codigo: '2.3.1.11.1.1',
    nombre: 'SUMINISTROS PARA MANTENIMIENTO Y REPARACIÓN PARA EDIFICIOS Y ESTRUCTURAS',
    items: [
      { id: 1,  descripcion: 'SUMINISTROS PARA MANTENIMIENTO Y REPARACIÓN DE ECRAN Y PROYECTOR',        cantidad: 12,  um: 'UU',      pu: 40,    total: 480   },
      { id: 2,  descripcion: 'CABLES DE PROYECCIÓN',                                                     cantidad: 9,   um: 'MTS',     pu: 10,    total: 90    },
      { id: 3,  descripcion: 'TERMINALES DEL SISTEMA DE PROYECCIÓN',                                     cantidad: 5,   um: 'MTS',     pu: 20,    total: 100   },
      { id: 4,  descripcion: 'CLAVO PARA MADERA',                                                        cantidad: 5,   um: 'KG',      pu: 6,     total: 30    },
      { id: 5,  descripcion: 'EQUIPO DE LUMINARIA',                                                      cantidad: 6,   um: 'UU',      pu: 100,   total: 600   },
      { id: 6,  descripcion: 'TOMA CORRIENTE',                                                           cantidad: 8,   um: 'UU',      pu: 35,    total: 280   },
      { id: 7,  descripcion: 'INTERRUPTOR',                                                              cantidad: 2,   um: 'UU',      pu: 20,    total: 40    },
      { id: 8,  descripcion: 'CABLE N°12',                                                               cantidad: 2,   um: 'ROLLO',   pu: 200,   total: 400   },
      { id: 9,  descripcion: 'TABLAS DE MADERA',                                                         cantidad: 8,   um: 'UU',      pu: 60,    total: 480   },
      { id: 10, descripcion: 'MAYOLICA DE INTERIOR',                                                     cantidad: 190, um: 'M2',      pu: 70,    total: 13300 },
      { id: 11, descripcion: 'FRAGUA',                                                                   cantidad: 40,  um: 'UU',      pu: 35,    total: 1400  },
    ]
  },
  especifica2: {
    codigo: '2.3.2.4.2.1',
    nombre: 'SERVICIO DE MANTENIMIENTO, ACONDICIONAMIENTO Y REPARACIONES DE EDIFICACIONES',
    items: [
      { id: 14, descripcion: 'SERVICIO DE ACONDICIONAMIENTO DE AMBIENTE Y TRABAJOS PRELIMINARES',         cantidad: 200, um: 'M2',      pu: 10,   total: 2000  },
      { id: 15, descripcion: 'SERVICIO DE MANTENIMIENTO Y REPOSICIÓN DE SILLAS',                          cantidad: 25,  um: 'UU',      pu: 80,   total: 2000  },
      { id: 16, descripcion: 'SERVICIO DE MANTENIMIENTO Y REPOSICIÓN DE MESAS',                           cantidad: 4,   um: 'UU',      pu: 3000, total: 12000 },
      { id: 17, descripcion: 'SERVICIO DE MANTENIMIENTO Y REPOSICIÓN DE ESCRITORIOS',                     cantidad: 10,  um: 'UU',      pu: 60,   total: 600   },
      { id: 18, descripcion: 'SERVICIO DE MANTENIMIENTO DE TECHO',                                        cantidad: 200, um: 'M2',      pu: 100,  total: 20000 },
      { id: 19, descripcion: 'SERVICIO DE MANTENIMIENTO Y REPOSICIÓN DE PUERTAS',                         cantidad: 3,   um: 'UU',      pu: 100,  total: 300   },
      { id: 20, descripcion: 'SERVICIO DE MANTENIMIENTO Y REPOSICIÓN DE SUMINISTROS DEL SISTEMA DE PROYECCIÓN', cantidad: 1, um: 'SERVICIO', pu: 5900, total: 5900 },
      { id: 21, descripcion: 'SERVICIO DE MANTENIMIENTO DE PAREDES',                                      cantidad: 200, um: 'M2',      pu: 100,  total: 20000 },
    ]
  }
};

const ESPECIFICAS_KEYWORDS = [
  { keyword: 'mantenimiento', especifica: '2.3.2.4.2.1', nombre: 'SERVICIO DE MANTENIMIENTO, ACONDICIONAMIENTO Y REPARACIONES DE EDIFICACIONES' },
  { keyword: 'servicio',      especifica: '2.3.2.4.2.1', nombre: 'SERVICIO DE MANTENIMIENTO, ACONDICIONAMIENTO Y REPARACIONES DE EDIFICACIONES' },
  { keyword: 'suministro',    especifica: '2.3.1.11.1.1', nombre: 'SUMINISTROS PARA MANTENIMIENTO Y REPARACIÓN PARA EDIFICIOS Y ESTRUCTURAS' },
  { keyword: 'material',      especifica: '2.3.1.11.1.1', nombre: 'SUMINISTROS PARA MANTENIMIENTO Y REPARACIÓN PARA EDIFICIOS Y ESTRUCTURAS' },
  { keyword: 'cable',         especifica: '2.3.1.11.1.1', nombre: 'SUMINISTROS PARA MANTENIMIENTO Y REPARACIÓN PARA EDIFICIOS Y ESTRUCTURAS' },
  { keyword: 'equipo',        especifica: '2.3.1.11.1.1', nombre: 'SUMINISTROS PARA MANTENIMIENTO Y REPARACIÓN PARA EDIFICIOS Y ESTRUCTURAS' },
  { keyword: 'silla',         especifica: '2.3.2.4.2.1', nombre: 'SERVICIO DE MANTENIMIENTO, ACONDICIONAMIENTO Y REPARACIONES DE EDIFICACIONES' },
  { keyword: 'mesa',          especifica: '2.3.2.4.2.1', nombre: 'SERVICIO DE MANTENIMIENTO, ACONDICIONAMIENTO Y REPARACIONES DE EDIFICACIONES' },
  { keyword: 'techo',         especifica: '2.3.2.4.2.1', nombre: 'SERVICIO DE MANTENIMIENTO, ACONDICIONAMIENTO Y REPARACIONES DE EDIFICACIONES' },
  { keyword: 'puerta',        especifica: '2.3.2.4.2.1', nombre: 'SERVICIO DE MANTENIMIENTO, ACONDICIONAMIENTO Y REPARACIONES DE EDIFICACIONES' },
  { keyword: 'pared',         especifica: '2.3.2.4.2.1', nombre: 'SERVICIO DE MANTENIMIENTO, ACONDICIONAMIENTO Y REPARACIONES DE EDIFICACIONES' },
  { keyword: 'edificio',      especifica: '2.3.1.11.1.1', nombre: 'SUMINISTROS PARA MANTENIMIENTO Y REPARACIÓN PARA EDIFICIOS Y ESTRUCTURAS' },
  { keyword: 'proyector',     especifica: '2.3.1.11.1.1', nombre: 'SUMINISTROS PARA MANTENIMIENTO Y REPARACIÓN PARA EDIFICIOS Y ESTRUCTURAS' },
  { keyword: 'mayolica',      especifica: '2.3.1.11.1.1', nombre: 'SUMINISTROS PARA MANTENIMIENTO Y REPARACIÓN PARA EDIFICIOS Y ESTRUCTURAS' },
  { keyword: 'luminaria',     especifica: '2.3.1.11.1.1', nombre: 'SUMINISTROS PARA MANTENIMIENTO Y REPARACIÓN PARA EDIFICIOS Y ESTRUCTURAS' },
  { keyword: 'corriente',     especifica: '2.3.1.11.1.1', nombre: 'SUMINISTROS PARA MANTENIMIENTO Y REPARACIÓN PARA EDIFICIOS Y ESTRUCTURAS' },
];

const EVALUACION_DATA = {
  'PP 0135': { tiempo: 0.245, costo: 0.988, calidad: 0.95  },
  'PP 0074': { tiempo: 1.0,   costo: 0.09,  calidad: 0.06  },
  'PP 0032': { tiempo: 0.04,  costo: 0.01,  calidad: 0.12  },
  'PP 0068': { tiempo: 0.0,   costo: 0.0003,calidad: 0.06  },
  'PP 0128': { tiempo: 0.04,  costo: 0.0008,calidad: 0.12  },
};

const METAS_POI = [
  'META 1', 'META 2', 'META 3', 'META 4', 'META 5', 'META 6', 'META 7',
  'META 8', 'META 9', 'META 10', 'META 11', 'META 12', 'META 13', 'META 14',
  'META 15', 'META 16', 'META 17', 'META 18', 'META 19', 'META 20', 'META 21',
  'META 22', 'META 23', 'META 24', 'META 25', 'META 26', 'META 27',
];

const PRIORIDADES_PREDEF = {
  'META 1': 0, 'META 3': 0, 'META 4': 0, 'META 6': 0, 'META 13': 0,
  'META 20': 0, 'META 27': 0,
};

function generarPDFHTML(items, especifica1, especifica2, meta, tarea) {
  const total = items.reduce((s, i) => s + (i.total || 0), 0);
  const ahora = new Date();
  const fecha = ahora.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<title>CNV - Cuadro de Necesidades</title>
<style>
  body { font-family: Arial, sans-serif; margin: 20px; font-size: 10px; color: #000; }
  h1 { font-size: 13px; text-align: center; margin-bottom: 4px; }
  h2 { font-size: 11px; margin: 6px 0 2px 0; }
  .header-box { border: 1px solid #000; padding: 8px; margin-bottom: 10px; }
  .meta-row { background:#1a3a2a; color:white; padding:5px 8px; font-weight:bold; font-size:9px; }
  .tarea-row { background:#2a4a3a; color:white; padding:4px 8px; font-weight:bold; font-size:9px; }
  .especifica-row { background:#3a5a4a; color:white; padding:3px 8px; font-size:9px; }
  table { width:100%; border-collapse:collapse; margin-top:4px; }
  th { background:#2d6a4f; color:white; padding:5px 4px; font-size:8px; border:1px solid #333; text-align:center; }
  tr:nth-child(even) td { background:#f5f5f5; }
  .total-row td { background:#1a3a2a; color:white; font-weight:bold; font-size:9px; padding:5px 6px; border:1px solid #333; }
  .footer { margin-top:12px; font-size:8px; color:#666; text-align:right; }
  .badge { display:inline-block; background:#ffcc00; color:#001C14; font-weight:bold; padding:2px 8px; border-radius:3px; font-size:8px; }
</style>
</head>
<body>
<h1>Anexo 04: Cuadro Multianual de Necesidades (CMN)</h1>
<div class="header-box">
  <table style="border:none; font-size:9px;">
    <tr>
      <td style="border:none; padding:2px 6px;"><b>Programa Presupuestal:</b> PP 0074 - GESTION INTEGRADA Y EFECTIVA DEL CONTROL DE OFERTA DE DROGAS EN EL PERÚ</td>
      <td style="border:none; padding:2px 6px; text-align:right;"><b>Fecha:</b> ${fecha}</td>
    </tr>
    <tr>
      <td style="border:none; padding:2px 6px;"><b>Producto:</b> 3000570 - UNIDADES ESPECIALIZADAS EN EL CONTROL DE LA OFERTA DE DROGAS CON CAPACIDADES OPERATIVAS</td>
      <td style="border:none; padding:2px 6px; text-align:right;" rowspan="2"><span class="badge">PRECIO REF. TOTAL<br/>S/ 80,000.00</span></td>
    </tr>
    <tr>
      <td style="border:none; padding:2px 6px;"><b>Actividad:</b> 5005067 - TRANSFERENCIAS PARA LAS OPERACIONES CONJUNTAS PARA EL CONTROL DE LA OFERTA DE DROGAS</td>
    </tr>
  </table>
</div>

<div class="meta-row">PROGRAMACIÓN: CMN</div>
<div class="meta-row" style="background:#2d5a3a;">${meta}</div>
<div class="tarea-row">TAREA OPERATIVA 0028: OPERACIONES MILITARES DE INTERDICCIÓN CONTRA EL TID</div>

<div class="especifica-row">${INSUMOS_DATA.especifica1.codigo} - ${INSUMOS_DATA.especifica1.nombre}</div>

<table>
  <thead>
    <tr>
      <th>N°</th>
      <th>Descripción del Bien / Servicio</th>
      <th>U/M</th>
      <th>P. Unit.</th>
      <th colspan="2">2025 S1</th>
      <th colspan="2">2025 S2</th>
      <th colspan="2">2026 S1</th>
      <th colspan="2">2026 S2</th>
    </tr>
    <tr>
      <th></th><th></th><th></th><th></th>
      <th>Cant.</th><th>Total</th>
      <th>Cant.</th><th>Total</th>
      <th>Cant.</th><th>Total</th>
      <th>Cant.</th><th>Total</th>
    </tr>
  </thead>
  <tbody>
    ${INSUMOS_DATA.especifica1.items.map(item => `
    <tr>
      <td style="border:1px solid #333;padding:4px 6px;font-size:8px;">${item.id}</td>
      <td style="border:1px solid #333;padding:4px 6px;font-size:8px;">${item.descripcion}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:center;font-size:8px;">${item.um}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:right;font-size:8px;">S/ ${item.pu.toFixed(2)}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:center;font-size:8px;">${item.cantidad}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:right;font-size:8px;">S/ ${item.total.toLocaleString()}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:center;font-size:8px;">${item.cantidad}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:right;font-size:8px;">S/ ${item.total.toLocaleString()}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:center;font-size:8px;">${item.cantidad}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:right;font-size:8px;">S/ ${item.total.toLocaleString()}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:center;font-size:8px;">${item.cantidad}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:right;font-size:8px;">S/ ${item.total.toLocaleString()}</td>
    </tr>`).join('')}
    <tr class="total-row">
      <td colspan="4">SUBTOTAL - ${INSUMOS_DATA.especifica1.nombre}</td>
      <td></td>
      <td>S/ ${INSUMOS_DATA.especifica1.items.reduce((s,i)=>s+i.total,0).toLocaleString()}</td>
      <td></td><td>—</td><td></td><td>—</td><td></td><td>—</td>
    </tr>
  </tbody>
</table>

<div class="especifica-row" style="margin-top:8px;">${INSUMOS_DATA.especifica2.codigo} - ${INSUMOS_DATA.especifica2.nombre}</div>

<table>
  <thead>
    <tr>
      <th>N°</th>
      <th>Descripción del Bien / Servicio</th>
      <th>U/M</th>
      <th>P. Unit.</th>
      <th colspan="2">2025 S1</th>
      <th colspan="2">2025 S2</th>
      <th colspan="2">2026 S1</th>
      <th colspan="2">2026 S2</th>
    </tr>
    <tr>
      <th></th><th></th><th></th><th></th>
      <th>Cant.</th><th>Total</th>
      <th>Cant.</th><th>Total</th>
      <th>Cant.</th><th>Total</th>
      <th>Cant.</th><th>Total</th>
    </tr>
  </thead>
  <tbody>
    ${INSUMOS_DATA.especifica2.items.map(item => `
    <tr>
      <td style="border:1px solid #333;padding:4px 6px;font-size:8px;">${item.id}</td>
      <td style="border:1px solid #333;padding:4px 6px;font-size:8px;">${item.descripcion}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:center;font-size:8px;">${item.um}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:right;font-size:8px;">S/ ${item.pu.toFixed(2)}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:center;font-size:8px;">${item.cantidad}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:right;font-size:8px;">S/ ${item.total.toLocaleString()}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:center;font-size:8px;">${item.cantidad}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:right;font-size:8px;">S/ ${item.total.toLocaleString()}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:center;font-size:8px;">${item.cantidad}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:right;font-size:8px;">S/ ${item.total.toLocaleString()}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:center;font-size:8px;">${item.cantidad}</td>
      <td style="border:1px solid #333;padding:4px 6px;text-align:right;font-size:8px;">S/ ${item.total.toLocaleString()}</td>
    </tr>`).join('')}
    <tr class="total-row">
      <td colspan="4">SUBTOTAL - ${INSUMOS_DATA.especifica2.nombre}</td>
      <td></td>
      <td>S/ ${INSUMOS_DATA.especifica2.items.reduce((s,i)=>s+i.total,0).toLocaleString()}</td>
      <td></td><td>—</td><td></td><td>—</td><td></td><td>—</td>
    </tr>
    <tr class="total-row" style="background:#001C14;">
      <td colspan="4" style="font-size:10px; letter-spacing:1px;">IMPORTE TOTAL REFERENCIAL</td>
      <td></td>
      <td style="font-size:11px; color:#ffcc00;">S/ 80,000.00</td>
      <td></td><td>—</td><td></td><td>—</td><td></td><td>—</td>
    </tr>
  </tbody>
</table>

<div class="footer">Generado por GAPPRE · ${fecha} · Sistema de Gestión del Presupuesto por Resultados</div>
</body>
</html>`;

  return html;
}

function descargarPDF(htmlContent, filename) {
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── COMPONENTE GAUGE ─────────────────────────────────────────────
function Gauge({ label, value, descripcion }) {
  const pct = Math.min(1, Math.max(0, value));
  const angle = -135 + pct * 270;
  const toRad = (d) => (d * Math.PI) / 180;
  const cx = 70, cy = 70, r = 50;

  const arcPath = (startDeg, endDeg, color) => {
    const s = toRad(startDeg - 90);
    const e = toRad(endDeg - 90);
    const x1 = cx + r * Math.cos(s);
    const y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e);
    const y2 = cy + r * Math.sin(e);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  const needleAngle = toRad(angle - 90);
  const nx = cx + 38 * Math.cos(needleAngle);
  const ny = cy + 38 * Math.sin(needleAngle);

  const getColor = (v) => {
    if (v < 0.33) return '#e74c3c';
    if (v < 0.66) return '#f39c12';
    return '#2ecc71';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', maxWidth: 180 }}>
      <svg width="140" height="90" viewBox="0 0 140 100">
        <path d={arcPath(225, 495, '#333')} fill="none" stroke="#333" strokeWidth="10" />
        <path d={arcPath(225, 315, '#e74c3c')} fill="none" stroke="#e74c3c" strokeWidth="10" />
        <path d={arcPath(315, 405, '#f39c12')} fill="none" stroke="#f39c12" strokeWidth="10" />
        <path d={arcPath(405, 495, '#2ecc71')} fill="none" stroke="#2ecc71" strokeWidth="10" />
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="4" fill="white" />
        <text x="20" y="95" fill="#e74c3c" fontSize="9" textAnchor="middle">BAJO</text>
        <text x="70" y="35" fill="#f39c12" fontSize="9" textAnchor="middle">MED</text>
        <text x="120" y="95" fill="#2ecc71" fontSize="9" textAnchor="middle">ALTO</text>
      </svg>
      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: getColor(pct) }}>
        {(pct * 100).toFixed(1)}%
      </div>
      <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#ffcc00', letterSpacing: 2, textAlign: 'center' }}>
        {label}
      </div>
      <div style={{ fontSize: '0.7rem', color: '#aaa', textAlign: 'center', lineHeight: 1.4 }}>
        {descripcion}
      </div>
    </div>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
const BudgetManagementHome = () => {
  const [currentView, setCurrentView] = useState('home');
  const [seleccionMeta, setSeleccionMeta] = useState(null);
  const [seleccionTarea, setSeleccionTarea] = useState(null);

  const [archivoSubido, setArchivoSubido] = useState(null);
  const [imagenSubida, setImagenSubida] = useState(null);
  const [procesando, setProcesando] = useState(false);
  const [faseProceso, setFaseProceso] = useState('');
  const [cnvGenerado, setCnvGenerado] = useState(false);
  const [especificaDetectada, setEspecificaDetectada] = useState(null);

  const [priorizacionFile, setPriorizacionFile] = useState(null);
  const [analizando, setAnalizando] = useState(false);
  const [metasIdentificadas, setMetasIdentificadas] = useState(false);
  const [cantidadMetas, setCantidadMetas] = useState(7);
  const [prioridades, setPrioridades] = useState({ ...PRIORIDADES_PREDEF });

  const [evalPrograma, setEvalPrograma] = useState(null);
  const [evalAnalizando, setEvalAnalizando] = useState(false);
  const [evalResultado, setEvalResultado] = useState(null);

  const inputArchivoRef = useRef(null);
  const inputImagenRef  = useRef(null);
  const inputPriorRef   = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/logo.jpeg';
  }, []);

  const phases = [
    { id: 'identificacion', name: 'IDENTIFICACIÓN' },
    { id: 'priorizacion',   name: 'PRIORIZACIÓN'   },
    { id: 'evaluacion',     name: 'EVALUACIÓN'      },
  ];

  const programas = [
    { id: '032',  title: '032: "LUCHA CONTRA EL TERRORISMO"',                                                subtitle: 'PRODUCTO: FUERZAS DEL ORDEN CON CAPACIDADES OPERATIVAS ADECUADAS' },
    { id: '0074', title: '0074: "GESTION INTEGRADA Y EFECTIVA DEL CONTROL DE OFERTA DE DROGAS EN EL PERÚ"',  subtitle: 'PRODUCTO: UNIDADES ESPECIALIZADAS EN EL CONTROL DE LA OFERTA DE DROGAS' },
    { id: '0135', title: '0135: "MEJORA DE LAS CAPACIDADES MILITARES PARA LA DEFENSA Y EL DESARROLLO NACIONAL"', subtitle: '' },
    { id: '068',  title: '068: "REDUCCIÓN DE VULNERABILIDAD Y ATENCIÓN DE EMERGENCIAS POR DESASTRES"',        subtitle: 'PRODUCTO: ACCIONES COMUNES' },
    { id: '0128', title: '0128: "REDUCCIÓN DE LA MINERÍA ILEGAL"',                                           subtitle: 'PRODUCTO: ERRADICACIÓN Y SANCIÓN DE LA MINERÍA ILEGAL' },
  ];

  const productos = [
    { id: '3000569', label: '3000569: ENTIDADES PUBLICAS CON MECANISMOS DE COORDINACION PARA LA PLANEACION Y EVALUACION DE INTERVENCIONES PARA EL CONTROL DE LA OFERTA DE DROGAS' },
    { id: '3000570', label: '3000570: UNIDADES ESPECIALIZADAS EN EL CONTROL DE LA OFERTA DE DROGAS CON CAPACIDADES OPERATIVAS' },
  ];

  const actividades = [
    { id: '5004300', label: '5004300: CAPACITACION DEL PERSONAL DE LAS UNIDADES ESPECIALIZADAS' },
    { id: '5005066', label: '5005066: TRANSFERENCIAS PARA LAS INTERVENCIONES DE REDUCCION DE CULTIVOS CON FINES ILICITOS' },
    { id: '5005067', label: '5005067: TRANSFERENCIAS PARA LAS OPERACIONES CONJUNTAS PARA EL CONTROL DE LA OFERTA DE DROGAS' },
  ];

  const metas = [
    { id: 'meta_izq', label: 'META: Personal militar capacitado en operaciones de interdicción contra el tráfico ilícito de drogas.' },
    { id: 'meta_der', label: 'META: Operaciones militares de apoyo al control de la oferta de drogas en zonas priorizadas del VRAEM' },
  ];

  const tareas = [
    { id: '0028', label: '0028: OPERACIONES MILITARES DE INTERDICCIÓN CONTRA EL TID' },
    { id: '0027', label: '0027: PLANEAMIENTO DE OPNS MILITARES CONTRA EL TID' },
  ];

  const navStack = {
    identificacion: 'home', recopilar: 'identificacion',
    programas: 'identificacion', productos: 'programas',
    actividades: 'productos', metas: 'actividades',
    tareas: 'metas', requerimientos: 'tareas',
    priorizacion: 'home', priorizacion_asignar: 'priorizacion',
    evaluacion: 'home', evaluacion_resultado: 'evaluacion',
  };

  const handleVolver = () => {
    const prev = navStack[currentView];
    if (prev) setCurrentView(prev);
  };

  const detectarEspecifica = (nombre) => {
    const lower = nombre.toLowerCase();
    for (const kw of ESPECIFICAS_KEYWORDS) {
      if (lower.includes(kw.keyword)) {
        return kw;
      }
    }
    return { especifica: '2.3.1.11.1.1', nombre: 'SUMINISTROS PARA MANTENIMIENTO Y REPARACIÓN PARA EDIFICIOS Y ESTRUCTURAS' };
  };

  const handleGenerarCNV = () => {
    if (!archivoSubido && !imagenSubida) {
      alert('Debe subir al menos un archivo o imagen antes de generar el CNV.');
      return;
    }
    const fases = archivoSubido
      ? ['📊 Leyendo estructura del Excel...', '🔍 Identificando ítems y códigos...', '🤖 Cruzando con base de especificaciones...', '📋 Asignando específica presupuestal automáticamente...', '📄 Generando CNV...']
      : ['🖼️ Analizando imagen con IA...', '🔍 Extrayendo datos y descripciones...', '🤖 Clasificando por tipo de gasto...', '📋 Asignando específica presupuestal...', '📄 Generando CNV...'];

    const nombre = archivoSubido ? archivoSubido.name : imagenSubida.name;
    const esp = detectarEspecifica(nombre);
    setEspecificaDetectada(esp);

    setProcesando(true);
    setCnvGenerado(false);
    let i = 0;
    setFaseProceso(fases[0]);
    const interval = setInterval(() => {
      i++;
      if (i < fases.length) {
        setFaseProceso(fases[i]);
      } else {
        clearInterval(interval);
        setProcesando(false);
        setCnvGenerado(true);
      }
    }, 900);
  };

  const handleDescargarCNV = () => {
    const todos = [...INSUMOS_DATA.especifica1.items, ...INSUMOS_DATA.especifica2.items];
    const html = generarPDFHTML(
      todos,
      INSUMOS_DATA.especifica1,
      INSUMOS_DATA.especifica2,
      seleccionMeta?.label || 'META: Operaciones militares de apoyo al control de la oferta de drogas en zonas priorizadas del VRAEM',
      seleccionTarea?.label || 'TAREA OPERATIVA 0028'
    );
    descargarPDF(html, 'CNV_GAPPRE.html');
  };

  const handlePriorFile = (e) => {
    const f = e.target.files[0];
    if (f) setPriorizacionFile(f);
  };

  const handleBuscarMetas = () => {
    setAnalizando(true);
    setTimeout(() => {
      setAnalizando(false);
      setMetasIdentificadas(true);
      setPrioridades({ ...PRIORIDADES_PREDEF });
      setCurrentView('priorizacion_asignar');
    }, 2500);
  };

  // ─── LÓGICA DE DESCARGA DINÁMICA DEL PDF ───
  const handleGenerarCNVPrior = () => {
    if (priorizacionFile) {
      // Si el usuario subió un archivo, le devolvemos exactamente ese mismo
      const url = URL.createObjectURL(priorizacionFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = priorizacionFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      // Fallback: Si por alguna razón no hay archivo en estado, descargamos el estático
      const link = document.createElement('a');
      link.href = '/CNV PARA PRIORIZACIÓN.pdf'; 
      link.download = 'CNV PARA PRIORIZACIÓN.pdf'; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleEvalPrograma = (prog) => {
    setEvalPrograma(prog);
    setEvalAnalizando(true);
    setEvalResultado(null);
    const fases2 = ['📊 Analizando avance presupuestal...', '⏱️ Calculando indicador de tiempo...', '💰 Procesando coeficiente de costo...', '🎯 Evaluando impacto en objetivos POI...'];
    let i = 0;
    setFaseProceso(fases2[0]);
    const iv = setInterval(() => {
      i++;
      if (i < fases2.length) setFaseProceso(fases2[i]);
      else {
        clearInterval(iv);
        setEvalAnalizando(false);
        const keyMap = { '032': 'PP 0032', '0074': 'PP 0074', '0135': 'PP 0135', '068': 'PP 0068', '0128': 'PP 0128' };
        setEvalResultado(EVALUACION_DATA[keyMap[prog.id]] || null);
        setCurrentView('evaluacion_resultado');
      }
    }, 900);
  };

  return (
    <>
      <style>{`
        :root, body, #root {
          width: 100vw !important; max-width: 100% !important;
          margin: 0 !important; padding: 0 !important;
          overflow-x: hidden; 
          background: radial-gradient(circle at top center, #0f2b20 0%, #001C14 45%, #000a07 100%) !important;
          color: white;
        }
        .btn-uiverse {
          width: 260px; height: 65px;
          background: rgba(0,0,0,0.4); color: white;
          border: 2px solid rgba(255,204,0,0.3); border-radius: 0.625em;
          font-size: 18px; font-weight: bold; letter-spacing: 2px;
          cursor: pointer; position: relative; z-index: 1;
          overflow: hidden; transition: color 0.5s;
          display: flex; justify-content: center; align-items: center;
        }
        .btn-uiverse:hover { color: #001C14; border-color: #ffcc00; }
        .btn-uiverse::after {
          content: ""; background: #ffcc00; position: absolute; z-index: -1;
          left: -20%; right: -20%; top: 0; bottom: 0;
          transform: skewX(-45deg) scale(0,1);
          transition: transform 0.5s cubic-bezier(0.25,0.8,0.25,1);
        }
        .btn-uiverse:hover::after { transform: skewX(-45deg) scale(1,1); }
        .botones-container {
          display: flex; flex-direction: row; justify-content: center; align-items: center;
          gap: 2.5rem; width: 100%; margin-top: 2rem; flex-wrap: wrap;
        }
        .btn-volver {
          background: transparent; color: #ffcc00;
          border: 1px solid rgba(255,204,0,0.5);
          padding: 8px 20px; border-radius: 8px; font-size: 16px; font-weight: bold;
          cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 8px;
        }
        .btn-volver:hover { background: rgba(255,204,0,0.1); border-color: #ffcc00; transform: translateX(-5px); }
        .grid-estrella {
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          gap: 1.5rem; width: 100%; max-width: 900px; padding: 2.5rem;
          border: 2px solid #1a2e25; border-radius: 2.5rem;
          background: rgba(0,18,13,0.6); margin: 0 auto;
        }
        @media(max-width:768px){ .grid-estrella{ grid-template-columns:1fr; padding:1.5rem; } }
        .mascara-programa {
          background: #00120d; border: 2px solid rgba(255,204,0,0.2);
          border-radius: 12px; padding: 1.25rem; cursor: pointer;
          transition: all 0.3s ease; display: flex; flex-direction: column;
          justify-content: center; min-height: 110px;
        }
        .mascara-programa:hover {
          border-color: #ffcc00; transform: scale(1.04);
          box-shadow: 0 10px 20px rgba(0,0,0,0.5), 0 0 15px rgba(255,204,0,0.2);
          background: rgba(255,204,0,0.05);
        }
        .centro-estrella { border: 3px solid #ffcc00 !important; box-shadow: 0 0 20px rgba(255,204,0,0.3); }
        .header-militar { font-size: 0.85rem; font-weight: 800; color: #ffcc00; line-height: 1.4; }
        .centro-estrella .header-militar { font-size: 1rem; display: flex; align-items: center; height: 100%; }
        .sub-militar { font-size: 0.75rem; color: #999; margin-top: 0.5rem; line-height: 1.4; }
        .celda-vacia { visibility: hidden; pointer-events: none; min-height: 110px; }
        @media(max-width:768px){ .celda-vacia{ display:none; } }
        .item-lista {
          background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
          padding: 1rem 1.5rem; border-radius: 8px; cursor: pointer;
          transition: all 0.2s; display: flex; align-items: center;
          gap: 15px; margin-bottom: 10px;
        }
        .item-lista:hover { background: rgba(255,204,0,0.08); border-color: #ffcc00; }
        .radio-circle {
          width: 20px; height: 20px; border-radius: 50%;
          border: 2px solid #ffcc00; flex-shrink: 0;
          display: flex; justify-content: center; align-items: center;
        }
        .item-lista:hover .radio-circle::after,
        .item-lista.activo .radio-circle::after {
          content:""; width:10px; height:10px; background:#ffcc00; border-radius:50%;
        }

        /* CORRECCIONES DE CENTRADO ABSOLUTO (POI y UPLOAD) */
        .bloque-poi {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,204,0,0.15);
          border-radius: 12px; padding: 1.5rem 2rem;
          margin: 0 auto 2.5rem auto; max-width: 820px; width: 100%;
          display: flex; flex-direction: column; align-items: center; text-align: center;
        }
        .poi-oe {
          background: rgba(180,220,180,0.1); border: 1px solid rgba(150,200,150,0.25);
          border-radius: 6px; padding: 0.6rem 1rem; margin: 0 auto 1rem auto;
          display: flex; align-items: center; justify-content: center; gap: 1rem;
          width: fit-content;
        }
        .poi-oe-tag { background:rgba(150,200,150,0.2); color:#a0d8a0; font-size:0.75rem; font-weight:800; padding:4px 10px; border-radius:6px; white-space:nowrap; }
        .poi-oe-text { font-size:0.85rem; color:#c8e6c8; font-weight:600; line-height:1.4; text-align: center; }
        .poi-ae { font-size:1rem; font-weight:700; color:#e0e0e0; letter-spacing:0.5px; text-align: center; width: 100%; }
        .poi-ae span { color:#ffcc00; font-weight: 900; }

        .upload-zone {
          border: 2px dashed rgba(255,204,0,0.35); border-radius: 16px;
          padding: 2rem 1.5rem; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 1rem; cursor: pointer;
          transition: all 0.25s; background: rgba(0,0,0,0.25); min-width: 200px;
          margin: 0 auto; text-align: center;
        }

        .upload-zone:hover { border-color:#ffcc00; background:rgba(255,204,0,0.05); }
        .upload-zone.cargado { border-color:#4caf50; border-style:solid; background:rgba(76,175,80,0.07); }
        .upload-icon-circle {
          width:72px; height:72px; border-radius:50%;
          border:3px solid #ffcc00; display:flex; align-items:center;
          justify-content:center; background:rgba(0,0,0,0.3); transition:transform 0.2s;
          margin: 0 auto;
        }
        .upload-zone:hover .upload-icon-circle { transform:scale(1.08); }
        .upload-zone.cargado .upload-icon-circle { border-color:#4caf50; }
        
        .metas-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; width:100%; max-width:820px; margin:0 auto; }
        @media(max-width:640px){ .metas-grid{ grid-template-columns:1fr; } }
        .card-meta {
          background: rgba(0,0,0,0.35); border: 2px solid rgba(255,255,255,0.08);
          border-radius: 14px; padding: 1.5rem; cursor: pointer;
          transition: all 0.25s; display: flex; flex-direction: column;
          align-items: center; text-align: center; gap: 1rem;
        }
        .card-meta:hover { border-color:#ffcc00; background:rgba(255,204,0,0.07); transform:translateY(-3px); }
        .dot-meta { width:14px; height:14px; border-radius:50%; background:#4a8cff; }
        .dot-meta.activo { box-shadow:0 0 10px rgba(74,140,255,0.6); }
        
        .resumen-seleccion {
          background: rgba(0,0,0,0.3); border: 1px solid rgba(255,204,0,0.2);
          border-radius: 12px; padding: 1.25rem 2rem;
          max-width: 820px; width: 100%; margin: 0 auto 2rem auto;
          display: flex; align-items: flex-start; justify-content: center; gap: 1.5rem; flex-wrap: wrap;
        }
        .resumen-label { font-size:0.65rem; color:#888; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px; }
        .resumen-valor { font-size:0.85rem; color:#ffcc00; font-weight:700; line-height:1.5; text-align:center; }
        .resumen-flecha { color:#ffcc00; font-size:1.4rem; opacity:0.5; align-self:center; }
        .btn-accion {
          padding:0.9rem 2.5rem; border-radius:10px;
          font-size:1rem; font-weight:800; letter-spacing:2px;
          cursor:pointer; transition:all 0.25s; border:2px solid;
        }
        .btn-generar { background:transparent; color:#ffcc00; border-color:#ffcc00; }
        .btn-generar:hover { background:#ffcc00; color:#001C14; }
        .btn-inicio  { background:transparent; color:#ff6b6b; border-color:#ff6b6b; }
        .btn-inicio:hover  { background:rgba(255,107,107,0.12); }
        .btn-descarga { background:#ffcc00; color:#001C14; border-color:#ffcc00; }
        .btn-descarga:hover { background:#e6b800; }
        @keyframes spin{ to{ transform:rotate(360deg); } }
        .spinner {
          width:20px; height:20px;
          border:3px solid rgba(255,204,0,0.3);
          border-top-color:#ffcc00; border-radius:50%;
          animation:spin 0.8s linear infinite; display:inline-block;
        }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
        .pulsing { animation: pulse 1.2s ease-in-out infinite; }
        .toast-ok {
          background:rgba(76,175,80,0.12); border:1px solid rgba(76,175,80,0.35);
          color:#a5d6a7; border-radius:10px; padding:1rem 1.5rem;
          font-size:0.95rem; font-weight:600; max-width:820px; width:100%; text-align:center; margin: 1.5rem auto 0 auto;
        }
        .esp-badge {
          background:rgba(255,204,0,0.1); border:1px solid rgba(255,204,0,0.4);
          border-radius:8px; padding:0.75rem 1.25rem; margin: 1rem auto 0 auto;
          max-width:820px; width:100%; text-align:center;
        }
        .prior-grid { 
          display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); 
          gap:15px 3rem; justify-items:center; align-items:center; width:100%;
        }
        .prior-cell { display:flex; align-items:center; justify-content:center; gap:12px; }
        .prior-input {
          width:50px; background:rgba(0,0,0,0.4); border:1px solid rgba(255,204,0,0.3);
          border-radius:6px; padding:4px 8px; color:#ffcc00; font-weight:bold;
          font-size:0.9rem; text-align:center;
        }
        .prior-input:focus { outline:none; border-color:#ffcc00; }
      `}</style>

      <div className="w-full min-h-screen flex flex-col items-center justify-center py-12 font-sans relative">

        {currentView !== 'home' && (
          <div className="absolute top-8 left-8 z-50">
            <button className="btn-volver" onClick={handleVolver}>← Volver</button>
          </div>
        )}

        {/* ══ 1. HOME ══ */}
        {currentView === 'home' && (
          <div className="w-full flex flex-col items-center">
            <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img 
                src="/logo.jpeg" 
                alt="GAPPRE" 
                fetchPriority="high" 
                loading="eager" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  objectFit: 'contain', 
                  mixBlendMode: 'lighten',
                  filter: 'contrast(1.1)' 
                }} 
              />
            </div>
            <div className="text-center mt-4">
              <h1 className="text-5xl font-extrabold text-[#ffcc00] tracking-widest">GAPPRE</h1>
              <p className="mt-4 text-2xl text-zinc-300 tracking-wide font-light">Generador Automático para la Gestión del Presupuesto por Resultados</p>
            </div>
            <div className="botones-container" style={{ marginTop:'4rem' }}>
              {phases.map((phase) => (
                <button key={phase.id} className="btn-uiverse"
                  onClick={() => setCurrentView(phase.id)}>
                  {phase.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ══ 2. IDENTIFICACIÓN ══ */}
        {currentView === 'identificacion' && (
          <div className="w-full flex flex-col items-center max-w-5xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-black text-[#ffcc00] tracking-wider uppercase">ELIJA SEGÚN SU NIVEL</h1>
              <div className="h-1 w-32 bg-[#ffcc00] mx-auto mt-6 rounded-full opacity-50"></div>
            </div>
            <div className="botones-container">
              <button className="btn-uiverse" onClick={() => setCurrentView('programas')}>CREAR CNV</button>
              <button className="btn-uiverse" onClick={() => setCurrentView('recopilar')}>RECOPILAR CNV</button>
            </div>
          </div>
        )}

        {/* ══ 3. RECOPILAR ══ */}
        {currentView === 'recopilar' && (
          <div className="w-full flex flex-col items-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-black text-[#ffcc00] tracking-wider uppercase text-center mb-16">
              Cargue los archivos a integrar
            </h1>
            <div className="upload-zone" onClick={() => alert('Cargando explorador de archivos...')}>
              <div className="upload-icon-circle">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#ffcc00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <span style={{ color:'#ffcc00', fontWeight:800, letterSpacing:1 }}>SUBIR ARCHIVO</span>
            </div>
          </div>
        )}

        {/* ══ 4. PROGRAMAS ══ */}
        {currentView === 'programas' && (
          <div className="w-full flex flex-col items-center">
            <h1 className="text-4xl font-black text-[#ffcc00] tracking-widest mb-16 uppercase text-center">
              ELIJA EL PROGRAMA PRESUPUESTAL
            </h1>
            <div className="grid-estrella">
              <div className="mascara-programa" onClick={() => setCurrentView('productos')}>
                <div className="header-militar">{programas[0].title}</div>
                <div className="sub-militar">{programas[0].subtitle}</div>
              </div>
              <div className="celda-vacia mascara-programa"></div>
              <div className="mascara-programa" onClick={() => setCurrentView('productos')}>
                <div className="header-militar">{programas[1].title}</div>
                <div className="sub-militar">{programas[1].subtitle}</div>
              </div>
              <div className="celda-vacia mascara-programa"></div>
              <div className="mascara-programa centro-estrella" onClick={() => setCurrentView('productos')}>
                <div className="header-militar" style={{ display:'flex', alignItems:'center', height:'100%' }}>{programas[2].title}</div>
              </div>
              <div className="celda-vacia mascara-programa"></div>
              <div className="mascara-programa" onClick={() => setCurrentView('productos')}>
                <div className="header-militar">{programas[3].title}</div>
                <div className="sub-militar">{programas[3].subtitle}</div>
              </div>
              <div className="celda-vacia mascara-programa"></div>
              <div className="mascara-programa" onClick={() => setCurrentView('productos')}>
                <div className="header-militar">{programas[4].title}</div>
                <div className="sub-militar">{programas[4].subtitle}</div>
              </div>
            </div>
          </div>
        )}

        {/* ══ 5. PRODUCTOS ══ */}
        {currentView === 'productos' && (
          <div className="w-full flex flex-col items-center max-w-4xl px-4">
            <h1 className="text-4xl font-black text-[#ffcc00] tracking-wider mb-16 uppercase text-center">ELIJA EL PRODUCTO</h1>
            <div className="w-full">
              {productos.map((prod) => (
                <div key={prod.id} className="item-lista"
                  onClick={() => setCurrentView('actividades')}>
                  <div className="radio-circle"></div>
                  <span className="text-white font-bold text-base leading-snug">{prod.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ 6. ACTIVIDADES ══ */}
        {currentView === 'actividades' && (
          <div className="w-full flex flex-col items-center max-w-4xl px-4">
            <h1 className="text-4xl font-black text-[#ffcc00] tracking-wider mb-16 uppercase text-center">
              ELIJA LA ACTIVIDAD PRESUPUESTAL
            </h1>
            <div className="w-full">
              {actividades.map((act) => (
                <div key={act.id} className="item-lista"
                  onClick={() => setCurrentView('metas')}>
                  <div className="radio-circle"></div>
                  <span className="text-white font-bold text-base leading-snug">{act.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ 7. METAS ══ */}
        {currentView === 'metas' && (
          <div className="w-full flex flex-col items-center max-w-4xl px-4">
            <h1 className="text-3xl font-black text-[#ffcc00] tracking-wider mb-1 uppercase text-center">HEMOS ANALIZADO EL POI POR USTED</h1>
            <h2 className="text-2xl font-black text-[#ffcc00] tracking-wider mb-10 uppercase text-center">ELIJA LA META RELACIONADA</h2>
            <div className="bloque-poi">
              <div className="poi-oe">
                <span className="poi-oe-tag">OE 4</span>
                <span className="poi-oe-text">OPTIMIZAR LA PARTICIPACIÓN DEL EJÉRCITO EN EL CONTROL DEL ORDEN INTERNO.</span>
              </div>
              <p className="poi-ae">AE 4.3 &nbsp; REDUCCIÓN DEL <span>TRÁFICO ILÍCITO DE DROGAS</span></p>
            </div>
            <div className="metas-grid">
              {metas.map((meta) => {
                const activa = meta.id === 'meta_der';
                return (
                  <div key={meta.id} className="card-meta"
                    style={{ cursor:'pointer' }}
                    onClick={() => { setSeleccionMeta(meta); setCurrentView('tareas'); }}>
                    <div className={`dot-meta${activa ? ' activo' : ''}`}></div>
                    <p style={{ color:'#e0e0e0', fontSize:'0.9rem', fontWeight:600, lineHeight:1.6 }}>{meta.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ 8. TAREAS ══ */}
        {currentView === 'tareas' && (
          <div className="w-full flex flex-col items-center max-w-4xl px-4">
            <h1 className="text-3xl font-black text-[#ffcc00] tracking-wider mb-1 uppercase text-center">HEMOS ANALIZADO EL POI POR USTED</h1>
            <h2 className="text-2xl font-black text-[#ffcc00] tracking-wider mb-10 uppercase text-center">ELIJA LA TAREA OPERATIVA RELACIONADA</h2>
            <div className="bloque-poi">
              <div className="poi-oe">
                <span className="poi-oe-tag">OE 4</span>
                <span className="poi-oe-text">OPTIMIZAR LA PARTICIPACIÓN DEL EJÉRCITO EN EL CONTROL DEL ORDEN INTERNO.</span>
              </div>
              <p className="poi-ae">AE 4.3 &nbsp; REDUCCIÓN DEL <span>TRÁFICO ILÍCITO DE DROGAS</span></p>
            </div>
            <div className="metas-grid">
              {tareas.map((tarea) => (
                <div key={tarea.id} className="card-meta"
                  style={{ cursor:'pointer' }}
                  onClick={() => { setSeleccionTarea(tarea); setCurrentView('requerimientos'); }}>
                  <div className="dot-meta activo"></div>
                  <p style={{ color:'#e0e0e0', fontSize:'0.9rem', fontWeight:700, lineHeight:1.6, textAlign:'center' }}>{tarea.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ 9. REQUERIMIENTOS ══ */}
        {currentView === 'requerimientos' && (
          <div className="w-full flex flex-col items-center max-w-4xl px-4">
            <h1 className="text-3xl font-black text-[#ffcc00] tracking-wider mb-8 uppercase text-center">
              UD HA ELEGIDO FORMULAR SUS NECESIDADES PARA:
            </h1>
            <div className="resumen-seleccion">
              <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center' }}>
                <div className="resumen-label">Meta seleccionada</div>
                <div className="resumen-valor">{seleccionMeta?.label}</div>
              </div>
              <span className="resumen-flecha">→</span>
              <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center' }}>
                <div className="resumen-label">Tarea operativa</div>
                <div className="resumen-valor">{seleccionTarea?.label}</div>
              </div>
            </div>

            <h2 className="text-2xl font-black text-[#ffcc00] tracking-wider mb-10 uppercase text-center">
              CARGUE SUS REQUERIMIENTOS
            </h2>

            <div style={{ display:'flex', gap:'2rem', flexWrap:'wrap', justifyContent:'center', width:'100%', marginBottom:'2.5rem' }}>
              <div className={`upload-zone ${archivoSubido ? 'cargado' : ''}`}
                style={{ width: '100%', maxWidth: '280px' }}
                onClick={() => inputArchivoRef.current?.click()}>
                <div className="upload-icon-circle">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
                    stroke={archivoSubido ? '#4caf50' : '#ffcc00'}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                </div>
                <span style={{ color:archivoSubido?'#81c784':'#ffcc00', fontWeight:800, letterSpacing:1 }}>SUBIR ARCHIVO</span>
                <span style={{ color:'#888', fontSize:'0.75rem', textAlign:'center' }}>
                  {archivoSubido ? archivoSubido.name : 'Excel (.xlsx) o PDF (.pdf)'}
                </span>
                <input ref={inputArchivoRef} type="file" accept=".xlsx,.xls,.pdf"
                  style={{ display:'none' }} onChange={e => { const f=e.target.files[0]; if(f){setArchivoSubido(f);setCnvGenerado(false);} }} />
              </div>

              <div className={`upload-zone ${imagenSubida ? 'cargado' : ''}`}
                style={{ width: '100%', maxWidth: '280px' }}
                onClick={() => inputImagenRef.current?.click()}>
                <div className="upload-icon-circle">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
                    stroke={imagenSubida ? '#4caf50' : '#ffcc00'}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <span style={{ color:imagenSubida?'#81c784':'#ffcc00', fontWeight:800, letterSpacing:1 }}>SUBIR IMAGEN</span>
                <span style={{ color:'#888', fontSize:'0.75rem', textAlign:'center' }}>
                  {imagenSubida ? imagenSubida.name : 'PNG o JPG'}
                </span>
                <input ref={inputImagenRef} type="file" accept=".png,.jpg,.jpeg"
                  style={{ display:'none' }} onChange={e => { const f=e.target.files[0]; if(f){setImagenSubida(f);setCnvGenerado(false);} }} />
              </div>
            </div>

            {procesando && (
              <div style={{ textAlign:'center', marginBottom:'1.5rem', color:'#ffcc00' }}>
                <div className="pulsing" style={{ fontSize:'1.1rem', fontWeight:700 }}>
                  <span className="spinner" style={{ marginRight:10 }}></span>{faseProceso}
                </div>
              </div>
            )}

            {cnvGenerado && especificaDetectada && (
              <div className="esp-badge">
                <div style={{ fontSize:'0.7rem', color:'#888', marginBottom:4 }}>✅ ESPECÍFICA IDENTIFICADA AUTOMÁTICAMENTE</div>
                <div style={{ fontSize:'0.9rem', color:'#ffcc00', fontWeight:700 }}>{especificaDetectada.especifica}</div>
                <div style={{ fontSize:'0.8rem', color:'#ccc', marginTop:2 }}>{especificaDetectada.nombre}</div>
              </div>
            )}

            <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap', justifyContent:'center', marginTop:'1.5rem' }}>
              {!cnvGenerado ? (
                <button className="btn-accion btn-generar" onClick={handleGenerarCNV} disabled={procesando}>
                  {procesando
                    ? <span style={{ display:'flex', alignItems:'center', gap:10 }}><span className="spinner"></span>PROCESANDO...</span>
                    : 'GENERAR CNV'
                  }
                </button>
              ) : (
                <button className="btn-accion btn-descarga" onClick={handleDescargarCNV}>
                  ⬇ DESCARGAR CNV (HTML)
                </button>
              )}
              <button className="btn-accion btn-inicio"
                onClick={() => {
                  setCurrentView('home'); setArchivoSubido(null); setImagenSubida(null);
                  setCnvGenerado(false); setEspecificaDetectada(null);
                  setSeleccionMeta(null); setSeleccionTarea(null);
                }}>
                VOLVER AL INICIO
              </button>
            </div>

            {cnvGenerado && (
              <div className="toast-ok">
                ✔ CNV generado correctamente · Precio Referencial Total: <strong>S/ 80,000.00</strong> · Específica: {especificaDetectada?.especifica}
              </div>
            )}
          </div>
        )}

        {/* ══ 10. PRIORIZACIÓN (inicio) ══ */}
        {currentView === 'priorizacion' && (
          <div className="w-full flex flex-col items-center max-w-3xl px-4">
            <h1 className="text-4xl font-black text-[#ffcc00] tracking-wider mb-16 uppercase text-center">
              CARGUE LOS CUADROS PARA PRIORIZAR
            </h1>
            <div className={`upload-zone ${priorizacionFile ? 'cargado' : ''}`}
              style={{ width: '100%', maxWidth: '280px' }}
              onClick={() => inputPriorRef.current?.click()}>
              <div className="upload-icon-circle">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
                  stroke={priorizacionFile ? '#4caf50' : '#ffcc00'}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <span style={{ color:priorizacionFile?'#81c784':'#ffcc00', fontWeight:800, textAlign:'center' }}>
                {priorizacionFile ? priorizacionFile.name : 'SUBIR ARCHIVO'}
              </span>
              <input ref={inputPriorRef} type="file" accept=".pdf,.xlsx,.xls"
                style={{ display:'none' }} onChange={handlePriorFile} />
            </div>

            <div style={{ marginTop:'2.5rem', display:'flex', gap:'1.5rem', justifyContent:'center', flexWrap:'wrap' }}>
              <button className="btn-accion btn-generar" onClick={handleBuscarMetas} disabled={analizando}>
                {analizando
                  ? <span style={{ display:'flex', alignItems:'center', gap:10 }}><span className="spinner"></span>IDENTIFICANDO METAS...</span>
                  : 'BUSCAR METAS'
                }
              </button>
            </div>
          </div>
        )}

        {/* ══ 11. PRIORIZACIÓN — ASIGNAR ══ */}
        {currentView === 'priorizacion_asignar' && (
          <div className="w-full flex flex-col items-center max-w-4xl px-4">
            <h1 className="text-3xl font-black text-[#ffcc00] tracking-wider mb-10 uppercase text-center">
              ASIGNE UNA PRIORIDAD A LAS METAS IDENTIFICADAS
            </h1>

            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'1rem', marginBottom:'2rem',
              background:'rgba(0,0,0,0.3)', padding:'0.75rem 1.5rem', borderRadius:8,
              border:'1px solid rgba(255,204,0,0.3)', margin:'0 auto 2rem auto' }}>
              <span style={{ color:'#e0e0e0', fontSize:'0.85rem', fontWeight:600 }}>CANTIDAD DE METAS A PRIORIZAR</span>
              <select value={cantidadMetas}
                onChange={e => setCantidadMetas(Number(e.target.value))}
                style={{ background:'#001C14', color:'#ffcc00', border:'1px solid #ffcc00',
                  borderRadius:6, padding:'4px 12px', fontSize:'1.1rem', fontWeight:800, cursor:'pointer' }}>
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27].map(n=>(
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div style={{ background:'rgba(0,0,0,0.25)', border:'1px solid rgba(255,204,0,0.15)',
              borderRadius:12, padding:'2rem 2rem', marginBottom:'2rem', width:'100%', maxWidth:780, margin:'0 auto 2rem auto', display:'flex', justifyContent:'center' }}>
              <div className="prior-grid">
                {METAS_POI.slice(0, 27).map((meta) => (
                  <div key={meta} className="prior-cell">
                    <span style={{ color:'#e0e0e0', fontSize:'0.85rem', minWidth:80, textAlign:'right' }}>{meta}</span>
                    <input type="number" min="1" max="99"
                      className="prior-input"
                      value={prioridades[meta] || ''}
                      onChange={e => setPrioridades(prev => ({ ...prev, [meta]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display:'flex', gap:'1.5rem', justifyContent:'center', flexWrap:'wrap' }}>
              <button className="btn-accion btn-generar" onClick={handleGenerarCNVPrior}>GENERAR CNV</button>
              <button className="btn-accion btn-inicio" onClick={() => setCurrentView('home')}>VOLVER AL INICIO</button>
            </div>
          </div>
        )}

        {/* ══ 12. EVALUACIÓN — elegir programa ══ */}
        {currentView === 'evaluacion' && (
          <div className="w-full flex flex-col items-center">
            <h1 className="text-4xl font-black text-[#ffcc00] tracking-widest mb-16 uppercase text-center">
              ELIJA EL PROGRAMA PRESUPUESTAL A EVALUAR
            </h1>

            {evalAnalizando && (
              <div style={{ textAlign:'center', marginBottom:'2rem', color:'#ffcc00' }}>
                <div className="pulsing" style={{ fontSize:'1.1rem', fontWeight:700 }}>
                  <span className="spinner" style={{ marginRight:10 }}></span>{faseProceso}
                </div>
              </div>
            )}

            {!evalAnalizando && (
              <div className="grid-estrella">
                <div className="mascara-programa" onClick={() => handleEvalPrograma(programas[0])}>
                  <div className="header-militar">{programas[0].title}</div>
                  <div className="sub-militar">{programas[0].subtitle}</div>
                </div>
                <div className="celda-vacia mascara-programa"></div>
                <div className="mascara-programa" onClick={() => handleEvalPrograma(programas[1])}>
                  <div className="header-militar">{programas[1].title}</div>
                  <div className="sub-militar">{programas[1].subtitle}</div>
                </div>
                <div className="celda-vacia mascara-programa"></div>
                <div className="mascara-programa centro-estrella" onClick={() => handleEvalPrograma(programas[2])}>
                  <div className="header-militar" style={{ display:'flex', alignItems:'center', height:'100%' }}>{programas[2].title}</div>
                </div>
                <div className="celda-vacia mascara-programa"></div>
                <div className="mascara-programa" onClick={() => handleEvalPrograma(programas[3])}>
                  <div className="header-militar">{programas[3].title}</div>
                  <div className="sub-militar">{programas[3].subtitle}</div>
                </div>
                <div className="celda-vacia mascara-programa"></div>
                <div className="mascara-programa" onClick={() => handleEvalPrograma(programas[4])}>
                  <div className="header-militar">{programas[4].title}</div>
                  <div className="sub-militar">{programas[4].subtitle}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ 13. EVALUACIÓN — resultado gauges ══ */}
        {currentView === 'evaluacion_resultado' && evalResultado && (
          <div className="w-full flex flex-col items-center max-w-5xl px-4">
            <div style={{ background:'rgba(0,0,0,0.25)', border:'1px solid rgba(255,204,0,0.2)',
              borderRadius:10, padding:'0.6rem 1.5rem', marginBottom:'3rem',
              color:'#ffcc00', fontWeight:700, fontSize:'0.9rem', textAlign:'center' }}>
              PP {evalPrograma?.id?.toUpperCase()} — {evalPrograma?.title}
            </div>

            <div style={{ display:'flex', gap:'3rem', flexWrap:'wrap', justifyContent:'center', width:'100%', marginBottom:'3rem' }}>
              <Gauge label="TIEMPO" value={evalResultado.tiempo}
                descripcion="TIEMPO TRANSCURRIDO ENTRE EL AVANCE PRESUPUESTAL Y EL ALCANCE DE LA META FÍSICA" />
              <Gauge label="COSTO" value={evalResultado.costo}
                descripcion="COEFICIENTE DE COSTO DEL PROGRAMA PRESUPUESTAL EN COMPARACIÓN A OTROS DENTRO DE LA MISMA UNIDAD EJECUTORA" />
              <Gauge label="CALIDAD" value={evalResultado.calidad}
                descripcion="IMPACTO QUE TIENE EL PROGRAMA PRESUPUESTAL SOBRE LOS OBJETIVOS DEL PLAN OPERATIVO INSTITUCIONAL" />
            </div>

            <div style={{ display:'flex', gap:'1.5rem', justifyContent:'center', flexWrap:'wrap' }}>
              <button className="btn-accion btn-generar" onClick={handleVolver}>VOLVER</button>
              <button className="btn-accion btn-inicio" onClick={() => { setEvalResultado(null); setCurrentView('home'); }}>VOLVER AL INICIO</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default BudgetManagementHome;