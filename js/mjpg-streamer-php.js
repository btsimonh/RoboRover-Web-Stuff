/* Copyright (C) 2007 Richard Atterer, richardİatterer.net
   This program is free software; you can redistribute it and/or modify it
   under the terms of the GNU General Public License, version 2. See the file
   COPYING for details. */

var imageNr = 0; // Serial number of current image
var finished = new Array(); // References to img objects which have finished downloading

function createImageLayer() {
  var img = new Image();
  img.style.position = "absolute";
  img.style.zIndex = -1;
  img.onload = imageOnload;
  img.src = window.location.protocol+'//' + window.location.host + "/robot/webcam.php" + "?action=snapshot&n=" + (++imageNr);;
  var webcam = document.getElementById("webcam");
  img.style.width = webcam.style.width;
  img.style.height = webcam.style.height;
  webcam.insertBefore(img, webcam.firstChild);
}

// Two layers are always present (except at the very beginning), to avoid flicker
function imageOnload() {
  this.style.zIndex = imageNr; // Image finished, bring to front!
  while (1 < finished.length) {
    var del = finished.shift(); // Delete old image(s) from document
    del.parentNode.removeChild(del);
  }
  finished.push(this);
  createImageLayer();
}