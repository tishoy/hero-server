export default {
    is_win: (choose, pool) => {
        return choose < Math.floor(Math.random() * pool)
    },
    win: (list) => {
        return list[Math.floor(Math.random() * list.length)]
    },
    random2: (list) => {
        let first = Math.floor(Math.random() * list.length)
        let second = Math.floor(Math.random() * (list.length - 1))
        return [list[first], list[second >= first ? second + 1 : second]]
    },
    randomn: async (list, n) => {
        if (n >= list.length) {
            return list
        }
        var result = [];
        for (var i = 0; i < n && n > 0; i++) {
        }
        return result;
    }
}