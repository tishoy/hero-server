import Const from '../enum/Const'

import { player_data, player_config } from '../models/player'
import MH from '../utils/mongo_helper'


var getData = (ctx) => {

}

const login = async (ctx, next) => {
    const result = await ctx.mongo.db(Const.db_name).collection('session').insert({ name: 'tishoy' }, 0, 1);
    const userId = result.ops[0]._id.toString();
    console.log(userId)
    var sessions = await ctx.mongo.db(Const.db_name).collection('session').find().toArray();
    ctx.body = JSON.toString({ sessions: sessions });
    console.log(ctx.body)
    // ctx.mongo.db('test').collection('users').remove({
    //   _id: mongo.ObjectId(userId)
    // })
}

const session_login = async (ctx, next) => {

}

const logout = async (ctx, next) => {

}

const register = async (ctx, next) => {
    let req = ctx.request.body
    if (ctx.name === null || ctx.name === "") {

    } else {
        if (player_data.exist(req.name, ctx.mongo.db('tishoy_hero'))) {
            ctx.body = "already exist"
        } else {
            player_data.insert(req.name, ctx.mongo.db('tishoy_hero'))
            // MH.hero.insert
            ctx.body = "success"
        }
    }
}

const detail = async (ctx, next) => {

}


export default {
    login,
    session_login,
    logout,
    register,
    detail
}