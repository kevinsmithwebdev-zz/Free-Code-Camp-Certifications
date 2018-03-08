
$(document).ready( function() {


  // Quotes in array of 2 cell arrays of strings. First string is quote, second is author.
  var quotes = [
      ["Works of art make rules; rules do not make works of art." , "Claude Debussy"],
      ["To achieve great things, two things are needed; a plan, and not quite enough time." , "Leonard Bernstein"],
      ["Competitions are for horses, not artists." , "Bela Bartok"],
      ["Mournful and yet grand is the destiny of the artist." , "Franz Liszt"],
      ["I am hitting my head against the walls, but the walls are giving way." , "Gustav Mahler"],
      ["Lesser artists borrow, great artists steal." , "Igor Stravinsky"],
      ["I always said God was against art and I still believe it." , "Edward Elgar"],
      ["Without craftsmanship, inspiration is a mere reed shaken in the wind." , "Johannes Brahms"],
      ["There was no one near to confuse me, so I was forced to become original." , "Joseph Haydn"],
      ["As a musician I tell you that if you were to suppress adultery, fanaticism, crime, evil, the supernatural, there would no longer be the means for writing one note." , "Georges Bizet"],
      ["I was obliged to be industrious. Whoever is equally industrious will succeed equally well." , "Johann Sebastian Bach"],
      ["The musician is perhaps the most modest of animals, but he is also the proudest." , "Erik Satie"],
      ["To send light into the darkness of men's hearts - such is the duty of the artist." , "Robert Schumann"],
      ["A creative artist works on his next composition because he was not satisfied with his previous one." , "Dmitri Shostakovich"],
      ["I may not be a first-rate composer, but I am a first-class second-rate composer." , "Richard Strauss"],
      ["I can't understand why people are frightened of new ideas. I'm frightened of the old ones." , "John Cage"],
      ["I'm an adventurer. I like invention, I like discovery." , "Karlheinz Stockhausen"],
      ["The old idea of a composer suddenly having a terrific idea and sitting up all night to write it is nonsense. Nighttime is for sleeping." , "Benjamin Britten"],
      ["Inspiration is an awakening, a quickening of all man's faculties, and it is manifested in all high artistic achievements." , "Giacomo Puccini"],
      ["Music is the social act of communication among people, a gesture of friendship, the strongest there is." , "Malcolm Arnold"],
      ["The only love affair I have ever had was with music." , "Maurice Ravel"],
      ["Imagination creates reality." , "Richard Wagner"]
    ];

  var $quoteDisplay = $("#quoteDisplay");
  var $authorDisplay = $("#authorDisplay");
  var $quoteButton = $("#quoteBTN");
  var $tweetButton = $("#tweetBTN");

  function newQuote() {
    console.log("New quote!");
    var randomNumber = Math.floor(Math.random() * quotes.length);
    $quoteDisplay.text(quotes[randomNumber][0]);
    $authorDisplay.html(quotes[randomNumber][1]);

  }

  // Send quote on page load
    newQuote();

  function tweetQuote() {
    var url = "https://twitter.com/intent/tweet";
    var text= "\"" + document.getElementById("quoteDisplay").textContent + "\" " + document.getElementById("authorDisplay").textContent;

    var hashtags = "fCC,quote";

    window.open(url + "?text=" + text + ";hashtags=" + hashtags, "width=500,heigth=300");
  }

  $quoteButton.click(newQuote);
  $tweetButton.click(tweetQuote);
});
