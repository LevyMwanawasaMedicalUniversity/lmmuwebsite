//<?php
//$servername = "localhost";
//$username = "mainweb";
//$password = "nanaPrime2006#";
//$db = "voting_db";
// Create connection
//$conn = mysqli_connect($servername, $username, $password,$db);
// Check connection
//if (!$conn) {
 //  die("Connection failed: " . mysqli_connect_error());
//}
//?>




<?php
$servername = "localhost";    // MySQL server running on localhost
$username = "mainweb";        // Replace with your MySQL username
$password = "nanaPrime2006#"; // Replace with your MySQL password
$dbname = "voting_db";        // Replace with the name of your database

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
//echo "Connected successfully";

// Optional: You can also set the character set to UTF-8
mysqli_set_charset($conn, "utf8");
?>
