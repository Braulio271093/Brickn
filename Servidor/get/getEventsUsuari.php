<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");
    $idUsari = $_GET['idUsuari'];

    $sql = "SELECT event.id, coordX, coordY FROM event
            JOIN grup_publicacions ON grup_publicacions.id = event.id 
            WHERE idUsuari = $idUsari";
    
    $result = mysqli_query($conn, $sql);
    $res = []; //publicacions
    $i = 0;

	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_row($result)) {
            $res[$i] = ["id" => $row[0], "coordX" => $row[1], "coordY" => $row[2]];
            $i++;
        }
        echo json_encode($res);
    }
    else{
        echo 0;
    }

    mysqli_close($conn);
?>