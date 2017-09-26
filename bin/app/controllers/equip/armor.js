import { armor_data, armor_config } from '../../models/equip/armor'

// 生成新的种类盔甲
const new_armor = () => {

}

const config = async (ctx, next) => {
    ctx.body = await armor_config;
}


const fix = async (ctx, next) => {
    await {
        code: Code.LOGIC_SUCCESS,
        data: ALL_DATA
    }
}

const put_on = async () => {
    if (now_in()) {
        take_off()
    }
}

const take_off = async () => {

}

const now_in = async () => {
    return
}

const armors = async () => {

}

export default {
    config,
    fix,
    now_in,
    put_on,
    take_off,

};