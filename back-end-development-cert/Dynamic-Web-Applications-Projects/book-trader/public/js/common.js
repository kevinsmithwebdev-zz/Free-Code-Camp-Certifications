function titleAndSubtitleString(title, subtitle) {
  var html = '<b>' + title + '</b>';
  if (subtitle)
    html +=     ': ' + subtitle;
  return html;
}

function extractId(str) {
  return +str.match(/\d+/)[0];
}

function messageBookRender(book) {
  var html =
    '<h4>' +
      titleAndSubtitleString(book.title, book.subtitle) +
      ' by ' + harvardJoin(book.authors) +
    '</h4>' +
    '<img class="modal-image effectfront" alt="book cover for \"' + book.title + '"" src="' + book.imgUrl + '">' +
    '<i>' + book.description + '</i>';

  return html;
}

function harvardJoin(arr) {
  var str = '';
  var len = arr.length;
  if (len<3)
    str = arr.join(' and ');
  else
    str = arr.slice(0, len-1).join(', ') + ', and ' + arr[len-1];
  return str;
}
