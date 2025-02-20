/**
 * bea-floralwhite - Una biblioteca mejorada para crear diagramas de Sankey interactivos con SVG.
 *
 * Autor: (Tu Nombre)
 * Licencia: MIT (o la licencia que prefieras)
 */

(function (global) {
  const BeaFloralwhite = {};

  /**
   * Crea un gráfico de Sankey con enlaces degradados y eventos interactivos.
   * @param {Object} config - Configuración del gráfico de Sankey
   */
  BeaFloralwhite.createSankeyChart = function (config) {
    const { element, data, width, height, nodeWidth = 20, nodePadding = 10 } = config;

    let container = typeof element === "string" ? document.querySelector(element) : element;
    if (!container) throw new Error("El elemento contenedor no se encontró.");

    container.innerHTML = "";
    const svg = createSVGElement("svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.classList.add("bea-floralwhite-svg");
    container.appendChild(svg);

    const defs = createSVGElement("defs");
    svg.appendChild(defs);

    const nodes = data.nodes.map((d, i) => ({
      index: i,
      name: d.name || `Node ${i}`,
      color: d.color || getRandomColor(),
    }));

    const nameToIndex = {};
    nodes.forEach((node, i) => (nameToIndex[node.name] = i));

    const links = data.links.map((link, idx) => {
      const sourceIndex = typeof link.source === "string" ? nameToIndex[link.source] : link.source;
      const targetIndex = typeof link.target === "string" ? nameToIndex[link.target] : link.target;

      if (sourceIndex === undefined || targetIndex === undefined) {
        throw new Error(`Error: Nodo no encontrado en el enlace ${JSON.stringify(link)}`);
      }

      return { source: sourceIndex, target: targetIndex, value: +link.value, id: idx };
    });

    nodes.forEach((n) => {
      n.sourceLinks = [];
      n.targetLinks = [];
      n.valueIn = 0;
      n.valueOut = 0;
      n.linkOffsetOut = 0;
      n.linkOffsetIn = 0;
    });

    links.forEach((link) => {
      const s = nodes[link.source];
      const t = nodes[link.target];
      s.sourceLinks.push(link);
      t.targetLinks.push(link);
      s.valueOut += link.value;
      t.valueIn += link.value;
    });

    const sourceNodes = nodes.filter((n) => n.valueIn === 0);
    assignNodeLayers(nodes, sourceNodes);
    const maxLayer = Math.max(...nodes.map((d) => d.layer));
    const xScale = (width - nodeWidth) / maxLayer;

    nodes.forEach((n) => {
      n.x0 = n.layer * xScale;
      n.x1 = n.x0 + nodeWidth;
    });

    const layers = Array.from({ length: maxLayer + 1 }, () => []);
    nodes.forEach((n) => layers[n.layer].push(n));

    layers.forEach((layerNodes) => {
      distributeLayerNodes(layerNodes, height, nodePadding);
    });

    links.forEach((link, idx) => {
      const source = nodes[link.source];
      const target = nodes[link.target];

      const linkHeight = Math.min(source.y1 - source.y0, target.y1 - target.y0) * 0.8;
      const sy0 = source.y0 + source.linkOffsetOut + linkHeight / 2;
      const ty0 = target.y0 + target.linkOffsetIn + linkHeight / 2;
      source.linkOffsetOut += linkHeight + nodePadding;
      target.linkOffsetIn += linkHeight + nodePadding;

      const gradientId = `gradient-${source.index}-${target.index}-${idx}`;
      const gradient = createGradient(defs, gradientId, source.color, target.color);

      const path = createSVGElement("path");
      path.setAttribute("class", "bea-floralwhite-link");
      path.setAttribute("d", sankeyLinkPath(source.x1, sy0, target.x0, ty0));
      path.setAttribute("stroke", `url(#${gradientId})`);
      path.setAttribute("stroke-width", linkHeight);
      path.setAttribute("fill", "none");

      path.addEventListener("mouseover", () => {
        path.style.strokeOpacity = 0.7;
      });
      path.addEventListener("mouseout", () => {
        path.style.strokeOpacity = 0.2;
      });

      svg.appendChild(path);
    });

    nodes.forEach((node) => {
      const g = createSVGElement("g");
      g.setAttribute("class", "bea-floralwhite-node");

      const rect = createSVGElement("rect");
      rect.setAttribute("x", node.x0);
      rect.setAttribute("y", node.y0);
      rect.setAttribute("width", nodeWidth);
      rect.setAttribute("height", node.y1 - node.y0);
      rect.setAttribute("fill", node.color);
      rect.setAttribute("stroke", "#ffffff");
      rect.setAttribute("rx", 5);
      rect.setAttribute("ry", 5);
      rect.setAttribute("stroke-width", 2);

      rect.addEventListener("mouseover", () => {
        rect.style.fill = "orange";
      });
      rect.addEventListener("mouseout", () => {
        rect.style.fill = node.color;
      });

      g.appendChild(rect);

      const text = createSVGElement("text");
      text.setAttribute("x", node.x0 + nodeWidth / 2);
      text.setAttribute("y", node.y0 + (node.y1 - node.y0) / 2);
      text.setAttribute("dy", "0.35em");
      text.setAttribute("text-anchor", "middle");
      text.textContent = node.name;
      g.appendChild(text);

      svg.appendChild(g);
    });
  };

  function assignNodeLayers(nodes, sourceNodes) {
    let layer = 0;
    let currentLayerNodes = sourceNodes;

    while (currentLayerNodes.length > 0) {
      const nextLayerNodes = [];
      currentLayerNodes.forEach((node) => {
        node.layer = layer;
        node.sourceLinks.forEach((link) => {
          const targetNode = nodes[link.target];
          if (targetNode.layer === undefined) {
            nextLayerNodes.push(targetNode);
          }
        });
      });

      currentLayerNodes = nextLayerNodes;
      layer++;
    }
  }

  function distributeLayerNodes(layerNodes, height, nodePadding) {
    const availableHeight = height - (layerNodes.length - 1) * nodePadding;
    const nodeHeight = availableHeight / layerNodes.length;

    layerNodes.forEach((node, i) => {
      node.y0 = i * (nodeHeight + nodePadding);
      node.y1 = node.y0 + nodeHeight;
    });
  }

  function sankeyLinkPath(x0, y0, x1, y1) {
    return `M${x0},${y0} C${x0 + 50},${y0} ${x1 - 50},${y1} ${x1},${y1}`;
  }

  function createSVGElement(name) {
    return document.createElementNS("http://www.w3.org/2000/svg", name);
  }

  function createGradient(defs, id, color1, color2) {
    const gradient = createSVGElement("linearGradient");
    gradient.setAttribute("id", id);
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "0%");

    const stop1 = createSVGElement("stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", color1);
    gradient.appendChild(stop1);

    const stop2 = createSVGElement("stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", color2);
    gradient.appendChild(stop2);

    defs.appendChild(gradient);
    return gradient;
  }

  global.beaFloralwhite = BeaFloralwhite;
})(this);
