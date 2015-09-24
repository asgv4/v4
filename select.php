<?php
$dbconn = pg_connect("host=vepp4-pg port=5432 dbname=v4parameters user=vepp4");
//$dbconn = pg_connect("host=vepp4-k500 port=5433 dbname=v4parameters user=vepp4");
//$dbconn = pg_connect("host=vepp4-k500 port=5434 dbname=v4parameters user=vepp4");
if(!$dbconn)
{
	echo ' does not connect';
}
$query = "select * from v4db_descriptor"; 
$result = pg_query($query); 
if(!$result)
{
	echo ' does not select';
}
$v4db_descriptor = array();
$tree = array();
while($r = pg_fetch_assoc($result)) {
	$v4db_descriptor[] = $r;
	//echo $r['system'];
	//echo ' ';
}
//echo 'terererer ';
$cur = 0;
for ($i =0;$i<count($v4db_descriptor);$i++)
{
		//if($v4db_descriptor[$i]['status']!='t')continue;
		$query = 'select * from "'.$v4db_descriptor[$i]['config_tbl'].'" order by param_name'; 
		$result = pg_query($query);
		
		while($config_tbl_cortege = pg_fetch_assoc($result)) 
		{
			$tree[$cur]['system'] = $v4db_descriptor[$i]['system'];
			if($v4db_descriptor[$i]['subsystem']==''||ctype_space($v4db_descriptor[$i]['subsystem']))
			{
				$tree[$cur]['subsystem'] = 'none';
				$tree[$cur]['system_status']=$v4db_descriptor[$i]['status'];
				$tree[$cur]['subsystem_status'] = 'none';
			}
			else
			{
				$tree[$cur]['subsystem_status'] = $v4db_descriptor[$i]['status'];
				$tree[$cur]['system_status']= 'none';
				$tree[$cur]['subsystem'] = $v4db_descriptor[$i]['subsystem'];
			}
			
			if($v4db_descriptor[$i]['group_tbl']==""||ctype_space($v4db_descriptor[$i]['group_tbl']))
			{
				$tree[$cur]['group_id'] = -1;
				$tree[$cur]['group'] = 'none';	
				$tree[$cur]['group_status']='none';
			}
			else
			{
				$tree[$cur]['group_id'] = $config_tbl_cortege['group_id'];
				if($v4db_descriptor[$i]['subsys_id']!=''&&!ctype_space($v4db_descriptor[$i]['subsys_id']))
				$query2 = 'select * from "'.$v4db_descriptor[$i]['group_tbl'].'" where '.$v4db_descriptor[$i]['group_ids'].' = '.$config_tbl_cortege[$v4db_descriptor[$i]['group_ids']].' and '.'subsys_id'.' = '.$v4db_descriptor[$i]['subsys_id'].' order by '.$v4db_descriptor[$i]['group_ids']; 
				else
				$query2 = 'select * from "'.$v4db_descriptor[$i]['group_tbl'].'" where '.$v4db_descriptor[$i]['group_ids'].' = '.$config_tbl_cortege[$v4db_descriptor[$i]['group_ids']].' order by '.$v4db_descriptor[$i]['group_ids']; 
				$result2 = pg_query($query2);
				if(!$result2) $tree[$cur]['group'] = str_replace('"','$',$query2); else
				while($r2 = pg_fetch_assoc($result2)) 
				{
					$tree[$cur]['group'] = $r2[$v4db_descriptor[$i]['groups']];
					$tree[$cur]['group_status'] = $r2['status'];
				}
			}
			if($tree[$cur]['group'] == '')$tree[$cur]['group'] = 'none';
			$tree[$cur]['param_name'] = $config_tbl_cortege[$v4db_descriptor[$i]['param_names']];
			$tree[$cur]['param_status'] = 	$config_tbl_cortege['status'];
			$tree[$cur]['data_tbl'] = $v4db_descriptor[$i]['data_tbl'];
			
			if($v4db_descriptor[$i]['full_names']!='')
			{
				$tree[$cur]['full_name'] = $config_tbl_cortege[$v4db_descriptor[$i]['full_names']];
			}
			else
			{
				$tree[$cur]['full_name'] = $tree[$cur]['param_name'];
			}
			$cur++;
		}
	//}
	//else
	//{
		//
	//}
} 

for ($i =0;$i<count($tree);$i++)
{
	//echo '{';
	echo '"system":"';
	echo $tree[$i]['system'];
	echo '" '; 

	echo '"subsystem":"';
	echo $tree[$i]['subsystem'];
	echo '" '; 

	echo '"group":"';
	echo $tree[$i]['group'];
	echo '" '; 

	echo '"param_name":"';
	echo $tree[$i]['param_name'];
	echo '" '; 
	
	echo '"full_name":"';
	echo $tree[$i]['full_name'];
	echo '" '; 

	echo '"data_tbl":"';
	echo $tree[$i]['data_tbl'];
	echo '" '; 
	
	echo '"system_status":"';
	echo $tree[$i]['system_status'];
	echo '" '; 
	
	echo '"subsystem_status":"';
	echo $tree[$i]['subsystem_status'];
	echo '" '; 

	echo '"group_status":"';
	echo $tree[$i]['group_status'];
	echo '" '; 
	
	echo '"param_status":"';
	echo $tree[$i]['param_status'];
	echo '" '; 
	
	//echo $tree[$i]['system'].'/'.$tree[$i]['subsystem'].'/'.$tree[$i]['group_id'].'/'.$tree[$i]['group'].'/'.$tree[$i]['param_name'].'/'.$tree[$i]['data_tbl'];
	if($i!=count($tree)-1)echo ';';
}

//echo ' count:';
//echo count($tree);
	
	//else echo -$i;
//echo ' ';
	

//echo 'terererer1 ';

?>
