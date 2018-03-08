function whatIsInAName(collection, source) {
  // What's in a name?
  var arr = [];
  // Only change code below this line
  for (var i = 0; i < collection.length; i++) {
    if(collection[i][Object.keys(source)] == source[Object.keys(source)]) {
        arr.push(collection[i]);
      }
    }

  // Only change code above this line
  return arr;
}