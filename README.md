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
Cada capa tiene una responsabilidad diferente.
Routes
Definen las rutas HTTP y conectan cada endpoint con su controller.
Ejemplo:
GET /api/pokemon/random
Controllers
Reciben req y res.
Extraen parámetros de la petición y llaman a la capa de servicios.
Services
Contienen las reglas de negocio.
Por ejemplo:
- validar tipos;
- validar IDs;
- aplicar paginación;
- verificar que un Pokémon exista antes de guardarlo en la colección.
Repositories
Se encargan del acceso a los datos.
En esta versión trabajan con:
data/pokemon.json
data/collection.json
Esto permite que en el futuro pueda reemplazarse JSON por una base de datos sin modificar toda la aplicación.
Fuente de datos
PokeAPI se utiliza como fuente externa.
Sin embargo, las consultas normales del frontend no realizan peticiones directamente contra PokeAPI.
El proceso es:
PokeAPI
   ↓
scripts/syncPokemon.js
   ↓
transformación de datos
   ↓
data/pokemon.json
   ↓
Backend
   ↓
Frontend
Esto permite controlar el formato de los datos que utiliza nuestra aplicación.
Modelo de Pokémon
PokeAPI proporciona una gran cantidad de información.
Nuestra aplicación transforma cada Pokémon a un modelo simplificado:
{
  "id": 25,
  "name": "pikachu",
  "image": "https://...",
  "types": [
    "electric"
  ],
  "weight": 60,
  "height": 4
}
Actualmente se utilizan solamente:
- id;
- nombre;
- imagen oficial;
- tipos;
- peso;
- altura.
En futuras versiones podrían agregarse:
- habilidades;
- estadísticas;
- experiencia base;
- información de especies;
- sprites adicionales;
- página de detalles.
Estructura del proyecto
pokeapi-backend/
│
├── data/
│   ├── pokemon.json
│   └── collection.json
│
├── scripts/
│   └── syncPokemon.js
│
├── src/
│   ├── controllers/
│   │   ├── collection.controller.js
│   │   ├── health.controller.js
│   │   ├── pokemon.controller.js
│   │   └── type.controller.js
│   │
│   ├── errors/
│   │   └── AppError.js
│   │
│   ├── middlewares/
│   │   ├── error.middleware.js
│   │   └── notFound.middleware.js
│   │
│   ├── repositories/
│   │   ├── collection.repository.js
│   │   └── pokemon.repository.js
│   │
│   ├── routes/
│   │   ├── collection.routes.js
│   │   ├── health.routes.js
│   │   ├── pokemon.routes.js
│   │   └── type.routes.js
│   │
│   ├── services/
│   │   ├── collection.service.js
│   │   └── pokemon.service.js
│   │
│   ├── utils/
│   │   └── pokemon.mapper.js
│   │
│   └── app.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── server.js
Instalación
Clonar el repositorio:
git clone <URL_DEL_REPOSITORIO>
Entrar al proyecto:
cd backend-propio-pokeapi
Instalar dependencias:
npm install
Variables de entorno
Crear un archivo:
.env
utilizando como referencia:
.env.example
Ejemplo:
PORT=3000
FRONTEND_URL=http://localhost:5500
FRONTEND_PRODUCTION_URL=https://planificacion-informatica-frontend.vercel.app
El archivo .env no debe subirse al repositorio.
Ejecutar el proyecto
Modo desarrollo:
npm run dev
Modo normal:
npm start
El servidor utiliza por defecto:
http://localhost:3000
Sincronización con PokeAPI
El proyecto posee un script encargado de descargar la información disponible en PokeAPI.
Ejecutar:
npm run sync:pokemon
El proceso realiza:
PokeAPI
↓
obtención de lista de Pokémon
↓
obtención de detalles
↓
transformación mediante pokemon.mapper.js
↓
data/pokemon.json
La sincronización utiliza peticiones por lotes para evitar ejecutar todas las solicitudes simultáneamente.
También incluye reintentos ante errores temporales.
Una vez generado pokemon.json, las consultas normales del backend utilizan el archivo local.
Endpoints
Estado del backend
GET /api/health
Permite comprobar que el servidor se encuentra funcionando.
Ejemplo:
GET /api/health
Respuesta:
{
  "status": "ok",
  "message": "PokeAPI Backend funcionando"
}
Pokémon
Pokémon aleatorio
GET /api/pokemon/random
Devuelve un Pokémon aleatorio del catálogo local.
Este endpoint está pensado principalmente para ser utilizado cuando se inicia el frontend.
Ejemplo:
GET /api/pokemon/random
Respuesta:
{
  "id": 25,
  "name": "pikachu",
  "image": "https://...",
  "types": [
    "electric"
  ],
  "weight": 60,
  "height": 4
}
Obtener Pokémon por ID
GET /api/pokemon/:id
Ejemplo:
GET /api/pokemon/25
Devuelve Pikachu.
Buscar por nombre
GET /api/pokemon?name=pikachu
Ejemplo:
GET /api/pokemon?name=pikachu
La búsqueda no diferencia entre mayúsculas y minúsculas.
Por ejemplo:
GET /api/pokemon?name=PIKACHU
también es válido.
Filtrar por tipo
GET /api/pokemon?type=fire
Ejemplo:
GET /api/pokemon?type=fire
Devuelve Pokémon del tipo indicado.
Los tipos utilizados por la aplicación son:
- normal
- fire
- water
- grass
- electric
- ice
- fighting
- poison
- ground
- flying
- psychic
- bug
- rock
- ghost
- dark
- dragon
- steel
- fairy
Paginación
Los listados admiten:
limit
offset
Ejemplo:
GET /api/pokemon?type=water&limit=10&offset=0
Siguiente grupo:
GET /api/pokemon?type=water&limit=10&offset=10
Valores por defecto:
limit = 20
offset = 0
El límite máximo permitido es:
50
Ejemplo de respuesta:
{
  "results": [],
  "pagination": {
    "total": 100,
    "limit": 20,
    "offset": 0,
    "count": 20
  }
}
Tipos
GET /api/types
Devuelve los tipos de Pokémon disponibles.
Ejemplo:
GET /api/types
Respuesta aproximada:
[
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water"
]
Colección personal
El archivo:
data/collection.json
almacena Pokémon seleccionados por el usuario.
La colección es independiente del catálogo obtenido desde PokeAPI.
Eliminar un elemento de la colección no elimina ningún Pokémon del catálogo.
Modelo:
{
  "id": 1,
  "pokemonId": 25,
  "name": "pikachu",
  "nickname": "Chispita",
  "notes": "Mi favorito"
}
CRUD de colección
Obtener colección
GET /api/collection
Obtener elemento por ID
GET /api/collection/1
Agregar Pokémon
POST /api/collection
Body:
{
  "pokemonId": 25,
  "nickname": "Chispita",
  "notes": "Mi favorito"
}
El backend verifica primero que pokemonId exista dentro de pokemon.json.
Respuesta:
{
  "id": 1,
  "pokemonId": 25,
  "name": "pikachu",
  "nickname": "Chispita",
  "notes": "Mi favorito"
}
HTTP:
201 Created
Modificar elemento
PATCH /api/collection/1
Ejemplo:
{
  "nickname": "Pika"
}
También puede modificarse:
{
  "notes": "Titular de mi equipo"
}
PATCH realiza una modificación parcial del recurso.
Eliminar elemento
DELETE /api/collection/1
Elimina solamente el registro almacenado en collection.json.
No modifica pokemon.json ni PokeAPI.
Manejo de errores
La aplicación utiliza un middleware global de errores.
El formato utilizado es:
{
  "error": {
    "message": "Descripcion del error",
    "status": 400
  }
}
Ejemplo de Pokémon inexistente:
{
  "error": {
    "message": "Pokemon no encontrado",
    "status": 404
  }
}
Ejemplo de ID inválido:
{
  "error": {
    "message": "El id debe ser un entero mayor a 0",
    "status": 400
  }
}
Ejemplo de tipo inválido:
{
  "error": {
    "message": "Tipo de Pokemon invalido",
    "status": 400
  }
}
Las rutas inexistentes también son procesadas mediante el middleware global.
CORS
El backend permite solicitudes desde los frontend autorizados.
Desarrollo:
http://localhost:5500
Producción:
https://planificacion-informatica-frontend.vercel.app
Otros orígenes pueden recibir:
403 Forbidden
Thunder Client, Postman y herramientas similares pueden utilizarse para probar la API aunque no envíen un header Origin.
Flujo esperado del frontend
Inicio
Cuando se abre la aplicación:
Frontend
↓
GET /api/pokemon/random
↓
Backend
↓
pokemon.json
↓
Pokémon aleatorio
El Pokémon aleatorio se utiliza solamente como contenido inicial de la interfaz.
Buscador
Usuario escribe "pikachu"
↓
GET /api/pokemon?name=pikachu
↓
Backend
↓
pokemon.json
Filtro por tipo
Ejemplo:
Usuario selecciona Fire
↓
GET /api/pokemon?type=fire
↓
Backend
↓
pokemon.json
↓
Pokémon tipo Fire
Git y GitHub
El proyecto colaborativo utiliza:
main
 ↑
dev
 ↑
feature/*
main
Contiene versiones estables e integradas.
No se desarrolla directamente en esta rama.
dev
Es la rama de integración.
Las funcionalidades terminadas llegan a dev mediante Pull Request.
feature
Cada tarea debe desarrollarse en una rama independiente.
Ejemplo:
feature/BE-XX-descripcion-de-la-tarea
Flujo:
git checkout dev
git pull origin dev

git checkout -b feature/BE-XX-descripcion
Después de implementar y probar:
git status
git add .
git commit -m "feat: descripcion del cambio"
git push -u origin feature/BE-XX-descripcion
El desarrollador debe crear:
Pull Request
feature/BE-XX... → dev
El código debe ser revisado antes del merge.
Si existen observaciones, las correcciones se realizan en la misma rama.
Una vez aprobado:
feature
↓
dev
Cuando dev contiene una versión estable e integrada:
dev
↓
Pull Request
↓
main
No es necesario realizar un PR hacia main después de cada tarjeta.
Trabajo colaborativo
Cada integrante debe aportar código identificable mediante:
- rama propia;
- commits propios;
- push propio;
- Pull Request;
- revisión de código.
El objetivo no es solamente obtener una aplicación funcional, sino demostrar trabajo colaborativo mediante Git y GitHub.
Estado actual del backend de referencia
Implementado:
- ES Modules;
- Express;
- arquitectura por capas;
- endpoint health;
- manejo global de errores;
- sincronización PokeAPI;
- transformación de datos;
- almacenamiento en pokemon.json;
- cache de catálogo;
- búsqueda por ID;
- búsqueda por nombre;
- Pokémon aleatorio;
- filtro por tipo;
- paginación;
- listado de tipos;
- collection.json;
- GET de colección;
- POST de colección;
- PATCH de colección;
- DELETE de colección;
- validaciones;
- CORS;
- integración prevista con frontend desplegado en Vercel.
Pendiente fuera del backend de referencia:
- integración completa con el frontend;
- pruebas de integración;
- posibles mejoras futuras.
Mejoras futuras posibles
Si existe tiempo disponible después de completar el MVP, podrían evaluarse:
- página de detalles de cada Pokémon;
- habilidades;
- estadísticas;
- evoluciones;
- sprites adicionales;
- favoritos;
- equipos;
- migración de JSON a MySQL;
- autenticación;
- testing automatizado;
- caché avanzada;
- actualización automática desde PokeAPI.
Estas mejoras no forman parte obligatoria del alcance inicial.