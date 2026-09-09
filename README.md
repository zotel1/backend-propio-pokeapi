# PokeAPI Backend

Backend desarrollado con **Node.js, Express y JavaScript utilizando ES Modules** para una aplicación Pokédex académica.

El proyecto utiliza información obtenida desde la API pública de PokeAPI, pero evita que el frontend dependa directamente de ella.

La arquitectura general es:

Frontend → Backend propio → Datos locales sincronizados desde PokeAPI

PokeAPI se utiliza mediante un script de sincronización que descarga y transforma la información de los Pokémon y genera un archivo JSON local.

El backend posteriormente trabaja sobre ese archivo para realizar búsquedas, filtros y consultas.

Además, se implementa un CRUD independiente para una colección personal de Pokémon.

---

# Objetivo

Construir una API REST modular que permita:

- sincronizar información desde PokeAPI;
- almacenar localmente los Pokémon en formato JSON;
- obtener un Pokémon aleatorio;
- buscar Pokémon por nombre;
- consultar Pokémon por ID;
- filtrar Pokémon por tipo;
- listar tipos disponibles;
- utilizar paginación;
- administrar una colección personal mediante CRUD;
- manejar errores mediante una estructura uniforme;
- permitir el consumo del backend desde el frontend mediante CORS.

El frontend previsto está desplegado en:

https://planificacion-informatica-frontend.vercel.app

---

# Tecnologías utilizadas

- Node.js
- Express
- JavaScript
- ES Modules
- Fetch API nativa de Node.js
- PokeAPI
- JSON
- CORS
- dotenv

No se utiliza una base de datos en esta versión.

La persistencia se realiza mediante archivos JSON.

---

# Arquitectura general

El proyecto utiliza una arquitectura por capas.

```text
HTTP Request
     ↓
Routes
     ↓
Controllers
     ↓
Services
     ↓
Repositories
     ↓
JSON