// import xlsxHelper from '../util/xlsx_helper'
const armor = {
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
// 搞成单例

// export default armor = Util.xlsxHelper()