<?php
/*
    Obtenir les dades d'un grup i totes les seves publicacions;'
*/
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $idGrup = $_GET['idGrup'];
    $dades;

    $sql = "SELECT nom FROM grup WHERE id = $idGrup";
    $result = mysqli_query($conn, $sql);
    $row =  mysqli_fetch_row($result);
    $dades[0] = ["nomGrup" => $row[0]];
    
    /*$sql = "SELECT usuari.nomUsuari, usuari.fotoPerfil, publicacio.publicacio, grup_publicacions.dataPublicacio, 
            grup_publicacions.id, grup_publicacions.tipus
            FROM grup_publicacions
            JOIN usuari ON grup_publicacions.idUsuari = usuari.id
            JOIN publicacio ON publicacio.id = grup_publicacions.id 
            WHERE grup_publicacions.idGrup = $idGrup ORDER BY grup_publicacions.dataPublicacio DESC";

    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $dades[1] = ["numPublicacions" => mysqli_num_rows($result)];
        $i = 2;
        $publicacions = [];
        while ($row = mysqli_fetch_row($result)) {
            $publicador = $row[0];
            $imgPublicador = $row[1];
            $publicacio = $row[2];
            $dataPublicacio = $row[3];
            $id = $row[4];
            $tipus = $row[5];
            $sql = "SELECT COUNT(*) FROM comentari WHERE idPublicacio = $id";
            $r = mysqli_query($conn, $sql);
            $rw = mysqli_fetch_row($r);
            $numComentaris = $rw[0];
            $dades[$i] = ["publicacio" => ["id" => $id, "publicador" => $publicador, "imgPublicador"=> $imgPublicador, "publicacio" => $publicacio, "dataPublicacio" => $dataPublicacio, "tipus" => $tipus, "numComentaris" => $numComentaris]]; //array de arrays
            $i++;
        }*/
    $sql = "SELECT grup_publicacions.id, usuari.nomUsuari, usuari.fotoPerfil, tipus, dataPublicacio FROM grup_publicacions
            JOIN usuari ON grup_publicacions.idUsuari = usuari.id
            WHERE grup_publicacions.idGrup = $idGrup
            ORDER BY grup_publicacions.dataPublicacio DESC";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $numPublicacions = mysqli_num_rows($result);
        $dades[1] = ["numPublicacions" => $numPublicacions];
        $i = 2;
        $publicacions = [];
        while ($row = mysqli_fetch_row($result)) {
            $id = $row[0];
            $publicador = $row[1];
            $imgPublicador = $row[2];
            $tipus = $row[3];
            $dataPublicacio = $row[4];                       
            $sql = "SELECT COUNT(*) FROM comentari WHERE idPublicacio = $id";
            $r = mysqli_query($conn, $sql);
            $rw = mysqli_fetch_row($r);
            $numComentaris = $rw[0];          
            if ($tipus == 2) { //es un event
                $sql = "SELECT nom, descripcio, dateStart, dateEnd FROM event WHERE id = $id";
                $r = mysqli_query($conn, $sql);
                $rw = mysqli_fetch_row($r);
                $nomEvent = $rw[0];
                $descripcioEvent = $rw[1];
                $dateStart = $rw[2];
                $dateEnd = $rw[3];
                $sql = "SELECT COUNT(*) FROM usuari_event WHERE idEvent = $id AND acceptat = 1";
                $r = mysqli_query($conn, $sql);
                $rw = mysqli_fetch_row($r);
                $personesEvent = $rw[0];
                $sql = "SELECT COUNT(*) FROM usuari_event WHERE idEvent = $id AND acceptat = 0";
                $r = mysqli_query($conn, $sql);
                $rw = mysqli_fetch_row($r);
                $personesEventDec = $rw[0]; //persones que han posat que no assistiran al event;
                $dades[$i] = ["publicacio" => ["id" => $id, "publicador" => $publicador, 
                                           "imgPublicador"=> $imgPublicador, 
                                           "dataPublicacio" => $dataPublicacio, "tipus" => $tipus, 
                                           "numComentaris" => $numComentaris, "dateStart" => $dateStart,
                                           "dateEnd" => $dateEnd, "nomEvent" => $nomEvent, 
                                           "descripcioEvent" => $descripcioEvent, "personesEvent" => $personesEvent, 
                                           "personesEventDec" => $personesEventDec]];
            }
            else {
                $sql = "SELECT publicacio FROM publicacio WHERE id = $id";
                $r = mysqli_query($conn, $sql);
                $rw = mysqli_fetch_row($r);
                $publicacio = $rw[0];
                $dades[$i] = ["publicacio" => ["id" => $id, "publicador" => $publicador, 
                                           "imgPublicador"=> $imgPublicador, "publicacio" => $publicacio, 
                                           "dataPublicacio" => $dataPublicacio, "tipus" => $tipus, 
                                           "numComentaris" => $numComentaris]];
            }
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