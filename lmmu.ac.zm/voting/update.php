<?php
// require('fpdf186/fpdf.php');
include('connection.php');
include('edurole.php');


// select from users table
$sql = "SELECT * FROM voters";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    // Output data of each row
    $getdata = "SELECT bi.ID, bi.FirstName, bi.MiddleName , bi.Surname
                from `basic-information` bi join 
                `student-study-link` ssl2 on bi.ID = ssl2.StudentID
                where bi.ID not like '240%' AND bi.Status in ('Enrolled','Approved') and
                ssl2.StudyID = 124
                and ssl2.StudentID in (
                select DISTINCT(ce.StudentID)  from `course-electives` ce 
                where ce.`Year` = 2024)";
    $result4 = $edconn->query($getdata);
    if ($result4->num_rows > 0) {
        while ($row2 = $result4->fetch_assoc()) {

            $check = "SELECT * FROM voters where studentid = '".$row2['ID']."'";
            $result = $conn->query($check);

            if ($result->num_rows > 0) {
                continue;
            }else{
                $names ="";
                if($row2['MiddleName'] == ""){
                    $names = $row2['FirstName']." ".$row2['Surname'];
                }else{
                    $names = $row2['FirstName']." ".$row2['MiddleName']." ".$row2['Surname'];
                }
                
                $setdata = "INSERT INTO `voters`(`studentid`, `names`) VALUES ('".$row2['ID']."','$names')";
                $result5 = $conn->query($setdata);
            }
        }
    }

    header("Location: voters.php");
    

}else{

    $getdata = "SELECT bi.ID, bi.FirstName, bi.MiddleName , bi.Surname
                from `basic-information` bi join 
                `student-study-link` ssl2 on bi.ID = ssl2.StudentID
                where bi.ID not like '240%' AND bi.Status in ('Enrolled','Approved') and
                ssl2.StudyID = 124
                and ssl2.StudentID in (
                select DISTINCT(ce.StudentID)  from `course-electives` ce 
                where ce.`Year` = 2024)";
        $result4 = $edconn->query($getdata);
        if ($result4->num_rows > 0) {
            while ($row2 = $result4->fetch_assoc()) {

                $names ="";
                if($row2['MiddleName'] == ""){
                    $names = $row2['FirstName']." ".$row2['Surname'];
                }else{
                    $names = $row2['FirstName']." ".$row2['MiddleName']." ".$row2['Surname'];
                }
                
                $setdata = "INSERT INTO `voters`(`studentid`, `names`) VALUES ('".$row2['ID']."','$names')";
                $result5 = $conn->query($setdata);
            }
        }

        header("Location: voters.php");
}
?>