var db_name_model = "tishoy_hero"
var db_user_model = "db_user_model_value"
var db_pwd_model = "db_pwd_model_value"

conn = new Mongo();
print("按需求修改连接的数据库及认证");
db = conn.getDB(db_name_model);
// db.auth(db_user_model, db_pwd_model);

print("--> init player start")
db.player.insert({ account: "", isVIP: false, password: "", register_time: 0, last_login_time: 0, auto_login_session: "" }, 0, 1);

print("--> init equip")
db.armor.insert({})
db.book.insert({})

// db.player.update({ k: "hall_version_android" }, { $set: { k: "hall_version_android", v: "0.5.0-126", type: "1" } }, true, true);
// db.server_args_config.update({ k: "hall_version_ios" }, { $set: { k: "hall_version_ios", v: "0.5.0-126", type: "1" } }, true, true);
// db.server_args_config.update({ k: "download_share" }, { $set: { k: "download_share", v: "https://show.xlyx.io/package/xingliyouxi/hall/s00/current/show.html", type: "1" } }, true, true);
// db.server_args_config.update({ k: "register_url" }, { $set: { k: "register_url", v: "https://show.xlyx.io/package/xingliyouxi/reg/reg.html", type: "1" } }, true, true);
// db.server_args_config.update({ k: "recharge_code_url" }, { $set: { k: "recharge_code_url", v: "https://www.baidu.com", type: "1" } }, true, true);
// db.server_args_config.update({ k: "hall_download_android" }, { $set: { k: "hall_download_android", v: "https://show.xlyx.io/package/xingliyouxi/hall/s00/current/hall.apk", type: "1" } }, true, true);
// db.server_args_config.update({ k: "hall_download_ios" }, { $set: { k: "hall_download_ios", v: "https://show.xlyx.io/package/xingliyouxi/hall/s00/current/hall.html", type: "1" } }, true, true);
// // db.server_args_config.update({ k: "hall_hotupdate_url_android" }, { $set: { k: "hall_hotupdate_url_android", v: "https://show.xlyx.io/package/xingliyouxi_c/hall/alpha/current/Assets/102/android/Assets/StreamingAssets/", type: "1" } }, true, true);
// // db.server_args_config.update({ k: "hall_hotupdate_url_ios" }, { $set: { k: "hall_hotupdate_url_ios", v: "https://show.xlyx.io/package/xingliyouxi_c/hall/alpha/current/Assets/102/ios/Assets/StreamingAssets/", type: "1" } }, true, true);
// db.server_args_config.update({ k: "recharge_valid_time" }, { $set: { k: "recharge_valid_time", v: "7200", type: "0" } }, true, true);
// db.server_args_config.update({ k: "exchange_valid_time" }, { $set: { k: "exchange_valid_time", v: "7200", type: "0" } }, true, true);
// print("--> update server_args_config end")

// print("--> update notice_config start")
// db.notice_config.update({type:1020}, {$set:{type: NumberInt(1020), language: NumberInt(1), content:"兑换~p个游戏币成功！"}}, true, true);
// print("--> update notice_config end")

// print("--> update id_manager start")
// db.id_manage.update({ "item": 7 }, { $set: { "item": NumberInt(7), "id": NumberInt(0) } }, true, false)
// print("--> update id_manager end")

// print("--> update player_coin_log start")
// db.player_coin_log.update({}, { $set: { "total_return": NumberLong(0) } }, false, true)
// print("--> update player_coin_log end")

// print("--> update player_coin_log_record start")
// db.player_coin_log_record.update({}, { $set: { "record_return": NumberLong(0) } }, false, true)
// print("--> update player_coin_log_record end")

// print("--> update player_coin_block_log start")
// db.player_coin_block_log.update({}, { $set: { "record_return": NumberLong(0) } }, false, true)
// print("--> update player_coin_block_log end")
