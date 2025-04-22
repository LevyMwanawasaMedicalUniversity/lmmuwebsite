<?php
// require('fpdf186/fpdf.php');
include('connection.php');

// user table insert variables
$email = $_POST['email'];
$hashed_password = md5($_POST["password"]);
$account = "";

// select from users table
$sql = "SELECT * FROM users where email = '".$email."'";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        session_start();
        $password = $row['password'];
        if($hashed_password == $password){

            $update = "Update users SET lastlogin =CURDATE() where email = '".$email."'";
            $result2 = $conn->query($update);

            $sql2 = "SELECT * FROM users where email = '".$email."'";
            $result3 = $conn->query($sql2);
            if ($result3->num_rows > 0) {
                while ($row2 = $result3->fetch_assoc()) {
                    $_SESSION['account'] = $row2['accounttype'];
                    $_SESSION['email'] = $email;
                    $_SESSION['fname'] = $row['fname'];
                    $_SESSION['lname'] = $row['lname'];
                }
            }

            header("Location: home.php");
        }else{
            echo("Login Unsuccessful");
            header("Location: loginfail.php");
        }        
    }

}else{
    echo("Account Does not Exist");
    header("Location: loginfail.php");
}
?>