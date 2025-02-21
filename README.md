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

## Código de Ejemplo

Para renderizar un diagrama Sankey utilizando la biblioteca, se usa el siguiente código:

```javascript
beaFloralwhite.createSankeyChart({
  element: "#chart-container",
  data: sankeyData,
  width: 800,
  height: 500
});
```

## Contribución

Si deseas contribuir a este proyecto, puedes realizar un `fork` del repositorio y enviar un `pull request` con mejoras o correcciones.

## Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo libremente en proyectos personales y comerciales.

