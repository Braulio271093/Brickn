<?php
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $idUsuari = $_GET['idUsuari'];

    $sql = "SELECT grup.id, grup.nom, grup.pass FROM grup 
	JOIN grup_tema ON grup.id = grup_tema.idGrup 
	JOIN usuari_grup ON grup.id = usuari_grup.idGrup 
	WHERE grup.tipus = 0 
	AND grup_tema.idTema IN (SELECT tema.id FROM tema JOIN usuari_tema ON tema.id = usuari_tema.idTema WHERE usuari_tema.idUsuari = $idUsuari) 
	AND grup.id NOT IN (SELECT idGrup FROM usuari_grup WHERE idUsuari = $idUsuari)";

    $resultat = mysqli_query($conn, $sql);
	$res = [];
	$i = 0;

	if (mysqli_num_rows($resultat) > 0) {
		while ($row = mysqli_fetch_row($resultat)) {
            $str[$i] = ["idGrup" => $row[0], "nomGrup" => $row[1], "pass" => $row[2]];
			$i++; 
		}
		echo json_encode($str);
	}
	else {
		echo 0;
	}
     mysqli_close($conn); 
?>