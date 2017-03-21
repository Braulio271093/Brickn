<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

    $idGrup = $_GET['idGrup'];

    $sql = "SELECT publicacio.id, usuari.nomUsuari, grup_publicacions.dataPublicacio, publicacio.publicacio, grup_publicacions.tipus, usuari.fotoPerfil FROM grup_publicacions 
            JOIN usuari ON grup_publicacions.idUsuari = usuari.id
            JOIN publicacio ON grup_publicacions.id = publicacio.id
            WHERE grup_publicacions.idGrup = $idGrup
            ORDER BY grup_publicacions.dataPublicacio DESC LIMIT 1";
   $result = mysqli_query($conn, $sql);
	if (mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_row($result);
        $publicacio = ["id" => $row[0], "publicador" => $row[1], "dataPublicacio" => $row[2], "publicacio" => $row[3], "tipus" => $row[4], "imgPublicador" => $row[5]];
        echo json_encode($publicacio);
    }
    mysqli_close($conn);
?>