<?php
// require('fpdf186/fpdf.php');
include('connection.php');

// user table insert variables
$student = $_POST['student'];

// select from users table
$sql = "SELECT * FROM voters where `status` = 0 and studentid = '".$student."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    
    session_start();
    $_SESSION['studentid'] = $student;
    echo("Account Successfully Validated!!");
    header("Location: voting.php");
}else{
    echo("Invalid Student / Student not Valid to vote!!");
    header("Location: checkfail.php");
}

?>
