<?php
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $idUsuari = $_GET['idUsuari'];
	$localitzacio = $_GET['localitzacio'];

	$sql = "UPDATE usuari SET localitzacio = $localitzacio WHERE id = $idUsuari";

	$result = mysqli_query($conn, $sql);

    if (mysqli_query($conn, $sql)) {
		echo 1;
	}
	else {
	    echo 0;
    }	
	mysqli_close($conn);
	?>