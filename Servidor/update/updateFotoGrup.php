<?php
    header("Access-Control-Allow-Origin: *");
    require '../connectDB.php';

    $idGrup = $_GET['idGrup'];
    $ruta = $_GET['ruta'];
    $sql = "UPDATE grup SET foto= '$ruta' WHERE id = $idGrup";

    $result = mysqli_query($conn, $sql);

    if (mysqli_query($conn, $sql)) {
		echo 1;
	}
	else {
	    echo 0;
    }	
	mysqli_close($conn);
?>