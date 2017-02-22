<?php
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

    $idUsuari = $_GET['idUsuari'];
	$idPublicacio = $_GET['idPublicacio'];
	$comentari = $_GET['comentari'];
	$date = date("Y-m-d H:i:s");

	$sql = "INSERT INTO comentari VALUES ($idPublicacio, $idUsuari, '$comentari', '$date')";

	if (mysqli_query($conn, $sql)) {
		echo 1;
	}
	else {
		echo 0;
	}
	mysqli_close($conn);
?>