<?php
	/**
    *	Elimniar un fila de la taula usuari_contacte;
    */

    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $idUsuari = $_GET['idUsuari'];
    $idContacte = $_GET['idContacte'];

	$sql = "DELETE FROM usuari_contacte WHERE idUsuari1 = $idContacte AND idUsuari2 = $idUsuari";

	if (mysqli_query($conn, $sql)) {
		echo 1;
	}
	else {
		echo 0;
	}
	  mysqli_close($conn);
?>
