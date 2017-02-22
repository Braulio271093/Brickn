<?php

	/**
	*	Buscar un grup per el nom; 
	* 	@return id i nom del grup;
	*/
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $q = $_GET['q'];
	$idUsuari = $_GET['idUsuari'];

    $sql = "SELECT grup.id, grup.nom FROM grup JOIN usuari_grup ON usuari_grup.idGrup = grup.id WHERE grup.tipus = 0 
            AND grup.nom LIKE '%$q%' AND usuari_grup.idUsuari != $idUsuari ";
    $resultat = mysqli_query($conn, $sql);
	$res = [];
	$i = 0;

	if (mysqli_num_rows($resultat) > 0) {
		while ($row = mysqli_fetch_row($resultat)) {
            $str[$i] = ["idGrup" => $row[0], "nomGrup" => $row[1]];
			$i++; 
		}
		echo json_encode($str);
	}
	else {
		echo 0;
	}
     mysqli_close($conn); 
?>
