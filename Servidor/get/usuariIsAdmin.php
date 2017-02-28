<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

    $idUsuari = $_GET['idUsuari'];
    $idGrup = $_GET['idGrup'];

    $sql = "SELECT admin FROM usuari_grup WHERE idUsuari = $idUsuari AND idGrup = $idGrup";
	$result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_row($result);
    $admin = $row[0];
    echo $admin;

    mysqli_close($conn);

?>