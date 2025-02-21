# Proyecto Sankey (FloralWhite)
## Descripción

Bea Floralwhite es una biblioteca en JavaScript diseñada para crear diagramas de Sankey interactivos utilizando SVG. Proporciona una forma visualmente atractiva de representar flujos de datos y relaciones entre elementos de una manera clara y estructurada.

## Características

- Creación de diagramas de Sankey con nodos y enlaces.
- Personalización de colores en nodos y enlaces.
- Interactividad con eventos de usuario como `mouseover` y `mouseout`.
- Soporte para degradados en enlaces.
- Persistencia de datos utilizando `localStorage`.
- Interfaz intuitiva para agregar nodos y enlaces dinámicamente.

## Instalación

Para utilizar Bea Floralwhite en un proyecto, se deben incluir los archivos correspondientes:

1. Descargar los archivos `beafloralwhite.js` y `beafloralwhite.css`.
2. Incluir las siguientes líneas en el archivo `index.html`:

```html
<link rel="stylesheet" href="beafloralwhite.css">
<script src="beafloralwhite.js"></script>
```

## Uso

### 1. Agregar Nodos

Para agregar nodos a la visualización, se deben ingresar nombres en los campos de la interfaz y presionar el botón correspondiente para agregar el nodo a la columna A o B.

### 2. Crear Enlaces

Los enlaces se crean seleccionando un nodo de la Columna A y otro de la Columna B, especificando un valor numérico de conexión y presionando el botón para agregar el enlace.

### 3. Renderizar el Gráfico

Una vez agregados los nodos y enlaces, se puede presionar el botón de "Actualizar Gráfico" para visualizar el diagrama Sankey generado.

### 4. Guardar y Borrar Datos

Los datos ingresados se almacenan en `localStorage`, permitiendo su persistencia entre sesiones. También es posible borrar los datos almacenados con el botón correspondiente.

## Estructura del Proyecto

```
├── index.html               # Interfaz de usuario y estructura del proyecto
├── beafloralwhite.js        # Lógica para generar el diagrama de Sankey
├── beafloralwhite.css       # Estilos para el diseño del diagrama y la interfaz
```


# 📊 Explicación del Código de los Archivos Subidos

---

## 1️⃣ `beafloralwhite.js`
📌 **Este archivo es una biblioteca JavaScript que crea gráficos de Sankey interactivos utilizando SVG.**  

Un **Diagrama de Sankey** es una representación visual de flujos de datos, donde el ancho de las conexiones entre nodos representa la magnitud del flujo.

### 🔍 **Cómo funciona**
1. **Crea un contenedor SVG dinámico** en el elemento HTML donde se insertará el gráfico.
2. **Define los nodos y enlaces**, permitiendo personalizar el color y la ubicación.
3. **Dibuja los enlaces con transiciones suaves**, utilizando degradados de colores.
4. **Distribuye los nodos en capas** según la dirección del flujo.
5. **Agrega interactividad** con eventos `mouseover` y `mouseout` para resaltar elementos.

### 🔧 **Funciones principales**
- `createSankeyChart(config)`: Genera un gráfico Sankey basado en los datos de `config`.
- `assignNodeLayers(nodes, sourceNodes)`: Asigna capas a los nodos según su nivel jerárquico.
- `distributeLayerNodes(layerNodes, height, nodePadding)`: Distribuye los nodos de una capa en la pantalla.
- `sankeyLinkPath(x0, y0, x1, y1)`: Calcula la ruta curva de los enlaces entre nodos.
- `createSVGElement(name)`: Crea elementos SVG.
- `createGradient(defs, id, color1, color2)`: Genera degradados de color para los enlaces.

✅ **Útil para**: visualizar flujos de datos de manera intuitiva.

---

## 2️⃣ `index.html`
📌 **Este archivo HTML proporciona una interfaz gráfica para interactuar con el diagrama Sankey.**

### 🔍 **Cómo funciona**
1. **Formulario para agregar nodos**:
   - Se pueden agregar nodos a la **Columna A** o **Columna B**.
   - Los nodos de **Columna A** se representan en azul y los de **Columna B** en naranja.

2. **Formulario para crear enlaces**:
   - Se pueden seleccionar nodos de ambas columnas y asignar un **valor numérico**.
   - Los enlaces representan la cantidad de flujo entre dos nodos.

3. **Funciones interactivas en JavaScript**:
   - `addNode(type)`: Agrega nodos a la lista de opciones disponibles.
   - `addLink()`: Conecta dos nodos con un valor específico.
   - `updateChart()`: Genera o actualiza el gráfico de Sankey.
   - `clearLocalStorage()`: Borra los datos almacenados en el navegador.
   - `saveToLocalStorage()`: Guarda la configuración en `localStorage` para persistencia de datos.

✅ **Útil para**: agregar y visualizar relaciones entre datos sin necesidad de editar código.

---

## 3️⃣ `beafloralwhite.css`
📌 **Este archivo proporciona estilos CSS para los nodos y enlaces del diagrama Sankey.**

### 🔍 **Cómo funciona**
- **Define el estilo de los nodos** (`.bea-floralwhite-node`):
  - Color y borde (`fill: steelblue; stroke: #ffffff`).
  - **Interactividad**: cambia de color al pasar el cursor (`cursor: pointer`).

- **Define el estilo de los enlaces** (`.bea-floralwhite-link`):
  - **Transparencia parcial** en los enlaces (`stroke-opacity: 0.2`).
  - **Hover Effect**: al pasar el cursor, los enlaces se hacen más visibles.

✅ **Útil para**: mejorar la visualización del gráfico Sankey con un diseño moderno.

---

## 4️⃣ `README.md`
📌 **Este archivo parece ser el inicio de documentación del proyecto.**  

Actualmente, solo contiene el título:  
```markdown
# bea-floralwhite



 Resumen de la Conexión entre Archivos
1️⃣ beafloralwhite.js → Contiene la lógica para generar el diagrama Sankey.
2️⃣ index.html → Interfaz para agregar nodos y enlaces de manera interactiva.
3️⃣ beafloralwhite.css → Aplica estilos a los elementos SVG del gráfico.
4️⃣ README.md → Documento que posiblemente describirá el uso de la biblioteca.
