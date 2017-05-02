<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");
    $idUsuari = $_GET['idUsuari'];

    $sql = "SELECT event.id, coordX, coordY, icon FROM event
            JOIN grup_publicacions ON event.id = grup_publicacions.id
            JOIN grup ON grup_publicacions.idGrup = grup.id
            JOIN usuari_grup ON grup.id = usuari_grup.idGrup 
            WHERE usuari_grup.idUsuari = $idUsuari AND event.dateEnd >= CURDATE()";

    /*

    SELECT event.id, coordX, coordY, icon FROM event
    JOIN grup_publicacions ON event.id = grup_publicacions.id
    JOIN grup ON grup_publicacions.idGrup = grup.id
    JOIN usuari_grup ON grup.id = usuari_grup.idGrup 
    WHERE usuari_grup.idUsuari = 1 AND event.dateEnd > NOW();


    */
    
    $result = mysqli_query($conn, $sql);
    $res = []; 
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