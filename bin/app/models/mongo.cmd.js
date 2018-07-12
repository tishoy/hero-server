const data = {

    ensureIndex: (collection,sql) => {
        return collection.ensureIndex(sql)
    },

    exist: (collection, sql) => {
        return collection.count(sql) > 0
    },

    // 查询全部
    query: (collection) => {
        return collection.find()
    },

    // 查找一个
    find: (collection, sql) => {
        return collection.find_one(sql)
    },

    insert: (collection, sql) => {
        return collection.insert(sql)
    },

    update: (collection) => {
        return collection.update(query_sql, { $set: update_sql }, true, false)
    },

    increase: (collection, query_sql, update_sql) => {
        return collection.update(query_sql, { $inc: update_sql }, true, false)
    },

    remove_all:(collection, sql) => {
        return collection.remove(sql, false)
    },

    remove_one: (collection, sql) => {
        return collection.remove(sql, true)
    }
}

const config = {

}

export default {
    data,
}
