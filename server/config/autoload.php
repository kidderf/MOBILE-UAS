<?php

$load['database']	= include_once 'load_db.php';
$load['module']		= include_once 'load_module.php';


$keys = array_keys($load);
foreach ($keys as $key) {
	if (array_key_exists($key, $load)) {
		$folder = './'.$key.'/';
		foreach ($load[$key] as $val) {
			include_once $folder.$key.$val.'.php';
		}
	}
}
?>