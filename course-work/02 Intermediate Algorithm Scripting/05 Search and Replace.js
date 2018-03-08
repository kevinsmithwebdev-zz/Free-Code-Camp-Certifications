function myReplace(str, before, after) {
  
if (before.charCodeAt(0)>=65 && before.charCodeAt(0)<=90) {
    after = after.charAt(0).toUpperCase() + after.slice(1);
  }

  return str.replace(before, after);
}

myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");