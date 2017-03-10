<?php
    /**
    *   Borrar un usuari d'un grup;
    */
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

    $idUsuari = $_GET['idUsuari'];
    $idGrup = $_GET['idGrup'];

    $sql = "DELETE FROM usuari_grup WHERE idUsuari = $idUsuari AND idGrup = $idGrup";        
    mysqli_query($conn, $sql);        


    echo 1;
    mysqli_close($conn);

?>