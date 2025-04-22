<?php
// require('fpdf186/fpdf.php');
include('connection.php');

// user table insert variables
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$email = $_POST['email'];
$account = $_POST['account'];
$password = $_POST['password'];
$confirm = $_POST['confirm'];
$hashed_password = md5($_POST["password"]);

if($password == $confirm){

    // select from users table
    $sql = "SELECT * FROM users where email = '".$email."'";
    $result = $conn->query($sql);

    if ($result->num_rows == 0) {
        
        $users = "INSERT INTO users(fname, lname, email, `password`, accounttype, datecreate) VALUES ('$fname', '$lname', '$email', '$hashed_password', '$account', CURDATE())";
        $usersresult = $conn->query($users);

        if($usersresult != null) {
            echo("Account Successfully Created!!");
            header("Location: users.php");
        }else{
            echo("Account Creation Unsuccessful!!");
            header("Location: users.php");
        }

    }else{
        echo("Account already exists!!");
        header("Location: users.php");
    }
}

?>