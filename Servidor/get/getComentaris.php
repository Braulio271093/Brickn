<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

    $idPublicacio = $_GET['idPublicacio'];

    $sql = "SELECT usuari.nomUsuari, comentari.comentari, comentari.dataComentari FROM comentari JOIN usuari ON usuari.id = comentari.idUsuari
            WHERE comentari.idPublicacio = $idPublicacio ORDER BY comentari.dataComentari DESC";
    $result = mysqli_query($conn, $sql);
    $comentaris = [];
    $i = 0;

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_row($result)) {
            $comentaris[$i] = ["idUsuari" => $row[0],"comentari" => $row[1], "dataComentari" => $row[2]];
            $i++;
		}
		echo json_encode($comentaris);    
    }
    else {
        echo json_encode($comentaris);
    }
	mysqli_close($conn);
?>