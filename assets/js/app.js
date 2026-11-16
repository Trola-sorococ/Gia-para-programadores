/* ==========================================================================
   Gia para programadores · comportamiento de la página
   --------------------------------------------------------------------------
   No usa librerías externas: todo funciona sin conexión a internet.

     1. Utilidades                        5. Terminal animada del inicio
     2. Iconos                            6. Páginas de tema (índice y secciones)
     3. Modo claro / oscuro               7. Bloques de código (colores y “Copiar”)
     4. Cabecera, pie y buscador
   ========================================================================== */
(function () {
  'use strict';

  const GUIA = window.GUIA;
  if (!GUIA || !Array.isArray(GUIA.temas)) return;

  // Cada página indica en <body> dónde está la raíz del sitio (data-raiz) y,
  // si es la página de un tema, cuál es (data-tema).
  const raiz = document.body.dataset.raiz || '';
  const temaActual = GUIA.temas.find((t) => t.id === document.body.dataset.tema) || null;

  const $ = (selector, contexto) => (contexto || document).querySelector(selector);
  const $$ = (selector, contexto) => Array.from((contexto || document).querySelectorAll(selector));
  const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* 1. Utilidades ---------------------------------------------------------- */

  // Quita mayúsculas y acentos para que “matriz” y “Matríz” se busquen igual
  const normalizar = (texto) => texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const escaparHTML = (texto) => String(texto).replace(/[&<>"']/g, (c) => ESCAPES[c]);

  // Los enlaces apuntan a index.html de forma explícita porque, al abrir la
  // guía como archivo (sin servidor), el navegador no abre solo las carpetas.
  const enlaceTema = (tema, ancla) => raiz + tema.id + '/index.html' + (ancla ? '#' + ancla : '');
  const numero = (n) => String(n + 1).padStart(2, '0');
  const plural = (n, uno, varios) => (n === 1 ? uno : varios);
  const ETIQUETAS_ESTADO = { listo: 'Disponible', pronto: 'Próximamente' };

  // Envuelve en <mark> las partes del texto que coinciden con la búsqueda
  function marcar(texto, fichas) {
    const normal = normalizar(texto);
    if (normal.length !== texto.length) return escaparHTML(texto);
    const marcado = new Array(texto.length).fill(false);
    fichas.forEach((ficha) => {
      let i = normal.indexOf(ficha);
      while (i !== -1) {
        // Igual que al buscar: las palabras cortas solo se marcan al inicio de una palabra
        if (ficha.length > 3 || i === 0 || !/[a-z0-9+#]/.test(normal[i - 1])) {
          for (let k = i; k < i + ficha.length; k++) marcado[k] = true;
        }
        i = normal.indexOf(ficha, i + 1);
      }
    });
    let salida = '';
    let dentro = false;
    for (let i = 0; i < texto.length; i++) {
      if (marcado[i] && !dentro) { salida += '<mark>'; dentro = true; }
      if (!marcado[i] && dentro) { salida += '</mark>'; dentro = false; }
      salida += escaparHTML(texto[i]);
    }
    return dentro ? salida + '</mark>' : salida;
  }


  /* 2. Iconos --------------------------------------------------------------- */

  const svg = (cuerpo) =>
    '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + cuerpo + '</svg>';

  const ICONOS = {
    logo:
      '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><defs><linearGradient id="gia-logo" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#8b9bff"/><stop offset="1" stop-color="#2dd4bf"/></linearGradient></defs>' +
      '<rect width="64" height="64" rx="18" fill="url(#gia-logo)"/>' +
      '<path d="M26 21 15 32l11 11M38 21l11 11-11 11" fill="none" stroke="#0a0f1e" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    buscar: svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
    sol: svg('<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'),
    luna: svg('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'),
    copiar: svg('<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
    ok: svg('<polyline points="20 6 9 17 4 12"/>'),
    flecha: svg('<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>'),
    externo: svg('<path d="M7 17 17 7"/><path d="M7 7h10v10"/>'),
    // Iconos de los temas
    rama: svg('<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>'),
    terminal: svg('<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>'),
    chip: svg('<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>'),
    globo: svg('<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'),
    destello: svg('<path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z"/>'),
  };

  const iconoTema = (tema) => (tema.monograma ? escaparHTML(tema.monograma) : ICONOS[tema.icono] || '');


  /* 3. Modo claro / oscuro ---------------------------------------------------- */
  // El modo inicial lo pone un pequeño script en el <head> de cada página (para
  // que no haya parpadeo). Aquí solo se maneja el botón y se recuerda la elección.

  const modoActual = () => (document.documentElement.getAttribute('data-modo') === 'claro' ? 'claro' : 'oscuro');

  function aplicarModo(modo, guardar) {
    document.documentElement.setAttribute('data-modo', modo);
    if (guardar) {
      try { localStorage.setItem('gia-modo', modo); } catch (e) { /* sin almacenamiento: no pasa nada */ }
    }
    const boton = $('[data-alternar-modo]');
    if (boton) {
      const texto = modo === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
      boton.setAttribute('aria-label', texto);
      boton.setAttribute('title', texto);
    }
  }


  /* 4. Cabecera, pie y buscador ------------------------------------------------ */

  function plantillaCabecera() {
    // En las páginas de tema, la cabecera incluye un buscador que lleva al inicio
    const buscadorMini = temaActual
      ? '<form class="buscador buscador--mini" role="search" action="' + raiz + 'index.html" method="get">' +
        ICONOS.buscar +
        '<input type="search" name="q" placeholder="Buscar en la guía…" aria-label="Buscar en la guía" autocomplete="off" spellcheck="false" data-campo-busqueda>' +
        '<kbd aria-hidden="true">/</kbd></form>'
      : '';

    return (
      '<header class="cabecera"><div class="contenedor cabecera__fila">' +
        '<a class="marca" href="' + raiz + 'index.html" aria-label="Gia para programadores, ir al inicio">' +
          '<span class="marca__logo">' + ICONOS.logo + '</span>' +
          '<span class="marca__texto"><strong>Gia</strong> para programadores</span>' +
        '</a>' +
        '<span class="cabecera__espacio"></span>' +
        buscadorMini +
        '<nav class="cabecera__nav" aria-label="Principal">' +
          '<a href="' + raiz + 'index.html#temas">Temas</a>' +
          '<a href="' + GUIA.repositorio + '" target="_blank" rel="noopener">GitHub ' + ICONOS.externo + '</a>' +
        '</nav>' +
        '<button class="boton-icono boton-modo" type="button" data-alternar-modo>' +
          '<span class="i-sol">' + ICONOS.sol + '</span><span class="i-luna">' + ICONOS.luna + '</span>' +
        '</button>' +
      '</div></header>'
    );
  }

  function plantillaPie() {
    const otros = GUIA.temas.filter((t) => !temaActual || t.id !== temaActual.id);
    const masTemas = temaActual
      ? '<nav class="pie__temas" aria-label="Más temas"><p class="pie__titulo">Más temas</p><ul class="etiquetas etiquetas--enlaces">' +
        otros.map((t) => '<li style="--c:' + t.color + '"><a href="' + enlaceTema(t) + '">' + escaparHTML(t.titulo) + '</a></li>').join('') +
        '</ul></nav>'
      : '';

    return (
      '<footer class="pie"><div class="contenedor">' + masTemas +
        '<div class="pie__fila">' +
          '<p>Gia para programadores · Guía de estudio en español</p>' +
          '<p><a href="' + GUIA.repositorio + '" target="_blank" rel="noopener">Código en GitHub</a> · Funciona sin internet</p>' +
        '</div>' +
      '</div></footer>'
    );
  }

  function montarCabeceraYPie() {
    const cabecera = $('[data-cabecera]');
    if (cabecera) cabecera.outerHTML = plantillaCabecera();
    const pie = $('[data-pie]');
    if (pie) pie.outerHTML = plantillaPie();

    aplicarModo(modoActual(), false);
    const boton = $('[data-alternar-modo]');
    if (boton) boton.addEventListener('click', () => aplicarModo(modoActual() === 'oscuro' ? 'claro' : 'oscuro', true));
  }

  // Pulsar “/” en cualquier página lleva el cursor al buscador
  function atajoBusqueda() {
    document.addEventListener('keydown', (e) => {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]')) return;
      const campo = $('[data-campo-busqueda]');
      if (!campo || campo.offsetParent === null) return;
      e.preventDefault();
      campo.focus();
      campo.select();
    });
  }

  function plantillaTarjeta(tema, n) {
    const total = tema.secciones.length;
    return (
      '<article class="tarjeta aparece" style="--c:' + tema.color + '; --i:' + n + '" data-tema-id="' + tema.id + '">' +
        '<div class="tarjeta__cabecera">' +
          '<span class="icono" aria-hidden="true">' + iconoTema(tema) + '</span>' +
          '<span class="estado estado--' + tema.estado + '">' + ETIQUETAS_ESTADO[tema.estado] + '</span>' +
        '</div>' +
        '<h3 class="tarjeta__titulo"><a class="tarjeta__enlace" href="' + enlaceTema(tema) + '">' + escaparHTML(tema.titulo) + '</a></h3>' +
        '<p class="tarjeta__resumen">' + escaparHTML(tema.resumen) + '</p>' +
        '<ul class="etiquetas">' + (tema.destacados || []).map((d) => '<li>' + escaparHTML(d) + '</li>').join('') + '</ul>' +
        '<p class="tarjeta__pie">' +
          '<span class="tarjeta__datos"><strong>' + total + ' ' + plural(total, 'sección', 'secciones') + '</strong>' +
            '<span>' + escaparHTML(tema.nivel) + '</span></span>' +
          '<span class="tarjeta__flecha" aria-hidden="true">' + ICONOS.flecha + '</span>' +
        '</p>' +
      '</article>'
    );
  }

  function plantillaResultado(item, fichas) {
    const { tema, seccion } = item;
    return (
      '<li class="resultado" style="--c:' + tema.color + '"><a href="' + enlaceTema(tema, seccion.id) + '">' +
        '<span class="icono icono--chico" aria-hidden="true">' + iconoTema(tema) + '</span>' +
        '<span class="resultado__texto">' +
          '<span class="resultado__titulo">' + marcar(seccion.titulo, fichas) +
            '<span class="resultado__tema">' + escaparHTML(tema.titulo) + '</span></span>' +
          '<span class="resultado__resumen">' + marcar(seccion.resumen, fichas) + '</span>' +
        '</span>' +
        '<span class="resultado__flecha" aria-hidden="true">' + ICONOS.flecha + '</span>' +
      '</a></li>'
    );
  }

  function iniciarBuscador(rejilla) {
    const campo = $('[data-campo-busqueda]');
    const formulario = $('[data-formulario-busqueda]');
    const panel = $('[data-resultados]');
    if (!campo || !formulario || !panel) return;

    const lista = $('[data-lista-resultados]', panel);
    const titulo = $('[data-titulo-resultados]', panel);
    const vacio = $('[data-sin-resultados]', panel);
    const nota = $('[data-nota-resultados]', panel);
    const anuncio = $('[data-anuncio]');
    const seccionTemas = $('#temas');
    const tarjetas = $$('.tarjeta', rejilla);
    const MAXIMO = 30;

    // Palabras de relleno que no ayudan a buscar: “cómo usar la IA” se busca como “usar IA”
    const IGNORADAS = new Set([
      'como', 'que', 'de', 'del', 'la', 'las', 'el', 'los', 'lo', 'un', 'una', 'unos', 'unas',
      'en', 'y', 'o', 'a', 'al', 'con', 'por', 'para', 'se', 'es', 'mi', 'mis', 'tu', 'tus',
    ]);

    // Guarda un texto normalizado (n) y también como palabras sueltas (p), para buscar al inicio de palabra
    const preparar = (texto) => {
      const n = normalizar(texto);
      return { n, p: ' ' + n.replace(/[^a-z0-9+#]+/g, ' ').trim() + ' ' };
    };

    // Las palabras cortas (for, ia, css) solo cuentan al inicio de una palabra; las largas, en cualquier parte
    const coincide = (cadena, ficha) => (ficha.length <= 3 ? cadena.p.includes(' ' + ficha) : cadena.n.includes(ficha));

    // Índice de búsqueda: un elemento por cada tema y por cada sección
    const indice = [];
    GUIA.temas.forEach((tema) => {
      const alias = (tema.alias || []).join(' ');
      const nombreTema = preparar(tema.titulo + ' ' + alias);
      indice.push({
        tipo: 'tema',
        tema,
        titulo: preparar(tema.titulo),
        etiquetas: preparar(''),
        lista: [],
        nombreTema,
        texto: preparar([tema.titulo, tema.resumen, alias, (tema.etiquetas || []).join(' '), (tema.destacados || []).join(' ')].join(' ')),
      });
      tema.secciones.forEach((seccion) => {
        const palabras = seccion.etiquetas || [];
        indice.push({
          tipo: 'seccion',
          tema,
          seccion,
          titulo: preparar(seccion.titulo),
          etiquetas: preparar(palabras.join(' ')),
          lista: palabras.map(normalizar),
          nombreTema,
          texto: preparar([seccion.titulo, seccion.resumen, palabras.join(' '), tema.titulo, alias].join(' ')),
        });
      });
    });

    // Puntos de una palabra para un elemento: cuenta la mejor coincidencia (0 = no aparece)
    function puntosDe(item, ficha) {
      let p = 0;
      if (item.titulo.p.includes(' ' + ficha + ' ')) p = 9;          // palabra completa en el título
      else if (item.titulo.n.startsWith(ficha)) p = 8;               // el título empieza así
      else if (item.titulo.p.includes(' ' + ficha)) p = 7;           // alguna palabra del título empieza así
      else if (ficha.length > 3 && item.titulo.n.includes(ficha)) p = 5;
      if (item.lista.includes(ficha)) p = Math.max(p, 6);            // es una etiqueta exacta
      else if (coincide(item.etiquetas, ficha)) p = Math.max(p, 4);
      if (coincide(item.nombreTema, ficha)) p = Math.max(p, 5);      // es el nombre del tema (git, python…)
      if (p === 0 && coincide(item.texto, ficha)) p = 1;             // aparece en el resumen
      return p;
    }

    function evaluar(item, fichas) {
      let puntos = 0;
      let acertadas = 0;
      let nombraElTema = false;
      fichas.forEach((f) => {
        const p = puntosDe(item, f);
        if (p > 0) acertadas++;
        puntos += p;
        if (coincide(item.nombreTema, f)) nombraElTema = true;
      });
      // Si una palabra es el nombre del tema (git, css…), las secciones de ese tema suben en la lista
      return { item, acertadas, puntos: nombraElTema ? puntos + 3 : puntos };
    }

    // Primero los que contienen todas las palabras; si ninguno las tiene todas, los más parecidos
    function buscar(fichas) {
      const orden = (a, b) => b.acertadas - a.acertadas || b.puntos - a.puntos;
      const todos = indice.map((item) => evaluar(item, fichas)).filter((a) => a.acertadas > 0);
      const exactos = todos.filter((a) => a.acertadas === fichas.length);
      if (exactos.length > 0 || fichas.length < 2) return { aciertos: exactos.sort(orden), parcial: false };
      return { aciertos: todos.sort(orden), parcial: true };
    }

    function actualizar() {
      const consulta = campo.value.trim();
      const escritas = normalizar(consulta).split(/\s+/).filter(Boolean);
      // Se descartan las palabras de relleno, salvo que sean lo único que se escribió
      const utiles = escritas.filter((f) => !IGNORADAS.has(f));
      const fichas = utiles.length > 0 ? utiles : escritas;
      document.body.classList.toggle('buscando', fichas.length > 0);

      if (!fichas.length) {
        panel.hidden = true;
        seccionTemas.hidden = false;
        tarjetas.forEach((t) => { t.hidden = false; });
        anuncio.textContent = '';
        return;
      }

      const { aciertos, parcial } = buscar(fichas);
      const secciones = aciertos.filter((a) => a.item.tipo === 'seccion');
      const idsTemas = new Set(aciertos.map((a) => a.item.tema.id));

      tarjetas.forEach((t) => { t.hidden = !idsTemas.has(t.dataset.temaId); });
      seccionTemas.hidden = idsTemas.size === 0;

      panel.hidden = false;
      lista.innerHTML = secciones.slice(0, MAXIMO).map((a) => plantillaResultado(a.item, fichas)).join('');
      lista.hidden = secciones.length === 0;
      vacio.hidden = aciertos.length > 0;

      if (parcial && secciones.length > 0) {
        nota.textContent = 'Ninguna sección tiene todas las palabras; estas coinciden con alguna de ellas.';
      } else if (secciones.length > MAXIMO) {
        nota.textContent = 'Mostrando los ' + MAXIMO + ' mejores resultados de ' + secciones.length + '. Escribe más palabras para afinar la búsqueda.';
      } else {
        nota.textContent = '';
      }
      nota.hidden = nota.textContent === '';

      if (secciones.length > 0) {
        titulo.textContent = parcial
          ? 'Resultados parecidos a «' + consulta + '»'
          : secciones.length + ' ' + plural(secciones.length, 'resultado', 'resultados') + ' para «' + consulta + '»';
      } else if (idsTemas.size > 0) {
        titulo.textContent = 'Temas que coinciden con «' + consulta + '»';
      } else {
        titulo.textContent = 'Sin resultados para «' + consulta + '»';
      }
      anuncio.textContent = aciertos.length === 0
        ? 'Sin resultados'
        : (parcial ? 'Sin coincidencia exacta; resultados parecidos: ' : '') +
          secciones.length + ' ' + plural(secciones.length, 'resultado', 'resultados') + ' en ' + idsTemas.size + ' ' + plural(idsTemas.size, 'tema', 'temas');
    }

    function limpiar() {
      campo.value = '';
      actualizar();
    }

    campo.addEventListener('input', actualizar);
    campo.addEventListener('keydown', (e) => { if (e.key === 'Escape') limpiar(); });

    // Enter abre el mejor resultado
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();
      const primero = $('.resultado a', panel) || $('.tarjeta:not([hidden]) .tarjeta__enlace', rejilla);
      if (primero) window.location.href = primero.href;
    });

    $('[data-limpiar]', panel).addEventListener('click', () => { limpiar(); campo.focus(); });
    $$('[data-sugerencia]').forEach((boton) => {
      boton.addEventListener('click', () => {
        campo.value = boton.dataset.sugerencia;
        actualizar();
        campo.focus();
      });
    });

    // Viene del buscador de otra página: index.html?q=palabra
    const inicial = new URLSearchParams(window.location.search).get('q');
    if (inicial) {
      campo.value = inicial;
      actualizar();
    }
  }

  function iniciarInicio() {
    const rejilla = $('[data-rejilla]');
    if (!rejilla) return;
    rejilla.innerHTML = GUIA.temas.map(plantillaTarjeta).join('');
    iniciarBuscador(rejilla);
    iniciarTerminal();
  }


  /* 5. Terminal animada del inicio --------------------------------------------- */

  const DEMOS = [
    { archivo: 'hola.cpp', lenguaje: 'cpp', codigo: '#include <iostream>\n\nint main() {\n    std::cout << "¡Hola, mundo!";\n    return 0;\n}' },
    { archivo: 'saludo.py', lenguaje: 'python', codigo: 'nombre = input("¿Cómo te llamas? ")\nprint(f"Hola, {nombre}")' },
    { archivo: 'Terminal', lenguaje: 'shell', codigo: '$ git add .\n$ git commit -m "Mi primer commit"\n$ git push' },
    { archivo: 'app.js', lenguaje: 'js', codigo: 'const saludo = "Hola, mundo";\nconsole.log(saludo);' },
    { archivo: 'parpadeo.ino', lenguaje: 'arduino', codigo: 'void setup() { pinMode(LED_BUILTIN, OUTPUT); }\n\nvoid loop() {\n  digitalWrite(LED_BUILTIN, HIGH);\n  delay(500);\n  digitalWrite(LED_BUILTIN, LOW);\n  delay(500);\n}' },
  ];

  // Espera y, si la pestaña está en segundo plano, se detiene hasta volver
  async function pausaVisible(ms) {
    await esperar(ms);
    while (document.hidden) {
      await new Promise((resolver) => document.addEventListener('visibilitychange', resolver, { once: true }));
    }
  }

  async function iniciarTerminal() {
    const cuerpo = $('[data-terminal-codigo]');
    const nombre = $('[data-terminal-archivo]');
    if (!cuerpo || !nombre) return;

    const pintar = (demo, n, cursor) => {
      cuerpo.innerHTML = resaltar(demo.codigo.slice(0, n), demo.lenguaje) + (cursor ? '<span class="cursor"></span>' : '');
    };

    // Si la persona pidió menos animaciones, se muestra un ejemplo fijo
    if (sinMovimiento) {
      nombre.textContent = DEMOS[0].archivo;
      pintar(DEMOS[0], DEMOS[0].codigo.length, false);
      return;
    }

    for (let vuelta = 0; ; vuelta++) {
      const demo = DEMOS[vuelta % DEMOS.length];
      nombre.textContent = demo.archivo;
      for (let n = 0; n <= demo.codigo.length; n++) {
        pintar(demo, n, true);
        await pausaVisible(demo.codigo[n - 1] === '\n' ? 220 : 28 + Math.random() * 40);
      }
      await pausaVisible(2600);
      for (let n = demo.codigo.length; n > 0; n -= 4) {
        pintar(demo, n, true);
        await pausaVisible(14);
      }
      pintar(demo, 0, true);
      await pausaVisible(350);
    }
  }


  /* 6. Páginas de tema ----------------------------------------------------------- */

  function iniciarTema() {
    if (!temaActual) return;
    const tema = temaActual;
    document.body.style.setProperty('--c', tema.color);

    const encabezado = $('[data-encabezado-tema]');
    if (encabezado) {
      encabezado.outerHTML =
        '<section class="tema-cabecera"><div class="contenedor">' +
          '<nav class="migas" aria-label="Ruta de navegación"><a href="' + raiz + 'index.html">Inicio</a>' +
            '<span aria-hidden="true">/</span><span aria-current="page">' + escaparHTML(tema.titulo) + '</span></nav>' +
          '<div class="tema-cabecera__fila">' +
            '<span class="icono icono--grande" aria-hidden="true">' + iconoTema(tema) + '</span>' +
            '<div>' +
              '<h1>' + escaparHTML(tema.titulo) + '</h1>' +
              '<p class="tema-cabecera__resumen">' + escaparHTML(tema.resumen) + '</p>' +
              '<ul class="meta">' +
                '<li>' + tema.secciones.length + ' ' + plural(tema.secciones.length, 'sección', 'secciones') + '</li>' +
                '<li>' + escaparHTML(tema.nivel) + '</li>' +
                '<li class="estado estado--' + tema.estado + '">' + ETIQUETAS_ESTADO[tema.estado] + '</li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
        '</div></section>';
    }

    // Índice lateral
    const lateral = $('[data-toc]');
    if (lateral) {
      lateral.innerHTML =
        '<nav class="toc" aria-label="Contenido de esta página">' +
          '<p class="toc__titulo">En esta página</p>' +
          '<details open><summary>Contenido <span>(' + tema.secciones.length + ')</span></summary><ol>' +
            tema.secciones.map((s, n) =>
              '<li><a href="#' + s.id + '" data-seccion="' + s.id + '"><span class="toc__num">' + numero(n) + '</span>' +
              '<span>' + escaparHTML(s.titulo) + '</span></a></li>').join('') +
          '</ol></details>' +
        '</nav>';

      // En pantallas anchas el índice siempre está abierto; en celular, cerrado
      const detalles = $('details', lateral);
      const ancha = window.matchMedia('(min-width: 901px)');
      const ajustar = () => { detalles.open = ancha.matches; };
      ajustar();
      ancha.addEventListener('change', ajustar);
    }

    // Secciones: las que ya están escritas se respetan; las demás muestran un aviso
    const articulo = $('[data-articulo]');
    if (articulo) {
      tema.secciones.forEach((s, n) => {
        let nodo = document.getElementById(s.id);
        if (!nodo) {
          nodo = document.createElement('section');
          nodo.id = s.id;
          nodo.className = 'pendiente';
          nodo.innerHTML =
            '<div class="pendiente__cabecera"><span class="pendiente__num">' + numero(n) + '</span>' +
            '<h2>' + escaparHTML(s.titulo) + '</h2>' +
            '<span class="estado estado--pronto">Próximamente</span></div>' +
            '<p>' + escaparHTML(s.resumen) + '</p>';
        }
        articulo.appendChild(nodo); // las deja en el mismo orden del índice
      });
      iniciarCodigo(articulo);
    }

    marcarSeccionActiva(tema);

    // Si la página se abrió con #seccion, baja hasta ella (los avisos se crean con JavaScript)
    if (window.location.hash.length > 1) {
      const destino = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (destino) destino.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }

  // Resalta en el índice la sección que se está leyendo
  function marcarSeccionActiva(tema) {
    const enlaces = new Map($$('.toc a').map((a) => [a.dataset.seccion, a]));
    const nodos = tema.secciones.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!nodos.length) return;
    const lateral = $('[data-toc]'); // en pantallas grandes es el contenedor con scroll del índice
    let idActual = null;

    function calcular() {
      // La sección activa es la última cuyo inicio ya pasó la “línea de lectura”
      const linea = window.innerHeight * 0.22;
      let actual = nodos[0];
      nodos.forEach((nodo) => { if (nodo.getBoundingClientRect().top <= linea) actual = nodo; });
      // Al llegar al final de la página las últimas secciones no alcanzan la línea: se marca la última
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) actual = nodos[nodos.length - 1];
      if (actual.id === idActual) return;
      idActual = actual.id;
      enlaces.forEach((a, id) => a.classList.toggle('activo', id === idActual));

      // Si el índice tiene su propio scroll, mantiene visible el enlace activo
      const enlace = enlaces.get(idActual);
      if (enlace && lateral && lateral.scrollHeight > lateral.clientHeight) {
        const caja = lateral.getBoundingClientRect();
        const fila = enlace.getBoundingClientRect();
        if (fila.top < caja.top) lateral.scrollTop -= caja.top - fila.top + 8;
        else if (fila.bottom > caja.bottom) lateral.scrollTop += fila.bottom - caja.bottom + 8;
      }
    }

    // Son pocas lecturas por evento, así que se calcula directamente al desplazarse
    window.addEventListener('scroll', calcular, { passive: true });
    window.addEventListener('resize', calcular);
    calcular();
  }


  /* 7. Bloques de código ----------------------------------------------------------- */
  // En el HTML basta con escribir:  <pre><code class="lenguaje-cpp"> ... </code></pre>
  // Lenguajes: cpp, arduino, python, js, html, css, shell (y texto, sin colores).
  // Opcional en <pre>: data-archivo="main.cpp" (nombre en la barra) y
  // data-sin-copiar (para ocultar el botón, por ejemplo en salidas de programas).

  const span = (tipo, texto) => '<span class="tok-' + tipo + '">' + escaparHTML(texto) + '</span>';
  const palabras = (lista) => new RegExp('\\b(?:' + lista + ')\\b');
  // Junta varias reglas en una sola expresión; cada una es un grupo con nombre
  const unir = (reglas) =>
    new RegExp(Object.keys(reglas).map((nombre) => '(?<' + nombre + '>' + reglas[nombre].source + ')').join('|'), 'gm');

  const COMENTARIO_C = /\/\/[^\n]*|\/\*[\s\S]*?\*\//;
  const CADENA = /"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?/;
  const NUMERO = /\b(?:0[xX][\da-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)[fFuUlL]*\b/;
  const LLAMADA = /\b[A-Za-z_]\w*(?=\s*\()/;

  const PALABRAS_CPP = 'break|case|catch|class|const|constexpr|continue|default|delete|do|else|enum|explicit|extern|false|for|friend|if|inline|namespace|new|noexcept|nullptr|operator|private|protected|public|return|sizeof|static|struct|switch|template|this|throw|true|try|typedef|typename|union|using|virtual|volatile|while';
  const TIPOS_CPP = 'auto|bool|char|double|float|int|long|short|signed|unsigned|void|std|string|vector|queue|stack|deque|map|set|array|pair|cout|cin|cerr|endl|size_t|getline|ifstream|ofstream';
  const TIPOS_ARDUINO = TIPOS_CPP + '|String|Serial|HIGH|LOW|INPUT|OUTPUT|INPUT_PULLUP|LED_BUILTIN|byte|boolean|A0|A1|A2|A3|A4|A5';

  const preprocesadorC = (texto) => {
    const i = texto.indexOf('<');
    return i === -1 ? span('pre', texto) : span('pre', texto.slice(0, i)) + span('cad', texto.slice(i));
  };

  const reglasCpp = (tipos) => ({
    reglas: {
      com: COMENTARIO_C,
      cad: CADENA,
      pre: /^[ \t]*#[ \t]*\w+(?:[ \t]*<[^>\n]*>)?/,
      num: NUMERO,
      tip: palabras(tipos),
      pal: palabras(PALABRAS_CPP),
      fun: LLAMADA,
    },
    especial: { pre: preprocesadorC },
  });

  const IDIOMAS = {
    cpp: reglasCpp(TIPOS_CPP),
    arduino: reglasCpp(TIPOS_ARDUINO),

    python: {
      reglas: {
        com: /#[^\n]*/,
        cad: /(?:[fFrRbBuU]{1,2})?(?:"""[\s\S]*?(?:"""|(?![\s\S]))|'''[\s\S]*?(?:'''|(?![\s\S]))|"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?)/,
        pre: /^[ \t]*@\w+(?:\.\w+)*/,
        num: NUMERO,
        tip: palabras('self|cls'),
        pal: palabras('and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield|None|True|False'),
        fun: LLAMADA,
      },
    },

    js: {
      reglas: {
        com: COMENTARIO_C,
        cad: /`(?:\\[\s\S]|[^`\\])*`?|"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?/,
        num: NUMERO,
        tip: palabras('console|document|window|Math|JSON|Array|Object|String|Number|Promise|Date|Map|Set'),
        pal: palabras('async|await|break|case|catch|class|const|continue|default|delete|do|else|export|extends|finally|for|from|function|if|import|in|instanceof|let|new|of|return|static|super|switch|this|throw|try|typeof|var|void|while|yield|true|false|null|undefined'),
        fun: LLAMADA,
      },
    },

    // Comandos de consola: bash, cmd, PowerShell y git
    shell: {
      reglas: {
        com: /^[ \t]*(?:[Rr][Ee][Mm]\b|::)[^\n]*|(?:^|[ \t])#[^\n]*/,
        cad: /"[^"\n]*"?|'[^'\n]*'?/,
        pre: /^[ \t]*(?:[A-Za-z]:\\[^>\n]*>|PS [^>\n]*>|\$|>)[ \t]+[A-Za-z][\w.-]*/,
        var: /%[A-Za-z_]\w*%|\$\{?[A-Za-z_][\w:]*\}?/,
        opc: /\B--?[A-Za-z][\w-]*/,
        fun: /^[ \t]*[A-Za-z][\w.-]*(?=[ \t]|$)/,
      },
      especial: {
        // Separa el símbolo del prompt ($, >, C:\>) del comando que sigue
        pre: (texto) => {
          const m = /^([ \t]*(?:[A-Za-z]:\\[^>\n]*>|PS [^>\n]*>|\$|>)[ \t]+)([\s\S]*)$/.exec(texto);
          return m ? span('ind', m[1]) + span('fun', m[2]) : span('pre', texto);
        },
      },
    },

    css: {
      reglas: {
        com: /\/\*[\s\S]*?\*\//,
        cad: CADENA,
        pal: /@[\w-]+/,
        num: /#[\da-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:[a-z]+|%)?/,
        var: /--[\w-]+/,
        tip: /[-\w]+(?=\s*:\s*[^;{}]+[;}])/, // nombre de propiedad
        fun: /[.#][A-Za-z_][\w-]*|[-\w]+(?=\()/, // .clase, #id y funciones como rgb()
      },
    },

    // HTML se colorea aparte: primero las etiquetas y luego sus atributos
    html: { manual: resaltarHtml },
  };

  const ALIAS = {
    'c++': 'cpp', c: 'cpp', ino: 'arduino', py: 'python', javascript: 'js',
    bash: 'shell', sh: 'shell', cmd: 'shell', powershell: 'shell', ps1: 'shell', git: 'shell', consola: 'shell',
  };
  const NOMBRES_IDIOMA = {
    cpp: 'C++', arduino: 'Arduino', python: 'Python', js: 'JavaScript', html: 'HTML', css: 'CSS', shell: 'Consola', texto: 'Texto',
  };

  function resaltarHtml(codigo) {
    const etiqueta = /<!--[\s\S]*?(?:-->|(?![\s\S]))|<![A-Za-z][^>]*>|<\/?[A-Za-z][^>]*>/g;
    let salida = '';
    let ultimo = 0;
    let m;
    while ((m = etiqueta.exec(codigo))) {
      salida += escaparHTML(codigo.slice(ultimo, m.index)) + resaltarEtiqueta(m[0]);
      ultimo = etiqueta.lastIndex;
    }
    return salida + escaparHTML(codigo.slice(ultimo));
  }

  function resaltarEtiqueta(texto) {
    if (texto.startsWith('<!--')) return span('com', texto);
    if (texto.startsWith('<!')) return span('pre', texto);
    const m = /^<(\/?)([A-Za-z][\w:-]*)([\s\S]*?)(\/?)>$/.exec(texto);
    if (!m) return escaparHTML(texto);

    const atributo = /([A-Za-z_:@][\w:.-]*)(\s*=\s*)?("[^"]*"|'[^']*'|[^\s"'=<>`]+)?/g;
    let atributos = '';
    let fin = 0;
    let a;
    while ((a = atributo.exec(m[3]))) {
      atributos += escaparHTML(m[3].slice(fin, a.index)) + span('tip', a[1]) +
        (a[2] ? escaparHTML(a[2]) : '') + (a[3] ? span('cad', a[3]) : '');
      fin = atributo.lastIndex;
    }
    atributos += escaparHTML(m[3].slice(fin));
    return escaparHTML('<' + m[1]) + span('fun', m[2]) + atributos + escaparHTML(m[4] + '>');
  }

  function resaltar(codigo, lenguaje) {
    const idioma = IDIOMAS[ALIAS[lenguaje] || lenguaje];
    if (!idioma) return escaparHTML(codigo);
    if (idioma.manual) return idioma.manual(codigo);
    if (!idioma.regex) idioma.regex = unir(idioma.reglas);

    const regex = idioma.regex;
    regex.lastIndex = 0;
    let salida = '';
    let ultimo = 0;
    let m;
    while ((m = regex.exec(codigo))) {
      if (m[0] === '') { regex.lastIndex++; continue; }
      const tipo = Object.keys(m.groups).find((nombre) => m.groups[nombre] !== undefined);
      const especial = idioma.especial && idioma.especial[tipo];
      salida += escaparHTML(codigo.slice(ultimo, m.index)) + (especial ? especial(m[0]) : span(tipo, m[0]));
      ultimo = regex.lastIndex;
    }
    return salida + escaparHTML(codigo.slice(ultimo));
  }

  function copiarConRespaldo(texto) {
    const area = document.createElement('textarea');
    area.value = texto;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;top:-1000px;opacity:0';
    document.body.appendChild(area);
    area.select();
    let copiado = false;
    try { copiado = document.execCommand('copy'); } catch (e) { /* no disponible */ }
    area.remove();
    return copiado;
  }

  function copiar(texto, boton) {
    const avisar = () => {
      const etiqueta = boton.lastElementChild;
      boton.classList.add('copiado');
      etiqueta.textContent = '¡Copiado!';
      setTimeout(() => { boton.classList.remove('copiado'); etiqueta.textContent = 'Copiar'; }, 1800);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(avisar, () => { if (copiarConRespaldo(texto)) avisar(); });
    } else if (copiarConRespaldo(texto)) {
      avisar();
    }
  }

  function crearBloqueCodigo(pre) {
    const codigo = $('code', pre);
    if (!codigo || pre.parentElement.classList.contains('codigo')) return;

    const clase = /lenguaje-([\w+-]+)/.exec(codigo.className);
    const lenguaje = (clase ? clase[1] : pre.dataset.lenguaje || 'texto').toLowerCase();
    const nombre = NOMBRES_IDIOMA[ALIAS[lenguaje] || lenguaje] || lenguaje;
    const texto = codigo.textContent.replace(/^\n+/, '').replace(/\s+$/, '');
    codigo.innerHTML = resaltar(texto, lenguaje);

    const figura = document.createElement('figure');
    figura.className = 'codigo';
    const botonCopiar = pre.hasAttribute('data-sin-copiar')
      ? ''
      : '<button type="button" class="codigo__copiar">' + ICONOS.copiar + '<span aria-live="polite">Copiar</span></button>';
    figura.innerHTML = '<figcaption class="codigo__barra"><span>' + escaparHTML(pre.dataset.archivo || nombre) + '</span>' + botonCopiar + '</figcaption>';
    pre.replaceWith(figura);
    figura.appendChild(pre);

    const boton = $('.codigo__copiar', figura);
    if (boton) boton.addEventListener('click', () => copiar(texto, boton));
  }

  function iniciarCodigo(contenedor) {
    $$('pre', contenedor).forEach(crearBloqueCodigo);
  }


  /* Arranque -------------------------------------------------------------------------- */

  montarCabeceraYPie();
  iniciarInicio();
  iniciarTema();
  atajoBusqueda();
})();
