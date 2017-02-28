<?php
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

	$idUsuari = $_GET['idUsuari'];
	$idGust = $_GET['idGust'];

	$sql = "INSERT INTO usuari_tema VALUES ($idUsuari, $idGust)";
	if (mysqli_query($conn, $sql)) {
		echo 1;
	}
	else {
		echo 0;
	}
mysqli_close($conn);


?>
