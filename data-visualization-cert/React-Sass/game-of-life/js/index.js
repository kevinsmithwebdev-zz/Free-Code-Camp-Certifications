"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = ReactBootstrap.Button;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;
var MAX_COLOR = 9;

var PRESETS = [{ name: "Glider", shape: [[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 1]]
}, { name: "Lightweight Spaceship", shape: [[-1, -1], [2, -1], [-2, 0], [-2, 1], [2, 1], [-2, 2], [-1, 2], [0, 2], [1, 2]]
}, { name: "F-Pentomino", shape: [[0, -1], [1, -1], [-1, 0], [0, 0], [0, 1]]
}, { name: "C/10 Orthogonal Spaceship", shape: [[-3, -6], [-2, -6], [1, -6], [2, -6], [-1, -5], [0, -5], [-1, -4], [0, -4], [-4, -3], [-2, -3], [1, -3], [3, -3], [-4, -2], [3, -2], [-4, 0], [3, 0], [-3, 1], [-2, 1], [1, 1], [2, 1], [-2, 2], [-1, 2], [0, 2], [1, 2], [-1, 4], [0, 4], [-1, 5], [0, 5]]
}, { name: "Copperhead", shape: [[-1, -6], [0, -6], [-2, -5], [-1, -5], [0, -5], [1, -5], [-3, -3], [-2, -3], [-1, -3], [0, -3], [1, -3], [2, -3], [-2, -2], [-1, -2], [0, -2], [1, -2], [-3, 0], [-2, 0], [1, 0], [2, 0], [-5, 1], [-4, 1], [-2, 1], [1, 1], [3, 1], [4, 1], [-2, 2], [1, 2], [-1, 5], [0, 5], [-1, 6], [0, 6]]
}, { name: "Queen Bee's Shuttle", shape: [[-2, -3], [-4, -2], [-2, -2], [-5, -1], [-3, -1], [-11, 0], [-10, 0], [-6, 0], [-3, 0], [9, 0], [10, 0], [-11, 1], [-10, 1], [-5, 1], [-3, 1], [9, 1], [10, 1], [-4, 2], [-2, 2], [-2, 3]]
}, { name: "Schick's Engine", shape: [[-9, -5], [-6, -5], [-10, -4], [-10, -3], [-6, -3], [-10, -2], [-9, -2], [-8, -2], [-7, -2], [3, -2], [4, -2], [-4, -1], [-3, -1], [-2, -1], [4, -1], [5, -1], [-4, 0], [-3, 0], [-1, 0], [0, 0], [7, 0], [8, 0], [9, 0], [-4, 1], [-3, 1], [-2, 1], [4, 1], [5, 1], [-10, 2], [-9, 2], [-8, 2], [-7, 2], [3, 2], [4, 2], [-10, 3], [-6, 3], [-10, 4], [-9, 5], [-6, 5]]
}, { name: "Free Code Camp", shape: [[-19, -20], [-18, -20], [-17, -20], [-16, -20], [-12, -20], [-11, -20], [-6, -20], [-5, -20], [-4, -20], [-3, -20], [0, -20], [1, -20], [2, -20], [3, -20], [-19, -19], [-13, -19], [-10, -19], [-6, -19], [0, -19], [-19, -18], [-13, -18], [-10, -18], [-6, -18], [0, -18], [-19, -17], [-18, -17], [-17, -17], [-13, -17], [-12, -17], [-11, -17], [-6, -17], [-5, -17], [-4, -17], [0, -17], [1, -17], [2, -17], [-19, -16], [-13, -16], [-11, -16], [-6, -16], [0, -16], [-19, -15], [-13, -15], [-10, -15], [-6, -15], [0, -15], [-19, -14], [-13, -14], [-9, -14], [-6, -14], [-5, -14], [-4, -14], [-3, -14], [0, -14], [1, -14], [2, -14], [3, -14], [-11, -11], [-10, -11], [-9, -11], [-5, -11], [-4, -11], [-3, -11], [1, -11], [2, -11], [7, -11], [8, -11], [9, -11], [10, -11], [-12, -10], [-6, -10], [-2, -10], [1, -10], [3, -10], [7, -10], [-13, -9], [-6, -9], [-2, -9], [1, -9], [4, -9], [7, -9], [-13, -8], [-6, -8], [-2, -8], [1, -8], [4, -8], [7, -8], [8, -8], [9, -8], [-13, -7], [-6, -7], [-2, -7], [1, -7], [4, -7], [7, -7], [-12, -6], [-6, -6], [-2, -6], [1, -6], [3, -6], [7, -6], [-11, -5], [-10, -5], [-9, -5], [-5, -5], [-4, -5], [-3, -5], [1, -5], [2, -5], [7, -5], [8, -5], [9, -5], [10, -5], [-4, -2], [-3, -2], [-2, -2], [3, -2], [8, -2], [14, -2], [17, -2], [18, -2], [19, -2], [-5, -1], [2, -1], [4, -1], [8, -1], [9, -1], [13, -1], [14, -1], [17, -1], [20, -1], [-6, 0], [1, 0], [5, 0], [8, 0], [10, 0], [12, 0], [14, 0], [17, 0], [20, 0], [-6, 1], [1, 1], [5, 1], [8, 1], [11, 1], [14, 1], [17, 1], [18, 1], [19, 1], [-6, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [8, 2], [14, 2], [17, 2], [-5, 3], [1, 3], [5, 3], [8, 3], [14, 3], [17, 3], [-4, 4], [-3, 4], [-2, 4], [1, 4], [5, 4], [8, 4], [14, 4], [17, 4]]
}];

//****************************************************************/

var Cell = function (_React$Component) {
  _inherits(Cell, _React$Component);

  function Cell() {
    _classCallCheck(this, Cell);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Cell.prototype.render = function render() {
    return React.createElement("span", { draggable: "true", className: "cell " + this.props.color + "-" + this.props.cellLife, onClick: this.onCellClick.bind(this, this.props.id), onDragEnter: this.onCellDrag.bind(this, this.props.id) });
  };

  Cell.prototype.onCellClick = function onCellClick(id) {
    this.props.passCellClick(id);
  };

  Cell.prototype.onCellDrag = function onCellDrag(id, e) {
    this.props.passCellClick(id);
  };

  return Cell;
}(React.Component);

//****************************************************************/

var Board = function (_React$Component2) {
  _inherits(Board, _React$Component2);

  function Board() {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Board.prototype.passCellClick = function passCellClick(id) {
    this.props.handleCellClick(id);
  };

  Board.prototype.render = function render() {
    var boardArr = [];
    for (var i = 0; i < this.props.size.numCols; i++) {
      for (var j = 0; j < this.props.size.numRows; j++) {
        var id = j + i * this.props.size.numRows;
        boardArr.push(React.createElement(Cell, { id: id, cellLife: this.props.life[id], color: this.props.color, passCellClick: this.passCellClick.bind(this) }));
      }
    }
    return React.createElement(
      "div",
      { className: "center board-grid" },
      boardArr
    );
  };

  return Board;
}(React.Component);
//****************************************************************/

var Counter = function (_React$Component3) {
  _inherits(Counter, _React$Component3);

  function Counter() {
    _classCallCheck(this, Counter);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  Counter.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "counter" },
      "Turn: ",
      React.createElement(
        "span",
        { className: "counter-digits" },
        this.props.turn
      )
    );
  };

  return Counter;
}(React.Component);

//****************************************************************/

var Controls = function (_React$Component4) {
  _inherits(Controls, _React$Component4);

  function Controls(props) {
    _classCallCheck(this, Controls);

    var _this4 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

    var presetsMenuList = [];

    for (var i = 0; i < PRESETS.length; i++) {
      presetsMenuList.push(React.createElement(
        MenuItem,
        { eventKey: i, onClick: _this4.onPresetSelect.bind(_this4, i) },
        PRESETS[i].name
      ));
    }
    _this4.state = { presetsMenuList: presetsMenuList };
    return _this4;
  }

  Controls.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "center" },
      React.createElement(
        Button,
        { id: "start", bsStyle: this.props.isRunning ? "danger" : "success", onClick: this.onStartClick.bind(this) },
        this.props.isRunning ? "Stop" : "Start"
      ),
      "   ",
      React.createElement(
        ButtonGroup,
        null,
        React.createElement(
          Button,
          { id: "speed-slow", bsStyle: "success", active: this.props.speed == 1000, onClick: this.onSpeedClick.bind(this, "slow") },
          "Slow"
        ),
        React.createElement(
          Button,
          { id: "speed-medium", bsStyle: "success", active: this.props.speed == 500, onClick: this.onSpeedClick.bind(this, "medium") },
          "Medium"
        ),
        React.createElement(
          Button,
          { id: "speed-fast", bsStyle: "success", active: this.props.speed == 100, onClick: this.onSpeedClick.bind(this, "fast") },
          "Fast"
        )
      ),
      "   ",
      React.createElement(
        Button,
        { id: "speed-slow", bsStyle: "warning", onClick: this.onClearClick.bind(this) },
        "Clear"
      ),
      " ",
      React.createElement(
        Button,
        { id: "speed-medium", bsStyle: "warning", onClick: this.onRandomClick.bind(this) },
        this.props.isRunning ? "Shotgun" : "Random"
      ),
      " ",
      React.createElement(
        DropdownButton,
        { bsStyle: "warning", title: "Presets", dropup: true, id: "presets-button" },
        this.state.presetsMenuList
      ),
      "   ",
      React.createElement(
        ButtonGroup,
        null,
        React.createElement(
          Button,
          { id: "color-rainbow", bsStyle: "info", active: this.props.color == "rainbow", onClick: this.onColorClick.bind(this, "rainbow") },
          "Rainbow"
        ),
        React.createElement(
          Button,
          { id: "color-red", bsStyle: "info", active: this.props.color == "red", onClick: this.onColorClick.bind(this, "red") },
          "Red"
        ),
        React.createElement(
          Button,
          { id: "color-gray", bsStyle: "info", active: this.props.color == "gray", onClick: this.onColorClick.bind(this, "gray") },
          "Grayscale"
        )
      ),
      React.createElement("br", null),
      React.createElement("br", null)
    );
  };

  Controls.prototype.onPresetSelect = function onPresetSelect(id, event) {
    this.props.handlePreset(id);
  };

  Controls.prototype.onStartClick = function onStartClick(event) {
    this.props.handleStart();
  };

  Controls.prototype.onSpeedClick = function onSpeedClick(speed, event) {
    this.props.handleSpeed(speed);
  };

  Controls.prototype.onColorClick = function onColorClick(color, event) {
    this.props.handleColor(color);
  };

  Controls.prototype.onClearClick = function onClearClick(event) {
    this.props.handleClear();
  };

  Controls.prototype.onRandomClick = function onRandomClick(event) {
    this.props.handleRandom();
  };

  return Controls;
}(React.Component);
//****************************************************************/

var Game = function (_React$Component5) {
  _inherits(Game, _React$Component5);

  function Game() {
    _classCallCheck(this, Game);

    var _this5 = _possibleConstructorReturn(this, _React$Component5.call(this));

    var numCols = 120;
    var numRows = 80;
    _this5.state = {
      size: {
        numCols: numCols,
        numRows: numRows
      },
      numCells: numCols * numRows,
      life: [],
      isRunning: false,
      timer: 0,
      speed: 100,
      turn: 0,
      color: "rainbow"
    };
    for (var i = 0; i < numCols * numRows; i++) {
      _this5.state.life[i] = 0;
      if (i == 1345 || i == 1346 || i == 1347) _this5.state.life[i] = 1;
    }
    return _this5;
  }

  Game.prototype.componentDidMount = function componentDidMount() {
    this.handleRandom();
    this.handleStart();
  };

  Game.prototype.handleCellClick = function handleCellClick(id) {
    var newLife = this.state.life;
    newLife[id] = this.state.life[id] ? 0 : 1;
    this.setState({
      life: newLife
    });
  };

  Game.prototype.handleRandom = function handleRandom() {
    var PROB = .127;
    var newLife = new Array(this.state.numCells);
    for (var i = 0; i < newLife.length; i++) {
      newLife[i] = Math.random() < PROB ? 1 : 0;
    }
    this.setState({ life: newLife });
  };

  Game.prototype.handleClear = function handleClear() {
    if (this.state.isRunning) this.setState({ timer: clearInterval(this.state.timer), isRunning: false });
    this.setState({ turn: 0, life: Array(this.state.numCells).fill(0) });
  };

  Game.prototype.handleColor = function handleColor(color) {
    this.setState({ color: color });
  };

  Game.prototype.handleSpeed = function handleSpeed(speedStr) {
    var speedVal = undefined;
    switch (speedStr) {
      case 'slow':
        speedVal = 1000;
        break;
      case 'medium':
        speedVal = 500;
        break;
      case 'fast':
        speedVal = 100;
        break;
    }
    this.setState({ speed: speedVal }, function () {
      if (this.state.isRunning) {
        this.setState({ timer: clearInterval(this.state.timer) });
        this.setState({ timer: setInterval(this.iterate.bind(this), this.state.speed) });
      }
    });
  };

  Game.prototype.handleStart = function handleStart() {
    if (this.state.isRunning) this.setState({ timer: clearInterval(this.state.timer), isRunning: false });else {
      this.getCoordList();
      this.setState({ timer: setInterval(this.iterate.bind(this), this.state.speed), isRunning: true });
    }
  };

  Game.prototype.iterate = function iterate() {
    var _this6 = this;

    var growthGrid = [];
    var numNb = undefined;

    for (var i = 0; i < this.state.numCells; i++) {
      var x = i % this.state.size.numCols;
      var y = Math.floor(i / this.state.size.numCols);
      var nbArr = [this.getId(x, y - 1), this.getId(x + 1, y - 1), this.getId(x + 1, y), this.getId(x + 1, y + 1), this.getId(x, y + 1), this.getId(x - 1, y + 1), this.getId(x - 1, y), this.getId(x - 1, y - 1)];
      numNb = nbArr.reduce(function (n, cellId) {
        return n + (_this6.state.life[cellId] > 0);
      }, 0);
      var lifeSet;
      if (this.state.life[i] == 0) // rules for dead square
        lifeSet = numNb == 3 ? 1 : 0;else // rules for live square
        if (numNb == 2 || numNb == 3) lifeSet = this.state.life[i] == MAX_COLOR ? MAX_COLOR : this.state.life[i] + 1;else lifeSet = 0;
      growthGrid.push(lifeSet);
    }

    this.setState({ life: growthGrid, turn: this.state.turn + 1 });
  };

  Game.prototype.handlePreset = function handlePreset(id) {
    this.handleClear();
    var midX = Math.floor(this.state.size.numCols / 2);
    var midY = Math.floor(this.state.size.numRows / 2);
    var newLife = Array(this.state.numCells).fill(0);

    for (var i = 0; i < PRESETS[id].shape.length; i++) {
      newLife[this.getId(midX + PRESETS[id].shape[i][0], midY + PRESETS[id].shape[i][1])] = 1;
    }

    this.setState({ life: newLife });
  };

  Game.prototype.getId = function getId(x, y) {
    if (x >= this.state.size.numCols) x -= this.state.size.numCols;else if (x < 0) x += this.state.size.numCols;
    if (y >= this.state.size.numCols) y -= this.state.size.numRows;else if (y < 0) y += this.state.size.numRows;
    return (y * this.state.size.numCols + x) % this.state.numCells;
  };

  // Just to help me get coords for presets

  Game.prototype.getCoordList = function getCoordList() {
    var coordStr = "";
    var midX = Math.floor(this.state.size.numCols / 2);
    var midY = Math.floor(this.state.size.numRows / 2);

    for (var i = 0; i < this.state.numCells; i++) {
      if (this.state.life[i]) {
        var x = i % this.state.size.numCols - midX;
        var y = Math.floor(i / this.state.size.numCols) - midY;
        coordStr += "[" + x + "," + y + "], ";
      }
    }
    console.log(coordStr);
  };

  Game.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "center" },
      React.createElement(Board, _extends({}, this.state, { handleCellClick: this.handleCellClick.bind(this) })),
      React.createElement(Counter, { turn: this.state.turn }),
      React.createElement("br", null),
      React.createElement(Controls, { isRunning: this.state.isRunning, color: this.state.color, speed: this.state.speed,
        handleStart: this.handleStart.bind(this), handleSpeed: this.handleSpeed.bind(this), handleColor: this.handleColor.bind(this),
        handleClear: this.handleClear.bind(this), handleRandom: this.handleRandom.bind(this), handlePreset: this.handlePreset.bind(this) })
    );
  };

  return Game;
}(React.Component);

//****************************************************************/

var Header = function (_React$Component6) {
  _inherits(Header, _React$Component6);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
  }

  Header.prototype.render = function render() {
    return React.createElement(
      "h1",
      { className: "center" },
      "Kevin's Game of Life"
    );
  };

  return Header;
}(React.Component);
//****************************************************************/

var Footer = function (_React$Component7) {
  _inherits(Footer, _React$Component7);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, _React$Component7.apply(this, arguments));
  }

  Footer.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "center container" },
      React.createElement(
        "h4",
        { className: "center" },
        "Made for ",
        React.createElement(
          "a",
          { href: "https://www.freecodecamp.com" },
          "Free Code Camp"
        ),
        "'s Data Visualizatin Course"
      ),
      React.createElement(
        "h6",
        { className: "center" },
        React.createElement(
          "a",
          { href: "https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" },
          "More Information on Conway's Game of Life"
        )
      )
    );
  };

  return Footer;
}(React.Component);

//****************************************************************/

var App = function (_React$Component8) {
  _inherits(App, _React$Component8);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component8.apply(this, arguments));
  }

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "container center" },
      React.createElement(Header, null),
      React.createElement(Game, null),
      React.createElement(Footer, null)
    );
  }; // render

  return App;
}(React.Component); // class App

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));