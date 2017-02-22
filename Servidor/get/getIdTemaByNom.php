<?php
	require '../connectDB.php';
	header("Access-Control-Allow-Origin: *");

	$nom = $_GET['nom'];

	$sql = "SELECT id FROM tema WHERE nom = '$nom'";
	$result = mysqli_query($conn, $sql);

	if (mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_row($result);
		echo json_encode(array("idGust" => $row[0]));
	}
	else {
		echo 0;
	}
	mysqli_close($conn);


?>
