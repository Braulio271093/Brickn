<?php
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

	$nom = $_GET['nom'];

	$sql = "INSERT INTO tema (nom) VALUES ('$nom')";

	if (mysqli_query($conn, $sql)) {	
		$sql = "SELECT id FROM tema WHERE nom = '$nom'";
		$res = mysqli_query($conn, $sql);
		if (mysqli_num_rows($res) > 0) {
			$row = mysqli_fetch_row($res);
			echo json_encode($row[0]);
		}
	}
	else {
		echo 0;
	}
	mysqli_close($conn);

?>
