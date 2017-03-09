<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

    $idGrup = $_GET['idGrup'];

    $sql = "SELECT publicacio.id, usuari.nomUsuari, 
            publicacio.dataPublicacio, publicacio.publicacio, 
            publicacio.tipus FROM publicacio 
            JOIN usuari ON publicacio.idUsuari = usuari.id
            WHERE publicacio.idGrup = $idGrup
            ORDER BY publicacio.dataPublicacio DESC LIMIT 1";
   $result = mysqli_query($conn, $sql);
	if (mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_row($result);
        $publicacio = ["id" => $row[0], "publicador" => $row[1], "dataPublicacio" => $row[2], "publicacio" => $row[3], "tipus" => $row[4]];
        echo json_encode($publicacio);
    }
    mysqli_close($conn);
?>