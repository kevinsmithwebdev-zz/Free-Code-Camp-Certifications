function uniteUnique() {
  var arr;
  var args = Array.prototype.slice.call(arguments);
  
  arr = args.reduce(function(a, b){
    return a.concat(b.filter(function(index){
      return a.indexOf(index) === -1;
    }));
  });

  return arr;                    
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);