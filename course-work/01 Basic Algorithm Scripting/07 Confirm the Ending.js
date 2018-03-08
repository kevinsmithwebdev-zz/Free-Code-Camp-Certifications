function confirmEnding(str, target) {

  var lenS = str.length;
  var lenT = target.length;
  
  console.log(str.substr(lenS - lenT, lenT));
  
  return (str.substr(lenS - lenT, lenT) === target);
}

confirmEnding("Bastian", "ian");