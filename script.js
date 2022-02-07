var App = React.createClass({ displayName: "App",
  render: function () {
    return /*#__PURE__*/(
      React.createElement("div", null, 
      React.createElement("div", { className: "content" },
      this.props.children)));



  } });


var destination = document.querySelector("#container");

var products = [
{
  id: 0,
  name: 'Apple iphone',
  description: 'We designed a totally new architecture. ',
  price: 90000,
  img: 'mobile.jpg' },
{
  id: 1,
  name: 'Apple iphone',
  description: 'We designed a totally new architecture.',
  price: 90000,
  img: 'mobile.jpg' },
{
  id: 2,
  name: 'Apple iphone',
  description: 'We designed a totally new architecture. ',
  price: 90000,
  img: 'mobile.jpg' },
{
  id: 3,
  name: 'Apple iphone',
  description: 'We designed a totally new architecture.',
  price: 90000,
  img: 'mobile.jpg' },
{
  id: 4,
  name: 'Apple iphone',
  description: 'We designed a totally new architecture. ',
  price: 90000,
  img: 'mobile.jpg' },
{
  id: 5,
  name: 'Apple iphone',
  description: 'We designed a totally new architecture.',
  price: 90000,
  img: 'mobile.jpg' }];



var cart = [];
cart.totalcart = 0;

var { Router,
  Route,
  IndexRoute,
  IndexLink,
  hashHistory,
  Link } = ReactRouter;

var BackButton = React.createClass({ displayName: "BackButton",
  render: function () {
    return React.createElement(Link, { to: "#", onClick: hashHistory.goBack, className: "backButton" }, 
    React.createElement("i", { className: "fa fa-arrow-left", "aria-hidden": "true" }));

  } });


var CartButton = React.createClass({ displayName: "CartButton",
  render: function () {
    return React.createElement(Link, { to: "/cart", className: "cartButton" }, 
    React.createElement("i", { className: "fa fa-shopping-cart", "aria-hidden": "true" }));

  } });


var Home = React.createClass({ displayName: "Home",
  getProducts: function () {
    return products;
  },
  getInitialState: function () {
    return {
      itens: this.getProducts() };

  },
  addToCart: function (item) {
    var isInCart = false;

    cart = cart.map(cartItem => {
      if (cartItem.id == item.id) {
        isInCart = true;
        cartItem.count++;
      }

      return cartItem;
    });

    if (!isInCart) {cart.push({ id: item.id, name: item.name, price: item.price, count: 1 });}

    cart.forEach(function (item, i) {
      if (i === 0) cart.totalcart = 0;
      cart.totalcart += item.price * item.count;
    });
  },
  render: function () {

    var addin = this.addToCart;
    return (
      React.createElement("div", null, 
      React.createElement("header", null, 
      React.createElement("h2", null, "Mobile Shopping"), 
      React.createElement(CartButton, null)), 

      React.createElement("div", { className: "store" },
      this.state.itens.map(function (item) {
        return React.createElement(ProductsList, { produto: item, addToCart: addin, key: item.id });
      }))));



  } });


var ProductsList = React.createClass({ displayName: "ProductsList",
  addToCart: function () {
    this.props.addToCart(this.props.produto);
  },
  render: function () {
    var prod = this.props.produto;

    return React.createElement("div", { className: 'prod prod-' + prod.id }, 
    React.createElement("div", { className: "name" },
    prod.name), 

    React.createElement("div", { className: "prod-content" }, 
    React.createElement("div", { className: "photo" }, 
    React.createElement("img", { src: prod.img, alt: prod.name })), 


    React.createElement("div", { className: "description" },
    prod.description.substring(0, 50) + '...'), 

    React.createElement("div", { className: "price" }, "Rs ",
    prod.price.toFixed(2))), 


    React.createElement("button", { onClick: this.addToCart }, "Add to Cart"));


  } });


var Cart = React.createClass({ displayName: "Cart",
  removeFromCart: function (item) {
    cart = cart.filter(function (e) {
      return e.id !== item.id;
    });

    cart.forEach(function (item, i) {
      if (i === 0) cart.totalcart = 0;
      cart.totalcart += item.price * item.count;
    });

    var lineRemove = document.querySelector('.tableRow.prod-' + item.id);
    lineRemove.parentNode.removeChild(lineRemove);

    var totalField = document.querySelector(".tableCell.valorfinal");
    totalField.innerHTML = cart.totalcart ? "Rs " + cart.totalcart.toFixed(2) : "Rs 0,00 ";
  },
  render: function () {
    var removeItem = this.removeFromCart;
    return (
      React.createElement("div", null, 
      React.createElement("header", null, 
      React.createElement(BackButton, null), 
      React.createElement("h2", null, "Mobile Shopping")), 

      React.createElement("div", { className: "store cart" }, 
      React.createElement("h3", null, "Cart"), 

      React.createElement("div", { className: "cartTable" }, 
      React.createElement("div", { className: "table minimalistBlack" }, 
      React.createElement("div", { className: "tableHeading" }, 
      React.createElement("div", { className: "tableRow" }, 
      React.createElement("div", { className: "tableHead descricao" }, "Item"), 
      React.createElement("div", { className: "tableHead quantidade" }, "Quantity"), 
      React.createElement("div", { className: "tableHead subtotal" }, "Subtotal"), 
      React.createElement("div", { className: "tableHead remover" }, "\xA0"))), 


      React.createElement("div", { className: "tableBody" },
      cart.map(function (item) {
        return React.createElement(CartList, { produto: item, removeFromCart: removeItem, key: item.id });
      })), 

      React.createElement("div", { className: "tableFoot tableFootStyle" }, 
      React.createElement("div", { className: "tableRow" }, 
      React.createElement("div", { className: "tableCell total" }, "Total"), 
      React.createElement("div", { className: "tableCell noleftborder" }, "\xA0"), 
      React.createElement("div", { className: "tableCell valorfinal" }, "Rs ", cart.totalcart.toFixed(2)), 
      React.createElement("div", { className: "tableCell" }, "\xA0"))))))));








  } });


var CartList = React.createClass({ displayName: "CartList",
  removeFromCart: function () {
    this.props.removeFromCart(this.props.produto);
  },
  render: function () {
    var prod = this.props.produto;

    return (
      React.createElement("div", { className: 'tableRow prod-' + prod.id }, 
      React.createElement("div", { className: "tableCell" },
      prod.name), 

      React.createElement("div", { className: "tableCell" },
      prod.count), 

      React.createElement("div", { className: "tableCell" }, "Rs ",
      (prod.price * prod.count).toFixed(2)), 

      React.createElement("div", { className: "tableCell" }, 
      React.createElement("button", { onClick: this.removeFromCart }, "X"))));



  } });


ReactDOM.render( 
React.createElement(Router, { history: hashHistory }, 
React.createElement(Route, { path: "/", component: App }, 
React.createElement(IndexRoute, { component: Home }), 
React.createElement(Route, { path: "/cart", component: Cart }))),


destination);