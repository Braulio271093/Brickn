<?php
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $fechaInicio = $_GET['startDate'];
    $fechaFinal = $_GET['endDate'];
    $Nombre = $_GET['nombre'];
    $Descripcion = $_GET['descripcion'];
    $idUsuari = $_GET['idUsuari'];
    $idGrup = $_GET['idGrup'];
    $lat = $_GET['lat'];
    $long = $_GET['long'];
    $ico = $_GET['icono'];
    $date = date("Y-m-d H:i:s");

    $sql = "INSERT INTO grup_publicacions (idGrup, tipus, idUsuari, dataPublicacio) VALUES ($idGrup, 2, $idUsuari, '$date')";
	if (mysqli_query($conn, $sql)) {
		$last_id = mysqli_insert_id($conn);   
        echo "$last_id, '$Nombre', '$Descripcion', '$fechaInicio', '$fechaFinal','$lat','$long','$ico'";
        $sql = "INSERT INTO event (id, nom, descripcio, dateStart, dateEnd,coordX,coordY,icon) 
                VALUES ($last_id, '$Nombre', '$Descripcion', '$fechaInicio', '$fechaFinal','$lat','$long','$ico')";
        if (mysqli_query($conn, $sql)) {
            $res = 1;        
        }
        else {
            $res = 3;
        }
    }
    else {
        $res = 0;
    }
    echo $res;
    mysqli_close($conn);
?>