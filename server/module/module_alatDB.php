<?php

function explainTable($conn, $table){
	$query = "explain ".$table;
	$field = $conn->query($query);
	$field = $field->fetch_all(MYSQLI_ASSOC);
	return $field;
}

function showTable($conn){
	$query = "show tables";
	$table = $conn->query($query);
	$table = $table->fetch_all(MYSQLI_ASSOC);
	return $table;
}
?>