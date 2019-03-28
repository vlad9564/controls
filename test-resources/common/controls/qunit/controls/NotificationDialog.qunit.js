sap.ui.require([
    "com/cerner/scp/augero/common/controls/NotificationDialog"
], function (NotificationDialog) {
    "use strict";

    QUnit.test("Test the  unsavedChanges method - working properly", function (assert) {

        NotificationDialog.unsavedChanges("message example", {
            id: "testId"
        });

        var oNotificationDialogElement = sap.ui.getCore().byId("__notificationDialog-testId0");

        var sTitle = NotificationDialog._rb.getText("NTFDIAG_UNSAVED_CHANGES_TITLE");
        var oType = sap.m.DialogType.Message;
        var sIcon = "sap-icon://message-warning";
        var sId = "__notificationDialog-testId0";
        var sMessage = "message example";
        var cancelButton = oNotificationDialogElement.getButtons()[0].mProperties.text;
        var discardButton = oNotificationDialogElement.getButtons()[1].mProperties.text;
        var saveButton = oNotificationDialogElement.getButtons()[2].mProperties.text;

        assert.ok(oNotificationDialogElement, "Dialog should be created");

        assert.equal(oNotificationDialogElement.getTitle(), sTitle, "Title is assigned");
        assert.equal(oNotificationDialogElement.getContent()[0].mProperties.text, sMessage, "Message is correct");
        assert.equal(oNotificationDialogElement.getType(), oType, "Dialog should have type Message");
        assert.equal(oNotificationDialogElement.getIcon(), sIcon, "Icon is correct");
        assert.equal(oNotificationDialogElement.sId, sId, "Id is set correct");
        assert.equal(cancelButton, NotificationDialog._rb.getText("NTFDIAG_CANCEL"), "Cancel button exist");
        assert.equal(discardButton, NotificationDialog._rb.getText("NTFDIAG_DISCARD"), "Discard button exist");
        assert.equal(saveButton, NotificationDialog._rb.getText("NTFDIAG_SAVE"), "Save button exist");

        oNotificationDialogElement.close();
        oNotificationDialogElement.destroy();

    });

    QUnit.test("Test _show method with title, 3 buttons and message", function (assert) {

        NotificationDialog._show("second message example", {
            icon: NotificationDialog.Icon.WARNING,
            title: "second title example",
            id: "secondTestId",
            actions: [NotificationDialog.Action.CANCEL,
                NotificationDialog.Action.DISCARD,
                NotificationDialog.Action.SAVE
            ]
        });

        var oNotificationDialogElement = sap.ui.getCore().byId("__notificationDialog-secondTestId0");

        var sTitle = "second title example";
        var oType = sap.m.DialogType.Message;
        var sIcon = "sap-icon://message-warning";
        var sId = "__notificationDialog-secondTestId0";
        var sMessage = "second message example";
        var cancelButton = oNotificationDialogElement.getButtons()[0].mProperties.text;
        var discardButton = oNotificationDialogElement.getButtons()[1].mProperties.text;
        var saveButton = oNotificationDialogElement.getButtons()[2].mProperties.text;

        assert.ok(oNotificationDialogElement, "Dialog should be created");

        assert.equal(oNotificationDialogElement.getTitle(), sTitle, "Title is assigned");
        assert.equal(oNotificationDialogElement.getContent()[0].mProperties.text, sMessage, "Message is correct");
        assert.equal(oNotificationDialogElement.getType(), oType, "Dialog should have type Message");
        assert.equal(oNotificationDialogElement.getIcon(), sIcon, "Icon is correct");
        assert.equal(oNotificationDialogElement.sId, sId, "Id is set correct");
        assert.equal(cancelButton, NotificationDialog._rb.getText("NTFDIAG_CANCEL"), "Cancel button exist");
        assert.equal(discardButton, NotificationDialog._rb.getText("NTFDIAG_DISCARD"), "Discard button exist");
        assert.equal(saveButton, NotificationDialog._rb.getText("NTFDIAG_SAVE"), "Save button exist");

        oNotificationDialogElement.close();
        oNotificationDialogElement.destroy();

    });

    QUnit.test("Test _show method: - message is not string ", function (assert) {
        assert.throws(
            function () {
                NotificationDialog._show(40, {
                    icon: NotificationDialog.Icon.WARNING,
                    title: "4th title example",
                    actions: [NotificationDialog.Action.OK],
                    id: ""
                });
            }, Error("Message needs to be from type string"),
            "Message is not string type"
        );

    });

    QUnit.test("Test _show method: - no buttons", function (assert) {
        assert.throws(
            function () {
                return NotificationDialog._show("Test message", {
                    icon: NotificationDialog.Icon.WARNING,
                    title: "Unsaved changes"
                });
            }, Error("Please provide at least one action"),
            "Please provide at least one action in order to create buttons"
        );
    });

});