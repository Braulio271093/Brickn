<?php
    require '../connectDB.php';
	require '../funcions/encriptar.php';
    header("Access-Control-Allow-Origin: *");
    $idUsuari = $_GET['idUsuari'];
    $password = $_GET['password']; //pass antiga
    $novaContra = $_GET['novaContra']; //nova contrasenya
	//agafar la clau per comprovar la contrasenya;
	$sql = "SELECT clau, pass FROM usuari WHERE id = $idUsuari";
	$result = mysqli_query($conn, $sql);
	if (mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_row($result);
		$clau = $row[0]; //clau del usuari;
		$passAnticEncriptat = $row[1];
	}
	$resultat = comprobarPassword($clau, $password ,$passAnticEncriptat);

	if ($resultat == 1) {
		$clauNova = crearClau($novaContra);
    	$contrasenyaNova = encriptar($clauNova, $novaContra);
		$sql2 = "UPDATE usuari SET pass = '$contrasenyaNova', clau='$clauNova' WHERE id = $idUsuari";
		if (mysqli_query($conn, $sql2)) {
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