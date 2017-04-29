<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");
    $idUsuari = $_GET['idUsuari'];

    $sql = "SELECT event.id, coordX, coordY, icon FROM event
            JOIN grup_publicacions ON grup_publicacions.id = event.id 
            WHERE grup_publicacions.idUsuari = $idUsuari";
    
    $result = mysqli_query($conn, $sql);
    $res = []; //publicacions
    $i = 0;

	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_row($result)) {
            $res[$i] = ["id" => $row[0], "coordX" => $row[1], "coordY" => $row[2], "icon" => $row[3]];
            $i++;
        }
        echo json_encode($res);
    }
    else{
        echo 0;
    }

    mysqli_close($conn);
?>