sap.ui.define(["ui5lab/browser/controller/BaseController","ui5lab/browser/model/formatter"],function(e,r,t){"use strict";return e.extend("ui5lab.browser.controller.HomeTable",{formatter:t,onShowLibrary:function(e){var r=e.getSource(),t=r.getBindingContext("homeView").getObject().id;this.getModel("appView").setProperty("/helpVisible",false);this.getRouter().navTo("sampleList",{libraryId:t})}})});