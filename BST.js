class Node {
  constructor(data) {
    this.data = data;
    this.leftNode = null;
    this.rightNode = null;
  }
}

class Tree {
  constructor(arr) {
    arr = mergeSort(arr);
    arr = removeSame(arr);
    this.root = buildTree(arr);
  }

  insert(value, node = this.root) {
    const insertedNode = new Node(value);
    if (node.leftNode === null && node.data > value) {
      node.leftNode = insertedNode;
      return;
    } else if (node.rightNode === null && node.data < value) {
      node.rightNode = insertedNode;
      return;
    }

    if (value > node.data) {
      this.insert(value, node.rightNode);
    } else if (value < node.data) {
      this.insert(value, node.leftNode);
    } else if (value === node) {
      return;
    }
  }
}

const buildTree = (arr) => {
  if (arr.length === 0) {
    return null;
  }
  const mid = Math.floor(arr.length / 2);
  const node = new Node(arr[mid]);
  node.leftNode = buildTree(arr.slice(0, mid));
  node.rightNode = buildTree(arr.slice(mid + 1));
  return node;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightNode !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftNode !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  let left = arr.splice(0, Math.round(arr.length / 2));
  let right = arr;

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let mergedArr = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      mergedArr.push(left[0]);
      left.splice(0, 1);
    } else {
      mergedArr.push(right[0]);
      right.splice(0, 1);
    }
  }

  return [...mergedArr, ...left, ...right];
}

function removeSame(arr) {
  for (i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
console.log(tree.root);
console.log("right = ", tree.root.rightNode);
console.log("left = ", tree.root.leftNode);

tree.insert(33);
prettyPrint(tree.root);
