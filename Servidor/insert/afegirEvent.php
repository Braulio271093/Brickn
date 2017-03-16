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

    $sql = "INSERT INTO grup_publicacions (idGrup, tipus, idUsuari, dataPublicacio) VALUES ($idGrup, 2, $idUsuari, '$date')";
	if (mysqli_query($conn, $sql)) {
		$last_id = mysqli_insert_id($conn);   
        $sql = "INSERT INTO event (id, nom, descripcio, dateStart, dateEnd) 
                VALUES ($last_id, '$Nombre', '$Descripcion', '$fechaInicio', '$fechaFinal')";
        if (mysqli_query($conn, $sql)) {
            $res = 1;        
        }
        else {
            $res = 0;
        }
    }
    else {
        $res = 0;
    }
    echo $res;
    mysqli_close($conn);
?>