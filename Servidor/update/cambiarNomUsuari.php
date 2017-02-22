<?php
    require '../connectDB.php';
	require '../funcions/encriptar.php';
    header("Access-Control-Allow-Origin: *");

    $idUsuari = $_GET['idUsuari'];
    $password = $_GET['password']; //pass introduir per usuari;
    $nouNom = $_GET['nouNom']; //nou nom
	//agafar la clau per comprovar la contrasenya;
	$sql = "SELECT clau, pass FROM usuari WHERE id = $idUsuari";
	$result = mysqli_query($conn, $sql);
	if (mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_row($result); 
		$clau = $row[0]; //clau del usuari;
		$passEncriptat = $row[1];
	}
	$resultat = comprobarPassword($clau, $password ,$passEncriptat);

	if ($resultat == 1) {
		$sql = "UPDATE usuari SET nomUsuari = '$nouNom' WHERE id = $idUsuari";
		if (mysqli_query($conn, $sql)) {
			echo 1;
		}
		else {
			echo 0;
			//echo("Error description: " . mysqli_error($conn));
		}	
	}
	else {
		echo 2;
	}
	mysqli_close($conn);
?>