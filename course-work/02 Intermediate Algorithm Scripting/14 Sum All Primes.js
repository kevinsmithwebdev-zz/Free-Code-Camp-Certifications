function sumPrimes(num) {
  
  function isPrime(check) {
    if (check<=1)
      return false;
    for ( var i = 2; i < check; i++ ) {
        if (check % i === 0 ) {
            return false;
        }
    }
    return true;
  }

  var sum = 0;
  
  for (var i = 2 ; i <= num ; i++) {

    if (isPrime(i)) {
      sum+=i;
    }
  }
  return sum;
}

sumPrimes(10);