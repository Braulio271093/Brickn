<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

    $idGrup = $_GET['idGrup'];
    $sql = "SELECT usuari.nomUsuari, usuari.fotoPerfil, usuari_grup.admin, usuari.id FROM usuari JOIN usuari_grup 
            ON usuari.id = usuari_grup.idUsuari WHERE usuari_grup.idGrup = $idGrup";
    $resultat = mysqli_query($conn, $sql);
	$str = [];
	$i = 0;

	if (mysqli_num_rows($resultat) > 0) 
    {
		while ($row = mysqli_fetch_row($resultat)) 
        {
            $str[$i] = ["idUsuari" => $row[3], "nomUsuari" => $row[0], "fotoUsuari" => $row[1], "admin" => $row[2]];
			$i++; 
		}
		echo json_encode($str);
	}
	else {
		echo 0;
	}
?>