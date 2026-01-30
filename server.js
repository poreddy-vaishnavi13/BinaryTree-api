const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.use(express.static(__dirname));

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

let root = null;

function insert(node, value) {
  if (!node) return new Node(value);
  if (value < node.value) node.left = insert(node.left, value);
  else node.right = insert(node.right, value);
  return node;
}

app.post("/insert", (req, res) => {
  const { value } = req.body;
  root = insert(root, value);
  res.json(root);
});

app.get("/tree", (req, res) => {
  res.json(root);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
