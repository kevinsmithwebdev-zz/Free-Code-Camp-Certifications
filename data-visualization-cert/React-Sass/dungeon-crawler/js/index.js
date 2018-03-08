"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonGroup = ReactBootstrap.ButtonGroup;
var DropdownButton = ReactBootstrap.DropdownButton;
var MenuItem = ReactBootstrap.MenuItem;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;

var DUNGEON_GRID = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var S_CODE = 0; // code for a stone segment, dungeon wall
var F_CODE = 1; // code for a floor segment - open, empty dungeon
var P_CODE = 2; // code for player
var M_CODE = 3; // code for a monster
var H_CODE = 4; // code for health
var W_CODE = 5; // code for a weapon
var B_CODE = 6; // code for the boss

//****************************************************************/

var Controls = function (_React$Component) {
  _inherits(Controls, _React$Component);

  function Controls() {
    _classCallCheck(this, Controls);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Controls.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "controls-box" },
      React.createElement(
        Grid,
        { fluid: true },
        React.createElement(
          Row,
          { className: "show-grid" },
          React.createElement(
            Col,
            { md: 4 },
            React.createElement(
              Button,
              { bsSize: "large", id: "wimp-mode", bsStyle: "danger", onClick: this.onReset.bind(this) },
              "Reset"
            )
          ),
          React.createElement(
            Col,
            { md: 4, className: "stats-title" },
            "Information/Controls"
          ),
          React.createElement(
            Col,
            { md: 4 },
            React.createElement(
              Button,
              { bsSize: "large", className: "lights-" + (this.props.isWimpMode ? "off" : "on"), id: "wimp-mode", bsStyle: "inverse", onClick: this.onWimpModeToggle.bind(this) },
              "Turn ",
              this.props.isWimpMode ? "off" : "on",
              " the Lights"
            )
          )
        ),
        React.createElement(
          Row,
          { className: "show-grid stats-row" },
          React.createElement(
            Col,
            { md: 3, className: "stats-data" },
            React.createElement(
              "strong",
              null,
              "Health:"
            ),
            " ",
            this.props.player.health,
            "      ",
            React.createElement(
              "strong",
              null,
              "Level:"
            ),
            " ",
            this.props.player.level,
            React.createElement("br", null),
            React.createElement(
              "strong",
              null,
              "Weapon:"
            ),
            " ",
            this.props.player.weapon.name,
            React.createElement("br", null),
            React.createElement(
              "strong",
              null,
              "Attack:"
            ),
            " ",
            this.props.player.weapon.attack,
            " × ",
            1 + (this.props.player.level - 1) * 0.25,
            " (level bonus)"
          ),
          React.createElement(
            Col,
            { md: 5, className: "stats-messages" },
            this.props.messages.map(function (msg) {
              return React.createElement(
                "div",
                { className: msg.code + "-msg" },
                msg.str
              );
            })
          ),
          React.createElement(
            Col,
            { md: 4, className: "rules" },
            React.createElement(
              "span",
              { className: "player-msg bold" },
              "You"
            ),
            " must collect ",
            React.createElement(
              "span",
              { className: "health-msg bold" },
              "health"
            ),
            " and ",
            React.createElement(
              "span",
              { className: "weapons-msg bold" },
              "weapons"
            ),
            " to fight ",
            React.createElement(
              "span",
              { className: "monsters-msg bold" },
              "monsters"
            ),
            " before you take on the big guy, the ",
            React.createElement(
              "span",
              { className: "monsters-msg bold" },
              "Boss!"
            ),
            " Each kill raises your health and level (and attack bonus). Good luck!"
          )
        )
      )
    );
  };

  Controls.prototype.onWimpModeToggle = function onWimpModeToggle(event) {
    this.props.handleToggleWimpMode();
  };

  Controls.prototype.onReset = function onReset(event) {
    this.props.handleReset();
  };

  return Controls;
}(React.Component);
//****************************************************************/

var Cell = function (_React$Component2) {
  _inherits(Cell, _React$Component2);

  function Cell() {
    _classCallCheck(this, Cell);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Cell.prototype.render = function render() {
    // console.log("cell id = " + this.props.id + " and class ='cell cell-" + this.props.status + "'");
    return React.createElement("span", { className: "cell opacity-" + (this.props.isWimpMode ? 1 : this.props.opacity) + " cell-" + this.props.status });
  };
  // onCellClick(id) {
  //   console.log("clicked = " + id); //onClick={this.onCellClick.bind(this, this.props.id)}
  // }

  return Cell;
}(React.Component);
//****************************************************************/

var Dungeon = function (_React$Component3) {
  _inherits(Dungeon, _React$Component3);

  function Dungeon() {
    _classCallCheck(this, Dungeon);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  Dungeon.prototype.render = function render() {
    var dungeonArr = [];
    for (var i = 0; i < this.props.size.numCols; i++) {
      for (var j = 0; j < this.props.size.numRows; j++) {
        var id = j + i * this.props.size.numRows;
        dungeonArr.push(React.createElement(Cell, { id: id, status: this.props.map[id], opacity: this.props.opacity[id], isWimpMode: this.props.isWimpMode }));
      }
    }
    return React.createElement(
      "div",
      { className: "dungeon" },
      dungeonArr
    );
  };

  return Dungeon;
}(React.Component);

//****************************************************************/

var OverModal = function (_React$Component4) {
  _inherits(OverModal, _React$Component4);

  function OverModal() {
    _classCallCheck(this, OverModal);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  OverModal.prototype.winOrLoose = function winOrLoose() {
    if (this.props.player.health <= 0) return "You loose! Sorry! Try your luck Again!";else return "You win! Double or nothing?";
  };

  OverModal.prototype.render = function render() {
    return React.createElement(
      Modal,
      { show: this.props.isOver },
      React.createElement(
        Modal.Header,
        null,
        React.createElement(
          Modal.Title,
          { className: "over-title" },
          "Game over, man!"
        )
      ),
      React.createElement(
        Modal.Body,
        { className: "over-body" },
        this.winOrLoose()
      ),
      React.createElement(
        Modal.Footer,
        null,
        React.createElement(
          Button,
          { bsStyle: "danger", onClick: this.onRestart.bind(this) },
          "Reset"
        )
      )
    );
  };

  OverModal.prototype.onRestart = function onRestart(event) {
    this.props.handleReset();
  };

  return OverModal;
}(React.Component);

//****************************************************************/

var Game = function (_React$Component5) {
  _inherits(Game, _React$Component5);

  function Game() {
    _classCallCheck(this, Game);

    // console.log("Game.constructor");

    var _this5 = _possibleConstructorReturn(this, _React$Component5.call(this));

    _this5.state = {
      map: [],
      size: { numRows: 50, numCols: 100 },
      player: { location: 0, health: 0, weapon: { name: "", attack: 0 }, level: 1 },
      messages: [],
      isWimpMode: false,
      isOver: false,
      monsters: [],
      health: [],
      weapons: [],
      boss: []
    };
    // console.log("here?!?");
    _this5.state.size.numCells = _this5.state.size.numCols * _this5.state.size.numRows;
    _this5.state.map = new Array(_this5.state.size.numCells).fill(0);
    _this5.state.opacity = new Array(_this5.state.size.numCells).fill(0);
    return _this5;
  }

  Game.prototype.componentDidMount = function componentDidMount() {
    // console.log("Game.componentWillMount...");
    // console.log(this);
    this.setInitialState();
  };

  //*********************************/
  //*********************************/ 
  //*********************************/

  Game.prototype.setInitialState = function setInitialState() {
    // console.log("Game.setInitialState");
    // console.log(this);
    var newState = this.state;

    newState.map = DUNGEON_GRID.slice();
    newState.opacity.fill(0);

    newState.player = {
      location: 2244,
      health: 100,
      weapon: { name: "rolled up newspaper", attack: 100 },
      level: 1
    };
    newState.messages = [{ str: "Welcome to the dungeon!", code: "white" }, { str: "But never forget...", code: "white" }, { str: "Lasciate ogne speranza, voi ch'intrate!", code: "white" }];
    newState.isWimpMode = false;
    newState.isOver = false;
    newState.monsters = [{ name: "ogre", location: -1, health: 50, attack: 50 }, { name: "ogre", location: -1, health: 50, attack: 50 }, { name: "attack poodle", location: -1, health: 20, attack: 20 }, { name: "troll", location: -1, health: 70, attack: 70 }, { name: "troll", location: -1, health: 70, attack: 70 }];
    newState.health = [{ location: -1, health: 70 }, { location: -1, health: 100 }, { location: -1, health: 80 }, { location: -1, health: 50 }, { location: -1, health: 100 }];
    newState.weapons = [{ name: "Louisville Slugger", location: -1, attack: 20 }, { name: "hatchet", location: -1, attack: 40 }, { name: "short sword", location: -1, attack: 60 }, { name: "bastard sword", location: -1, attack: 80 }, { name: "battle axe", location: -1, attack: 100 }];
    newState.boss = [{
      location: -1, attack: 200, health: 300
    }];

    placeInDungeon.call(this, this.state.monsters, "monsters", M_CODE);
    placeInDungeon.call(this, this.state.health, "health", H_CODE);
    placeInDungeon.call(this, this.state.weapons, "weapons", W_CODE);
    placeInDungeon.call(this, this.state.boss, "boss", B_CODE);

    newState.map[newState.player.location] = P_CODE;

    this.changeOpacity(newState.player.location, 1);

    this.setState(newState);

    /******************/
    function placeInDungeon(itemArr, key, code) {
      // console.log("here3");
      // console.log(itemArr);
      // console.log("key = " + key + " and code = " + code + " length = " + itemArr.length);

      for (var i = 0; i < itemArr.length; i++) {
        // console.log("here3a - " + i);
        var newLoc = undefined;
        var row = undefined;
        var col = undefined;
        do {
          // console.log("here4");
          newLoc = this.randomInt(0, this.state.size.numCells - 1);
          row = this.getRowFromId(newLoc);
          col = this.getColFromId(newLoc);
          // console.log("checking - " + newLoc + "  row = " + row + "  col = " + col);
        } while (!(this.state.map[newLoc] == F_CODE && this.state.map[this.getCoordFromId(row, col - 1)] == F_CODE && this.state.map[this.getCoordFromId(row + 1, col - 1)] == F_CODE && this.state.map[this.getCoordFromId(row + 1, col)] == F_CODE && this.state.map[this.getCoordFromId(row + 1, col + 1)] == F_CODE && this.state.map[this.getCoordFromId(row, col + 1)] == F_CODE && this.state.map[this.getCoordFromId(row - 1, col + 1)] == F_CODE && this.state.map[this.getCoordFromId(row - 1, col)] == F_CODE && this.state.map[this.getCoordFromId(row - 1, col - 1)] == F_CODE));

        // console.log("done, newLoc is " + newLoc);
        this.state.map[newLoc] = code;
        if (key == "boss") {
          this.state.map[this.getCoordFromId(row, col + 1)] = code;
          this.state.map[this.getCoordFromId(row + 1, col)] = code;
          this.state.map[this.getCoordFromId(row + 1, col + 1)] = code;
        }
        this.state[key][i].location = newLoc;
        // console.log("Setting monster " + i + " at " + newLoc);
      }
    }
  };

  //*********************************/
  //*********************************/
  //*********************************/

  Game.prototype.changeOpacity = function changeOpacity(loc, opLevel) {

    var row = this.getRowFromId(loc);
    var col = this.getColFromId(loc);
    var newOpacity = this.state.opacity;
    var newLoc = undefined;

    for (var r = -3; r <= 3; r++) {
      for (var c = -3; c <= 3; c++) {
        if (Math.abs(r * c) != 9 && row + r >= 0 && row + r < this.state.size.numRows && col + c >= 0 && col + c < this.state.size.numCols) newOpacity[this.getCoordFromId(row + r, col + c)] = opLevel;
      }
    }

    this.setState({ opacity: newOpacity });
  };

  Game.prototype.addMessage = function addMessage(str, code) {
    var newMessages = this.state.messages;
    newMessages.shift();
    newMessages.push({ str: str, code: code });
    this.setState({ messages: newMessages });
  };

  Game.prototype.randomInt = function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  Game.prototype.movePlayer = function movePlayer(move) {
    var newMap = this.state.map;
    var newPlayer = this.state.player;
    var newLoc = undefined;

    var curC = this.getColFromId(this.state.player.location);
    var curR = this.getRowFromId(this.state.player.location);
    var newC = curC;
    var newR = curR;

    switch (move) {
      case 37:
        newC--;
        break;
      case 38:
        newR--;
        break;
      case 39:
        newC++;
        break;
      case 40:
        newR++;
        break;
    }

    newLoc = this.getCoordFromId(newR, newC);
    var newState = undefined;
    var mDamage = undefined;
    var pDamage = undefined;

    switch (this.state.map[newLoc]) {

      case S_CODE:
        break;

      case F_CODE:
        this.changeOpacity(this.state.player.location, 2);
        this.changeOpacity(newLoc, 1);
        newMap[newLoc] = P_CODE;
        newMap[this.state.player.location] = F_CODE;
        newPlayer.location = newLoc;
        this.setState({ map: newMap, player: newPlayer });

        break;

      case M_CODE:
        var monsterIndex = this.getIndexItem(newLoc, "monsters");
        pDamage = Math.floor(this.state.player.weapon.attack * (1 + (this.state.player.level - 1) * 0.25) * (this.randomInt(50, 110) / 100));
        mDamage = Math.floor(this.state.monsters[monsterIndex].attack * ((this.randomInt(50, 110) - this.state.player.level * 5) / 100));
        this.addMessage("Attacking the " + this.state.monsters[monsterIndex].name + "! You did " + pDamage + " damage and took " + mDamage + "!", "monsters");
        newState = this.state;
        newState.player.health -= mDamage;
        newState.monsters[monsterIndex].health -= pDamage;
        if (newState.player.health <= 0) {
          this.addMessage("Sorry dude, the " + this.state.monsters[monsterIndex].name + " killed you!", "player");
        } else if (newState.monsters[monsterIndex].health <= 0) {
          this.addMessage("Huzzah! The " + this.state.monsters[monsterIndex].name + " is dead!", "player");
          newState.map[newLoc] = P_CODE;
          newState.map[this.state.player.location] = F_CODE;
          this.changeOpacity(newState.player.location, 2);
          this.changeOpacity(newLoc, 1);
          newState.player.location = newLoc;
          newState.player.level++;
        } else {
          this.addMessage("No winner! " + this.state.monsters[monsterIndex].name + " has " + newState.monsters[monsterIndex].health + " health left.", "monsters");
        }
        this.setState(newState);
        break;

      case H_CODE:
        newState = this.state;
        var healthIndex = this.getIndexItem(newLoc, "health");
        newState.player.health += this.state.health[healthIndex].health;
        this.addMessage("Health gained, +" + this.state.health[healthIndex].health + " points!", "health");
        newState.health.splice(healthIndex, 1);
        newState.map[newLoc] = P_CODE;
        newState.map[this.state.player.location] = F_CODE;
        this.changeOpacity(this.state.player.location, 2);
        this.changeOpacity(newLoc, 1);
        newState.player.location = newLoc;
        this.setState(newState);
        break;

      case W_CODE:
        newState = this.state;
        newState.player.weapon = this.state.weapons[0];
        this.addMessage("Picked up " + newState.player.weapon.name + ", new attack is " + newState.player.weapon.attack + " points!", "weapons");
        newState.weapons.shift();
        newState.map[newLoc] = P_CODE;
        newState.map[this.state.player.location] = F_CODE;
        this.changeOpacity(this.state.player.location, 2);
        this.changeOpacity(newLoc, 1);
        this.state.player.location = newLoc;
        this.setState(newState);
        break;

      case B_CODE:
        pDamage = Math.floor(this.state.player.weapon.attack * (1 + (this.state.player.level - 1) * 0.25) * (this.randomInt(50, 110) / 100));
        mDamage = Math.floor(this.state.boss[0].attack * ((this.randomInt(50, 110) - this.state.player.level * 5) / 100));
        this.addMessage("Attacking the Boss! You did " + pDamage + " damage and took " + mDamage + "!", "monsters");
        newState = this.state;
        newState.player.health -= mDamage;
        newState.boss[0].health -= pDamage;

        if (newState.player.health <= 0) {
          this.addMessage("Sorry Charlie, the Boss killed you!", "player");
        } else if (newState.boss[0].health <= 0) {
          this.addMessage("Huzzah! The Boss is dead! You've won!", "player");
          newState.map[newLoc] = P_CODE;
          newState.map[this.state.player.location] = F_CODE;
          newState.player.location = newLoc;
          newState.player.level++;
        } else {
          this.addMessage("No winner! The Boss has " + newState.boss[0].health + " left!", "monsters");
        }
    }

    if (this.state.player.health <= 0 || this.state.boss[0].health <= 0) this.setState({ isOver: true });
  };

  Game.prototype.getIndexItem = function getIndexItem(loc, key) {
    // console.log("loc=" + loc + "   key=" + key);
    // console.log(this);
    for (var i = 0; i < this.state[key].length; i++) {
      // console.log("*** " + this.state[key][i].location);
      if (this.state[key][i].location == loc) return i;
    }
    // should never get here
  };

  Game.prototype.getRowFromId = function getRowFromId(id) {
    return Math.floor(id / this.state.size.numCols);
  };

  Game.prototype.getColFromId = function getColFromId(id) {
    return id % this.state.size.numCols;
  };

  Game.prototype.getCoordFromId = function getCoordFromId(row, col) {
    if (col >= this.state.size.numCols) col -= this.state.size.numCols;else if (col < 0) col += this.state.size.numCols;
    if (row >= this.state.size.numCols) row -= this.state.size.numRows;else if (row < 0) row += this.state.size.numRows;
    return (row * this.state.size.numCols + col) % this.state.size.numCells;
  };

  Game.prototype.handleToggleWimpMode = function handleToggleWimpMode() {
    if (this.state.isWimpMode) this.addMessage("Good, you're gonna play like an adult.", "player");else this.addMessage("Wimp! Afraid of the dark?", "player");
    this.setState({ isWimpMode: !this.state.isWimpMode });
  };

  Game.prototype.handleReset = function handleReset() {
    this.setInitialState();
  };

  Game.prototype.render = function render() {
    document.onkeydown = checkKey;
    var that = this;

    function checkKey(e) {
      e.preventDefault();
      e = e || window.event;
      var key = undefined;
      switch (e.keyCode) {
        case 65:
        case 37:
          key = 37;
          break;
        case 87:
        case 38:
          key = 38;
          break;
        case 68:
        case 39:
          key = 39;
          break;
        case 83:
        case 40:
          key = 40;
          break;
      }
      if (key >= 37 && key <= 40) that.movePlayer(key);
    }

    return React.createElement(
      "div",
      null,
      React.createElement(Controls, { player: this.state.player, messages: this.state.messages, isWimpMode: this.state.isWimpMode,
        handleToggleWimpMode: this.handleToggleWimpMode.bind(this), handleReset: this.handleReset.bind(this) }),
      React.createElement(Dungeon, { map: this.state.map, opacity: this.state.opacity, size: this.state.size, isWimpMode: this.state.isWimpMode }),
      React.createElement(OverModal, { player: this.state.player, isOver: this.state.isOver, handleReset: this.handleReset.bind(this) })
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
    // console.log("Header.render");
    return React.createElement(
      "div",
      { className: "header" },
      React.createElement(
        "h1",
        { className: "center" },
        "Kevin's Roguelike Dungeon Crawler Game"
      )
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
    // console.log("Footer.render");
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
        "'s Data Visualization Course"
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
    // console.log("App.render");
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