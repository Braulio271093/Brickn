<?php
	/**
	*	Buscar un contacte pel seu nom semblant;
	* 	@return nom del usuari
	*/

    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $q = $_GET['nom']; //nom que busques;
	$idUsuari = $_GET['idUsuari'];

    $sql = "SELECT nomUsuari FROM usuari WHERE nomUsuari LIKE '%$q%' AND id != $idUsuari";
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
