<?php
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

	$q = $_GET['nom'];

	$sql = "SELECT nom FROM tema WHERE nom LIKE '$q%'";

	$resultat = mysqli_query($conn, $sql);
	$res = array();
	$i = 0;
	if (mysqli_num_rows($resultat) > 0) {
		while ($row = mysqli_fetch_row($resultat)) {
			$res[$i] = $row;
			$i = $i + 1;
		}
		echo json_encode($res);
	}
	else {
		echo 0;
	}

	mysqli_close($conn);



?>
