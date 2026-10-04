/*
    Implement the following the code

    const vDocument = new VDocument();
    const body = vDocument.createElement('body');
    const div = vDocument.createElement('div');

    div.innerHTML = 'Hello, I am a div!';
    body.appendChild(div);

    vDocument.render();


    Output of render
    <html>
        <body>
            <div>Hello, I am a div!</div>
        </body>
    </html>
*/

class Node {
  constructor(nodeName) {
    this.nodeName = nodeName;
    this.innerHTML = "";

    this.children = [];
  }

  appendChild(node) {
    this.children.push(node);
  }
}

const INDENT_SIZE = 4;

const getSpaces = (count) => {
  return new Array(count).fill(" ").join("");
};

class VDocument extends Node {
  constructor() {
    super("html");
  }
  createElement(nodeName) {
    return new Node(nodeName);
  }

  render() {
    function printTree(currentNode, currentLevel) {
      const spaces = getSpaces(currentLevel * INDENT_SIZE);
      let output = "";

      // Print the opening tag
      output += `${spaces}<${currentNode.nodeName}>\n`;

      if (currentNode.innerHTML) {
        // Print the opening tag with innerHTML content
        output += `${spaces}${getSpaces(INDENT_SIZE)}${currentNode.innerHTML}\n`;
      }

      // Recursively print the children of the current node
      for (let i = 0; i < currentNode.children.length; i++) {
        output += printTree(currentNode.children[i], currentLevel + 1);
      }

      // Print the closing tag for the current node
      output += `${spaces}</${currentNode.nodeName}>\n`;

      return output;
    }

    console.log(printTree(this, 0));
  }
}

const vDocument = new VDocument();
const body = vDocument.createElement("body");
const div = vDocument.createElement("div");

div.innerHTML = "Hello, I am a div!";
body.appendChild(div);
vDocument.appendChild(body);

vDocument.render();
