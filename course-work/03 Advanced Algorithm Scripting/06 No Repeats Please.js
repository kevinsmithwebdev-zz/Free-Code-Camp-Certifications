function permAlone(str) {
  
  function permutate(string) {
    if (string.length < 2) return string; 
    var permutations = []; 
    for (var i=0; i<string.length; i++) {
      var char = string[i];
      var remainingString = string.slice(0,i) + string.slice(i+1,string.length); 
      for (var subPerm of permutate(remainingString)) {
        permutations.push(char + subPerm);
      }
    }
    return permutations;
  }
  
  var myArr = permutate(str);

  var nonDups = 0;
    for (var i = 0 ; i < myArr.length ; i++) {
      if (!/(.)\1+/g.test(myArr[i])) {
        nonDups++;
    }
  }
  return nonDups;  
}

permAlone('aabb');