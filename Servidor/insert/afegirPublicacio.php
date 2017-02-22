<?php
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

    $idGrup = $_GET['idGrup'];
    $idUsuari = $_GET['idUsuari'];
    $publicacio = $_GET['publicacio'];
	$tipus = $_GET['tipus'];
    $date = date("Y-m-d H:i:s");

    $sql = "INSERT INTO publicacio (idGrup, idUsuari, publicacio, dataPublicacio, tipus) VALUES ($idGrup, $idUsuari, '$publicacio', '$date', $tipus)";
	if (mysqli_query($conn, $sql)) {
		echo 1;
	}
	else {
		echo 0;
	}
	mysqli_close($conn);

?>