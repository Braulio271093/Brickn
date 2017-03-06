<?php
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $idUsuari = $_GET['idUsuari'];

    $sql = "SELECT usuari.nomUsuari, grup.nom, publicacio.publicacio, publicacio.tipus, grup.id, publicacio.dataPublicacio FROM publicacio 
            JOIN usuari ON publicacio.idUsuari = usuari.id 
            JOIN grup ON grup.id = publicacio.idGrup 
            WHERE publicacio.dataPublicacio IN (SELECT max(dataPublicacio) FROM publicacio WHERE publicacio.idGrup = idGrup GROUP BY idGrup) 
            AND publicacio.idUsuari != $idUsuari
            AND $idUsuari IN (SELECT idUsuari FROM usuari_grup WHERE idGrup = grup.id)
            ORDER BY publicacio.dataPublicacio DESC";
    
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