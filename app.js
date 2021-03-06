//==============================================================================
//
//                               React Elements
//
//==============================================================================

/*
Tile generates this HTML:

<article class={ this.props.articleClass }>
  <span class={ this.props.spanClass }>
    <img src={ this.props.imgSrc } alt={ this.props.imgAlt } />
  </span>
  <a href={ this.props.link }>
    <h2>{ this.props.name }</h2>
    <div class={ this.props.divClass }>
      <p>{ this.props.description }</p>
    </div>
  </a>
</article>
*/
var Tile = React.createClass({

  displayName: "Tile",

  render: function() {
    var ref = this.props; // don't like writing "this.props" everytime
    return React.createElement("article", { className: ref.articleClass },
      React.createElement("span", { className: ref.spanClass },
        React.createElement("img", { src: ref.imgSrc, alt: ref.imgAlt })
      ),
      React.createElement("a", { href: ref.link },
        React.createElement("h2", {}, ref.name),
        React.createElement("div", { className: ref.divClass },
          React.createElement("p", {}, ref.description)
        )
      )
    );
  }
});

/*
TilePanel generates this HTML:

<section class="tiles">
  <Tile props=this.props.tiles[0]></Tile>
  <Tile props=this.props.tiles[1]></Tile>
  <Tile props=this.props.tiles[2]></Tile>
  ...
</section>
*/
var TilePanel = React.createClass({

  displayName: "TilePanel",

  render: function() {
    return React.createElement("section", { className: "tiles" },
      this.props.tiles.map(function(tile) {
        // the fields of 'tile' become the props of 'this' in Tile
        return React.createElement(Tile, tile);
      })
    );
  }
});

/*
HeaderIntro generates this HTML:
<header>
  <h1>{ this.props.title }</h1>
  <p>{ this.props.subText }</p>
</header>
*/
var HeaderIntro = React.createClass({

  displayName: "HeaderIntro",

  render: function() {
    return React.createElement("header", {},
      React.createElement("h1", {}, this.props.name),
      React.createElement("p", {}, this.props.desc)
    );
  }
});

/*
App generates this HTML:

<div class="inner">
  <HeaderIntro props={ title: }></HeaderIntro>
  <TilePanel></TilePanel>
</div>
*/
var App = React.createClass({

  displayName: "App",

  render: function() {
    return React.createElement("div", { className: "inner" },
      React.createElement(HeaderIntro, this.props.appInfo),
      React.createElement(TilePanel, { tiles: this.props.products })
    );
  }
});

//==============================================================================
//
//                                  App Data
//
//==============================================================================

// given a nonnegative number, returns random example data for generating a Tile
function tileData(index) {
  var imgNum = Math.floor(index % 12 + 1),
      styleNum = Math.floor(index % 6 + 1);
  return {
    name: "Product " + index,
    description: Math.floor(Math.random() * 1001) + " in stock",
    imgSrc: "images/pic" + (imgNum > 9 ? "" : "0") + imgNum + ".jpg",
    imgAlt: "image #" + imgNum,
    link: "generic.html",             // useful with real data???
    articleClass: "style" + styleNum, // color on mouseout
    spanClass: "image",               // probably don't need this
    divClass: "content"               // probably don't need this
  };
}

// the app's name and description
var appInfo = {
  name: "This. Is. Snack Overflow Status.",
  desc: "Leaders of innovation. Masters of greatness. Snack Overflow Status is "
      + "at the pinnacle of tenacious and awesome. Welcome to the most "
      + "immersive snack-tracking experience you will ever have."
};

// generate some example data
var products = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map(tileData);

//==============================================================================
//
//                                App Rendering
//
//==============================================================================

ReactDOM.render(
  React.createElement(App, { appInfo: appInfo, products: products }),
  document.getElementById("main") // renders the app inside #main
);
