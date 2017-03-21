<?php
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

	$idUsuari = $_GET['idUsuari'];
	$idEvent = $_GET['idEvent'];
	$acceptat = $_GET['acceptat'];

	$sql = "SELECT * FROM usuari_event WHERE idUsuari = $idUsuari AND idEvent = $idEvent";
	$resultat = mysqli_query($conn, $sql);
	if (mysqli_num_rows($resultat) > 0) {
		$sql = "UPDATE usuari_event SET acceptat = $acceptat WHERE idUsuari = $idUsuari AND idEvent = $idEvent";
		if (mysqli_query($conn, $sql)) {
			echo 1;
		}
		else {
			echo 0;
		}
	}	
	else {
		$sql = "INSERT INTO usuari_event VALUES ($idUsuari, $idEvent, $acceptat)";
		if (mysqli_query($conn, $sql)) {
			echo 1;
		}
		else {
			echo 0;
		}
	}
mysqli_close($conn);


?>