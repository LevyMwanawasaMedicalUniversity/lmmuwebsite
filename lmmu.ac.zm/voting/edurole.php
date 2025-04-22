<?php
$servername = "192.168.20.50:3306";
$username = "smbewe";
$password = "uxeLP6-PF[!.PxXL";
$db = "edurole";
// Create connection
$edconn = mysqli_connect($servername, $username, $password,$db);
// Check connection
if (!$edconn) {
   die("Connection failed: " . mysqli_connect_error());
}
?>