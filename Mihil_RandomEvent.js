//=============================================================================
// Mihil_RandomEvent.js
//=============================================================================
// Copyright (c) 2018- Mihiraghi
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
/*:
 * @plugindesc ランダムに会話を表示します
 * @author Mihiraghi
 * @target MZ
 * @Thanks 
 * 
 * @command Activation
 * @text activate random events
 * @desc ランダムイベントを起動します。直下に選択肢を置いてください。
 * 
 * 
 * @help 選択肢を乗っ取ります
 * 
 * 
 * ※コードレビュー歓迎します。
 * Please feel free to throw me Masakari!
 * 
 * Ver1.0.1 PluginManagerEx.registerCommandの書き方を修正
 * Ver1.0.0 配布
 * Ver0.0.0 仮作成
 * 
 */


(function() {
    'use strict';
    
const pluginName = document.currentScript.src.replace(/^.*\/(.*).js$/, function () {
    return arguments[1];
});

PluginManagerEx.registerCommand(document.currentScript, "Activation", function(args){
    this.turnRandomEvent(true)
});

const _Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices
Game_Interpreter.prototype.setupChoices = function(params) {
    _Game_Interpreter_setupChoices.apply(this, arguments)
    this.startRandomEvent()
}

Game_Interpreter.prototype.turnRandomEvent = function(bool){
    this._standbyRandomEvent = bool;
}
Game_Interpreter.prototype.startRandomEvent = function(){
    if(!this._standbyRandomEvent){ return; }
    const choiceListWindow = SceneManager._scene._choiceListWindow
    choiceListWindow._index = this.lotteryRandomEvent()
    choiceListWindow.callOkHandler()

    this.turnRandomEvent(false)
}
Game_Interpreter.prototype.lotteryRandomEvent = function(){
    return Math.rand($gameMessage._choices.length-1)
}


})();
