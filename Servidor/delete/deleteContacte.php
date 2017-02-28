<?php
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

	$idUsuari1 = $_GET['idUsu1'];
	$idUsuari2 = $_GET['idUsu2'];

	$sql = "DELETE FROM usuari_contacte WHERE idUsuari1 = $idUsuari1 AND idUsuari2 = $idUsuari2";

	if (mysqli_query($conn, $sql)) {
		echo 1;
	}
	else {
		echo 0;
	}

	mysqli_close($conn);


?>
