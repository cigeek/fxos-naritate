window.onload = function() {
  genList('hotMovies', 'http://naritate.kosk.me/api/hot.json');

  var frTab = document.getElementById('tab2');
  frTab.addEventListener('click', function(e) {
    genList('foreignMovies', 'http://naritate.kosk.me/api/foreign.json')
  }, false);

  var jpTab = document.getElementById('tab3');
  jpTab.addEventListener('click', function(e) {
    genList('japaneseMovies', 'http://naritate.kosk.me/api/japanese.json')
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

function genList(id, url) {
  var list = document.getElementById(id);

  if (!list.children.length) {
    var fragment = document.createDocumentFragment();

    var jsonStr = getJSON(url);
    var jsonData = JSON.parse(jsonStr);

    var tmpLi = document.createElement('li'),
        tmpAside = document.createElement('aside'), // aside
        tmpImg = document.createElement('img'), // Cover img
        tmpTitle = document.createElement('p'),
        tmpForm = document.createElement('form'),
        tmpMenu = document.createElement('menu'),
        tmpButton = document.createElement('button');

    tmpAside.className = 'pack';

    for (var i in jsonData) {
      var li = tmpLi.cloneNode(false),
          aside = tmpAside.cloneNode(false),
          img = tmpImg.cloneNode(false),
          title = tmpTitle.cloneNode(false),
          form = tmpForm.cloneNode(false),
          menu = tmpMenu.cloneNode(false),
          favBtn = tmpButton.cloneNode(false),
          ltrBtn = tmpButton.cloneNode(false);

      img.src = 'http://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=' + jsonData[i].asin + '&Format=_SL100_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1';
      aside.appendChild(img);
      // Append aside to list
      li.appendChild(aside);

      // paragraph
      // Movie title
      title.appendChild(document.createTextNode(jsonData[i].title));
      li.appendChild(title);
      // buttons
      //<p><form role=\"dialog\" data-type=\"edit\"><menu><button id=\"favBtn" + res[i].id + "\">スキ！ (" + res[i].favs + ")</button><button id=\"" + res[i].id + "\">うーん.. (" + res[i].boos + ")</button></menu></form></p></li>";

      form.setAttribute('role', 'dialog');
      form.setAttribute('data-type', 'edit');
      favBtn.id = 'favBtn' + jsonData[i].id;
      favBtn.appendChild(document.createTextNode('スキ!'));
      ltrBtn.id = 'ltrBtn' + jsonData[i].id;
      ltrBtn.appendChild(document.createTextNode('保存'));
      menu.appendChild(favBtn);
      menu.appendChild(ltrBtn);
      form.appendChild(menu);
      li.appendChild(form);

      fragment.appendChild(li);
    }

    list.appendChild(fragment);
  }
}