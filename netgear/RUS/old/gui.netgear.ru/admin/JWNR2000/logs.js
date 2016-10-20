<<<<<<< HEAD
function check_logs_clear(form)
{
form.submit_flag.value="logs_clear";
return true;
}
function check_logs_send(form)
{
if( email_get_notify == '1')
{
form.submit_flag.value="logs_send";
 return true;
}
else
{
alert(log_send_email_off);
return false;
}
}
=======
function check_logs_clear(form)
{
form.submit_flag.value="logs_clear";
return true;
}
function check_logs_send(form)
{
if( email_get_notify == '1')
{
form.submit_flag.value="logs_send";
 return true;
}
else
{
alert(log_send_email_off);
return false;
}
}
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
