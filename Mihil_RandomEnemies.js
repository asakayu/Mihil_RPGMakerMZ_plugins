//=============================================================================
// Mihil_RandomEnemies.js
//=============================================================================
// Copyright (c) 2018- Mihiraghi
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
/*:
 * @plugindesc 敵グループの内容をランダム化します
 * @author Mihiraghi
 * @Thanks 
 * @target MZ
 * 
 * @help 
 * 
 * :記述例
 * ---------
 * [注釈：]random_enemies
 * 100, 1, 1
 * 50, 3, スライム
 * 30, 2, スライム, コウモリ, ネズミ
 * 5, 1, メタルスライム
 * ---------
 * 
 * :書き方
 * 
 * 「敵グループ」の「バトルイベント」のコマンド欄
 * 1ページ目の一番上に
 * 注釈コマンドを挿入します。
 * 1行目に
 * random_enemies
 * と打ちます。
 * 
 * 2行目以降に出現する敵の内容を書きます。
 * コンマ区切りで、
 * 1つめに1～100の出現率%
 * 2つめは出現する敵の最大数
 * 3つめ以降は出現する敵のインデックス番号もしくは
 * 敵の名前そのものを入力します
 * 
 * 百分率, 最大数, ...敵のIDもしくは名前
 * 
 * 角カッコ[]で括る必要はありません(括っても動きはするはず)
 * 
 * 上記記述のように、複数の敵をそれぞれの確率で出現させたり、
 * レアな敵を低確率で出現させることができます。
 * 
 * Ver1.0.0 配布
 * 
 */



function enemiesList(list){
    const firstIndex = list.findIndex(command => command.code === 108 && 
                            command.parameters[0].match(/random_enemies/gi)) + 1;
    if (firstIndex === 0) {// -1+1=0
        return "";
    }
    const lastIndex = list.slice(firstIndex).findIndex(command => command.code !== 408) + 1;
    const pageStr =
        JSON.stringify(
            list.slice(firstIndex, lastIndex).map(command => command.parameters[0])
        )
        // console.log(pageStr)
    const pageList = 
        JSON.parse(
            pageStr
                .replace(/\s/g, "")
                .replace(/[\[\]]/g,"")
                .replace(/^(.+?)$/g,"[$1]")
        ).map(str => str.split(",")
            .map(ele => castTypesStrict(ele))
        )
    return pageList;
}
(function() {
    'use strict';

const _Game_Troop_setup = Game_Troop.prototype.setup
Game_Troop.prototype.setup = function(troopId) {
    this._troopId = troopId;
    const conditionList = enemiesList(this.troop().pages[0].list)
    if(!conditionList){
        _Game_Troop_setup.apply(this, arguments)
        return;
    }

    this._enemies = [];
    for (const conditions of conditionList) {
        const probability = Number(conditions[0]);
        let counta = Number(conditions[1]);
        const enemyIds =  conditions.slice(2)// return enemies id
                            .map(enemyId => 
                                canCastNumberStrict(enemyId)
                                 ? enemyId
                                 : $dataEnemies.find(enemy => enemy?.name === enemyId)?.id
                                 ?? console.error(`enemy does not found`,{enemyId:enemyId, troopId:troopId, conditions:conditions})
                            )
        while (counta > 0) {
            for(const enemyId of enemyIds){
                if(Math.randper(probability)){
                    const x=0;
                    const y=0;
                    const enemy = new Game_Enemy(enemyId, x, y)
                    this._enemies.push(enemy)
                }
            }
            counta--
        }
    }
    
}


})();

