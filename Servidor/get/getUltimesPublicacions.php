<?php
/*
  Obtenir les ultimes publicacions de cada grup per mostrar-les al index;  
*/
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $idUsuari = $_GET['idUsuari'];

    $sql = "SELECT usuari.nomUsuari, grup.nom, publicacio.publicacio, grup_publicacions.tipus, grup.id, grup_publicacions.dataPublicacio FROM grup_publicacions 
            JOIN usuari ON grup_publicacions.idUsuari = usuari.id 
            JOIN grup ON grup.id = grup_publicacions.idGrup
            JOIN publicacio ON publicacio.id = grup_publicacions.id 
            WHERE grup_publicacions.dataPublicacio IN (SELECT max(dataPublicacio) FROM grup_publicacions WHERE grup_publicacions.idGrup = idGrup GROUP BY idGrup) 
            AND grup_publicacions.idUsuari != $idUsuari
            AND $idUsuari IN (SELECT idUsuari FROM usuari_grup WHERE idGrup = grup.id)
            ORDER BY grup_publicacions.dataPublicacio DESC";
    
    $result = mysqli_query($conn, $sql);
    $res = []; //publicacions
    $i = 0;

	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_row($result)) {
            $nomPublicador = $row[0];
            $nomGrup = $row[1];
            $publicacio = $row[2];
            $tipus = $row[3];
            $idGrup = $row[4];
            $dataPublicacio = $row[5];
            $res[$i] = ["nomPublicador" => $nomPublicador, "nomGrup" => $nomGrup, "publicacio" => $publicacio, "tipus" => $tipus, "idGrup" => $idGrup, "dataPublicacio" => $dataPublicacio];
            $i++;
        }
        echo json_encode($res);
	}
	else {
		echo 0;
	}
	mysqli_close($conn);


?>