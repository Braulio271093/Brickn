<?php
header('Access-Control-Allow-Origin: *');

$new_image_name = urldecode($_FILES["file"]["name"]);

move_uploaded_file($_FILES["file"]["tmp_name"], "../imgServer/".$new_image_name);


?>