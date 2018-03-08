function mutation(arr) {

  
  var full = arr[0].split("");
  var sub = arr[1].split("");
  

  for (var i = 0 ; i < full.length ; i++) {
    full[i] = full[i].toLowerCase();
  }
  
  for (var j = 0 ; j < sub.length ; j++) {
    if (full.indexOf(sub[j].toLowerCase()) === -1) {
      return false; 
    }
  }
  return true;
 
}

mutation(["hello", "hey"]);