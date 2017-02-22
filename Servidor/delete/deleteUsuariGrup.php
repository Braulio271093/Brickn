<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

    $idUsuari = $_GET['idUsuari'];
    $idsGrup = $_GET['idGrup'];
    $idsGrup = explode("," , $idsGrup);

    for ($i = 0; $i < count($idsGrup); $i++) {
        $idGrup = $idsGrup[$i];
        $sql = "DELETE FROM usuari_grup WHERE idUsuari = $idUsuari AND idGrup = $idGrup";
        mysqli_query($conn, $sql);
    }

    echo 1;
    mysqli_close($conn);

?>