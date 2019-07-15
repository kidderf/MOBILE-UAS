<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
include_once './config/autoload.php';

$fungsi ='';
$date = date('Y-m-d H:i:s');
$tgl  = date('Y-m-d');
$jam  = date('H:i:s');

if (!empty($_POST['fungsi'])) {
	$fungsi = $_POST['fungsi'];
}

if ($fungsi == 'insertNormal') {//insertNormal
	$data = array(
			'NIM' => $_POST['nim-add'],
			'nama' => $_POST['nama-add'],
			'mata_kuliah' => 'mobile',
			'email' => $_POST['email-add'],
			'waktu' => $date);
	$query = insertNormal($conn, $table, $data);
	if ($query) {
		$response['status'] = true;
	}
	else{
		$response['status'] = false;
	}
}
if ($fungsi == 'selectWhere') {//selectWhere
	$query = selectWhere($conn, $table, $_POST['kondisi']);
	if ($query) {
		$response['status'] = true;
		$response['nim'] = $query['NIM'];
		$response['nama'] = $query['nama'];
		$response['mata_kuliah'] = $query['mata_kuliah'];
		$response['email'] = $query['email'];
		$response['waktu'] = $query['waktu'];
	}
	else{
		$response['status'] = false;
	}
}
if ($fungsi == 'selectNormal') {//selectNormal
	$query = selectNormal($conn, $table);
	$response = $query;
}
if ($fungsi == 'deleteWhere'){//deleteWhere
	$kondisi = $_POST['kondisi'];
	$query = deleteWhere($conn, $table, $kondisi);
	$querylap = deleteWhere($conn, 'lapor', $kondisi);
	if ($query != true) {
		if ($querylap) {
			$response['status'] = false;
		}
		else{
			$response['status'] = true;	
		}
	}
	else{
		$response['status'] = true;
	}
}
if ($fungsi == 'updateNormal') {
	$kondisi = $_POST['kondisi'];
	$data = array(
			'NIM' => $_POST['nim-edit'],
			'nama' => $_POST['nama-edit'],
			'mata_kuliah' => $_POST['mata_kuliah-edit'],
			'email' => $_POST['email-edit']);
	$query = updateNormal($conn, $table, $data, $kondisi);
	if ($query) {
		$response['status'] = true;
	}
	else{
		$response['status'] = false;
	}
}
if ($fungsi == 'laporan') {
	$table = 'lapor';
	$data = array(
			'NIM' => $_POST['nim-lapor'],
			'nama' => $_POST['nama-lapor'],
			'progdi' => $_POST['progdi-lapor'],
			'kelas' => $_POST['kelas-lapor'],
			'tgl' => $tgl,
			'jam' => $jam,
			'URL' => $_POST['url-lapor'],
			'kumpul' => $date);
	$query = insertNormal($conn, $table, $data);
	if ($query) {
		$response['status'] = true;
	}
	else{
		$response['status'] = false;
	}
}

echo json_encode($response);
?>