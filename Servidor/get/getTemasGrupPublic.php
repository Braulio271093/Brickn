<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

    $idGrup = $_GET['idGrup'];

    $sql = "SELECT tema.nom FROM tema JOIN grup_tema ON tema.id = grup_tema.idTema WHERE grup_tema.idGrup = $idGrup";
            
	$resultat = mysqli_query($conn, $sql);
	$res = [];
	$i = 0;

	if (mysqli_num_rows($resultat) > 0) 
    {
		while ($row = mysqli_fetch_row($resultat)) 
        {
            $str[$i] = array("tema" => $row[0]);
			$i++; 
		}
		echo json_encode($str);
	}
	else {
		echo 0;
	}
?>