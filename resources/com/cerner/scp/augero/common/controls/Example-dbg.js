/*!
 * ${copyright}
 */
// Provides control com.cerner.scp.augero.common.controls.Example.
sap.ui.define(["jquery.sap.global", "./library", "sap/ui/core/Control"],
	function (jQuery, library, Control) {
		"use strict";
		/**
		 * Constructor for a new Example control.
		 *
		 * @param {string} [sId] id for the new control, generated automatically if no id is given
		 * @param {object} [mSettings] initial settings for the new control
		 *
		 * @class
		 * Some class description goes here.
		 * @extends sap.ui.core.Control
		 *
		 * @author SAP SE
		 * @version 1.4.0
		 *
		 * @constructor
		 * @public
		 * @alias com.cerner.scp.augero.common.controls.Example
		 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
		 */
		var Example = Control.extend("com.cerner.scp.augero.common.controls.Example", {
			metadata: {
				library: "com.cerner.scp.augero.common.controls",
				properties: {
					/**
					 * Sets the size (width/height) for the square
					 */
					size: {
						type: "int",
						defaultValue: 50
					},
					/**
					 * Sets the text inside the square
					 */
					text: {
						type: "string",
						defaultValue: ""
					}
				}
			},
		});
		return Example;
	}, /* bExport= */ true);