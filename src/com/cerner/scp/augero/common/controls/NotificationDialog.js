sap.ui.define([
        'sap/m//Button',
        'sap/m//Dialog',
        'sap/m//Text',
        'sap/ui/core/IconPool',
        'sap/ui/core/ElementMetadata',
        'sap/ui/core/library',
        'sap/ui/core/Control',
        'sap/m/library',
        "sap/ui/thirdparty/jquery",
        "sap/ui/core/theming/Parameters"
    ],
    function (
        Button,
        Dialog,
        Text,
        IconPool,
        ElementMetadata,
        coreLibrary,
        Control,
        library,
        jQuery,
        Parameters
    ) {
        "use strict";

        // shortcut for sap.m.DialogType
        var DialogType = library.DialogType;

        // shortcut for sap.ui.core.TextDirection
        var TextDirection = coreLibrary.TextDirection;

        /*
         * @namespace
         * @alias NotificationDialog
         */
        var NotificationDialog = {};

        /**
         * Enumeration of supported actions in a NotificationDialog.
         *
         * Each action is represented as a button in the notification dialog. The values of this enumeration are used for both,
         * specifying the set of allowed actions as well as reporting back the user choice.
         * @enum {string}
         * @public
         */
        NotificationDialog.Action = {
            /**
             * Adds a "Cancel" button to the message box.
             * @public
             */
            CANCEL: "CANCEL",
            /**
             * Adds a "Discard" button to the notification dialog.
             * @public
             */
            DISCARD: "DISCARD",

            /**
             * Adds a "Save" button to the notification dialog.
             * @public
             */
            SAVE: "SAVE"
        };

        /**
         * Enumeration of the pre-defined icons that can be used in a NotificationDialog.
         * @enum {string}
         * @public
         */
        NotificationDialog.Icon = {
            /**
             * Shows no icon in the notification dialog.
             * @public
             */
            NONE: undefined,

            /**
             * Shows the information icon in the notification dialog.
             * @public
             */
            INFORMATION: "INFORMATION",

            /**
             * Shows the warning icon in the notification dialog.
             * @public
             */
            WARNING: "WARNING",

            /**
             * Shows the error icon in the notification dialog.
             * @public
             */
            ERROR: "ERROR",

            /**
             * Shows the success icon in the notification dialog.
             * @public
             */
            SUCCESS: "SUCCESS",

            /**
             * Shows the question icon in the notification dialog.
             * @public
             */
            QUESTION: "QUESTION"
        };

        (function () {
            //set the information icon according to the used theme
            var bInformationIconUsed = Parameters.get("_sap_m_Message_Box_Information_Icon") === "true",
                sSrcIcon = bInformationIconUsed ? "message-information" : "hint",
                mClasses = {
                    "INFORMATION": "NotificationDialogInfo",
                    "WARNING": "NotificationDialogWarning",
                    "ERROR": "sNotificationDialogError",
                    "SUCCESS": "NotificationDialogSuccess",
                    "QUESTION": "NotificationDialogQuestion",
                    "STANDARD": "NotificationDialogStandard"
                },
                mIcons = {
                    "INFORMATION": IconPool.getIconURI(sSrcIcon),
                    "WARNING": IconPool.getIconURI("message-warning"),
                    "ERROR": IconPool.getIconURI("message-error"),
                    "SUCCESS": IconPool.getIconURI("message-success"),
                    "QUESTION": IconPool.getIconURI("question-mark")
                };

            var _verifyBundle = function () {
                if (NotificationDialog._rb !== sap.ui.getCore().getLibraryResourceBundle("com.cerner.scp.augero.common.controls.i18n")) {
                    NotificationDialog._rb = sap.ui.getCore().getLibraryResourceBundle("com.cerner.scp.augero.common.controls.i18n");
                }
            };

            /* Creates and displays an sap.m.Dialog with type com.cerner.scp.augero.common.controls.NotificationDialog with the given text, title, buttons, and actions.
             * After the user has tapped a button, the <code>onClose</code> function is invoked when given.
             *
             * The only mandatory parameter are <code>vMessage</code> and inside the mOptions the <code>title</code>,<code>actions</code>.
             *
             * <pre>
             * NotificationDialog._show("This message should appear in the message box", {
             *     icon: NotificationDialog.Icon.NONE,                    // default
             *     title: "",                                           // default
             *     actions: [],                                         // mandatory
             *     onClose: null,                                       // default
             *     styleClass: "",                                      // default
             *     initialFocus: null,                                  // default
             *     textDirection: sap.ui.core.TextDirection.Inherit     // default
             * });
             * </pre>
             *
             * The created dialog is executed asynchronously. When it has been created and registered for rendering,
             * this function returns without waiting for a user reaction.
             * */
            NotificationDialog._show = function (vMessage, mOptions) {
                var oDialog, oMessageText, vMessageContent, oResult = null,
                    aButtons = [],
                    i,
                    mDefaults = {
                        id: ElementMetadata.uid("mbox"),
                        initialFocus: null,
                        textDirection: TextDirection.Inherit,
                        verticalScrolling: true,
                        horizontalScrolling: true,
                        details: "",
                        contentWidth: null
                    };

                _verifyBundle();

                mOptions = jQuery.extend({}, mDefaults, mOptions);

                // normalize the vActions array
                if (typeof mOptions.actions !== "undefined" && !Array.isArray(mOptions.actions)) {
                    mOptions.actions = [mOptions.actions];
                }

                /** creates a button for the given action */

                function button(sAction) {
                    if (NotificationDialog.Action && sAction) {
                        var sText;

                        // Don't check in ResourceBundle library if the button is with custom text
                        if (NotificationDialog.Action.hasOwnProperty(sAction)) {
                            sText = NotificationDialog._rb.getText("NTFDIAG_" + sAction);
                        }

                        var oButton = new Button({
                            id: ElementMetadata.uid("ntf-btn-" + sAction.toLowerCase()),
                            text: sText || sAction,
                            press: function () {
                                oResult = sAction;
                                oDialog.close();
                            }
                        });
                        return oButton;
                    }
                }

                if (mOptions.actions) {
                    for (i = 0; i < mOptions.actions.length; i++) {
                        aButtons.push(button(mOptions.actions[i]));
                    }
                } else {
                    throw new Error("Please provide at least one action");
                }

                function onClose() {
                    if (typeof mOptions.onClose === "function") {
                        mOptions.onClose(oResult);
                    }
                    oDialog.detachAfterClose(onClose);
                    oDialog.destroy();
                }

                function getInitialFocusControl() {
                    var i = 0;
                    var oInitialFocusControl = null;
                    if (mOptions.initialFocus) {
                        if (mOptions.initialFocus instanceof Control) { //covers sap.m.Control cases
                            oInitialFocusControl = mOptions.initialFocus;
                        }

                        if (typeof mOptions.initialFocus === "string") { //covers string and NotificationDialog.Action cases
                            for (i = 0; i < aButtons.length; i++) {
                                if (NotificationDialog.Action.hasOwnProperty(mOptions.initialFocus)) {
                                    if (NotificationDialog._rb.getText("NTFDIAG_" + mOptions.initialFocus).toLowerCase() === aButtons[i].getText().toLowerCase()) {
                                        oInitialFocusControl = aButtons[i];
                                        break;
                                    }
                                } else if (mOptions.initialFocus.toLowerCase() === aButtons[i].getText().toLowerCase()) {
                                    oInitialFocusControl = aButtons[i];
                                    break;
                                }
                            }
                        }
                    }
                    return oInitialFocusControl;
                }

                if (vMessage || vMessage !== "") {
                    if (typeof (vMessage) === "string") {
                        vMessageContent = new Text({
                            textDirection: mOptions.textDirection
                        }).setText(vMessage).addStyleClass("sapMMsgBoxText");

                        oMessageText = vMessageContent;
                    } else {
                        throw new Error("Message needs to be from type string");
                    }

                } else {
                    throw new Error("Please provide message");
                }

                function onOpen() {
                    if (sap.ui.getCore().getConfiguration().getAccessibility()) {
                        oDialog.$().attr("role", "alertdialog");
                    }
                }

                oDialog = new Dialog({
                    id: ElementMetadata.uid("notificationDialog-" + mOptions.id),
                    type: DialogType.Message,
                    title: mOptions.title,
                    content: vMessageContent,
                    icon: mIcons[mOptions.icon],
                    initialFocus: getInitialFocusControl(),
                    verticalScrolling: mOptions.verticalScrolling,
                    horizontalScrolling: mOptions.horizontalScrolling,
                    afterOpen: onOpen,
                    afterClose: onClose,
                    buttons: aButtons,
                    ariaLabelledBy: oMessageText ? oMessageText.getId() : undefined,
                    contentWidth: mOptions.contentWidth
                });

                if (mClasses[mOptions.icon]) {
                    oDialog.addStyleClass(mClasses[mOptions.icon]);
                } else {
                    oDialog.addStyleClass(mClasses.STANDARD);
                }

                if (mOptions.styleClass) {
                    oDialog.addStyleClass(mOptions.styleClass);
                }

                oDialog.open();
            };

            /* Creates and displays an sap.m.Dialog with type com.cerner.scp.augero.common.controls.NotificationDialog with the given message,
             * 3 buttons [NotificationDialog.Action.CANCEL, NotificationDialog.Action.DISCARD, NotificationDialog.Action.SAVE], and the title "Unsaved changes".
             *
             * After the user has tapped a button, the <code>onClose</code> function is invoked when given.
             *
             * The only mandatory parameter is <code>vMessage</code>. That needs to te of type string.
             *
             * <pre>
             * NotificationDialog.unsavedChanges("This message should appear in the message box", {
             *     id: "boxId",                                         // optional
             * });
             * </pre>
             *
             * The created dialog is executed asynchronously. When it has been created and registered for rendering,
             * this function returns without waiting for a user reaction.
             * */
            NotificationDialog.unsavedChanges = function (vMessage, mOptions) {
                _verifyBundle();
                var mDefaults = {
                    icon: NotificationDialog.Icon.WARNING,
                    title: NotificationDialog._rb.getText("NTFDIAG_UNSAVED_CHANGES_TITLE"),
                    actions: [NotificationDialog.Action.CANCEL,
                        NotificationDialog.Action.DISCARD,
                        NotificationDialog.Action.SAVE
                    ],
                    initialFocus: null
                };
                mOptions = jQuery.extend({}, mDefaults, mOptions);
                return NotificationDialog._show(vMessage, mOptions);
            };
        }());
        return NotificationDialog;
    }, /* bExport= */ true);