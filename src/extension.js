"use strict";
exports.__esModule = true;
var sortProperties_1 = require("./commands/sortProperties");
function activate(context) {
    context.subscriptions.push(sortProperties_1["default"]);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
