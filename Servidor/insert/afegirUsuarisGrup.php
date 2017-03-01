<?php
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $idGrup = $_GET['idGrups'];
    $idUsuari = $_GET['idUsuari'];
    $usuarisGrup = $_GET['usuarisGrup'];
    $usuarisGrup = explode(',', $usuarisGrup);

    $e = 1; //retornar; 
    for ($i = 0; $i < count($usuarisGrup); $i++) {
        $idUsuariAfegir = $usuarisGrup[$i];
        $sql = "SELECT acceptat FROM usuari_contacte WHERE idUsuari1 = $idUsuari AND idUsuari2 = $idUsuariAfegir";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_row($result);
        if ($row[0] == 1) {
            $sql = "INSERT INTO usuari_grup (idUsuari, idGrup) VALUES ($idUsuariAfegir, $idGrup)";
            if (mysqli_query($conn, $sql)) {
                $e = 2;
            }
        }
        else {
            $e = 3; //3 = no s'han afegit tots els usuaris al grup;
        }
    }
    echo $e;
    mysqli_close($conn);
?>