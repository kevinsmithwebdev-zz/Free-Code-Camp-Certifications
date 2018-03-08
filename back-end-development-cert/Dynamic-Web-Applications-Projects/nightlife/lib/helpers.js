exports.jsonPretty = function (json) {
  if (!json)
    return '<span><i>[empty object]</i></span>';
  else
    return '<pre>' + JSON.stringify(json, null, 4) + '</pre>';
};
