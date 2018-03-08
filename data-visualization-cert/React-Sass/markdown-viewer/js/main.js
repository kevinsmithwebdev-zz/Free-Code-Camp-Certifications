"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var preText = "# header 1 tag\n## header 2 tag ...\n###### header 6 tag\n\n" + "*italics*  _underscores_  **bold** or __bold__  ~~strike-through~~\n\n" + "1. Orderded list item one\n2. Orderded list item two\n3. Orderded list item three\n\n" + "* Unorderded list item\n* Unorderded list item\n* Unorderded list item\n\n" + "[anchor link](https://www.google.com)\n\n" + "Inline `code` has `back-ticks around` it.\n\n" + "```\nfunction codeBlock(args) {\n  if (!wantMessyCodeBlocks) {\n" + "    useTripleBackTicksYouShould();\n  }\n}\n```";

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      markdown: preText
    };
    return _this;
  }

  App.prototype.handleChange = function handleChange(e) {
    this.setState({ markdown: e.target.value });
  };

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-md-12" },
          React.createElement(
            "h1",
            { className: "center title" },
            "Kevin's fCC Markup Previewer Project"
          )
        )
      ),
      React.createElement("br", null),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-md-6" },
          React.createElement(
            "h3",
            { className: "center title" },
            "Markdown"
          )
        ),
        React.createElement(
          "div",
          { className: "col-md-6" },
          React.createElement(
            "h3",
            { className: "center title" },
            "Preview"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-md-6" },
          React.createElement("textarea", { placeholder: "Enter some markdown text.", onChange: this.handleChange.bind(this), value: this.state.markdown, rows: "30", style: { width: "100%" } })
        ),
        React.createElement(
          "div",
          { className: "col-md-6" },
          React.createElement("div", { dangerouslySetInnerHTML: { __html: marked(this.state.markdown) } })
        )
      ),
      React.createElement("br", null),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-md-12" },
          React.createElement(
            "h5",
            { className: "center title" },
            React.createElement(
              "a",
              { href: "https://guides.github.com/features/mastering-markdown/", target: "_blank" },
              "Want to learn more about Git flavored markdown?"
            )
          )
        )
      )
    ); // return
  }; // render

  return App;
}(React.Component); // class App

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
