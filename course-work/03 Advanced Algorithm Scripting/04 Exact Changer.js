function checkCashRegister(price, cash, cid) {
  var changeArr = [];
  var changeNeeded = cash - price;
  
  function moneyRound(num) {
    return +(num).toFixed(2);
  }
  
  var monies = [
    { name: "PENNY", value: 0.01 },
    { name: "NICKEL", value: 0.05 },
    { name: "DIME", value: 0.10 },
    { name: "QUARTER", value: 0.25 },
    { name: "ONE", value: 1 },
    { name: "FIVE", value: 5 },
    { name: "TEN", value: 10 },
    { name: "TWENTY", value: 20 },
    { name: "ONE HUNDRED", value: 100 } ];
  
  
  for (var i = monies.length-1 ; i >= 0 && changeNeeded > 0 ; i--) {
    if (changeNeeded > monies[i].value) { // check this denomination
      var num = Math.floor(changeNeeded/monies[i].value); // how many do we need? 
      
      if (num*monies[i].value <= cid[i][1]) { //is it in the drawer?
        changeArr.push([monies[i].name, moneyRound(num*monies[i].value)]); // add to arr
        changeNeeded = moneyRound(changeNeeded - num*monies[i].value); // we need less
        cid[i][1] = moneyRound(cid[i][1] - num*monies[i].value); // remove from drawer
      } else {
        if (cid[i][1] === 0) { // don't have that denom in drawer
          continue;
        }
        changeArr.push([monies[i].name, moneyRound(cid[i][1])]); // add to arr    
        changeNeeded = moneyRound(changeNeeded - cid[i][1]); // we need less
        cid[i][1] = 0; // remove from drawer 
      }    
    }
  }
  
  var drawerEmpty = true;
  
  for (var j = 0 ; j < cid.length && drawerEmpty ; j++) {
    drawerEmpty = cid[0][1] === 0;
  }
  
  if (changeNeeded > 0) {
    return "Insufficient Funds";
  }
  if (drawerEmpty) {
    return "Closed";
  }

  return changeArr;
}
// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]

checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
