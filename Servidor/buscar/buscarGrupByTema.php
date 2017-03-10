<?php
	/**
    * Buscar un grup per el nom del tema (semblant) on l'usuari no estigui dins;
    */

    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $q = $_GET['q'];
	$idUsuari = $_GET['idUsuari'];
	
    $sql = "SELECT grup.id, grup.nom, grup.pass FROM grup JOIN grup_tema
            ON grup.id = grup_tema.idGrup JOIN tema ON grup_tema.idTema = tema.id WHERE grup.tipus = 0 
            AND tema.nom LIKE '%$q%' AND grup.id NOT IN (SELECT idGrup FROM usuari_grup WHERE idUsuari = $idUsuari)";
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
