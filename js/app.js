window.onload = function () {
    console.log('loaded');

    $.getJSON("http://naritate.kosk.me/api/hot.json", function(res) {
        for (var i in res) {
            $("#hotMovies").append("<li><aside class=\"pack\"><img src=\"http://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=" + res[i].asin + "&Format=_SL100_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1\"></aside><p>" + res[i].title + "</p><p><form role=\"dialog\" data-type=\"edit\"><menu><button id=\"favBtn" + res[i].id + "\">スキ！ (" + res[i].favs + ")</button><button id=\"" + res[i].id + "\">うーん.. (" + res[i].boos + ")</button></menu></form></p></li>");
        }
    });

    $("#tab2").click(function() {
        if (!$("#foreignMovies > li").length) {
            $.getJSON("http://naritate.kosk.me/api/foreign.json", function(res) {
                console.log('tab2 clicked');
                for (var i in res) {
                    $("#foreignMovies").append("<li><aside class=\"pack\"><img src=\"http://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=" + res[i].asin + "&Format=_SL100_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1\"></aside><p>" + res[i].title + "</p><p><form role=\"dialog\" data-type=\"edit\"><menu><button id=\"favBtn" + res[i].id + "\">スキ！ (" + res[i].favs + ")</button><button id=\"" + res[i].id + "\">うーん.. (" + res[i].boos + ")</button></menu></form></p></li>");
                }
            });
        }
    });

    $("#tab3").click(function() {
        if (!$("#japaneseMovies > li").length) {
            $.getJSON("http://naritate.kosk.me/api/japanese.json", function(res) {
                console.log('tab3 clicked');
                for (var i in res) {
                    $("#japaneseMovies").append("<li><aside class=\"pack\"><img src=\"http://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=" + res[i].asin + "&Format=_SL100_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1\"></aside><p>" + res[i].title + "</p><p><form role=\"dialog\" data-type=\"edit\"><menu><button id=\"favBtn" + res[i].id + "\">スキ！ (" + res[i].favs + ")</button><button id=\"" + res[i].id + "\">うーん.. (" + res[i].boos + ")</button></menu></form></p></li>");
                }
            });
        }
    });
}