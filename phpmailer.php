<?php
require 'includes/config.php';
require 'PHPmailer-master/PHPMailerAutoLoad.php';

//fill variables with POST data from form
$fname   = $_POST['firstname'];
$lname   = $_POST['lastname'];
$email   = $_POST['email'];
$comment = $_POST['comment'];

//sanitize function
function sanitize($data) {
	$data = filter_var($data, FILTER_SANITIZE_STRING);
	return $data;
}

//sanitize data
$fname     = sanitize($fname);
$lname     = sanitize($lname);
$comment = sanitize($comment);
$email      = filter_var($email, FILTER_SANITIZE_EMAIL);
$name      = $fname . ' ' . $lname;

//instantiate PHPmailer
$mail = new PHPmailer;
$mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 2;

//debug is html friendly
$mail->Debugoutput = 'html';

//hostname of mail server 
$mail->Host = MAIL_HOST;
// PHPmailer suggests using
// $mail->Host = gethostbyname('smtp.gmail.com');
// if your network does not support SMTP over IPv6

$mail->Port = MAIL_PORT;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
$mail->Username = MAIL_USER;
$mail->Password = MAIL_PASS;

//Set who the message is to be sent from
$mail->setFrom($email, $name);

//Set an alternative reply-to address
$mail->addReplyTo($email, $name);

//Set who the message is to be sent to
$mail->addAddress(MAIL_ADDR, 'first last');

//Set the subject line
$mail->Subject = 'New message via PHPmailer';

//comment from form
$mail->Body = $comment;

//Attach an  image file
$mail->addAttachment('images/phpmailer_mini.png');

//sends message and checks for errors. 
//Since form uses Ajax, echos wont be displayed in browser.
if(!$mail->send()) {
    echo "mailer error" . $mail->ErrorInfo;
} else {
    echo "message sent!";
}

?>