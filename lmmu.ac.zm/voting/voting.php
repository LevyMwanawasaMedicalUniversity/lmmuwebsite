<?php
// require('fpdf186/fpdf.php');
include('connection.php');

// user table insert variables
session_start();
$student = $_SESSION['studentid'];
$names = "";

// select from users table
$sql = "SELECT * FROM voters where studentid = '".$student."'";
$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {

$names = $row['names'];

}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords"
        content="wrappixel, admin dashboard, html css dashboard, web dashboard, bootstrap 5 admin, bootstrap 5, css3 dashboard, bootstrap 5 dashboard, AdminWrap lite admin bootstrap 5 dashboard, frontend, responsive bootstrap 5 admin template, AdminWrap lite design, AdminWrap lite dashboard bootstrap 5 dashboard template">
    <meta name="description"
        content="AdminWrap Lite is powerful and clean admin dashboard template, inpired from Bootstrap Framework">
    <meta name="robots" content="noindex,nofollow">
    <title>Voting</title>
    <link rel="canonical" href="https://www.wrappixel.com/templates/adminwrap-lite/" />
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicon.png">
    <!-- Bootstrap Core CSS -->
    <link href="assets/node_modules/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="css/style.css" rel="stylesheet">
    <!-- You can change the theme colors from here -->
    <link href="css/colors/default.css" id="theme" rel="stylesheet">
    <!-- Custom Styling -->
    <style>
        html,
        body {
            height: 100%;
        }

        body {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            padding-top: 40px;
            padding-bottom: 40px;
        }

        .error-message {
            color: red;
            display: none;
            margin-top: 10px;
        }

        .image-select {
            display: inline-block;
            margin: 20px;
        }

        .image-select input[type="radio"] {
            display: none;
        }

        .image-select label {
            cursor: pointer;
        }

        .image-select img {
            border: 2px solid transparent;
            max-width: 150px;
            height: auto;
        }

        .image-select input[type="radio"]:checked + label img {
            border-color: green; /* Change this to the color you want for selection */
        }
    </style>
</head>

<body class="fix-header card-no-border fix-sidebar">
    <!-- ============================================================== -->
    <!-- Main wrapper -->
    <!-- ============================================================== -->
    <div id="main-wrapper">
        <!-- ============================================================== -->
        <!-- Page wrapper -->
        <!-- ============================================================== -->
        <div class="page-wrapper">
            <!-- ============================================================== -->
            <!-- Container fluid -->
            <!-- ============================================================== -->
            <div class="container-fluid">
                <!-- ============================================================== -->
                <!-- Start Page Content -->
                <!-- ============================================================== -->
                <!-- Row -->
                <div class="row">
                    <!-- Column -->
                    <div class="col-lg-8 col-xlg-9 col-md-7">
                        <div class="card">
                            <div class="card-body">
                                <form class="form-horizontal form-material mx-2" action="vote.php" method="POST">
                                    
                                            <div class="form-group">
                                                <div class="col-md-12">
                                                <div class="form-group">
                                                <label class="col-md-12">Voter Name</label>
                                                <div class="col-md-12">
                                                    <input type="text" class="form-control form-control-line" value="<?php echo($names);?>" readonly>
                                                </div>
                                            </div>

                                            <!-- Image selection -->
                                            <h4>Select an option:</h4>
                                            
                                            <div class="image-select">
                                                <input type="radio" id="image1" name="abraham" value="1" hidden>
                                                <label for="image1">
                                                    <img src="assets/images/users/abraham.jpg" alt="Image 1"><br>
                                                    Abraham Ngulube
                                                </label>
                                            </div>
                                            
                                            <div class="image-select">
                                                <input type="radio" id="image2" name="chibale" value="2" hidden>
                                                <label for="image2">
                                                    <img src="assets/images/users/chibale2.jpg" alt="Image 2"><br>
                                                    Chibale Mutale
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Submit Button -->
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <button class="btn btn-success" type="submit">Submit</button>
                                            <button class="btn btn-danger" type="button"><a href="studentcheck.php">Cancel</a></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- Column -->
                </div>
                <!-- Row -->
            </div>
            <!-- ============================================================== -->
            <!-- End Container fluid -->
            <!-- ============================================================== -->
        </div>
        <!-- ============================================================== -->
        <!-- End Page wrapper -->
        <!-- ============================================================== -->
    </div>
    <!-- ============================================================== -->
    <!-- End Wrapper -->
    <!-- ============================================================== -->
    <!-- All Jquery -->
    <script src="assets/node_modules/jquery/jquery.min.js"></script>
    <!-- Bootstrap tether Core JavaScript -->
    <script src="assets/node_modules/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>

</html>
