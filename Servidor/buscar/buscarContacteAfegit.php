<?php
    /**
    * Buscar contactes que tens afegits;
    */
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $q = $_GET['nom']; //nom que busques;
    $idUsuari = $_GET['idUsuari'];//la teva id;
    $sql = "SELECT usuari.nomUsuari FROM usuari JOIN usuari_contacte ON usuari.id = usuari_contacte.idUsuari2 WHERE usuari.nomUsuari LIKE '%$q%' AND usuari_contacte.idUsuari1 = $idUsuari";
    $resultat = mysqli_query($conn, $sql);
    $res = array();
    $i = 0;
	if (mysqli_num_rows($resultat) > 0) {
		while ($row = mysqli_fetch_row($resultat)) {
			$res[$i] = $row[0];
			$i = $i + 1;
		}
		echo json_encode($res);
	}
	else {
		echo 0;
	}

 mysqli_close($conn); 
?>