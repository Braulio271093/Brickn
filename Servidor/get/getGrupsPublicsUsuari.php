<?php
    require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

	$idUsuari = $_GET['idUsuari'];

    $sql = "SELECT grup.id, grup.nom, grup.foto FROM grup JOIN usuari_grup
            ON grup.id = usuari_grup.idGrup 
            WHERE usuari_grup.idUsuari = $idUsuari AND grup.tipus = 0";
	$resultat = mysqli_query($conn, $sql);
	$res = [];
	$i = 0;

	if (mysqli_num_rows($resultat) > 0) {
		while ($row = mysqli_fetch_row($resultat)) {
            $idGrup = $row[0];
			$sql = "SELECT tema.nom FROM tema JOIN grup_tema ON tema.id = grup_tema.idTema WHERE grup_tema.idGrup = $idGrup";
			$res = mysqli_query($conn, $sql);
			$usuaris = [];
			$j = 0;
			while ($u = mysqli_fetch_row($res)) {
				$usuaris[$j] = $u[0]; //posa usuaris pero són temas, es per poder fer servir el mateix toHtml que els grups privats;
				$j++;
			}
			$numNotificacions = getNotificacions($conn, $idGrup, $idUsuari);
			$str[$i] = ["idGrup" => $row[0], "nomGrup" => $row[1], "fotoGrup" => $row[2], "usuaris" => $usuaris, "notificacions" => $numNotificacions];
			$i++;
		}
		echo json_encode($str);
	}
	else {
		echo 0;
	}
	mysqli_close($conn);

	function getNotificacions($conn, $idGrup, $idUsuari) {
		//obtenir el ultim access;
		$sql = "SELECT ultimaEntrada FROM usuari_grup WHERE idGrup = $idGrup AND idUsuari = $idUsuari";
		$result = mysqli_query($conn, $sql);
		$row =  mysqli_fetch_row($result);
		$dateUltimaEntrada = $row[0];
		
		
		$sql = "SELECT COUNT(*) FROM publicacio WHERE dataPublicacio > '$dateUltimaEntrada' AND idUsuari != $idUsuari AND idGrup = $idGrup";
		$result = mysqli_query($conn, $sql);
		$row =  mysqli_fetch_row($result);
		$numPublicacions = $row[0];
		return $numPublicacions;
	}
?>