<?php
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $idGrup = $_GET['idGrup'];
    $dades;

    $sql = "SELECT nom FROM grup WHERE id = $idGrup";
    $result = mysqli_query($conn, $sql);
    $row =  mysqli_fetch_row($result);
    $dades[0] = ["nomGrup" => $row[0]];
    
    $sql = "SELECT usuari.nomUsuari, publicacio.publicacio, publicacio.dataPublicacio, publicacio.id, publicacio.tipus FROM publicacio JOIN usuari
            ON publicacio.idUsuari = usuari.id WHERE publicacio.idGrup = $idGrup ORDER BY publicacio.dataPublicacio DESC";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $dades[1] = ["numPublicacions" => mysqli_num_rows($result)];
        $i = 2;
        $publicacions = [];
        while ($row = mysqli_fetch_row($result)) {
            $publicador = $row[0];
            $publicacio = $row[1];
            $dataPublicacio = $row[2];
            $id = $row[3];
            $tipus = $row[4];
            $dades[$i] = ["publicacio" => ["id" => $id, "publicador" => $publicador, "publicacio" => $publicacio, "dataPublicacio" => $dataPublicacio, "tipus" => $tipus]]; //array de arrays
            $i++;
        }
        echo json_encode($dades);
    }
    else {
        $dades[1] = ["numPublicacions" => "0"];
        echo json_encode($dades);
    }
    mysqli_close($conn);
?>