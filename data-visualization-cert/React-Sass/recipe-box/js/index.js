"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactPropTypes = React.PropTypes;
var Accordion = ReactBootstrap.Accordion;
var Panel = ReactBootstrap.Panel;
var Button = ReactBootstrap.Button;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var Modal = ReactBootstrap.Modal;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlGroup = ReactBootstrap.ControlGroup;
var ControlLabel = ReactBootstrap.ControlLabel;

var LS_NAME = "kevinsRecipeBox";
var MY_PRELOAD_RECIPES = [{
  id: 1,
  name: "Kevin's World Famous Spaghetti Sause",
  ingredientsArr: ["2 tablespoons olive oil", "1 pound ground beef (and veal and pork if desired)", "2 cups finely choppped onions", "½ cup finely chopped celery", "½ cup finely chopped carrot", "5 heads of garlic, crushed", "2 (28-ounce) can of peeled, seeded and chopped tomatoes", "1 small can tomato paste", "4 cups beef stock", "3 bay leaves", "1 tablespoon dried oregano", "1 tablespoon dried basil"],
  instructionsArr: ["In large saucepan, over medium heat, brown meat in oil, 4-6 minutes", "Add onions, celery, carrots, and garlic - cook for 5 minutes", "Add tomatoes - cook for 5 minutes", "Whisk tomato paste into stock, add to sauce", "Add herbs", "Bring to a boil and then reduce to simmer", "Let cook for 2-4 hours", "Add salt and pepper, as desired"],
  commentsArr: ["OK, I confess, this is largely based on Emiril's recipe", "You can fish out the bay leaves if you wish, but our familiy tradition was that whoever got a bay leaf had to do the dishes.", "Seriously, this is the best spaghetti sauce I've ever eaten."]
}, {
  id: 2,
  name: "Carbonade Flamande",
  ingredientsArr: ["1¼kg (2¾ lb.) stewing beef (I prefer chuck roast), trimmed and cut into 2½cm (1”) cubes", "400ml (1¾ cups or 14 fl oz) Belgian brown ale (I like the Brother Thelonious from the local North Coast Brewing.)", "5 garlic cloves, lightly crushed", "2 bay leaf", "3 tbsp plain flour, seasoned with salt and pepper", "2-3 tbsp olive oil", "250g (½ lb.) diced pancetta (or bacon)", "2 carrots, chopped", "1 large onion, sliced into large pieces", "3 shallots, chopped finely", "1 leek cut and discard dark green portion, slice rest lengthwise, clean and slice into slivers", "1 tbsp tomato paste", "350ml (1½ cups) beef stock", "1 tbsp dried thyme", "1 teaspoon each rosemary and sage (If I don’t have rosemary and sage, I’ll often substitute herb de Provence)", "1 tsp Dijon mustard", "brown sugar to taste (I don’t bother.)"],
  instructionsArr: ["Marinate the beef overnight in the ale with the garlic and bay leaves.", "The next day, drain the beef from the marinade, reserving the marinade. Pat the meat dry with kitchen paper and toss it in the seasoned flour until evenly coated. Shake off any excess flour.", "Heat a large pan/pot to medium and fry the pancetta/bacon for 6-8 minutes, stirring occasionally, until crisp and golden. Scoop the pancetta out with a slotted spoon and set aside.", "Turn heat to medium/high and fry the beef in the leftover grease (add oil as needed) in 3-4 batches for about 5 minutes per batch, stirring occasionally, until it is a rich golden brown all over.", "Remove the meat with a slotted spoon to a plate and set aside. Don’t worry if the bottom of the pot is starting to brown, this all adds to the flavor of the finished dish.", "Preheat the oven to160C (320F). Tip the carrots, onions and leek into the pot and fry, stirring occasionally, until they start to brown – this takes about 12 minutes. Spoon in the tomato purée and continue to cook for 2 minutes, stirring constantly.", "Add the beef, pancetta/barcon, and pour in the reserved marinade. Bring to a simmer, scraping any sticky bits off the bottom of the pan, and then add all the beef stock, herbs, and mustard to the pot.", "Season with salt and pepper and bring everything to the boil. Remove from the heat. Cover with a lid and cook in the oven for 2 hours, stirring once halfway through.", "If you want, in the last 15 minutes you can break the beef into smaller chunks with a wooden spoon against the pan.", "When the beef is ready, taste for seasoning and add more salt and pepper if you think it needs it. The same with the brown sugar.", "Fish out the two bay leaves.", "Serve over egg noodles."],
  commentsArr: ["In Belgium (where this is practically a national dish) it is served over french fries", "Everyone to whom I have served this - this becomes their new favorite dish."]
}, {
  id: 3,
  name: "Mexican Quinoa",
  ingredientsArr: ["1 tablespoon olive oil", "½ cup diced yellow onion", "½ lb lean ground beef", "2 cloves garlic, minced", "½ a large jalapeno, minced (taste before adding all of the jalapeno, depending on how spicy you want the dish to be)", "¾ cup quinoa", "1 cup beef broth", "1 (15-ounce) can black beans, drained and rinsed", "1 (14.5 oz) can fire-roasted diced tomatoes (not drained)", "1 cup corn kernels", "1 teaspoon chili powder", "½ teaspoon cumin", "salt and pepper to taste"],
  instructionsArr: ["Heat the olive oil in a large skillet with a lid over medium heat.  Brown beef.", "Sauté the garlic and jalapeno until it starts to brown, about one minute. ", "Add the quinoa, vegetable broth, black beans, diced tomatoes, corn, chili powder, cumin, ¼ tsp salt to the skillet and stir to mix well.", "Bring the liquid to a boil, then reduce heat to medium low and cover the pan with the lid.", "Cook covered for 20 minutes, until the quinoa is cooked through, but stir it halfway through cooking just to make sure the quinoa cooks evenly."],
  commentsArr: ["I found this in a magazine, somewhere.", "OK, this isn't a gourmet feast, but it tastes good and is a great way to make a healthy (packed with protein) meal, easily."]
}];

//****************************************************************/

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Header.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        { className: "center" },
        "Kevin's Recipe Box"
      ),
      React.createElement("br", null)
    );
  };

  return Header;
}(React.Component);

//****************************************************************/

var EditRecipe = function (_React$Component2) {
  _inherits(EditRecipe, _React$Component2);

  function EditRecipe() {
    _classCallCheck(this, EditRecipe);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  EditRecipe.prototype.render = function render() {
    return React.createElement(
      Modal,
      { show: this.props.isEditing || this.props.isAdding },
      React.createElement(
        Modal.Header,
        null,
        React.createElement(
          Modal.Title,
          null,
          (this.props.isAdding ? "Adding Recipe" : "Editing Recipe: ") + this.props.recipe.oldName
        )
      ),
      React.createElement(
        Modal.Body,
        null,
        React.createElement(
          "strong",
          null,
          "Name:"
        ),
        " (required)",
        React.createElement(FormControl, { type: "text", value: this.props.recipe.name, placeholder: "enter recipe name (required)",
          onChange: this.onChangeText.bind(this, 'name') }),
        React.createElement("br", null),
        React.createElement(
          "strong",
          null,
          "Ingredients:"
        ),
        " (separated by semicolons, required)",
        React.createElement(FormControl, { type: "text", value: this.props.recipe.ingredientsStr, placeholder: "enter ingredients, separated by semicolons (required)",
          onChange: this.onChangeText.bind(this, 'ingredientsStr') }),
        React.createElement("br", null),
        React.createElement(
          "strong",
          null,
          "Instructions:"
        ),
        " (separated by semicolons)",
        React.createElement(FormControl, { type: "text", value: this.props.recipe.instructionsStr, placeholder: "enter instructions, separated by semicolons",
          onChange: this.onChangeText.bind(this, 'instructionsStr') }),
        React.createElement("br", null),
        React.createElement(
          "strong",
          null,
          "Comments:"
        ),
        " (separated by semicolons)",
        React.createElement(FormControl, { type: "text", value: this.props.recipe.commentsStr, placeholder: "enter comments, separated by semicolons (required)",
          onChange: this.onChangeText.bind(this, 'commentsStr') })
      ),
      React.createElement(
        Modal.Footer,
        null,
        React.createElement(
          Button,
          { bsStyle: "success", onClick: this.onSave.bind(this) },
          "Save"
        ),
        React.createElement(
          Button,
          { bsStyle: "danger", onClick: this.onCancel.bind(this) },
          "Cancel"
        )
      )
    );
  };

  EditRecipe.prototype.onChangeText = function onChangeText(field, e) {
    this.props.handleChangeText(field, e.target.value);
  };

  EditRecipe.prototype.onCancel = function onCancel() {
    this.props.handleCancelEdit();
  };

  EditRecipe.prototype.onSave = function onSave() {
    var errArr = [];
    if (!this.props.recipe.name.length) errArr.push("Must include a name.");
    if (!this.props.recipe.ingredientsStr.length) errArr.push("Must include at least one ingredient.");
    if (errArr.length) alert(errArr.join("\n"));else this.props.handleSaveEdit();
  };

  return EditRecipe;
}(React.Component);

//****************************************************************/

var Recipes = function (_React$Component3) {
  _inherits(Recipes, _React$Component3);

  function Recipes() {
    _classCallCheck(this, Recipes);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  Recipes.prototype.formatRecipePanel = function formatRecipePanel(recipe) {
    // console.log("Recipes.formatRecipePanel " + index);
    return React.createElement(
      Panel,
      { header: recipe.name, bsStyle: "primary", eventKey: recipe.id },
      React.createElement(
        "p",
        null,
        React.createElement(
          "strong",
          null,
          "Ingredients:"
        )
      ),
      React.createElement(
        "ul",
        null,
        recipe.ingredientsArr.map(function (ingredient) {
          return React.createElement(
            "li",
            null,
            ingredient
          );
        })
      ),
      React.createElement(
        "p",
        null,
        React.createElement(
          "strong",
          null,
          "Instructions:"
        )
      ),
      React.createElement(
        "ol",
        null,
        recipe.instructionsArr.map(function (instruction) {
          return React.createElement(
            "li",
            null,
            instruction
          );
        })
      ),
      React.createElement(
        "p",
        null,
        React.createElement(
          "strong",
          null,
          "Comments:"
        )
      ),
      React.createElement(
        "ul",
        null,
        recipe.commentsArr.map(function (comment) {
          return React.createElement(
            "li",
            null,
            comment
          );
        })
      ),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(
        ButtonGroup,
        { bsSize: "medium" },
        React.createElement(
          Button,
          { bsStyle: "warning", onClick: this.onEditClick.bind(this, recipe.id) },
          "Edit"
        ),
        React.createElement(
          Button,
          { bsStyle: "danger", onClick: this.onDeleteClick.bind(this, recipe.id) },
          "Delete"
        )
      )
    );
  };

  Recipes.prototype.onDeleteClick = function onDeleteClick(id) {
    //  console.log("Recipes.onDeleteRecipe" + id);
    this.props.handleDeleteRecipe(id);
  };

  Recipes.prototype.onEditClick = function onEditClick(id) {
    // console.log("Recipes.onEditRecipe = " + id);
    this.props.handleEditRecipe(id);
  };

  Recipes.prototype.render = function render() {
    var _this4 = this;

    return React.createElement(
      "div",
      null,
      React.createElement(
        Accordion,
        null,
        this.props.recipes.map(function (recipe) {
          return _this4.formatRecipePanel(recipe);
        })
      )
    );
  };

  return Recipes;
}(React.Component);

//****************************************************************/

var Controls = function (_React$Component4) {
  _inherits(Controls, _React$Component4);

  function Controls() {
    _classCallCheck(this, Controls);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  Controls.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "left" },
      React.createElement(
        Button,
        { bsStyle: "success", onClick: this.onAddRecipe.bind(this) },
        "Add New Recipe"
      ),
      "      ",
      !this.props.isLocalStorage ? "Note: local storage is disabled on your browser" : ""
    );
  };

  Controls.prototype.onAddRecipe = function onAddRecipe() {
    this.props.handleAddRecipe();
  };

  return Controls;
}(React.Component);

//****************************************************************/

var RecipeBox = function (_React$Component5) {
  _inherits(RecipeBox, _React$Component5);

  function RecipeBox() {
    _classCallCheck(this, RecipeBox);

    var _this6 = _possibleConstructorReturn(this, _React$Component5.call(this));

    var loadRecipes = typeof localStorage[LS_NAME] != "undefined" ? JSON.parse(localStorage[LS_NAME]) : MY_PRELOAD_RECIPES;

    _this6.state = {
      recipes: loadRecipes,
      dummyRecipe: { id: -1, name: "blank name", oldName: "blank name", ingredientsStr: "blank ingredients", instructionsStr: "blank instructions", commentsStr: "blank comments" },
      isEditing: false,
      isAdding: false,
      isLocalStorage: typeof Storage !== "undefined",
      indexToEdit: -1
    };
    return _this6;
  }

  RecipeBox.prototype.handleEditRecipe = function handleEditRecipe(id) {
    var index = this.getRecipeIndexFromId(id);

    var newDummy = {
      id: id,
      name: this.state.recipes[index].name,
      oldName: this.state.recipes[index].name,
      ingredientsStr: this.state.recipes[index].ingredientsArr.join(";"),
      instructionsStr: this.state.recipes[index].instructionsArr.join(";"),
      commentsStr: this.state.recipes[index].commentsArr.join(";")
    };

    this.setState({ dummyRecipe: newDummy });
    this.setState({ isEditing: true, indexToEdit: this.getRecipeIndexFromId(id) });
  };

  RecipeBox.prototype.handleAddRecipe = function handleAddRecipe(id) {
    var index = -1;

    var newDummy = {
      id: -1,
      name: "",
      oldName: "",
      ingredientsStr: "",
      instructionsStr: "",
      commentsStr: ""
    };

    this.setState({ dummyRecipe: newDummy });
    this.setState({ isAdding: true, indexToEdit: -1 });
  };

  RecipeBox.prototype.handleDeleteRecipe = function handleDeleteRecipe(id) {

    var newRecipes = this.state.recipes;
    newRecipes.splice(this.getRecipeIndexFromId(id), 1);
    this.setState({ recipes: newRecipes });
    if (this.state.isLocalStorage) localStorage.setItem(LS_NAME, JSON.stringify(newRecipes));
  };

  RecipeBox.prototype.getRecipeIndexFromId = function getRecipeIndexFromId(id) {
    var recipes = this.state.recipes;
    for (var i = 0; i < recipes.length; i++) {
      if (recipes[i].id == id) return i;
    }
    return -1;
  };

  RecipeBox.prototype.handleChangeText = function handleChangeText(field, text) {
    var newDummy = this.state.dummyRecipe;
    newDummy[field] = text;
    this.setState({ dummyRecipe: newDummy });
  };

  RecipeBox.prototype.handleCancelEdit = function handleCancelEdit() {
    this.setState({ isEditing: false, isAdding: false });
  };

  RecipeBox.prototype.handleSaveEdit = function handleSaveEdit() {
    var newRecipes = this.state.recipes;
    var index = this.state.indexToEdit;

    if (this.state.isAdding) {
      var _Math;

      index = newRecipes.length;
      newRecipes.push({
        id: (_Math = Math).max.apply(_Math, newRecipes.map(function (recipe) {
          return recipe.id;
        })) + 1,
        name: "",
        ingredientsArr: "",
        instructionsArr: "",
        commentsArr: ""
      });
    }

    newRecipes[index].name = this.state.dummyRecipe.name.trim();
    newRecipes[index].ingredientsArr = this.state.dummyRecipe.ingredientsStr.split(";").map(function (str) {
      return str.trim();
    });
    newRecipes[index].instructionsArr = this.state.dummyRecipe.instructionsStr.split(";").map(function (str) {
      return str.trim();
    });
    newRecipes[index].commentsArr = this.state.dummyRecipe.commentsStr.split(";").map(function (str) {
      return str.trim();
    });

    this.setState({ isEditing: false, isAdding: false, recipes: newRecipes });
    if (this.state.isLocalStorage) localStorage.setItem(LS_NAME, JSON.stringify(newRecipes));
  };

  RecipeBox.prototype.render = function render() {
    // console.log("RecipeBox.render");

    return React.createElement(
      "div",
      null,
      React.createElement(EditRecipe, { isEditing: this.state.isEditing, isAdding: this.state.isAdding, recipe: this.state.dummyRecipe,
        handleChangeText: this.handleChangeText.bind(this), handleCancelEdit: this.handleCancelEdit.bind(this),
        handleSaveEdit: this.handleSaveEdit.bind(this) }),
      React.createElement(Recipes, { recipes: this.state.recipes, handleDeleteRecipe: this.handleDeleteRecipe.bind(this), handleEditRecipe: this.handleEditRecipe.bind(this) }),
      React.createElement(Controls, { handleAddRecipe: this.handleAddRecipe.bind(this), isLocalStorage: this.state.isLocalStorage })
    );
  };

  return RecipeBox;
}(React.Component); // RecipeBox

//****************************************************************/

var Footer = function (_React$Component6) {
  _inherits(Footer, _React$Component6);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
  }

  Footer.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement("br", null),
      React.createElement("br", null),
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
      )
    );
  };

  return Footer;
}(React.Component); // Footer

//****************************************************************/

var App = function (_React$Component7) {
  _inherits(App, _React$Component7);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component7.apply(this, arguments));
  }

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(Header, null),
      React.createElement(RecipeBox, null),
      React.createElement(Footer, null)
    );
  }; // render

  return App;
}(React.Component); // App

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));