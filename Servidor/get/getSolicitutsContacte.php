<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

    $idUsuari = $_GET['idUsuari'];

    $sql = "SELECT usuari_contacte.idUsuari1, usuari.nomUsuari FROM usuari_contacte 
            JOIN usuari ON usuari_contacte.idUsuari1 = usuari.id WHERE usuari_contacte.idUsuari2 = $idUsuari
            AND usuari_contacte.acceptat = 0";
    
    $result = mysqli_query($conn, $sql);
    $res = [];
    $i = 0;

	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_row($result)) {
            $id = $row[0];
            $nom = $row[1];
            $res[$i] = ["idUsuari" => $id, "nomUsuari" => $nom];
            $i++;
        }
        echo json_encode($res);
	}
	else {
		echo 0;
	}
	mysqli_close($conn);

?>