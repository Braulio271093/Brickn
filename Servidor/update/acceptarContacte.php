<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

    $idUsuari = $_GET['idUsuari'];
    $idContacte = $_GET['idContacte'];

    $sql = "UPDATE usuari_contacte SET acceptat = 1 
            WHERE idUsuari2 = $idUsuari AND idUsuari1 = $idContacte";
     
    if (mysqli_query($conn, $sql)) {
        echo 1;
	}
	else {
		echo 0;
	}
	mysqli_close($conn);
?>