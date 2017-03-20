<?php
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

	$idUsuari = $_GET['idUsuari'];
	$idEvent = $_GET['idEvent'];

	$sql = "INSERT INTO usuari_event VALUES ($idUsuari, $idEvent)";
	if (mysqli_query($conn, $sql)) {
		echo 1;
	}
	else {
		echo 0;
	}
mysqli_close($conn);


?>