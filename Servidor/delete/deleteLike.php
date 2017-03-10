<?php
	/**
    * BOrrar-se un tema
    */
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

	$idUsuari = $_GET['idUsuari'];
	$idGust = $_GET['idGust'];

	$sql = "DELETE FROM usuari_tema WHERE idUsuari = $idUsuari AND idTema = $idGust";

	if (mysqli_query($conn, $sql)) {
		echo 1;
	}
	else {
		echo 0;
	}

	mysqli_close($conn);


?>
