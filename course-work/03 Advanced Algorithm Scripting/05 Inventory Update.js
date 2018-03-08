function updateInventory(inv, shipment) {

  for (var i = 0 ; i < shipment.length ; i++) {
    for (var j = 0 ; j < inv.length ; j++) {
      if (shipment[i][1] === inv[j][1]) {
        inv[j][0] += shipment[i][0]; // found it!!!
        break;
      } 
    } // for j
    if (j === inv.length) {
      inv.push(shipment[i]); // at the end, put it here
    }
  } // for i
  
  inv.sort(function(a, b){ return a[1]>b[1]; } );
  return inv;
}
  
  

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);
