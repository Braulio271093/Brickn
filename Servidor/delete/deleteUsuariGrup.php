<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

    $idUsuari = $_GET['idUsuari'];
    $idsGrup = $_GET['idGrup'];
    $idsGrup = explode("," , $idsGrup);

    for ($i = 0; $i < count($idsGrup); $i++) {
        $idGrup = $idsGrup[$i];
        $sql = "SELECT admin FROM usuari_grup WHERE idUsuari = $idUsuari AND idGrup = $idGrup";
        $q = mysqli_query($conn, $sql);
        $admin = mysqli_fetch_row($q);
        $admin = $row[0];
        if ($admin == 1) {
            $sql = "SELECT idUsuari FROM usuari_grup WHERE idGrup = $idGrup LIMIT 1";
            $q = mysqli_query($conn, $sql);
            $ids = mysqli_fetch_row($q);
            $ids = $row[0];
            $sql = "UPDATE usuari_grup SET admin = 1 WHERE idUsuari = $ids";
            mysqli_query($conn, $sql);
        }           
        $sql = "DELETE FROM usuari_grup WHERE idUsuari = $idUsuari AND idGrup = $idGrup";        
        mysqli_query($conn, $sql);        
       
    }

    echo 1;
    mysqli_close($conn);

?>