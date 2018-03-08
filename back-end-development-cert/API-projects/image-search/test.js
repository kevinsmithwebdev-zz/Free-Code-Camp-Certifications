var express = require('express');
var mongo = require('mongodb');
var fs = require('fs');
var request = require('request-promise');



var gCseId = "001813795373409118512:noq4cwauga0";
var gApiKey = "AIzaSyD85IQ2MTaCo2Zh43MG9UsIXtf0L7Kvf5o";

var q = "barcelona";
var start = 1;

var url = "https:\/\/www.googleapis.com/customsearch/v1?q=" + q + "&num=10&start=" + start + "&safe=high&cx=" + gCseId + "&key=" + gApiKey + "&alt=json";
//var url = "https://www.googleapis.com/customsearch/v1?key="+ gApiKey + "&num=10&cx=" + gCseId + "&start=" + start + "&q=" + q;
console.log(url);

const options = {
  method: 'GET',
  uri: url
}


request(options)
  .then(function (dataJson) {
    console.log("success");
  //  fs.writeFile('./data.json',data);
    var data = JSON.parse(dataJson);
    var thumbSrc;
    var imageSrc;



    // console.log(data.items);

    for (var i = 0; i < 10; i++) {


      console.log(data.items[i].cacheId);
      console.log(data.items[i].snippet);
      console.log(data.items[i].displayLink);
      try {
        thumbSrc = data.items[i].pagemap.cse_thumbnail[0].src;
      } catch(e) {
        thumbSrc = '';
      }
      console.log(thumbSrc);
      try {
        imageSrc = data.items[i].pagemap.cse_image[0].src;
      } catch (e) {
        imageSrc = '';
      }
      console.log(imageSrc);
      console.log("\n");
    }

  })
  .catch(function (err) {
    console.log("error");
    console.log(err);
  });
