'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DOWN_ARROW = String.fromCharCode(0x25BC);

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      sort: 'alltime',
      arrowA: "",
      arrowR: DOWN_ARROW,
      loaded: false,
      campers: { alltime: [], recent: [] }
    };
    return _this;
  } // constructor()

  App.prototype.componentWillMount = function componentWillMount() {
    var that = this;
    var recentUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    var alltimeUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';

    $.getJSON(recentUrl, function (data) {
      var stateCopy = Object.assign({}, that.state);
      stateCopy.campers['recent'] = data;
      that.setState(stateCopy);
    });
    $.getJSON(alltimeUrl, function (data) {
      var stateCopy = Object.assign({}, that.state);
      stateCopy.campers['alltime'] = data;
      stateCopy.loaded = true;
      that.setState(stateCopy);
    });
  }; // componentWillMount()

  App.prototype.handleChangeSort = function handleChangeSort(sortStr) {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.sort = sortStr;
    if (sortStr == 'alltime') {
      stateCopy.arrowR = DOWN_ARROW;
      stateCopy.arrowA = "";
    } else {
      stateCopy.arrowA = DOWN_ARROW;
      stateCopy.arrowR = "";
    }
    this.setState(stateCopy);
  };

  App.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement(PageHeader, null),
      React.createElement('br', null),
      React.createElement(CamperList, _extends({}, this.state, { onChangeSort: this.handleChangeSort.bind(this) }))
    );
  }; // render

  return App;
}(React.Component); // class App

var PageHeader = function (_React$Component2) {
  _inherits(PageHeader, _React$Component2);

  function PageHeader() {
    _classCallCheck(this, PageHeader);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  PageHeader.prototype.render = function render() {
    return React.createElement(
      'h1',
      { className: 'center' },
      'Kevin\'s Leaderboard - ',
      React.createElement(
        'a',
        { href: 'https://www.freecodecamp.com', target: '_blank' },
        React.createElement('img', { className: 'fcclogo', src: 'https://www.freecodecamp.com/design-style-guide/img/freeCodeCamp.svg', alt: 'FreeCodeCamp logo' })
      )
    );
  };

  return PageHeader;
}(React.Component);

var Camper = function (_React$Component3) {
  _inherits(Camper, _React$Component3);

  function Camper() {
    _classCallCheck(this, Camper);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  Camper.prototype.render = function render() {
    return React.createElement(
      'li',
      { className: 'list-group-item', key: this.props.i + 1 },
      React.createElement(
        'span',
        { className: 'col-md-1 center' },
        this.props.i + 1
      ),
      React.createElement(
        'span',
        { className: 'col-md-5' },
        React.createElement('img', { src: this.props.camper.img, alt: 'pic for ' + this.props.camper.username, width: '40' }),
        '   ',
        this.props.camper.username
      ),
      React.createElement(
        'span',
        { className: 'col-md-3 center' },
        this.props.camper.alltime
      ),
      React.createElement(
        'span',
        { className: 'col-md-3 center' },
        this.props.camper.recent
      )
    );
  };

  return Camper;
}(React.Component);

var CamperList = function (_React$Component4) {
  _inherits(CamperList, _React$Component4);

  function CamperList() {
    _classCallCheck(this, CamperList);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  CamperList.prototype.render = function render() {
    if (this.props.loaded) {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'ul',
          { className: 'list-group' },
          React.createElement(
            'li',
            { className: 'list-group-item' },
            React.createElement(
              'span',
              { className: 'col-md-1 center' },
              'Rank'
            ),
            React.createElement(
              'span',
              { className: 'col-md-5', id: 'username' },
              'User Name'
            ),
            React.createElement(
              'span',
              { className: 'col-md-3 center ', id: 'alltime', onClick: this.changeSort.bind(this, 'alltime') },
              'Alltime Points ',
              this.props.arrowA
            ),
            React.createElement(
              'span',
              { className: 'col-md-3 center', id: 'recent', onClick: this.changeSort.bind(this, 'recent') },
              'Recent Points ',
              this.props.arrowR
            )
          ),
          this.props.campers[this.props.sort].map(function (camper, i) {
            return React.createElement(Camper, { camper: camper, i: i });
          })
        )
      );
    } else {
      return React.createElement(
        'h3',
        { className: 'center' },
        'Loading ...'
      );
    }
  };

  CamperList.prototype.changeSort = function changeSort(sortStr) {
    this.props.onChangeSort(sortStr);
  };

  return CamperList;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
