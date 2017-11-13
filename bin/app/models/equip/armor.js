// import xlsxHelper from '../util/xlsx_helper'
export const armor_data = {
    collection: (db) => {
        return db.collection("armor")
    },

    exist: (name, db) => {
        return armor.collection(db).count({ name: name }) > 0
    },

    // 查询全部
    query: () => {

    },

    // 查找一个
    find: () => {

    },

    insert: (name, db) => {
        armor.collection(db).insert({ name: name })
    },

    update: () => {

    },

    remove: () => {

    }
}
export const armor_config = require("../../../config/json/armor.json")