# Gia para programadores

Guía de estudio en español para aprender a programar y a trabajar como programador, con ejemplos listos para copiar.

Todo se consulta desde una página web (`index.html`) con un buscador para encontrar cada lenguaje y cada tema. Funciona **sin internet** y sin instalar nada.

## Cómo usarla

1. Descarga o clona este repositorio.
2. Abre `index.html` con doble clic: se abre en tu navegador.
3. Elige un tema o escribe en el buscador, por ejemplo `for`, `git commit`, `css animaciones` o `arduino led`. Con la tecla `/` saltas directo al buscador.

La página tiene modo claro y oscuro (botón de la esquina superior derecha) y cada ejemplo de código tiene un botón **Copiar**.

## Contenido

Cada tema tiene su propia carpeta con su página (`<carpeta>/index.html`):

| Carpeta | Qué incluye | Secciones | Estado |
|---|---|:---:|---|
| `git-github/` | Git y GitHub, de lo más básico a lo avanzado: trabajo en solitario con IA, trabajo en equipo y revisión de cambios | 15 | Disponible |
| `cmd/` | Cómo usar la consola (CMD y PowerShell) | 11 | Disponible |
| `cpp/` | C++: comentarios, entrada y salida por consola, arreglos, colas, `for`, `while`, `do while` y matrices | 11 | Disponible |
| `arduino/` | Arduino IDE y todo lo necesario para empezar y avanzar con Arduino | 18 | Disponible |
| `python/` | Python desde cero | 12 | Disponible |
| `javascript/` | JavaScript desde cero | 13 | Disponible |
| `desarrollo-web/` | HTML y CSS con estilo profesional, animaciones de texto y más | 16 | Disponible |
| `ia-para-programar/` | Cómo usar la IA para programar y lograr que los programas salgan bien | 13 | Disponible |

## Estado

La **base de la página ya está lista**: inicio con buscador, una página por tema con su índice lateral, resaltado de colores para el código, botón de copiar y modo claro/oscuro.

**Ya disponible:** los 8 temas (Git y GitHub, CMD, C++, Arduino, Python, JavaScript, desarrollo web e IA para programar).

El contenido se agregó en este orden:

1. ~~Git y GitHub~~ (listo)
2. ~~C++, CMD, Python y JavaScript~~ (listo)
3. ~~Arduino y desarrollo web~~ (listo)
4. ~~IA para programar~~ (listo)

## Cómo está organizada

```text
index.html                  Inicio: buscador y tarjetas de los temas
<tema>/index.html           Página de cada tema (git-github, cpp, arduino…)
assets/js/indice.js         Lista de temas y secciones (alimenta tarjetas, buscador e índices)
assets/js/app.js            Comportamiento: buscador, índice, colores del código, copiar, modo claro/oscuro
assets/css/estilos.css      Todo el diseño
assets/img/favicon.svg      Icono de la pestaña
```

No usa librerías ni nada que se descargue de internet, por eso funciona abriendo el archivo directamente.

## Cómo agregar contenido

1. En `assets/js/indice.js`, la sección ya está listada dentro de su tema (con su `id`, título y resumen). Si es nueva, agrégala a la lista `secciones` de ese tema.
2. En `<tema>/index.html`, dentro de `<div class="articulo" data-articulo>`, escribe la sección con el mismo `id`:

   ```html
   <section id="ciclo-for">
     <h2>Ciclo for</h2>
     <p>Explicación con <code>código en línea</code>.</p>
     <pre data-archivo="main.cpp"><code class="lenguaje-cpp">for (int i = 0; i &lt; 3; i++) {
       cout &lt;&lt; i;
   }</code></pre>
   </section>
   ```

   Mientras la `<section>` no exista, la página muestra el aviso "Próximamente". Dentro de `<code>` hay que escribir `&lt;` en lugar de `<` (y `&amp;` en lugar de `&`).
3. Cuando un tema esté completo, cambia su `estado` de `'pronto'` a `'listo'` en `indice.js`.

Lenguajes con colores: `cpp`, `arduino`, `python`, `js`, `html`, `css` y `shell` (bash, CMD, PowerShell y Git). Opciones del bloque `<pre>`: `data-archivo="nombre.ext"` muestra el nombre del archivo y `data-sin-copiar` oculta el botón (útil para salidas de programas). Los recuadros de aviso son `<div class="nota">` (informativo) o `<div class="nota nota--consejo">`, `nota--cuidado` y `nota--peligro`, con un `<strong class="nota__titulo">` opcional para su título.
