<?php
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

	$idUsuari = $_GET['idUsuari'];

	$sql = "SELECT fotoPerfil FROM usuari WHERE id = $idUsuari";
	$result = mysqli_query($conn, $sql);

	if (mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_row($result);
		echo json_encode($row[0]);
	}
	else {
		echo 0;
	}
	mysqli_close($conn);


?>