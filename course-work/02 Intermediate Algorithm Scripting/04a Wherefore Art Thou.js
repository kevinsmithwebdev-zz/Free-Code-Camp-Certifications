function whatIsInAName(collection, source) {
  // What's in a name?
  var arr = [];
  // Only change code below this line
  

  for (var i = 0 ; (i < collection.length) ; i++) {  
    collGood = true;
    for (var name in source) {

      if (collection[i].hasOwnProperty(name)) {
        if (source[name]===collection[i][name]) {
        } else {
          collGood = false;
        }
      } else {
        collGood = false;
      }

      if (!collGood) {
        collection.splice(i--,1);
        break;
      } 
    } // for name in source
  } // for i 
  

  arr=collection;
  
  // Only change code above this line
  return arr;
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
