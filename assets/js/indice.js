/* ==========================================================================
   ÍNDICE DE LA GUÍA
   --------------------------------------------------------------------------
   Aquí se define qué temas hay y qué secciones tiene cada uno. Con estos datos
   se construyen las tarjetas del inicio, el buscador y el índice lateral de
   cada página de tema.

   Cómo agregar o escribir una sección:
     1. Agrégala a la lista `secciones` de su tema, con un `id` único y sin
        acentos ni espacios (por ejemplo: 'ciclo-for').
     2. Escribe su contenido en <carpeta-del-tema>/index.html, dentro de
        <div data-articulo>, así:  <section id="ciclo-for"> ... </section>
        Mientras no exista esa <section>, la página muestra un aviso de
        “Próximamente” con el título y el resumen que pongas aquí.
     3. Cuando un tema esté completo, cambia su `estado` de 'pronto' a 'listo'.

   Campos de cada tema:
     id          nombre de su carpeta (y de su página: <id>/index.html)
     titulo      nombre que se muestra
     monograma   texto corto para el icono (opcional; si no hay, se usa `icono`)
     icono       nombre de un icono de app.js: rama, terminal, chip, globo, destello
     color       color del tema, en formato "R G B" (para tarjetas y detalles)
     alias       nombres con los que la gente busca este tema; también los heredan
                 sus secciones (así, buscar "css" muestra las secciones de web)
     etiquetas   palabras extra para encontrar el tema en el buscador
   ========================================================================== */
(function () {
  'use strict';

  // Atajo para describir una sección: s(id, título, resumen, palabras para el buscador)
  const s = (id, titulo, resumen, etiquetas) => ({ id, titulo, resumen, etiquetas: etiquetas || [] });

  window.GUIA = {
    repositorio: 'https://github.com/Trola-sorococ/Gia-para-programadores',

    temas: [
      /* ------------------------------------------------------------------ */
      {
        id: 'git-github',
        titulo: 'Git y GitHub',
        icono: 'rama',
        color: '249 115 22',
        resumen: 'Para qué sirve cada comando y cómo usarlo bien: trabajando solo con tu IA, en equipo o revisando los cambios de otros.',
        nivel: 'Básico → Avanzado',
        estado: 'listo',
        destacados: ['commit', 'ramas', 'pull request'],
        alias: ['git', 'github'],
        etiquetas: ['repositorio', 'repo', 'control de versiones', 'versionar', 'clone', 'fork', 'pull request'],
        secciones: [
          s('que-es-git-y-github', '¿Qué son Git y GitHub?', 'Qué problema resuelven, en qué se diferencian y cómo se complementan para guardar y compartir tu código.', ['introduccion', 'diferencia', 'control de versiones', 'para que sirve']),
          s('instalar-y-configurar', 'Instalar y configurar Git', 'Instala Git en Windows, configura tu nombre y correo, y conecta tu cuenta de GitHub.', ['instalar', 'configurar', 'git config', 'user.name', 'user.email', 'login', 'ssh', 'token']),
          s('conceptos-clave', 'Conceptos clave', 'Repositorio, commit, rama, remoto y área de preparación: el vocabulario que necesitas para entender todo lo demás.', ['repositorio', 'commit', 'rama', 'remoto', 'staging', 'working tree', 'vocabulario', 'glosario', 'head']),
          s('comandos-basicos', 'Comandos básicos, uno por uno', 'init, clone, status, add, commit, push, pull, log y diff: para qué sirve cada uno, cómo se escribe y cuándo usarlo.', ['init', 'clone', 'status', 'add', 'commit', 'push', 'pull', 'log', 'diff', 'comandos']),
          s('crear-un-repositorio', 'Crear un repositorio', 'Empieza desde tu PC o desde GitHub, y cuándo conviene cada camino.', ['nuevo', 'git init', 'crear repo', 'repositorio nuevo', 'publico', 'privado', 'readme', 'gitignore']),
          s('trabajo-solo-con-ia', 'Caso 1: trabajar solo con tu IA', 'Un flujo sencillo para programar con una IA: ramas cortas, commits pequeños y cómo revisar lo que cambió antes de guardarlo.', ['solo', 'ia', 'cursor', 'flujo', 'individual', 'agente', 'diff', 'revisar']),
          s('ramas-y-fusiones', 'Ramas y fusiones', 'branch, switch y merge: prueba cambios sin romper lo que ya funciona y únelos cuando estén listos.', ['branch', 'switch', 'checkout', 'merge', 'rama', 'fusionar', 'main']),
          s('trabajo-en-equipo', 'Caso 2: trabajar en equipo', 'Fork o clone, una rama por tarea, pull requests e issues: cómo colaborar sin pisarse el trabajo.', ['equipo', 'colaborar', 'fork', 'pull request', 'pr', 'issues', 'colaboradores', 'flujo']),
          s('revisar-cambios', 'Caso 3: revisar los cambios de otros', 'Cómo revisar un pull request y comparar ramas o commits con diff, log y show, y cómo dejar comentarios útiles.', ['revisar', 'code review', 'revision', 'diff', 'log', 'show', 'blame', 'comparar', 'pull request', 'comentarios', 'aprobar']),
          s('resolver-conflictos', 'Resolver conflictos', 'Qué es un conflicto de fusión, cómo leer los marcadores y cómo resolverlo con calma.', ['conflicto', 'merge conflict', 'resolver', 'marcadores']),
          s('deshacer-cambios', 'Deshacer cosas sin miedo', 'restore, reset, revert, stash y reflog: cómo volver atrás según lo que necesites recuperar.', ['deshacer', 'restore', 'reset', 'revert', 'stash', 'reflog', 'recuperar', 'volver atras', 'amend']),
          s('comandos-avanzados', 'Comandos avanzados', 'rebase, cherry-pick, tags, bisect y más, para cuando ya dominas lo básico.', ['rebase', 'cherry-pick', 'tag', 'bisect', 'avanzado', 'submodules', 'worktree']),
          s('mas-alla-del-codigo', 'GitHub más allá del código', 'Issues, Projects, Actions, Pages y Releases: las herramientas que rodean a tu repositorio.', ['issues', 'projects', 'actions', 'pages', 'releases', 'ci', 'cd', 'wiki', 'discussions']),
          s('buenas-practicas', 'Buenas prácticas', 'Mensajes de commit claros, .gitignore, README, licencias y cómo evitar subir contraseñas por accidente.', ['gitignore', 'mensajes de commit', 'readme', 'licencia', 'secretos', 'seguridad', 'convenciones']),
          s('referencia-rapida', 'Referencia rápida de comandos', 'Una tabla para consultar de un vistazo qué hace cada comando y cómo se escribe.', ['chuleta', 'cheat sheet', 'resumen', 'tabla', 'comandos', 'referencia']),
        ],
      },

      /* ------------------------------------------------------------------ */
      {
        id: 'cmd',
        titulo: 'CMD y PowerShell',
        icono: 'terminal',
        color: '34 197 94',
        resumen: 'Maneja la consola de Windows: moverte entre carpetas, crear y borrar archivos, ejecutar programas y automatizar tareas.',
        nivel: 'Básico',
        estado: 'listo',
        destacados: ['cd', 'dir', 'PATH'],
        alias: ['cmd', 'consola', 'terminal', 'powershell', 'shell'],
        etiquetas: ['linea de comandos', 'windows', 'bat', 'simbolo del sistema'],
        secciones: [
          s('que-es-la-consola', '¿Qué es la consola y cómo abrirla?', 'Para qué sirve, las formas de abrirla en Windows y cuál elegir.', ['abrir', 'windows terminal', 'para que sirve']),
          s('cmd-vs-powershell', 'CMD vs PowerShell', 'Diferencias entre las dos consolas de Windows y cuándo usar cada una.', ['diferencias', 'cual usar']),
          s('moverse-entre-carpetas', 'Moverte entre carpetas', 'cd, dir, cd .., cambiar de unidad y rutas absolutas y relativas.', ['cd', 'dir', 'ls', 'ruta', 'navegar', 'carpetas', 'directorio']),
          s('crear-copiar-mover-borrar', 'Crear, copiar, mover y borrar', 'mkdir, copy, move, del y rmdir (y sus equivalentes en PowerShell) con ejemplos seguros.', ['mkdir', 'copy', 'move', 'del', 'rmdir', 'rd', 'md', 'borrar', 'crear carpeta', 'copiar']),
          s('ver-y-buscar', 'Ver y buscar contenido', 'type, more, findstr y where para leer archivos y encontrar texto o programas.', ['type', 'more', 'findstr', 'where', 'buscar', 'grep', 'cat']),
          s('atajos-y-trucos', 'Atajos y trucos', 'Autocompletar con Tab, historial con las flechas, cls y otras formas de trabajar más rápido.', ['tab', 'historial', 'cls', 'clear', 'atajos', 'ctrl+c']),
          s('variables-de-entorno-y-path', 'Variables de entorno y PATH', 'Qué es el PATH, por qué a veces “no se reconoce el comando” y cómo arreglarlo.', ['path', 'variables de entorno', 'set', 'no se reconoce']),
          s('redirecciones-y-pipes', 'Redirecciones y pipes', 'Guarda la salida en un archivo con > y >>, y encadena comandos con |.', ['redireccion', 'pipe', 'tuberia', 'salida', 'archivo']),
          s('procesos-y-red', 'Procesos y red', 'tasklist, taskkill, ipconfig y ping para ver qué corre en tu PC y diagnosticar tu conexión.', ['tasklist', 'taskkill', 'ipconfig', 'ping', 'procesos', 'red', 'internet']),
          s('scripts-bat', 'Scripts .bat', 'Automatiza tareas repetitivas escribiendo tus propios archivos por lotes.', ['bat', 'batch', 'script', 'automatizar', 'lotes']),
          s('comandos-para-programadores', 'Comandos que usarás al programar', 'Cómo ejecutar git, python, node, npm y g++ desde la consola y comprobar que están instalados.', ['git', 'python', 'node', 'npm', 'g++', 'version', 'instalado']),
        ],
      },

      /* ------------------------------------------------------------------ */
      {
        id: 'cpp',
        titulo: 'C++',
        monograma: 'C++',
        color: '108 140 255',
        resumen: 'Lo esencial con ejemplos para copiar: mostrar y pedir datos en consola, ciclos, arreglos, colas y matrices.',
        nivel: 'Básico → Intermedio',
        estado: 'listo',
        destacados: ['cout', 'cin', 'for', 'matrices'],
        alias: ['c++', 'cpp', 'c plus plus'],
        etiquetas: ['programacion', 'compilar', 'g++', 'lenguaje c'],
        secciones: [
          s('primer-programa', 'Tu primer programa', 'Escribe, compila y ejecuta un “Hola, mundo” paso a paso.', ['hola mundo', 'compilar', 'g++', 'main', 'include', 'iostream', 'ejecutar']),
          s('comentarios', 'Comentarios', 'Cómo escribir comentarios de una línea y de varias líneas, y cuándo conviene usarlos.', ['comentario', '//', '/* */', 'documentar']),
          s('variables-y-tipos', 'Variables y tipos de datos', 'int, double, char, bool y string: cómo declarar, asignar y usar variables.', ['int', 'double', 'char', 'bool', 'string', 'variable', 'tipos', 'constantes']),
          s('mostrar-texto', 'Mostrar texto en la consola', 'Usa cout para imprimir texto, números y variables, con saltos de línea.', ['cout', 'imprimir', 'salida', 'endl', 'print', 'mostrar', 'output']),
          s('pedir-datos', 'Pedir datos por consola', 'Lee números y texto del usuario con cin y getline, y evita los errores típicos.', ['cin', 'getline', 'entrada', 'input', 'leer', 'teclado', 'pedir datos']),
          s('ciclo-for', 'Ciclo for', 'Repite instrucciones un número conocido de veces, con ejemplos de conteos y recorridos.', ['for', 'bucle', 'ciclo', 'repetir', 'iteracion', 'loop']),
          s('ciclo-while', 'Ciclo while', 'Repite mientras se cumpla una condición; ideal cuando no sabes cuántas vueltas habrá.', ['while', 'bucle', 'ciclo', 'condicion', 'loop']),
          s('ciclo-do-while', 'Ciclo do while', 'Como while, pero ejecuta el bloque al menos una vez: perfecto para menús y para validar datos.', ['do while', 'do-while', 'bucle', 'ciclo', 'menu', 'validar']),
          s('arreglos', 'Arreglos (arrays)', 'Guarda varios valores en una sola variable y recórrelos con for. Incluye vector.', ['arreglo', 'array', 'vector', 'lista', 'indices']),
          s('matrices', 'Matrices de tamaño N×M', 'Crea una matriz de cualquier tamaño y llénala o recórrela con for anidados, sin escribir cada elemento a mano.', ['matriz', 'matrices', '2d', 'bidimensional', 'for anidado', 'filas', 'columnas', 'optimizar']),
          s('colas', 'Colas (queue)', 'Estructura FIFO: el primero en entrar es el primero en salir. push, pop, front y más.', ['cola', 'queue', 'fifo', 'push', 'pop', 'front', 'estructura de datos']),
        ],
      },

      /* ------------------------------------------------------------------ */
      {
        id: 'arduino',
        titulo: 'Arduino',
        icono: 'chip',
        color: '20 184 166',
        resumen: 'De instalar el IDE a tus primeros circuitos: LEDs, botones, sensores, motores y pantallas, todo paso a paso.',
        nivel: 'Básico → Avanzado',
        estado: 'listo',
        destacados: ['LED', 'sensores', 'servo'],
        alias: ['arduino'],
        etiquetas: ['arduino ide', 'ide', 'placa', 'sketch', 'microcontrolador', 'electronica', 'esp32', 'robotica'],
        secciones: [
          s('que-es-arduino', '¿Qué es Arduino y qué placa elegir?', 'Qué puedes hacer con él y las diferencias entre Uno, Nano, Mega y ESP32.', ['placa', 'uno', 'nano', 'mega', 'esp32', 'que es']),
          s('instalar-arduino-ide', 'Instalar Arduino IDE', 'Descarga e instala el IDE en Windows, instala los drivers y conecta tu placa por USB.', ['instalar', 'descargar', 'driver', 'usb', 'ide', 'puerto com']),
          s('conocer-el-ide', 'Conocer el Arduino IDE', 'Qué hace cada botón: verificar, subir, monitor serie, y los selectores de placa y de puerto.', ['verificar', 'subir', 'upload', 'monitor serie', 'placa', 'puerto', 'interfaz']),
          s('electronica-basica', 'Electrónica básica y seguridad', 'Voltaje, corriente, resistencias y protoboard: lo mínimo para no quemar tus componentes.', ['voltaje', 'corriente', 'resistencia', 'ley de ohm', 'protoboard', 'seguridad', 'multimetro']),
          s('estructura-de-un-sketch', 'Estructura de un sketch', 'setup() y loop(): cómo se organiza un programa de Arduino y en qué orden se ejecuta.', ['sketch', 'setup', 'loop', 'ino', 'estructura']),
          s('primer-proyecto-led', 'Tu primer proyecto: LED parpadeante', 'Conecta un LED con su resistencia y haz que parpadee con pinMode, digitalWrite y delay.', ['led', 'blink', 'parpadeo', 'pinmode', 'digitalwrite', 'delay', 'resistencia', 'protoboard']),
          s('monitor-serie', 'Monitor serie y depuración', 'Serial.begin, print y println para ver datos y encontrar errores en tu programa.', ['serial', 'monitor serie', 'print', 'println', 'depurar', 'debug', 'baudios']),
          s('entradas-y-salidas-digitales', 'Entradas y salidas digitales', 'Lee botones y controla dispositivos con digitalRead y digitalWrite; pull-up y antirrebote.', ['digitalread', 'boton', 'pulsador', 'pull-up', 'antirrebote', 'input_pullup', 'pines']),
          s('entradas-analogicas', 'Entradas analógicas', 'Lee potenciómetros y sensores con analogRead y convierte los valores con map().', ['analogread', 'potenciometro', 'map', 'adc', 'sensor']),
          s('pwm', 'Salidas PWM', 'Controla el brillo de un LED o la velocidad de un motor con analogWrite.', ['pwm', 'analogwrite', 'brillo', 'velocidad', 'dimmer']),
          s('sensores', 'Sensores más comunes', 'Temperatura y humedad (DHT11), distancia (HC-SR04), luz (LDR) y movimiento (PIR).', ['dht11', 'ultrasonico', 'hc-sr04', 'ldr', 'pir', 'temperatura', 'distancia', 'humedad']),
          s('motores-y-actuadores', 'Motores, servos y relés', 'Mueve un servo, controla un motor con un driver y activa cargas con un relé.', ['servo', 'motor', 'l298n', 'rele', 'buzzer', 'driver']),
          s('pantallas', 'Pantallas LCD y OLED', 'Muestra texto y datos en una pantalla LCD 16x2 con I2C o en una OLED.', ['lcd', 'oled', 'i2c', 'pantalla', '16x2', 'display']),
          s('librerias', 'Librerías', 'Qué son, cómo instalarlas desde el gestor y cómo usarlas con #include.', ['libreria', 'library', 'include', 'gestor de librerias', 'instalar libreria']),
          s('millis-sin-bloquear', 'millis(): hacer varias cosas a la vez', 'Evita delay() para que tu programa siga respondiendo mientras espera.', ['millis', 'delay', 'multitarea', 'temporizador', 'no bloqueante']),
          s('comunicacion', 'Comunicación: Serial, I2C y SPI', 'Cómo hablan entre sí placas, sensores y módulos, incluidos Bluetooth y WiFi.', ['i2c', 'spi', 'uart', 'bluetooth', 'wifi', 'comunicacion', 'hc-05', 'esp8266']),
          s('errores-comunes', 'Errores comunes y cómo resolverlos', 'El puerto no aparece, falla al subir, “not in sync”… causas y soluciones.', ['error', 'no sube', 'puerto', 'not in sync', 'problemas', 'solucion', 'avrdude']),
          s('proyectos', 'Proyectos para practicar', 'Ideas paso a paso para aplicar todo lo aprendido: semáforo, alarma, termómetro y más.', ['proyectos', 'ideas', 'practica', 'semaforo', 'alarma']),
        ],
      },

      /* ------------------------------------------------------------------ */
      {
        id: 'python',
        titulo: 'Python',
        monograma: 'Py',
        color: '56 189 248',
        resumen: 'Aprende Python desde cero: sintaxis, estructuras de datos, funciones, archivos y herramientas para tus propios programas.',
        nivel: 'Básico → Intermedio',
        estado: 'listo',
        destacados: ['listas', 'funciones', 'pip'],
        alias: ['python', 'py'],
        etiquetas: ['pip', 'venv', 'scripts', 'python3', 'programacion'],
        secciones: [
          s('instalar-python', 'Instalar Python y tu primer programa', 'Instala Python en Windows, comprueba la versión y ejecuta tu primer “Hola, mundo”.', ['instalar', 'hola mundo', 'python --version', 'ejecutar', 'idle']),
          s('variables-y-tipos', 'Variables y tipos de datos', 'Números, texto, booleanos y None: cómo crear variables y convertir entre tipos.', ['variables', 'int', 'float', 'str', 'bool', 'tipos', 'casting']),
          s('entrada-y-salida', 'Entrada y salida de datos', 'print() para mostrar, input() para pedir datos y f-strings para dar formato.', ['print', 'input', 'f-string', 'formato', 'consola', 'pedir datos', 'mostrar']),
          s('operadores-y-condicionales', 'Operadores y condicionales', 'Comparaciones, and/or/not y la estructura if, elif y else.', ['if', 'elif', 'else', 'operadores', 'comparar', 'condicion']),
          s('bucles', 'Bucles for y while', 'Repite acciones con for, while, range, break y continue.', ['for', 'while', 'range', 'break', 'continue', 'bucle', 'ciclo']),
          s('listas-tuplas-diccionarios', 'Listas, tuplas, diccionarios y conjuntos', 'Las estructuras para guardar colecciones de datos y cuándo usar cada una.', ['lista', 'tupla', 'diccionario', 'dict', 'set', 'conjunto', 'coleccion', 'array']),
          s('funciones', 'Funciones', 'Define tus propias funciones con parámetros, valores por defecto y return.', ['def', 'funcion', 'parametros', 'return', 'lambda']),
          s('archivos', 'Leer y escribir archivos', 'Abre, lee y guarda archivos de texto, CSV y JSON con open() y with.', ['open', 'with', 'archivo', 'txt', 'csv', 'json', 'leer', 'escribir']),
          s('errores-y-excepciones', 'Errores y excepciones', 'Entiende los mensajes de error y maneja los fallos con try y except.', ['try', 'except', 'error', 'excepcion', 'traceback', 'depurar']),
          s('modulos-y-pip', 'Módulos, pip y entornos virtuales', 'Importa código de otros, instala paquetes con pip y aísla cada proyecto con venv.', ['import', 'pip', 'venv', 'paquetes', 'modulos', 'librerias', 'entorno virtual']),
          s('clases-y-objetos', 'Clases y objetos', 'Introducción a la programación orientada a objetos: clases, atributos y métodos.', ['clase', 'objeto', 'poo', 'self', 'init', 'herencia', 'oop']),
          s('proyectos', 'Proyectos para practicar', 'Ejercicios y mini proyectos para afianzar lo aprendido.', ['proyectos', 'ejercicios', 'practica']),
        ],
      },

      /* ------------------------------------------------------------------ */
      {
        id: 'javascript',
        titulo: 'JavaScript',
        monograma: 'JS',
        color: '251 191 36',
        resumen: 'Da vida a tus páginas web y programa también fuera del navegador: de las variables al DOM y las peticiones a una API.',
        nivel: 'Básico → Intermedio',
        estado: 'listo',
        destacados: ['DOM', 'eventos', 'fetch'],
        alias: ['javascript', 'js', 'node', 'nodejs'],
        etiquetas: ['npm', 'web', 'ecmascript', 'programacion'],
        secciones: [
          s('que-es-javascript', '¿Qué es JavaScript y dónde se ejecuta?', 'En el navegador y en Node.js: qué puedes hacer con él y qué necesitas para empezar.', ['node', 'navegador', 'que es', 'introduccion']),
          s('primer-programa', 'Tu primer programa', 'Ejecuta código en la consola del navegador, en una etiqueta script y con Node.js.', ['console.log', 'hola mundo', 'script', 'consola', 'node']),
          s('variables-y-tipos', 'Variables y tipos de datos', 'let, const y los tipos básicos; la diferencia entre == y ===.', ['let', 'const', 'var', 'tipos', 'string', 'number', 'boolean', 'null', 'undefined']),
          s('operadores-y-condicionales', 'Operadores y condicionales', 'if, else, switch y el operador ternario para tomar decisiones.', ['if', 'else', 'switch', 'ternario', 'operadores', 'condicion']),
          s('bucles', 'Bucles', 'for, while, do while, for...of y for...in para repetir y recorrer datos.', ['for', 'while', 'do while', 'for of', 'for in', 'bucle', 'ciclo', 'loop']),
          s('funciones', 'Funciones', 'Declaración, expresión y funciones flecha; parámetros, return y callbacks.', ['function', 'flecha', 'arrow', 'callback', 'parametros', 'return']),
          s('arrays-y-objetos', 'Arrays y objetos', 'Guarda colecciones y datos estructurados; map, filter, reduce y JSON.', ['array', 'arreglo', 'objeto', 'map', 'filter', 'reduce', 'json', 'foreach']),
          s('dom', 'El DOM: leer y cambiar la página', 'Selecciona elementos con querySelector y modifica su texto, estilos y atributos.', ['dom', 'queryselector', 'getelementbyid', 'innerhtml', 'textcontent', 'elementos', 'html']),
          s('eventos', 'Eventos', 'Reacciona a clics, teclas y formularios con addEventListener.', ['evento', 'click', 'addeventlistener', 'teclado', 'formulario', 'submit']),
          s('asincronia-y-fetch', 'Asincronía, promesas y fetch', 'async/await, promesas y cómo pedir datos a una API.', ['async', 'await', 'promesa', 'promise', 'fetch', 'api', 'asincrono']),
          s('modulos-y-npm', 'Módulos y npm', 'Divide tu código en archivos con import/export e instala paquetes con npm.', ['import', 'export', 'modulos', 'npm', 'package.json', 'node']),
          s('depurar', 'Depurar con las DevTools', 'Usa la consola, los puntos de interrupción y la pestaña Red para encontrar errores.', ['devtools', 'depurar', 'debug', 'breakpoint', 'consola', 'errores']),
          s('proyectos', 'Proyectos para practicar', 'Mini proyectos: lista de tareas, calculadora, reloj y más.', ['proyectos', 'ejercicios', 'practica', 'lista de tareas', 'calculadora']),
        ],
      },

      /* ------------------------------------------------------------------ */
      {
        id: 'desarrollo-web',
        titulo: 'Desarrollo web',
        icono: 'globo',
        color: '236 72 153',
        resumen: 'HTML y CSS con estilo profesional: diseño, colores, tipografía y animaciones de texto para que tus páginas se vean increíbles.',
        nivel: 'Básico → Intermedio',
        estado: 'listo',
        destacados: ['Flexbox', 'animaciones', 'responsive'],
        alias: ['html', 'css', 'web', 'desarrollo web'],
        etiquetas: ['diseno', 'estilo', 'animaciones', 'frontend', 'paginas web', 'sitio web'],
        secciones: [
          s('estructura-html', 'Estructura de una página HTML', 'Las etiquetas básicas, cómo se organiza un documento y cómo crear tu primera página.', ['html', 'etiquetas', 'doctype', 'head', 'body', 'estructura']),
          s('html-semantico-y-formularios', 'HTML semántico y formularios', 'header, main, section, footer, enlaces, imágenes y formularios con buenas prácticas.', ['semantico', 'formulario', 'form', 'input', 'img', 'enlace', 'header', 'footer']),
          s('conectar-y-selectores-css', 'CSS: conectarlo y selectores', 'Cómo enlazar una hoja de estilos y elegir qué elementos estilizar.', ['css', 'selectores', 'clase', 'id', 'link', 'hoja de estilos', 'especificidad']),
          s('modelo-de-caja', 'Modelo de caja y espaciado', 'margin, padding, border y box-sizing: la base para alinear y espaciar con precisión.', ['margin', 'padding', 'border', 'box-sizing', 'espaciado', 'caja']),
          s('colores-y-tipografia', 'Colores y tipografía profesionales', 'Cómo elegir paletas agradables, usar variables CSS y combinar fuentes con buen contraste.', ['colores', 'paleta', 'tipografia', 'fuentes', 'variables css', 'contraste', 'font']),
          s('flexbox', 'Flexbox', 'Alinea y distribuye elementos en una fila o columna sin dolores de cabeza.', ['flexbox', 'flex', 'alinear', 'centrar', 'justify-content', 'align-items']),
          s('grid', 'CSS Grid', 'Crea diseños en cuadrícula, como galerías y tableros, de forma sencilla.', ['grid', 'cuadricula', 'galeria', 'layout', 'columnas']),
          s('diseno-responsive', 'Diseño responsive', 'Haz que tu página se vea bien en celular, tablet y computadora con media queries.', ['responsive', 'movil', 'media queries', 'adaptable', 'celular', 'viewport']),
          s('sombras-degradados-y-efectos', 'Sombras, degradados y efectos', 'Dale profundidad y un acabado moderno con box-shadow, gradientes, bordes redondeados y desenfoque.', ['sombra', 'box-shadow', 'degradado', 'gradiente', 'glassmorphism', 'blur', 'border-radius', 'bordes redondeados']),
          s('transiciones-y-hover', 'Transiciones y efectos hover', 'Cambios suaves al pasar el mouse sobre botones, tarjetas y enlaces.', ['transition', 'hover', 'efecto', 'boton', 'suave', 'mouse']),
          s('animaciones-keyframes', 'Animaciones con @keyframes', 'Crea animaciones propias: rebotes, giros, entradas y bucles infinitos.', ['animation', 'keyframes', 'animacion', 'movimiento', 'loop', 'infinito']),
          s('animaciones-de-texto', 'Animaciones de texto', 'Efecto máquina de escribir, texto con degradado, aparición letra por letra y más.', ['texto', 'maquina de escribir', 'typewriter', 'degradado de texto', 'fade', 'letra por letra', 'animar texto', 'efectos de texto']),
          s('animaciones-al-hacer-scroll', 'Animaciones al hacer scroll', 'Haz que los elementos aparezcan al llegar a ellos con IntersectionObserver.', ['scroll', 'aparecer', 'intersectionobserver', 'reveal', 'scroll reveal']),
          s('modo-oscuro-y-claro', 'Modo oscuro y claro', 'Ofrece los dos modos con variables CSS y recuerda la elección de quien visita tu página.', ['modo oscuro', 'dark mode', 'tema', 'prefers-color-scheme', 'localstorage']),
          s('estilo-pro', 'Checklist para un estilo profesional', 'Consistencia, espaciado, contraste y accesibilidad: lo que separa una página amateur de una profesional.', ['profesional', 'estilo pro', 'buenas practicas', 'accesibilidad', 'diseno', 'ux', 'ui']),
          s('publicar-tu-pagina', 'Publicar tu página gratis', 'Pon tu sitio en internet con GitHub Pages.', ['github pages', 'publicar', 'hosting', 'deploy', 'gratis']),
        ],
      },

      /* ------------------------------------------------------------------ */
      {
        id: 'ia-para-programar',
        titulo: 'IA para programar',
        icono: 'destello',
        color: '167 139 250',
        resumen: 'Cómo sacarle el máximo a la IA al programar: buenos prompts, revisar su código y lograr que tus programas salgan bien.',
        nivel: 'Todos los niveles',
        estado: 'listo',
        destacados: ['prompts', 'contexto', 'revisión'],
        alias: ['ia', 'inteligencia artificial'],
        etiquetas: ['prompt', 'prompts', 'cursor', 'chatgpt', 'copilot', 'asistente', 'agente', 'claude', 'llm'],
        secciones: [
          s('como-funciona-la-ia', 'Cómo funciona y qué esperar de la IA', 'Sus fortalezas, sus límites y por qué a veces se equivoca con total seguridad.', ['alucinaciones', 'limites', 'modelo', 'llm', 'que es']),
          s('ia-en-tu-editor', 'La IA dentro de tu editor', 'Chat, edición en línea y agentes (por ejemplo en Cursor): cuándo usar cada uno.', ['cursor', 'editor', 'agente', 'chat', 'copilot', 'vscode', 'ide']),
          s('buenos-prompts', 'Escribir buenos prompts', 'Objetivo, contexto, restricciones y formato de respuesta: la receta para pedir bien.', ['prompt', 'instrucciones', 'pedir', 'contexto', 'formato', 'ingenieria de prompts']),
          s('pedir-un-plan', 'Pedir un plan antes del código', 'Haz que la IA piense y te proponga los pasos antes de escribir nada, y corrígela a tiempo.', ['plan', 'planificar', 'modo plan', 'arquitectura', 'pasos']),
          s('dividir-en-tareas', 'Dividir el proyecto en tareas pequeñas', 'Por qué pedir poco y a la vez da mejores resultados que pedirlo todo de golpe.', ['tareas', 'dividir', 'iterar', 'incremental', 'pasos pequenos']),
          s('dar-contexto', 'Dar contexto del proyecto', 'Archivos, README, reglas y ejemplos para que la IA entienda tu código y tus preferencias.', ['contexto', 'reglas', 'rules', 'readme', 'archivos', 'agents.md']),
          s('revisar-codigo-de-la-ia', 'Revisar el código que genera la IA', 'Checklist para detectar errores, código inventado y malas prácticas antes de aceptar cambios.', ['revisar', 'checklist', 'code review', 'calidad', 'errores', 'verificar']),
          s('probar-y-depurar', 'Probar y depurar con la IA', 'Cómo reportar un error para que la IA lo arregle, y cómo pedirle pruebas que lo demuestren.', ['depurar', 'debug', 'tests', 'pruebas', 'errores', 'traceback', 'arreglar']),
          s('aprender-con-la-ia', 'Aprender con la IA, no solo copiar', 'Pide explicaciones, ejemplos y ejercicios para entender lo que escribes y crecer como programador.', ['aprender', 'explicar', 'ejercicios', 'estudiar', 'tutor']),
          s('seguridad-y-privacidad', 'Seguridad y privacidad', 'Qué nunca compartir (claves, datos personales) y cómo revisar dependencias y permisos.', ['seguridad', 'privacidad', 'api keys', 'secretos', 'claves', 'datos sensibles', 'dependencias']),
          s('flujo-con-git-e-ia', 'Flujo de trabajo con Git e IA', 'Ramas, commits pequeños y revisión de cambios para poder deshacer cualquier error de la IA.', ['git', 'flujo', 'commits', 'ramas', 'revisar diff']),
          s('plantillas-de-prompts', 'Plantillas de prompts listas para copiar', 'Prompts para crear, explicar, depurar, refactorizar, documentar y probar tu código.', ['plantillas', 'prompts', 'copiar', 'ejemplos', 'refactorizar', 'documentar']),
          s('errores-comunes-con-ia', 'Errores comunes al programar con IA', 'Lo que más se repite y cómo evitarlo para que tus programas salgan bien a la primera.', ['errores comunes', 'malas practicas', 'evitar', 'trampas']),
        ],
      },
    ],
  };
})();
