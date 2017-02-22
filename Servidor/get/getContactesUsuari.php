<?php
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

	$idUsuari = $_GET['idUsuari'];

	$sql = "SELECT usuari.nomUsuari FROM usuari WHERE id IN 
    (SELECT idUsuari2 FROM usuari_contacte WHERE idUsuari1 = $idUsuari)";
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
