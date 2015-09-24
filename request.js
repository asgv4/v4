var arr = [];
function createRequest()
{
var request = false;
if (window.XMLHttpRequest){
  // Gecko-* browsers, Safari, Konqueror
  request = new XMLHttpRequest();
}
else if (window.ActiveXObject){
  // Internet explorer
  try{
    request = new ActiveXObject("Microsoft.XMLHTTP");
  }
  catch(exception){
    request = new ActiveXObject("Msxml2.XMLHTTP");
  }
}
if (!request){
  alert("Unable to create XMLHttpRequest");
}
return request;
}
var unique = function(origArr) {
    var newArr = [],
        origLen = origArr.length,
        found, x, y;

    for (x = 0; x < origLen; x++) {
        found = undefined;
        for (y = 0; y < newArr.length; y++) {
            if (origArr[x] === newArr[y]) {
                found = true;
                break;
            }
        }
        if (!found) {
            newArr.push(origArr[x]);
        }
    }
    return newArr;
}
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function sendRequest(path, args, handler){
// Create request
var request = createRequest();
// Check existance
if (!request){
  return;
}
// Set handler
request.onreadystatechange = function()
{
  // If data transmission ended
  if (request.readyState == 4){
    if (request.status == 200){
      // Give control to handler
      handler(request);
    }
    else{
      alert('Error data loading. Check your internet connection.');
    }
  }
  else{
    // Loading
  }
}
// Initialize connection
request.open('post', path, true);
// Set header
request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
// Send request
request.send(args);
}
function getByName(name, str)
{
	start = str.indexOf('"'+name+'"');//address of first \" of name
	if (start==-1)return '';
	start_of_value = str.indexOf(':',start);//address of ':'
	finish_of_value = str.indexOf('"',start_of_value+2);
	//alert(start);
	//alert(start_of_value);
	//alert(finish_of_value);
	return str.substring(start_of_value+2,finish_of_value);
}

function setGetTreeResponse(handler) {
  //document.
  //var div1 = document.createElement('div');
  //div1.id = 'response';
  //div1.innerHTML = handler.responseText;;
  //div.type = 'text';
  //var div = document.getElementById('id2');
  //alert(div.id);
  //div.append(div1);
  //document.body.appendChild(div1);
	//alert('size = '+sizeof(handler.responseText)+'bytes or '+sizeof(handler.responseText)/1024+'kB or '+sizeof(handler.responseText)/1024/1024+'MB');
 //alert(handler.responseText);
  arr = handler.responseText.split(";").sort();
  
	
	//alert(getByName('group',arr[1]));
	//arr=unique(arr);
  //alert(arr);
//alert(arr.length);
	//tree['system']=0;
	for (var i = 0;i < arr.length;i++)
	{
		//addSystem(arr[i]);
		tree[i] = [];
		tree[i]['system']=getByName('system',arr[i]);
		tree[i]['subsystem']=getByName('subsystem',arr[i]);
		//tree[i]['subsystem']=tree[i]['subsystem'].replace("&","-and-");
		tree[i]['group']=getByName('group',arr[i]);
		tree[i]['param_name']=getByName('param_name',arr[i]);
		tree[i]['full_name']=getByName('full_name',arr[i]);
		//console.log(arr[i]);
		tree[i]['data_tbl']=getByName('data_tbl',arr[i]);
		tree[i]['system_status'] =  getByName('system_status',arr[i]);
		tree[i]['subsystem_status'] =  getByName('subsystem_status',arr[i]);
		tree[i]['group_status'] =  getByName('group_status',arr[i]);
		tree[i]['param_status'] =  getByName('param_status',arr[i]);

		//alert(i);
	}
	cur_tree_list = tree;
	createTree(tree);
//alert(tree[10]['param_name']);
  
  //insertAfter(div1,div);
  /*div = document.getElementById('id2');
  
  setTimeout(function(){
      //div1.parentNode.
	  //alert(document.getElementById("response").parentElement);
	  document.getElementById("response").parentElement.removeChild(document.getElementById("response"));
    }, 100000);*/
  //document.getElementById('response').value = handler.responseText;
  //document.body.append('handler.responseText');
}

function setGetVersionResponse(handler) {

  alert(handler.responseText);
  

	
}



function sizeof(_1){
var _2=[_1];
var _3=0;
for(var _4=0;_4<_2.length;_4++){
switch(typeof _2[_4]){
case "boolean":
_3+=4;
break;
case "number":
_3+=8;
break;
case "string":
_3+=2*_2[_4].length;
break;
case "object":
if(Object.prototype.toString.call(_2[_4])!="[object Array]"){
for(var _5 in _2[_4]){
_3+=2*_5.length;
}
}
for(var _5 in _2[_4]){
var _6=false;
for(var _7=0;_7<_2.length;_7++){
if(_2[_7]===_2[_4][_5]){
_6=true;
break;
}
}
if(!_6){
_2.push(_2[_4][_5]);
}
}
}
}
return _3;
};
