<?php
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $idUsuari = $_GET['idUsuari'];

    $sql = "SELECT usuari.nomUsuari, grup.nom, publicacio.publicacio, publicacio.dataPublicacio, publicacio.tipus
            FROM publicacio JOIN usuari_grup ON usuari_grup.idUsuari = $idUsuari JOIN usuari ON usuari.id = publicacio.idUsuari
            JOIN grup ON grup.id = publicacio.idGrup ORDER B";

?>