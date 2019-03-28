/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library com.cerner.scp.augero.common.controls.
 */
sap.ui.define(["jquery.sap.global",
		"sap/ui/core/library"
	], // library dependency
	function ( /*jQuery*/ ) {

		"use strict";

		/**
		 * Custom controls
		 *
		 * @namespace
		 * @name com.cerner.scp.augero.common.controls
		 * @author SAP SE
		 * @version 1.4.0
		 * @public
		 */

		// delegate further initialization of this library to the Core
		sap.ui.getCore().initLibrary({
			name: "com.cerner.scp.augero.common.controls",
			version: "1.4.0",
			dependencies: ["sap.ui.core"],
			types: [],
			interfaces: [],
			controls: [
				"com.cerner.scp.augero.common.controls.Example",
				"com.cerner.scp.augero.common.controls.NotificationDialog"
			],
			elements: []
		});
		/* eslint-disable */
		return com.cerner.scp.augero.common.controls;
		/* eslint-enable */

	}, /* bExport= */ false);