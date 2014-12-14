RoboRover Web GUI
=================

A collection of webpages, php, and Javascript which operate the web interface 
on My RoboRover.

Notable items:
==============
webcam.php:
php to passthrough requests against a webserver (lighttpd) for mjpeg-streamer.
(allows a single port 80 to be used with web pages and mjpeg-streamer).

control.php:
pass HTTP get requests to the RoboRover control program -
allows the control program to be controlled via std port 80, redirected by php
in a webserver (lighttpd).

js/javascript.js or javascript-php.js:
directs control tot he right locations, and updates sensor information display.

livebots/
separate display and control html files for use in LiveBots (with frame based).

