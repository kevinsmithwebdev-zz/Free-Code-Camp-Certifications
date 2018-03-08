function truthCheck(collection, pre) {

  for (var item in collection) {  
    if (!collection[item][pre]) {
      return false;
    }
  }  
  return true;
}

truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex");