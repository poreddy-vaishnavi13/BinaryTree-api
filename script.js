class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let root = null;
const svg = document.getElementById("treeCanvas");

function insertValue() {
  const value = Number(document.getElementById("valueInput").value);
  if (isNaN(value)) return;

  root = insertNode(root, value);
  svg.innerHTML = "";
  drawTree(root, 600, 40, 250);
}

function insertNode(node, val) {
  if (!node) return new Node(val);
  if (val < node.val) node.left = insertNode(node.left, val);
  else node.right = insertNode(node.right, val);
  return node;
}

function drawTree(node, x, y, gap) {
  if (!node) return;

  if (node.left) {
    drawLine(x, y, x - gap, y + 80);
    drawTree(node.left, x - gap, y + 80, gap / 2);
  }

  if (node.right) {
    drawLine(x, y, x + gap, y + 80);
    drawTree(node.right, x + gap, y + 80, gap / 2);
  }

  drawNode(x, y, node.val);
}

function drawNode(x, y, val) {
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", 18);
  circle.setAttribute("class", "node");

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y);
  text.setAttribute("class", "text");
  text.textContent = val;

  svg.appendChild(circle);
  svg.appendChild(text);
}

function drawLine(x1, y1, x2, y2) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("class", "line");
  svg.appendChild(line);
}
