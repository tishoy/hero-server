const data = {
    collection: (db) => {
        return db.collection("skill")
    },

    exist: (name, db) => {
        return db.collection("skill").count({ name: name }) > 0
    },

    // 查询全部
    query: () => {

    },

    // 查找一个
    find: (id, name) => {
        return db.collection("skill").find()
    },

    insert: (name, db) => {
        db.collection("skill").insert({ name: name })
    },

    update: () => {

    },

    remove: () => {

    }
}

const config = {}


export default {
    data,
    config
}