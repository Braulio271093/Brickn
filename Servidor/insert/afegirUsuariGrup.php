<?php
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $idsGrups = $_GET['idsGrups'];
    $idsGrups = explode(',', $idsGrups);
    $idUsuari = $_GET['idUsuari'];

    for ($i = 0; $i < count($idsGrups); $i++) {
        $idGrup = $idsGrups[$i];
        $sql = "INSERT INTO usuari_grup (idUsuari, idGrup, admin) VALUES ($idUsuari, $idGrup, 0)";
        if (mysqli_query($conn, $sql)) {
            $res = 1;
        }
        else {
            $res = 0;
        }
    }
    echo $res;
    mysqli_close($conn);
?>