<?php
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

	$idUsuari = $_GET['idUsuari'];
	$idEvent = $_GET['idEvent'];
	$acceptat = $_GET['acceptat'];

	$sql = "INSERT INTO usuari_event VALUES ($idUsuari, $idEvent, $acceptat)";
	if (mysqli_query($conn, $sql)) {
		echo 1;
	}
	else {
		echo 0;
	}
mysqli_close($conn);


?>