<?php
function __construct(){

}

//////////////////////////
/////// SELECT
//////////////////////////
function selectNormal($conn, $table){
	$query = 'select * from '.$table;
	$execute = $conn->query($query);
	$data = $execute->fetch_all(MYSQLI_ASSOC);
	if ($execute) {
		return $data;
	}
	//kalau pakai yg dibawah cuma tampil data awal
	/*	$execute = mysqli_query($conn, $query);
	if ($execute) {
		return mysqli_fetch_array($execute);
	}*/
}
function  selectWhere($conn, $table, $kondisi){
	$query = 'select * from '.$table.' where '.$kondisi;
	$execute = mysqli_query($conn, $query);
	if ($execute) {
		return mysqli_fetch_array($execute);
	}
}

//////////////////////////
/////// delete
//////////////////////////
function  deleteAll($conn, $table){
	$query = 'delete from '.$table;
	$execute = mysqli_query($conn, $query);
	if ($execute) {
		return true;
	}
	else return false;
}
function  deleteWhere($conn, $table, $kondisi){
	$query = 'delete from '.$table.' where '.$kondisi;
	$execute = mysqli_query($conn, $query);
	if ($execute) {
		return true;
	}
	else{
		return false;
	}
}

//////////////////////////
/////// insert
//////////////////////////
function insertNormal($conn, $table, $data = array()){
	$generate = generateValue($data, 'insert');
	$query = "insert into ".$table."(".$generate['field'].") values(".$generate['value'].")";
	$execute = mysqli_query($conn, $query);
	if ($execute) {
		return true;
	}
	else{
		return false;
		die("Data gagal tersimpan.");
	}
}

//////////////////////////
/////// update
//////////////////////////
function updateNormal($conn, $table, $data = array(), $kondisi){
	$generate = generateValue($data, 'update');
	$query = 'UPDATE '.$table.' SET '.$generate['update'].' where '.$kondisi;
	//UPDATE users SET name='$name',email='$email',mobile='$mobile' WHERE id=$id
	$execute = mysqli_query($conn, $query);
	if ($execute) {
		return true;
	}
	else{
		return false;
	}
}

function generateValue($data = array(), $key){
	$keys = array_keys($data);
	$vals = array_values($data);
	$generate['field']  = '';
	$generate['value']  = '';
	$generate['update'] = '';

	for ($i=0; $i < count($data); $i++) { 
		if ($key == 'update') {
			if (empty($generate['update'])) {
				$generate['update'] = $keys[$i].'='."'".$vals[$i]."'";
			}
			else{
				$generate['update'] = $generate['update'].', '.$keys[$i].'='."'".$vals[$i]."'";
			}
		}
		if ($key == 'insert') {
			if (empty($generate['field']) && empty($generate['value'])) {
				$generate['field'] = $keys[$i];
				$generate['value'] = "'".$vals[$i]."'";
			}
			else{
				$generate['field'] = $generate['field'].",".$keys[$i];
				$generate['value'] = $generate['value'].", '".$vals[$i]."'";
			}
		}
	}
	return $generate;
}

?>