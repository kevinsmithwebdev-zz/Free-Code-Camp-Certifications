function truncateString(str, num) {

  console.log("***" + str + "*** " + num + " and len of str is " + str.length);
  
  if (str.length <= num) {
    
    console.log("less " + str);
    return str;
  }
  
  if (num <=3) {
    
    str = str.substr(0,num) + "...";
    console.log("less " + str);
    
    return str;
  }
  
  str = str.substring(0, num-3) + "...";
  console.log("norm " + str); 
  return (str);
 
}

truncateString("A-tisket a-tasket A green and yellow basket", 11);
