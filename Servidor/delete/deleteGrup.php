<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

    $idGrup = $_GET['idGrup'];

    $sql = "DELETE FROM grup WHERE id = $idGrup";
    mysqli_query($conn, $sql);

    echo 1;
    mysqli_close($conn);

?>