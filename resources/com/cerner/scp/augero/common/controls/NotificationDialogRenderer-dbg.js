sap.ui.define([],
	function () {
		"use strict";

		/**
		 * Example renderer.
		 * @namespace
		 */
		var NotificationDialogRenderer = {};

		/**
		 * Renders the HTML for the control, using the provided {@link sap.ui.core.RenderManager}.
		 *
		 * @param {sap.ui.core.RenderManager} oRm RenderManager object
		 * @param {sap.ui.core.Control} oControl An object representation of the control that will be rendered
		 */
		NotificationDialogRenderer.render = function (oRm, oControl) {

			oRm.write("<div");
			oRm.writeControlData(oControl);

			oRm.addClass("controlNotificationDialog");
			

			oRm.writeClasses();

			if (oControl) {
				oRm.addStyle("width", oControl.getSize() + "px");
				oRm.addStyle("height", oControl.getSize() + "px");
				oRm.writeStyles();
			}

			oRm.write(">");

			oRm.writeEscaped(oControl.getText());

			oRm.write("</div>");
		};

		return NotificationDialogRenderer;

	}, /* bExport= */ true);