window.onload = function() {
  genList('hotMovies', 'http://naritate.kosk.me/api/hot.json');

  var frTab = document.getElementById('tab2');
  frTab.addEventListener('click', function(e) {
    genList('foreignMovies', 'http://naritate.kosk.me/api/foreign.json');
  }, false);

  var jpTab = document.getElementById('tab3');
  jpTab.addEventListener('click', function(e) {
    genList('japaneseMovies', 'http://naritate.kosk.me/api/japanese.json');
  }, false);

  var laterTab = document.getElementById('tab4');
  laterTab.addEventListener('click', function(e) {
    genListOfLater();
  }, false);

}

var template = document.createElement('li'),
    aside = document.createElement('aside'), // aside
    img = document.createElement('img'), // Cover img
    title = document.createElement('p'),
    form = document.createElement('form'),
    menu = document.createElement('menu');

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

function genList(id, url) {
  var list = document.getElementById(id);

  var _template = template.cloneNode(true),
      _menu = menu.cloneNode(true),
      _form = form.cloneNode(true),
      laterBtn = document.createElement('button');
  laterBtn.appendChild(document.createTextNode('後で見る'));
  laterBtn.className = 'later';
  _menu.appendChild(laterBtn);
  _form.appendChild(_menu);
  _template.appendChild(_form);

  if (!list.children.length) {
    var fragment = document.createDocumentFragment();

    var data = getJSON(url);
    var titleList = JSON.parse(data);

    for (var i in titleList) {
      var li = _template.cloneNode(true);

      li.querySelector('.cover').src = 'http://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=' + titleList[i].asin + '&Format=_SL100_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1';
      li.querySelector('.title').appendChild(document.createTextNode(titleList[i].title));
      li.querySelector('.later').id = titleList[i].asin;
      li.querySelector('.later').addEventListener('click', function(e) {
        if (!localStorage[this.id]) {
          var _title = this.parentNode.parentNode.parentNode.querySelector('p').textContent;
          alert('『' + _title + '』が"後で見る"リストに追加されました');
          localStorage.setItem(this.id, _title);
        }
      }, false);

      fragment.appendChild(li);
    }

    list.appendChild(fragment);
  }
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

function genListOfLater() {
  var list = document.getElementById('laterMovies');

  var _template = template.cloneNode(true),
      _menu = menu.cloneNode(true),
      _form = form.cloneNode(true),
      deleteBtn = document.createElement('button');
  deleteBtn.appendChild(document.createTextNode('削除'));
  deleteBtn.className = 'delete danger';
  _menu.appendChild(deleteBtn);
  _form.appendChild(_menu);
  _template.appendChild(_form);

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < localStorage.length; i++) {
    var li = _template.cloneNode(true);

    var key = localStorage.key(i),
    value = localStorage[key];

    li.querySelector('.cover').src = 'http://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=' + key + '&Format=_SL100_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1';
    li.querySelector('.title').appendChild(document.createTextNode(value));
    li.querySelector('.delete').id = key;
    li.querySelector('.delete').addEventListener('click', function(e) {
      var _title = this.parentNode.parentNode.parentNode.querySelector('p').textContent;
      if (confirm('『' + _title + '』をリストから削除しますか？')) {
        list.removeChild(this.parentNode.parentNode.parentNode);
        localStorage.removeItem(this.id);
      }
    }, false);

    fragment.appendChild(li);
  }

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  list.appendChild(fragment);
}