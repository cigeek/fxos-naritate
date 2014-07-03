window.onload = function () {

  $.getJSON("http://naritate.kosk.me/api/hot.json", function(res) {
    var html = genList(res);
    $("#hotMovies").append(html);
  });

  $("#tab2").click(function() {
    if (!$("#foreignMovies > li").length) {
      $.getJSON("http://naritate.kosk.me/api/foreign.json", function(res) {
        var html = genList(res);
        $("#foreignMovies").append(html);
      });
    }
  });

  $("#tab3").click(function() {
    if (!$("#japaneseMovies > li").length) {
      $.getJSON("http://naritate.kosk.me/api/japanese.json", function(res) {
        var html = genList(res);
        $("#japaneseMovies").append(html);
      });
    }
  });

}

genList = function(data) {
  var html = '';

  for (var i in res) {
    html += "<li><aside class=\"pack\"><img src=\"http://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=" + res[i].asin + "&Format=_SL100_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1\"></aside><p>" + res[i].title + "</p><p><form role=\"dialog\" data-type=\"edit\"><menu><button id=\"favBtn" + res[i].id + "\">スキ！ (" + res[i].favs + ")</button><button id=\"" + res[i].id + "\">うーん.. (" + res[i].boos + ")</button></menu></form></p></li>";
  }

  return html;
}
