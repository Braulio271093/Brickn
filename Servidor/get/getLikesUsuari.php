<?php
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

	$idUsuari = $_GET['idUsuari'];

	$sql = "SELECT tema.nom FROM tema WHERE id IN (SELECT idTema FROM usuari_tema WHERE idUsuari = $idUsuari)";
	$resultat = mysqli_query($conn, $sql);
	$res = array();
	$i = 0;

	if (mysqli_num_rows($resultat) > 0) {
		while ($row = mysqli_fetch_row($resultat)) {
			$res[$i] = $row[0];
			$i = $i + 1;
		}
		echo json_encode($res);

	}
	else {
		echo 0;
	}


?>
