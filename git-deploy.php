<?php
chdir('/home/docs.vexmacloud.com/public_html');
$output = shell_exec('git pull origin main 2>&1');
echo "<pre>$output</pre>";
?>
