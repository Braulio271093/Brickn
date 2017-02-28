<?php
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $idGrup = $_GET['idGrup'];
    $idUsuari = $_GET['idUsuari'];

    //obtenir el ultim access;
    $sql = "SELECT ultimaEntrada FROM usuari_grup WHERE idGrup = $idGrup AND idUsuari = $idUsuari";
    $result = mysqli_query($conn, $sql);
    $row =  mysqli_fetch_row($result);
    $dateUltimaEntrada = $row[0];
    
    
    $sql = "SELECT COUNT(*) FROM publicacio WHERE dataPublicacio > '$dateUltimaEntrada' AND idUsuari != $idUsuari AND idGrup = $idGrup";
    $result = mysqli_query($conn, $sql);
    $row =  mysqli_fetch_row($result);
    $numPublicacions = $row[0];
    echo json_encode($numPublicacions);


    mysqli_close($conn);
?>