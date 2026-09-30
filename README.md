# NORTHE — sitio web

Sitio de **NORTHE**, consultora de marca y marketing digital en Piura, Perú. Posiciona a NORTHE como especialista del norte del Perú por rubros (gastronomía, salud y estética, inmobiliario y construcción, campañas institucionales) y busca generar solicitudes de auditoría de marca. Incluye un blog sobre SEO, GEO e inteligencia artificial.

Dominio: https://northeconsultora.com

## Estructura

| Ruta | Descripción |
|---|---|
| `index.html` | Portada (HTML + CSS + JS integrados), modo claro/oscuro, JSON-LD `ProfessionalService` |
| `gastronomia/`, `salud-y-estetica/`, `inmobiliario-y-construccion/`, `campanas-y-comunicacion-institucional/` | Una página por rubro, con FAQ y datos estructurados |
| `blog/` | Índice del blog y 4 artículos (SEO local, GEO, IA en el marketing, checklist SEO y GEO) |
| `site.css`, `site.js` | Estilos y script compartidos por las páginas de rubro y del blog |
| `northe-logo.svg`, `og-northe.png` | Logo e imagen para compartir en redes |
| `robots.txt`, `sitemap.xml`, `CNAME` | SEO básico y dominio para GitHub Pages |

## Reglas del proyecto

- Sin frameworks. La portada es autónoma; las demás páginas comparten `site.css` y `site.js`.
- Paleta: azul marino `#061223`, crema `#F0EBE5`, amarillo `#E7C13B`.
- Tipografías: Archivo, Instrument Sans, IBM Plex Mono.
- Único contacto: northepe@gmail.com (sin teléfono, WhatsApp ni nombres personales).
- Precios sin IGV (+18%).

## Publicación

Sitio estático publicado con GitHub Pages desde la rama `main`, carpeta raíz.
