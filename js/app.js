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

  var ltrTab = document.getElementById('tab4');
  ltrTab.addEventListener('click', function(e) {

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

    var data = getJSON(url);
    var titleList = JSON.parse(data);

    var template = document.createElement('li'),
        aside = document.createElement('aside'), // aside
        img = document.createElement('img'), // Cover img
        title = document.createElement('p'),
        form = document.createElement('form'),
        menu = document.createElement('menu'),
        laterBtn = document.createElement('button');

    // aside, img
    aside.className = 'pack';
    img.className = 'cover';
    aside.appendChild(img);
    template.appendChild(aside);
    // title
    title.className = 'title';
    template.appendChild(title);
    // form, button
    form.setAttribute('role', 'dialog');
    form.setAttribute('data-type', 'edit');
    laterBtn.appendChild(document.createTextNode('保存'));
    laterBtn.className = 'later';
    menu.appendChild(laterBtn);
    form.appendChild(menu);
    template.appendChild(form);

    for (var i in titleList) {
      var li = template.cloneNode(true);

      li.querySelector('.cover').src = 'http://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=' + titleList[i].asin + '&Format=_SL100_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1';
      li.querySelector('.title').appendChild(document.createTextNode(titleList[i].title));

      fragment.appendChild(li);
    }

    list.appendChild(fragment);
  }
}