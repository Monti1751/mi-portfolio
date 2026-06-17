# 🌌 Mi Portfolio — Fran Montesinos

> Portfolio interactivo en 3D construido con Three.js. Explora mis proyectos navegando por una escena espacial con poliedros orbitando.

🔗 **[Ver en vivo → monti1751.github.io/mi-portfolio](https://monti1751.github.io/mi-portfolio/)**

---

## ✨ Características

- Escena 3D interactiva con **Three.js**
- Poliedros únicos por proyecto orbitando en el espacio
- Campo de estrellas y nebulosas animadas
- Efecto **parallax** con el movimiento del ratón
- Modal con información detallada al hacer clic en cada figura
- Diseño 100% responsive

## 🛠️ Tecnologías

- **HTML5 / CSS3 / JavaScript** (sin frameworks)
- **Three.js r128** — motor de renderizado 3D
- Arquitectura modular con **ES Modules**
- Hospedado en **GitHub Pages**

## 📁 Estructura

```
mi-portfolio/
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── main.js            # Setup de escena, animación y raycasting
    ├── projects.js        # Datos de cada proyecto
    ├── sceneComponents.js # Luces, estrellas, nebulosas y poliedros
    └── ui.js              # Modal y tooltip
```

## 🚀 Proyectos incluidos

| Proyecto | Tipo | Tecnologías |
|---|---|---|
| **MonGit** | Herramienta CLI | JavaScript, Git |
| **Colordary** | App Móvil | Flutter, Dart, Biometría |
| **EZBar** | Sistema Completo | Java, C#, Dart |
| **DopiGame** | Productividad Gamificada | Flutter, Dart |
| **Montimod** | Game Mod (Balatro) | Lua, Game Design |
| **Odoo Laboratorio** | Módulo ERP | Python, Odoo 17 |

## 🖥️ Ejecutar localmente

```bash
# Clona el repositorio
git clone https://github.com/Monti1751/mi-portfolio.git

# Ábrelo con cualquier servidor local, por ejemplo:
npx serve .
```

> ⚠️ Requiere un servidor local (no vale abrir `index.html` directamente) por el uso de ES Modules.

---

Hecho con ☕ por **Fran Montesinos**
