const data = {
    collection: (db) => {
        return db.collection("player")
    },

    exist: (name, db) => {
        return player.collection(db).count({ name: name }) > 0
    },

    // 查询全部
    query: () => {

    },

    // 查找一个
    find: () => {

    },

    insert: (name, db) => {
        player.collection(db).insert({ name: name })
    },

    update: () => {

    },

    remove: () => {

    }
}

const config = {

}

export default {
    data,
    config
}