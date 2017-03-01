<?php
header('Access-Control-Allow-Origin: *');
require '../connectDB.php';

$idGrup = $_GET['idGrup'];
$new_image_name = urldecode($_FILES["file"]["name"])."_$idGrup.jpg";

move_uploaded_file($_FILES["file"]["tmp_name"], "../imgServer/fotosGrup/".$new_image_name);

?>