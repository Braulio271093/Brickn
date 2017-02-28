<?php
    header("Access-Control-Allow-Origin: *");
    require '../connectDB.php';

    $idUsuari = $_GET['idUsuari'];
    $ruta = $_GET['ruta'];
    $sql = "UPDATE usuari SET fotoPerfil = '$ruta' WHERE id = $idUsuari";

    $result = mysqli_query($conn, $sql);

    if (mysqli_query($conn, $sql)) {
		echo 1;
	}
	else {
	    echo 0;
    }	
	mysqli_close($conn);
?>