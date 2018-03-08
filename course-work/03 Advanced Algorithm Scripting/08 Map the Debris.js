function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  
  var getOrbPeriod = function(obj) {

    var orbPeriod = Math.round(2 * Math.PI * Math.sqrt(Math.pow(earthRadius + obj.avgAlt, 3) / GM));
    delete obj.avgAlt;
    obj.orbitalPeriod = orbPeriod;
    return obj;
  };

  var newArr = [];
  
  for (var element in arr) {
    newArr.push(getOrbPeriod(arr[element]));
  }
  return newArr;
}

orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);