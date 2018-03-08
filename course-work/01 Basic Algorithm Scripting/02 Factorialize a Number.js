
function factorialize(num) {

  
  var tot=1;
  
  
  for (var i = 1 ; i <= num ; i ++) {
    
    tot *= i;
    
  }
  
  return tot;
    
}

factorialize(5);
