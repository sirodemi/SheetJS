/* oss.sheetjs.com (C) 2014-present SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */

/** drop target **/

var _target = document.getElementById('drop');
console.log(_target)


var _file = document.getElementById('file');
console.log(_file)


/** Spinner **/
//var spinner;

//var _workstart = function() { spinner = new Spinner().spin(_target); }
//var _workend = function() { spinner.stop(); }


/* make the buttons for the sheets */
var make_buttons = function(sheetnames, cb) {
  var buttons = document.getElementById('buttons');
  buttons.innerHTML = "";
  sheetnames.forEach(function(s,idx) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.name = 'btn' + idx;
    btn.text = s;
    var txt = document.createElement('h3'); txt.innerText = s; btn.appendChild(txt);
    btn.addEventListener('click', function() { cb(idx); }, false);
    buttons.appendChild(btn);
    buttons.appendChild(document.createElement('br'));
  });
};


var _onsheet = function(json, sheetnames, select_sheet_cb) {

console.log(json)

//worksheet選択ボタン
make_buttons(sheetnames, select_sheet_cb);


  /* set up table headers */
  var L = 0;
  json.forEach(function(r) { if(L < r.length) L = r.length; });
  console.log(L);
  for(var i = json[0].length; i < L; ++i) {
    json[0][i] = "";
  }

};

/** Drop it like it's hot **/

DropSheet({
  file: _file,
  drop: _target,
  on: {
//    workstart: _workstart,
//    workend: _workend,
    sheet: _onsheet,
    foo: 'bar'
  }
})
