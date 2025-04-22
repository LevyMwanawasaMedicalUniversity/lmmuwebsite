<?php
// require('fpdf186/fpdf.php');
include('connection.php');

session_start();
$student = $_SESSION['studentid'];

// user table insert variables
$abraham = $_POST['abraham'];
$chibale = $_POST['chibale'];

if($abraham > 0){

    $voter = "UPDATE `voters` SET `candidate`='$abraham',`status`= 1 WHERE `studentid` = '".$student."'";
    $result = $conn->query($voter);

    echo("Vote Successfully Cast!!");
    header("Location: success.php");

}else{
    
    $voter = "UPDATE `voters` SET `candidate`='$chibale',`status`= 1 WHERE `studentid` = '".$student."'";
    $result = $conn->query($voter);

    echo("Vote Successfully Cast!!");
    header("Location: success.php");

}

session_destroy();

?>