<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

	$idUsuari = $_GET['idUsuari'];

    $sql = "SELECT grup.id, grup.nom FROM grup JOIN usuari_grup
            ON grup.id = usuari_grup.idGrup 
            WHERE usuari_grup.idUsuari = $idUsuari AND grup.tipus = 1";
	$resultat = mysqli_query($conn, $sql);
	$res = array();
	$i = 0;

	if (mysqli_num_rows($resultat) > 0) {
		while ($row = mysqli_fetch_row($resultat)) {
			//$res[$i] = $row[0];
            $str[$i] = array("idGrup" => $row[0], "nomGrup" => $row[1]);
			$i++; 
		}
		echo json_encode($str);
	}
	else {
		echo 0;
	}
?>