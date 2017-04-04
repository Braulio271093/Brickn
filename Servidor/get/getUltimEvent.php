
<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");
    $idGrup = $_GET['idGrup'];
    $sql = "SELECT event.id, usuari.nomUsuari, usuari.fotoPerfil, 
                   grup_publicacions.dataPublicacio, event.nom, event.descripcio,
                   event.dateStart, event.dateEnd, event.coordX, event.coordY
            FROM grup_publicacions 
            JOIN usuari ON grup_publicacions.idUsuari = usuari.id
            JOIN event ON grup_publicacions.id = event.id
            WHERE grup_publicacions.idGrup = $idGrup
            ORDER BY grup_publicacions.dataPublicacio DESC LIMIT 1";
   $result = mysqli_query($conn, $sql);
	if (mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_row($result);
        $publicacio = ["id" => $row[0], "publicador" => $row[1], "imgPublicador" => $row[2], 
                       "dataPublicacio" => $row[3], "nomEvent" => $row[4], 
                       "descripcioEvent" => $row[5], "dateStart" => $row[6],
                       "dateEnd" => $row[7]], "coordX" => $row[8]], "coordY" => $row[9]];
        echo json_encode($publicacio);
    }
    mysqli_close($conn);
?>
