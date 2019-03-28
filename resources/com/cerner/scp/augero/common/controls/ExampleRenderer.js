/*!
 * ${copyright}
 */
sap.ui.define(["jquery.sap.global"],function(){"use strict";var e={};e.render=function(e,t){e.write("<div");e.writeControlData(t);e.addClass("controlSquare");e.addClass("controlSquareRound");e.writeClasses();e.addStyle("width",t.getSize()+"px");e.addStyle("height",t.getSize()+"px");e.writeStyles();e.write(">");e.writeEscaped(t.getText());e.write("</div>")};return e},true);