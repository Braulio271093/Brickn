<?php
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $idUsuari = $_GET['idUsuari'];

    $sql = "SELECT usuari.nomUsuari, grup.nom, publicacio.publicacio FROM publicacio 
            JOIN usuari ON publicacio.idUsuari = usuari.id 
            JOIN grup ON grup.id = publicacio.idGrup 
            WHERE publicacio.dataPublicacio IN (SELECT max(dataPublicacio) FROM publicacio WHERE publicacio.idGrup = idGrup GROUP BY idGrup) 
            AND publicacio.idUsuari != $idUsuari
            ORDER BY publicacio.dataPublicacio DESC";
    
    $result = mysqli_query($conn, $sql);
    $res = []; //publicacions
    $i = 0;

	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_row($result)) {
            $nomPublicador = $row[0];
            $nomGrup = $row[1];
            $publicacio = $row[2];
            $res[$i] = ["nomPublicador" => $nomPublicador, "nomGrup" => $nomGrup, "publicacio" => $publicacio];
            $i++;
        }
        echo json_encode($res);
	}
	else {
		echo 0;
	}
	mysqli_close($conn);


?>