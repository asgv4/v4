var n = 0;
var idsystem = 0;
var idsubsystem = 0;
var idcheckbox = 0;
var subsystemarr = [];//new Array();
var grouparr = [];
var measurearr = [];
var tree = [];
var cur_tree_list = [];
var hashtree = [];//new Array();
//alert(hashtree.length);
    function UnHide( eThis ){
        if( eThis.innerHTML.charCodeAt(0) == 9658 ){
            eThis.innerHTML = '&#9660;'
            eThis.parentNode.parentNode.parentNode.className = '';
        }else{
            eThis.innerHTML = '&#9658;'
            eThis.parentNode.parentNode.parentNode.className = 'cl';
        }
        return false;
   }
   function searchInTree()
   {
   		var n = 0;
   		cur_tree_list = [];
   		var sub_string = document.getElementById('substringforsearch').value;
   		if(sub_string == '')
   		{
   			cur_tree_list=tree;
   		}
   		else
   		{
   			for (var i = 0;i<tree.length;i++)
	   		{
   				if (tree[i]['param_name'].indexOf(sub_string)!=-1)
   				{
   					cur_tree_list[n]=tree[i];
   					n++;
   				}
   			}
   		}
   		//deleteTree();
   		
   		//alert(n);
   		createTree(cur_tree_list);
   		var old_div_result = document.getElementById('divresulttext');
   		if(old_div_result)
   		{
   			old_div_result.parentNode.removeChild(old_div_result);
   		}
   		var div_result = document.createElement('div');
   		div_result.innerHTML = 'found: '+cur_tree_list.length;
   		div_result.id='divresulttext';
   		insertAfter(div_result,document.getElementById('selectnonebutton'));
   		//console.log( document.body.childNodes.length);
   		for (var i = 0; i < document.body.childNodes.length; i++) 
   		{
     		if(document.body.childNodes[i].className=='cl')
     	 	{ 
     	 		//console.log(i);
     	 		document.body.childNodes[i].className='';
     	 	}
     	 //alert( document.body.childNodes[i] ); // Text, DIV, Text, UL, ..., SCRIPT
    	}
   }
	function deleteTree()
	{
		if(document.getElementById('tree'))document.getElementById('tree').parentNode.removeChild(document.getElementById('tree'));
		n = 0;
		idsystem = 0;
		idsubsystem = 0;
		idcheckbox = 0;
		subsystemarr = [];//new Array();
		grouparr = [];
		measurearr = [];
		hashtree = [];
	}
	function addSystem(system_name,status)
	{
		if(system_name=='')return;
		var li_new_system = document.createElement('li');
		li_new_system.id='idsystem'+idsystem;
		li_new_system.className='cl';
		//var inner_html = 
		if (status=='t'||status=='none')
		{
			//li_new_system.className='cl';
		li_new_system.innerHTML = '<div><p><a href="#" class="sc" onclick="return UnHide(this)">&#9658;</a>'+system_name+'</p></div><ul><span id=system'+idsystem+'tag></span></ul>';
			
		}
		else
		{
			//li_new_system.className='cl';
			li_new_system.innerHTML = '<div><p class="scu"><font size = "+2">&#8855;</font><font color = "707070">'+system_name+'</font></p></div><ul><span id=system'+idsystem+'tag></span></ul>';
		}
		//li_new_system.innerHTML = '<div><p><a href="#" class="sc" onclick="return UnHide(this)">&#9658;</a>'+system_name+'</p></div><ul><span id=system'+idsystem+'tag></span></ul>';
		var li_previons_system;
		if(idsystem==0)
		{
			var div_new_tree = document.createElement('div');
			div_new_tree.id = 'tree';
			div_new_tree.className='treeview';
			div_new_tree.innerHTML='<ul><li><div><p><a href="#" class="sc" onclick="return UnHide(this)">&#9660;</a>Systems</p></div><ul><span id="firstsystemtag"></span></ul></li></ul>'
			var treetag=document.getElementById('treetag');
			insertAfter(div_new_tree,treetag);
			li_previons_system=document.getElementById('firstsystemtag');
		}
		else
		{
			li_previons_system=document.getElementById('idsystem'+(idsystem-1));
		}
		subsystemarr[idsystem] = 0;
		grouparr[idsystem] = [];
		grouparr[idsystem][-1]=0;
		
		measurearr[idsystem] = [];
		measurearr[idsystem][-1] = [];
		measurearr[idsystem][-1][-1]=0;
		insertAfter(li_new_system,li_previons_system);
		idsystem++;
		//alert(subsystemarr[134]);
	}
	function addSubSystem(system_id,name,status)
	{
		var li_new_subsystem = document.createElement('li');
		if(subsystemarr[system_id]==undefined)
		{
			//alert(system_id+ 'undefined' +idsystem);
			return false;
		}
		
		li_new_subsystem.id='idsystem'+system_id+'subsystem'+subsystemarr[system_id];
		if (name != 'Groups')
		{
			li_new_subsystem.className='cl';
			if(status=='t'||status=='none')
			{
				li_new_subsystem.innerHTML='<div><p><a href="#" class="sc" onclick="return UnHide(this)">&#9658;</a>'+name+'</p></div><ul><span id="system'+system_id+'subsystem' + subsystemarr[system_id] + 'tag"></span>';
			}
			else
			{
				li_new_subsystem.innerHTML='<div><p class="scu"><font size = "+2">&#8855;</font><font color = "707070">'+name+'</font></p></div><ul><span id="system'+system_id+'subsystem' + subsystemarr[system_id] + 'tag"></span>';
			}
		}
		else
		{
			li_new_subsystem.innerHTML='<div><p><a href="#" class="sc" onclick="return UnHide(this)">&#9660;</a>'+name+'</p></div><ul><span id="system'+system_id+'subsystem' + subsystemarr[system_id] + 'tag"></span>';
			//li_new_subsystem.className='cl';
		}
		var li_previons_subsystem;
		if(subsystemarr[system_id]==0)
		{
			li_previons_subsystem=document.getElementById('system'+system_id+'tag');
		}
		else
		{
			li_previons_subsystem=document.getElementById('idsystem'+system_id+'subsystem'+(subsystemarr[system_id]-1));
			//alert('idsystem'+system_id+'subsystem'+(subsystemarr[system_id]-1));
		}
		//alert(li_previons_subsystem);
		insertAfter(li_new_subsystem,li_previons_subsystem);
		grouparr[system_id][subsystemarr[system_id]] = 0;
		measurearr[system_id][subsystemarr[system_id]]=[];
		measurearr[system_id][subsystemarr[system_id]][-1]=[];
		measurearr[system_id][subsystemarr[system_id]][-1] = 0;
		measurearr[system_id][-1][grouparr[system_id][-1]]=[];
		//measurearr[system_id][-1][grouparr[system_id][-1]]=0;
		subsystemarr[system_id]++;
		return true;
		
		
	}
	
	function addGroup(system_id,subsystem_id, name,status)
	{
		var li_new_group = document.createElement('li');
		if(subsystemarr[system_id]==undefined)
		{
			alert('undefined');
			return;
		}
		li_new_group.id='idsystem'+system_id+'subsystem'+subsystem_id+'group'+grouparr[system_id][subsystem_id];
		if(status=='t')
		{
			li_new_group.innerHTML='<div><p><a href="#" class="sc" onclick="return UnHide(this)">&#9658;</a>'+name+'</p></div><ul><span id="system'+system_id+'subsystem' + subsystem_id+'group' +grouparr[system_id][subsystem_id]+ 'tag"></span>';
		
		}
		else 
		{
			li_new_group.innerHTML='<div><p class="scu"><font size = "+2">&#8855;</font><font color = "707070">'+name+'</font></p></div><ul><span id="system'+system_id+'subsystem' + subsystem_id+'group' +grouparr[system_id][subsystem_id]+ 'tag"></span>';
			//alert(system_id,subsystem_id,name)
		}
		//li_new_group.innerHTML='<div><p><a href="#" class="sc" onclick="return UnHide(this)">&#9658;</a>'+name+'</p></div><ul><span id="system'+system_id+'subsystem' + subsystem_id+'group' +grouparr[system_id][subsystem_id]+ 'tag"></span>';
		li_new_group.className='cl';
		
		var li_previons_group;
		if(subsystem_id>=0)
		{
			if(grouparr[system_id][subsystem_id]==0)
			{
				li_previons_group=document.getElementById('system'+system_id+'subsystem'+subsystem_id+'tag');
				//alert('system'+system_id+'subsystem'+subsystem_id+'tag');
			}
			else
			{
				li_previons_group=document.getElementById('idsystem'+system_id+'subsystem'+subsystem_id+'group'+(grouparr[system_id][subsystem_id]-1));
				//alert('idsystem'+system_id+'subsystem'+subsystem_id+'group'+(grouparr[system_id][subsystem_id]-1));
				//alert('idsystem'+system_id+'subsystem'+(subsystemarr[system_id]-1));
			}
		}
		
		/*if (subsystem_id==-1)
		{
			if(grouparr[system_id][-1]==0)
			{
				li_previons_group=document.getElementById('system'+system_id+'tag');
				//alert('system'+system_id+'tag');
			}
			else
			{
				li_previons_group=document.getElementById('idsystem'+system_id+'subsystem'+subsystem_id+'group'+(grouparr[system_id][subsystem_id]-1));
				//alert('idsystem'+system_id+'subsystem'+subsystem_id+'group'+(grouparr[system_id][subsystem_id]-1));
				//alert('idsystem'+system_id+'subsystem'+(subsystemarr[system_id]-1));
			}
			measurearr[system_id][-1][grouparr[system_id][-1]]=0;
		}*/
			//alert(li_previons_subsystem);
		insertAfter(li_new_group,li_previons_group);
		//grouparr[system_id][subsytemarr[system_id]] = 0;
		measurearr[system_id][subsystem_id][grouparr[system_id][subsystem_id]] = 0;		
		grouparr[system_id][subsystem_id]++;
	}
	function addMeasureInDocument(system_id, subsystem_id, group_id, name, status)
	{
		//alert('in');
		//console.log(measurearr.length+'; '+system_id+'; '+subsystem_id+'; '+group_id);
		//console.log(idcheckbox+' '+system_id+' '+subsystem_id+' '+ group_id+' '+name+'; '+cur_tree_list[idcheckbox]['system']+' '+cur_tree_list[idcheckbox]['subsystem']+' '+cur_tree_list[idcheckbox]['group']+' '+cur_tree_list[idcheckbox]['param_name']);
		if(measurearr[system_id][subsystem_id][group_id]==undefined)
		{
			alert('undefined');
			return;
		}
		li_new_measure = document.createElement('li');
		if( status!='f')
		{
			li_new_measure.innerHTML = '<div><p><input type="checkbox" id = idcheckbox'+idcheckbox+'>'+name+'</p></div>';
		}
		else
		{
			//console.log("false " + system_id+'/'+subsystem_id+'/'+group_id)
			li_new_measure.innerHTML = '<div><p><input type="checkbox" id = '+idcheckbox+' disabled><font color = "707070">'+name+'</font></p></div>';
			//alert (system_id+'/'+subsystem_id+'/'+group_id+'/'+name);
			//alert(status);
		}
		li_new_measure.id = 'idsystem'+system_id+'subsystem'+subsystem_id+'group'+group_id+'measure'+measurearr[system_id][subsystem_id][group_id];
		var li_previons_measure;
		if(subsystem_id==-1 && group_id!=-1)
		{
			if(measurearr[system_id][-1][group_id]==0)
			{
				li_previons_measure = document.getElementById('system'+system_id+'subsystem'+group_id+'tag');
			}
			else
			{
				li_previons_measure = document.getElementById('idsystem'+system_id+'subsystem'+subsystem_id+'group'+group_id+'measure'+(measurearr[system_id][subsystem_id][group_id]-1));
			}
			measurearr[system_id][-1][group_id]++;
			//alert('return1!');
			//return;
		}
		if(subsystem_id!=-1 && group_id == -1)
		{
			if(measurearr[system_id][subsystem_id][-1]==0)
			{
				li_previons_measure = document.getElementById('system'+system_id+'subsystem'+subsystem_id+'tag');
			}
			else
			{
				li_previons_measure = document.getElementById('idsystem'+system_id+'subsystem'+subsystem_id+'group'+group_id+'measure'+(measurearr[system_id][subsystem_id][group_id]-1));
			}
			measurearr[system_id][subsystem_id][-1]++;
		}
		if(subsystem_id == -1 && group_id == -1)
		{
			if(measurearr[system_id][-1][-1]==0)
			{
				li_previons_measure = document.getElementById('system'+system_id+'tag');
			}
			else
			{
				li_previons_measure = document.getElementById('idsystem'+system_id+'subsystem'+subsystem_id+'group'+group_id+'measure'+(measurearr[system_id][subsystem_id][group_id]-1));
			}
			measurearr[system_id][-1][-1]++;
		}
		if(subsystem_id!=-1&&group_id!=-1)
		{
			if(measurearr[system_id][subsystem_id][group_id]==0)
			{
				li_previons_measure = document.getElementById('system'+system_id+'subsystem'+subsystem_id+'group'+group_id+'tag');
				
			}
			else
			{
				li_previons_measure = document.getElementById('idsystem'+system_id+'subsystem'+subsystem_id+'group'+group_id+'measure'+(measurearr[system_id][subsystem_id][group_id]-1));
			}
			measurearr[system_id][subsystem_id][group_id]++;
		}
		//alert(li_new_measure.id+'\n'+li_previons_measure.id);
		insertAfter(li_new_measure,li_previons_measure);
		idcheckbox++;
	}
	
	function findInSystems(name)
	{
		for(var i = 0;i<hashtree.length;i++)
		{
			if (hashtree[i]['name']==name)
			return i;
		}
		return -1;
	}

	function findInSubSystems(system_id,name)
	{
		for(var i = 0;i<hashtree[system_id]['node'].length;i++)
		{
			if (hashtree[system_id]['node'][i]['name']==name)
			return i;
		}
		return -1;
	}
	
	function findInGroups(system_id,subsystem_id, name)
	{
		if(subsystem_id!=-1)
		{
			for(var i=0;i<hashtree[system_id]['node'][subsystem_id]['node'].length;i++)
			{
				if(hashtree[system_id]['node'][subsystem_id]['node'][i]['name']==name)
				return i;
			}
		}
		/*else
		{
			for(var i = 0;i<hashtree[system_id]['node'].length;i++)
			{
				if (hashtree[system_id]['node'][i]['name']==name)
				return i;
			}		
		}*/
		return -1;
	}


	function addMeasure(measure)
	{
		
		var system_id = findInSystems(measure['system']);
		if(system_id==-1)
		{
			hashtree[hashtree.length]=[];
			hashtree[hashtree.length-1]['name'] = measure['system'];
			hashtree[hashtree.length-1]['status'] = measure['system_status'];
			hashtree[hashtree.length-1]['node'] = [];
			hashtree[hashtree.length-1]['measures'] = [];
			system_id = hashtree.length-1;
		}
		//add subsystems
		if(measure['subsystem']!='none')
		{
			var subsystem_id = findInSubSystems(system_id,measure['subsystem']);
			if(subsystem_id==-1)
			{
				hashtree[system_id]['node'][hashtree[system_id]['node'].length]=[];
				hashtree[system_id]['node'][hashtree[system_id]['node'].length-1]['name'] = measure['subsystem'];
				hashtree[system_id]['node'][hashtree[system_id]['node'].length-1]['status'] = measure['subsystem_status'];
				hashtree[system_id]['node'][hashtree[system_id]['node'].length-1]['node'] = [];
				hashtree[system_id]['node'][hashtree[system_id]['node'].length-1]['measures'] = [];
				subsystem_id = hashtree[system_id]['node'].length-1;
			}
		}
		else if(measure['group']!='none'&&measure['group']!='')
		{
			var subsystem_id = findInSubSystems(system_id,'Groups');
			if(subsystem_id==-1)
			{
				hashtree[system_id]['node'][hashtree[system_id]['node'].length]=[];
				hashtree[system_id]['node'][hashtree[system_id]['node'].length-1]['name'] = 'Groups';
				hashtree[system_id]['node'][hashtree[system_id]['node'].length-1]['status'] = 't';
				hashtree[system_id]['node'][hashtree[system_id]['node'].length-1]['node'] = [];
				hashtree[system_id]['node'][hashtree[system_id]['node'].length-1]['measures'] = [];
				subsystem_id = hashtree[system_id]['node'].length-1;
			}
		}
		//add groups
		var group_id;
		if(measure['group']!='none'&&measure['group']!='')
		{
			group_id = findInGroups(system_id, subsystem_id, measure['group']);
			if(group_id == -1)
			{
				hashtree[system_id]['node'][subsystem_id]['node'][hashtree[system_id]['node'][subsystem_id]['node'].length]=[];
				hashtree[system_id]['node'][subsystem_id]['node'][hashtree[system_id]['node'][subsystem_id]['node'].length-1]['name']=measure['group'];
				hashtree[system_id]['node'][subsystem_id]['node'][hashtree[system_id]['node'][subsystem_id]['node'].length-1]['status']=measure['group_status'];
				hashtree[system_id]['node'][subsystem_id]['node'][hashtree[system_id]['node'][subsystem_id]['node'].length-1]['node']=[];
				//hashtree[system_id]['node'][subsystem_id]['node'][hashtree[system_id]['node'][subsystem_id]['node'].length-1]['measures']=[];				
				group_id = hashtree[system_id]['node'][subsystem_id]['node'].length-1;
			}
		}
		//add measures
		//there are subsystem and group both
		if(measure['subsystem']!='none'&&measure['subsystem']!=''&&measure['group']!='none'&&measure['group']!='')
		{
			hashtree[system_id]['node'][subsystem_id]['node'][group_id]['node'][hashtree[system_id]['node'][subsystem_id]['node'][group_id]['node'].length]=[];	
			hashtree[system_id]['node'][subsystem_id]['node'][group_id]['node'][hashtree[system_id]['node'][subsystem_id]['node'][group_id]['node'].length-1]['name']=measure['param_name'];
			hashtree[system_id]['node'][subsystem_id]['node'][group_id]['node'][hashtree[system_id]['node'][subsystem_id]['node'][group_id]['node'].length-1]['full_name']=measure['full_name'];
			
			hashtree[system_id]['node'][subsystem_id]['node'][group_id]['node'][hashtree[system_id]['node'][subsystem_id]['node'][group_id]['node'].length-1]['status']=measure['param_status'];
		
		}		
		//there is only subsystem (no group)
		if(measure['subsystem']!='none'&&measure['subsystem']!=''&&(measure['group']=='none'||measure['group']==''))
		{
		//if(hashtree[i]['node'][j]['node'][k]['node'].length);
			hashtree[system_id]['node'][subsystem_id]['measures'][hashtree[system_id]['node'][subsystem_id]['measures'].length]=[];
			hashtree[system_id]['node'][subsystem_id]['measures'][hashtree[system_id]['node'][subsystem_id]['measures'].length-1]['name']=measure['param_name'];
			hashtree[system_id]['node'][subsystem_id]['measures'][hashtree[system_id]['node'][subsystem_id]['measures'].length-1]['full_name']=measure['full_name'];
			
			hashtree[system_id]['node'][subsystem_id]['measures'][hashtree[system_id]['node'][subsystem_id]['measures'].length-1]['status']=measure['param_status'];
			
			//hashtree[system_id]['node'][subsystem_id]['node'][hashtree[system_id]['node'][subsystem_id]['node'].length-1]['node']=[];
		}
		//there is only group(subsystem = Groups)
		if((measure['subsystem']=='none'||measure['subsystem']=='')&&measure['group']!='none'&&measure['group']!='')
		{
			if(subsystem_id!=0)alert(system_id+'\n'+subsystem_id+'\n'+group_id);
			//alert(measure['group'])
			//hashtree[system_id]['node'][subsystem_id]['node'][group_id]['measures'][hashtree[system_id]['node'][subsystem_id]['node'][group_id]['measures'].length]=[];
			//hashtree[system_id]['node'][subsystem_id]['node'][group_id]['measures'][hashtree[system_id]['node'][subsystem_id]['node'][group_id]['measures'].length-1]['name']=measure['param_name'];
			hashtree[system_id]['node'][subsystem_id]['node'][group_id]['node'][hashtree[system_id]['node'][subsystem_id]['node'][group_id]['node'].length]=[];	
			hashtree[system_id]['node'][subsystem_id]['node'][group_id]['node'][hashtree[system_id]['node'][subsystem_id]['node'][group_id]['node'].length-1]['name']=measure['param_name'];
			hashtree[system_id]['node'][subsystem_id]['node'][group_id]['node'][hashtree[system_id]['node'][subsystem_id]['node'][group_id]['node'].length-1]['full_name']=measure['full_name'];
			
			hashtree[system_id]['node'][subsystem_id]['node'][group_id]['node'][hashtree[system_id]['node'][subsystem_id]['node'][group_id]['node'].length-1]['status']=measure['param_status'];
		
		}
		//there is no group and no subsystem
		if((measure['subsystem']=='none'||measure['subsystem']=='')&&(measure['group']=='none'||measure['group']==''))
		{
			hashtree[system_id]['measures'][hashtree[system_id]['measures'].length]=[];
			hashtree[system_id]['measures'][hashtree[system_id]['measures'].length-1]['name']=measure['param_name'];
			hashtree[system_id]['measures'][hashtree[system_id]['measures'].length-1]['full_name']=measure['full_name'];
			hashtree[system_id]['measures'][hashtree[system_id]['measures'].length-1]['status']=measure['param_status'];
			//.log("measure param status "+measure['param_status']);
		}
		
	}
	
	function createTree(_tree)
	{
		//alert("download!");
		
		deleteTree();
		for (var i = 0;i < _tree.length;i++)
		{
			addMeasure(_tree[i]);
			//addSystem(tree[i]['system']+'/'+tree[i]['subsystem']+'/'+tree[i]['group']+'/'+tree[i]['param_name']+'/'+tree[i]['data_tbl']+'/'+tree[i]['system_status']+'/'+tree[i]['subsystem_status']+'/'+tree[i]['group_status']+'/'+tree[i]['param_status'],'t');
			//addSystem(arr[i]);
		}
		//alert(hashtree.length);
		for (var i = 0; i<hashtree.length;i++)
		{
			addSystem(hashtree[i]['name'],hashtree[i]['status']);
			for(var j = 0;j<hashtree[i]['measures'].length;j++)
			{
				//console.log(hashtree[i]['measures'][j]['status']);
				addMeasureInDocument(i,-1,-1,hashtree[i]['measures'][j]['full_name'],hashtree[i]['measures'][j]['status']);
			}
			for(var j = 0;j<hashtree[i]['node'].length;j++)
			{
				addSubSystem(i,hashtree[i]['node'][j]['name'],hashtree[i]['node'][j]['status']);
				for (var k = 0;k<hashtree[i]['node'][j]['measures'].length;k++)
				{
					addMeasureInDocument(i,j,-1,hashtree[i]['node'][j]['measures'][k]['full_name'],hashtree[i]['node'][j]['measures'][k]['status']);
				}
				for (var k = 0;k<hashtree[i]['node'][j]['node'].length;k++)
				{
					addGroup(i,j,hashtree[i]['node'][j]['node'][k]['name'],hashtree[i]['node'][j]['node'][k]['status']);
					/*for (var m = 0;m<hashtree[i]['node'][j]['node'][k]['measures'].length;m++)
					{
						addMeasureInDocument(i,-1,k,hashtree[i]['node'][j]['node'][k]['measures'][m]['name']);
					}*/
					for (var m = 0;m<hashtree[i]['node'][j]['node'][k]['node'].length;m++)
					{
						addMeasureInDocument(i,j,k,hashtree[i]['node'][j]['node'][k]['node'][m]['full_name'],hashtree[i]['node'][j]['node'][k]['node'][m]['status']);
					}
				}
			}
		}
		//alert(idcheckbox+'; '+tree.length);
		document.getElementById('gettreebutton').disabled = false;
		
	}
	
	function addLi()
	{
		var li1 = document.createElement('li');
		  //div1.id = 'response';
		  //li1.innerHTML = '<div><p><a href="#" class="sc" onclick="return UnHide(this)">&#9658;</a><a href="#">test'+n+'</a></p></div><li><div><p><input type="checkbox">Measure 6</div></li>';
		  li1.innerHTML = document.getElementById('liid0').innerHTML;
		  li1.id='liid'+(n+1);
		  li1.className='cl';
		  //alert(li1.className);
		  
		  //div.type = 'text';
		  var li2// = document.getElementById('liid'+n);
		  if(n==0)
		  {
		  	li2 = document.getElementById('liidd'+n);
		  }
		  else li2 = document.getElementById('liid'+n);
		  //alert(div.id);
		  //div.append(div1);
		  //document.body.appendChild(div1);
		  insertAfter(li1,li2);
		  n++;
		  //document.getElementById('liid'+n-1).class="cl";
		  //document.getElementById('liid'+n-1).parentNode.parentNode.parentNode.className = 'cl';
		  
		  
		
	}
	
	function selectNone()
	{
		var n = 0;
		for (var i = 0;i<idcheckbox;i++)
		{
			cb = document.getElementById('idcheckbox'+i); 
			if(cb)
			{
				if(cb.checked)
				{
					cb.checked=false;
					n++;
				}
			}
		}
		//alert('deselected: '+n);
	}
	function check()
	{
		var n = 0;
		for (var i = 0;i<idcheckbox;i++)
		{
			cb = document.getElementById('idcheckbox'+i); 
			if(cb)
			{
				if(cb.checked)
				{
					alert('name: '+cur_tree_list[i]['param_name']+'    data_tbl: '+ cur_tree_list[i]['data_tbl']);
					n++;
				}
			}
		}
		//alert('selected: '+n);
	}
	
	function insertAfter(newNode, referenceNode) {
	    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}

	function setUnactive()
	{
		document.getElementById('gettreebutton').disabled = true;
	}
