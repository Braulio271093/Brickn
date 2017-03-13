<?php
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

    $idGrup = $_GET['idGrup'];
    $idUsuari = $_GET['idUsuari'];
    $publicacio = $_GET['publicacio'];
	$tipus = $_GET['tipus'];
    $date = date("Y-m-d H:i:s");

	$sql = "INSERT INTO grup_publicacions (idGrup, tipus, idUsuari, dataPublicacio) VALUES ($idGrup, $tipus, $idUsuari, '$date')";
	if (mysqli_query($conn, $sql)) {
		$last_id = mysqli_insert_id($conn);
		$sql = "INSERT INTO publicacio (id, publicacio) VALUES ($last_id, '$publicacio')";
		if (mysqli_query($conn, $sql)) {
			echo 1;
		}
	else {
		echo 0;
		}
	}
	mysqli_close($conn);

?>