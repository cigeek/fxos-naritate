window.onload = function() {
  genList('hotMovies', getJSON('http://naritate.kosk.me/api/hot.json'));

  var frTab = document.getElementById('tab2');
  frTab.addEventListener('click', function(e) {
    genList('foreignMovies', getJSON('http://naritate.kosk.me/api/foreign.json'))
  }, false);

  var jpTab = document.getElementById('tab2');
  frTab.addEventListener('click', function(e) {
    genList('japaneseMovies', getJSON('http://naritate.kosk.me/api/japanese.json'))
  }, false);
}

function getJSON(url) {
  var res = null;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        res = JSON.parse(JSON.stringify(xhr.responseText));
      }
    }
  }

  xhr.open('GET', url, false);
  xhr.send(null);

  return res;
}

function genList(id, jsonStr) {
  var list = document.getElementById(id);

  if (!list.children.length) {
    var fragment = document.createDocumentFragment();

    var jsonData = JSON.parse(jsonStr);
    for (var i in jsonData) {
      var li = document.createElement('li');
      // aside
      var aside = document.createElement('aside');
      aside.className = 'pack';
      // Cover img
      var img = document.createElement('img');
      img.src = 'http://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=' + jsonData[i].asin + '&Format=_SL100_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1';
      aside.appendChild(img);
      // append aside to list
      li.appendChild(aside);

      // paragraph
      // title
      var title = document.createElement('p');
      title.appendChild(document.createTextNode(jsonData[i].title));
      li.appendChild(title);
      // buttons
      //<p><form role=\"dialog\" data-type=\"edit\"><menu><button id=\"favBtn" + res[i].id + "\">スキ！ (" + res[i].favs + ")</button><button id=\"" + res[i].id + "\">うーん.. (" + res[i].boos + ")</button></menu></form></p></li>";
      /*var buttons = document.createElement('p');
      var favBtn = document.createElement('button');
      var booBtn = document.createElement('button');*/

      fragment.appendChild(li);
    }

    list.appendChild(fragment);
  }
}