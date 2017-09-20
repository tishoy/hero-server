import player_data from '../models/player'
import MH from '../utils/mongo_helper'


var getData = (ctx) => {

}

const login = async (ctx, next) => {
    const result = await ctx.mongo.db('test').collection('users').insert({ name: 'tishoy' }, 0, 1);
    const userId = result.ops[0]._id.toString();
    console.log(userId)
    ctx.body = await ctx.mongo.db('test').collection('users').find().toArray();
    console.log(ctx.body)
    // ctx.mongo.db('test').collection('users').remove({
    //   _id: mongo.ObjectId(userId)
    // })
}

const register = async (ctx, next) => {
    let req = ctx.request.body
    if (ctx.name === null || ctx.name === "") {

    } else {
        if (MH.player.exist(req.name, ctx.mongo.db('tishoy_hero'))) {
            ctx.body = "already exist"
        } else {
            MH.player.insert(req.name, ctx.mongo.db('tishoy_hero'))
            ctx.body = "success"
        }
    }
}


export default {
    register,
    login
}