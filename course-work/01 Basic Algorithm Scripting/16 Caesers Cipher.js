function rot13(str) {
  return str.replace(/[a-zA-Z]/g, 
    function(ch) { 
      var start = ch <= 'Z' ? 65 : 97; 
      return String.fromCharCode(start + (ch.charCodeAt(0) - start + 13) % 26); 
  });
}

// Change the inputs below to test
rot13("SERR PBQR PNZC");