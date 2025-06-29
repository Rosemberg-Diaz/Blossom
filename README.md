# 🌸 Blossom

Este proyecto es una API REST construida en Node.js con TypeScript, que permite obtener información de diferentes franquicias como Pokémon y Digimon. Aplica arquitectura hexagonal y principios SOLID, incluyendo casos de uso y adaptadores.  

---

## 🧠 Features

- 🌐 API REST con Express
- 🧱 Arquitectura hexagonal
- 🎮 Adaptadores para franquicias: Pokémon y Digimon
- 🪵 Logging persistente en memoria
- ♻️ Retry automático con Axios para peticiones fallidas
- 🧪 Tests con Jest
- 🐳 Dockerfile listo para producción

---

## 🚀 Instalación

```bash
npm install
```

---

## 🔧 Scripts

| Comando              | Descripción                        |
|----------------------|------------------------------------|
| `npm run dev`        | Inicia el servidor en desarrollo   |
| `npm run build`      | Compila el proyecto a JavaScript   |
| `npm run start`      | Ejecuta el proyecto compilado      |
| `npm test`           | Ejecuta los tests                  |

---

## 🐳 Docker

Construye y corre el contenedor:

```bash
docker build -t franchise-app .
docker run -p 3000:3000 franchise-app
```

---

## 📫 Endpoints

### `GET /api/:franchise/:version?metadata={...}&config={...}`

Ejemplo para Pokémon:

```http
GET http://localhost:3000/api/pokemon/v1?metadata={"name":"pikachu"}&config={"baseUrl":"https://pokeapi.co/api/v2"}
```

Ejemplo para Digimon:

```http
GET http://localhost:3000/api/digimon/v1?metadata={"name":"agumon"}&config={"baseUrl":"https://digi-api.com/api/v1"}
```

---

## ✅ Bonificaciones implementadas

| Bonificación                        | Estado |
|------------------------------------|--------|
| Retry automático en Axios          | ✅     |
| Logging persistente                | ✅     |
| Tests con Jest                     | ✅     |
| Dockerfile funcional               | ✅     |
| README completo                    | ✅     |

---

## 🧪 Test

Ejecutar tests con:

```bash
npm test
```

---

## 🔄 Deploy (GitHub)

Sube el proyecto a tu repositorio GitHub:

```bash
git init
git remote add origin https://github.com/Rosemberg-Diaz/Blossom.git
git add .
git commit -m "Initial commit - Blossom project"
git branch -M main
git push -u origin main
```

---

## 👨‍💻 Autor

**Rosemberg Diaz**

---