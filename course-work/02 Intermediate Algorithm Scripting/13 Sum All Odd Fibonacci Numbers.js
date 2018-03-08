function sumFibs(num) {
  
  function fibonacci(num) {
    if (num <= 1) return 1;
    return fibonacci(num - 1) + fibonacci(num - 2);
  }
  
  var i = 1;
  var sum = 1;
  var newFib;
  
  while ((newFib=fibonacci(i++))<=num) {
    if (newFib % 2 !== 0) {
      sum+=(newFib);
    }
  }
  return sum;
}

sumFibs(4);