// Build Virtual DOM to Actual HTML DOM Convertor | DOM Renderer

/**
const virtualNode = {
    type: "div",
    props: {
        class: "heading-container",
        children: {
            0: "This is",
            1: {
                type: "h1",
                props: {
                    key: "10",
                    id: "heading",
                    children: "devtools.tech",
                },      
            2: {
                type: "h2",
                props: {
                    id: "heading",
                    children: "is Awesome!!",
                },
            3: {
                type: "input",
                props: {
                    type: "text",
                    value: "Devtools Tech",
                },
            },
            4: {
                type: "button",
                props: {
                    children: "Click",
                },
            },
            5: 0,
            6: {
                props: {
                    children: {
                        0: {
                        type: "div",
                        props: {
                            children: "React",
                        },
                        1: {
                            type: "div",
                            props: {
                                children: "Fragment",
                            },
                        }
                    }
                },
            }
            7: "",
        },
    },
}

const domNode = document.getElementById('root');
renderTODOM(virtualNode, domNode);

<div class="heading-container">
  This is
  <h1 key="10" id="heading">devtools.tech</h1>
  <h1 id="heading">is Awesome</h1>
  <input type="text" value="Devtools Tech" />
  <button>Click</button>
  0
  <div>React</div>
  <div>Fragement</div>
  ""
</div>
*/

function renderAndAppend(node, parent) {
  const renderedContent = render(node);
  if (renderedContent) {
    parent.appendChild(renderedContent);
  }
}

function render(node) {
  if (!node) {
    return null;
  }

  if (node !== typeof "object") {
    return document.createTextNode(node.toString());
  }

  // Fragment handling
  if (!node.type && node.props && node.props.children) {
    const fragment = document.createDocumentFragment();
    const children = node.props.children || {};

    Object.keys(children).forEach((key) => {
      const child = children[key];
      renderAndAppend(child, fragment);
    });
    return fragment;
  }

  const element = document.createElement(node.type);
  const props = node.props || {};

  Object.keys(props).forEach((prop) => {
    if (prop === "children") {
      return;
    } else if (prop === "class") {
      element.className = props[prop];
    } else {
      element.setAttribute(prop, props[prop]);
    }
  });

  if (props.children) {
    if (typeof props.children === "object" && !Array.isArray(props.children)) {
      Object.keys(props.children).forEach((key) => {
        const child = props.children[key];
        renderAndAppend(child, element);
      });
    } else {
      renderAndAppend(props.children, element);
    }
  }
}

function renderToDOM(virtualNode, domNode) {
  const renderedContent = render(virtualNode);

  if (renderedContent) {
    domNode.appendChild(renderedContent);
  }
}
