<?php
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $fechaInicio = $_GET['startDate'];
    $fechaFinal = $_GET['endDate'];
    $Nombre = $_GET['nombre'];
    $Descripcion = $_GET['descripcion'];
    $idUsuari = $_GET['idUsuari'];
    $idGrup = $_GET['idGrup'];
    $date = date("Y-m-d H:i:s");
    
        $sql = "INSERT INTO event (idGrup, idUsuari,nom, descripcio, dateStart, dateEnd, dataPublicacio) 
                VALUES ($idUsuari, $idGrup,'$Nombre', '$Descripcion', '$fechaInicio', '$fechaFinal', '$date')";
        if (mysqli_query($conn, $sql)) {
            $res = 1;
        }
        else {
            $res = 0;
        }
    echo $res;
    mysqli_close($conn);
?>