const MAX_DESCRIPTION = 100;

var booksArr = [];


$(function() {

  // cache DOM

  var $bookSearchBtn = $('#book-search-btn');
  var $bookSearchBox = $('#book-search-box');
  var $booksListBox = $('#books-list-box');

  // click handlers

  $bookSearchBtn.click(function() {
    searchBook();
  });

  $bookSearchBox.keypress(function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      searchBook();
    }
  });

  $('body').on('click', '.search-book-row', function () {
    var confirmStr = 'Is \"' + booksArr[this.id].title + '\" your book?';
    if (confirm(confirmStr))
      $.post("/books/add", $.param(booksArr[this.id]), function(data) {
        $(location).attr('href','/');
      });
  });

  //****************

  function searchBook() {

    var searchUrl = '/api/book?search=' + $bookSearchBox.val();
    $bookSearchBox.val('');
    $booksListBox.empty();

    $.getJSON(searchUrl, function(data) {
      booksArr = data.slice();
      for (var i=0; i<booksArr.length; i++) {
        $booksListBox.append(createBookRow(booksArr[i], i));
      }
    });
  }

}); // document ready



function createBookRow(book, id) {

  var descriptionShort = book.description;

  if (book.description.length>MAX_DESCRIPTION)
    descriptionShort = descriptionShort.substring(0,MAX_DESCRIPTION) + '...';
  if (!book.imgUrl)
      book.imgUrl='/images/no_image.gif';
  if (!book.title)
    book.title='[no title given]';
  if (!book.description)
    book.description='[no description given]';
  if (!book.authors[0])
    book.authors=['[no author given]'];

  var html= '<div id="' + id + '" class="row search-book-row">';
    html +=   '<div class="col-xs-2"><img class="search-book-image effectfront" alt="book cover for \"' + book.title + '"" src="' + book.imgUrl + '"></div>';
    html +=   '<div class="col-xs-3">' + titleAndSubtitleString(book.title, book.subtitle);
    html +=   '</div>';
    html +=   '<div class="col-xs-4" title="' + book.description + '"><i>' + descriptionShort + '</i></div>';
    html +=   '<div class="col-xs-3">' + book.authors.join('; ') + '</div>';
    html += '</div>';
  return html;
}
