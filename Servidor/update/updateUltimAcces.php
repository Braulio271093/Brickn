<?php
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $idGrup = $_GET['idGrup'];
    $idUsuari = $_GET['idUsuari'];
    $date = date("Y-m-d H:i:s");

    $sql = "UPDATE usuari_grup SET ultimaEntrada = '$date' WHERE idGrup = $idGrup AND idUsuari = $idUsuari";

    if (mysqli_query($conn, $sql)) {
		echo 1;
    }
    else {
      echo 0;
    }
    mysqli_close($conn);
?>