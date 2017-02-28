<?php
    require '../connectDB.php';
    header("Access-Control-Allow-Origin: *");

    $idUsuari = $_GET['idUsuari'];
    $password = $_GET['password'];

	$sql = "SELECT pass FROM usuari WHERE id = $idUsuari AND pass = $password";

	if (mysqli_query($conn, $sql)) {
		$sql = "DELETE FROM usuari WHERE id = $idUsuari"; //també ha de borrar de les altres taules com usuari_gust o usuari_usuari!!!;
		if (mysqli_query($conn, $sql)) {
			echo 1;
		}
		else {
			echo 0;
		}

	}
	else {
		echo 2;
	}
	  mysqli_close($conn);
?>
