# 📦 Franchise Data API

Una API desarrollada en Node.js + TypeScript que permite obtener datos de personajes de dos franquicias: **Pokémon** y **Digimon**. Se implementa una arquitectura hexagonal y se incluye soporte para logging, manejo de errores, y lógica de reintentos HTTP.

---

## 🚀 Tecnologías usadas

- Node.js
- TypeScript
- Express
- Axios + axios-retry
- Arquitectura Hexagonal (Ports & Adapters)
- In-memory Logging
- Docker (bonificación)

---

## 🧾 Endpoints

### `GET /api/:franchise/:version`

Permite consultar un personaje por franquicia.

#### Parámetros:
- `:franchise` → `pokemon` o `digimon`
- `:version` → versión libre (ej: `v1`)
- `metadata` (query param) → JSON con nombre del personaje
- `config` (query param) → JSON con configuración (como la URL base)

#### Ejemplo:

```http
GET /api/pokemon/v1?metadata={"name":"pikachu"}&config={"baseUrl":"https://pokeapi.co/api/v2"}
```

#### Respuesta esperada:

```json
{
  "name": "pikachu",
  "weight": 60,
  "powers": ["static", "lightning-rod"],
  "evolutions": ["pichu", "pikachu", "raichu"]
}
```

---

## 🛠️ Cómo correr el proyecto localmente

### 1. Clona el repositorio

```bash
git clone <repo_url>
cd <nombre_proyecto>
```

### 2. Instala dependencias

```bash
npm install
```

### 3. Ejecuta el servidor

```bash
npm start
```

Accede luego a:  
[http://localhost:3000/api/pokemon/v1?metadata={"name":"pikachu"}&config={"baseUrl":"https://pokeapi.co/api/v2"}](http://localhost:3000/api/pokemon/v1?metadata={"name":"pikachu"}&config={"baseUrl":"https://pokeapi.co/api/v2"})

---

## 🐳 Docker (opcional)

### 1. Construir imagen

```bash
docker build -t franchise-app .
```

### 2. Ejecutar contenedor

```bash
docker run -p 3000:3000 franchise-app
```

---

## 🧪 Bonificaciones implementadas

- ✅ Retry en llamadas HTTP (axios-retry)
- ✅ Logging persistente (InMemoryLogRepository)
- ✅ Arquitectura hexagonal
- ✅ Dockerfile funcional
- ✅ Configuración dinámica por query params

---

## 📁 Estructura del proyecto

```
src/
├── api/
│   ├── PokemonApiAdapter.ts
│   └── DigimonApiAdapter.ts
├── application/
│   └── usecases/FetchFranchiseData.ts
├── db/
│   └── InMemoryLogRepository.ts
├── ports/
│   ├── ApiAdapter.ts
│   └── LogRepository.ts
├── server/
│   └── ExpressAdapter.ts
├── config/
│   └── config.ts
└── main.ts
```

---

## 👨‍💻 Autor

Desarrollado por **Rosemberg Diaz**

---