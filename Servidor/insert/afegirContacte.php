<?php
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

	$idUsuari1 = $_GET['idUsuari'];
	$idUsuari2 = $_GET['idUsuari2'];
	$acceptat = $_GET['acceptat'];
	$sql = "INSERT INTO usuari_contacte VALUES ($idUsuari1, $idUsuari2, '$acceptat')";
	if (mysqli_query($conn, $sql)) {
		echo 1;
	}
	else {
		echo 0;
	}
	mysqli_close($conn);


?>
