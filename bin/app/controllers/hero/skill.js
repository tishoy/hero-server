import skill from '../../models/hero/skill'


const init = async (ctx, next) => {
    let req = ctx.request.body
    skill.data.find(req.id, ctx.mongo.db('tishoy_hero'))
}


const query = async (ctx, next) => {
    let req = ctx.request.body
    skill.data.find(req.id, ctx.mongo.db('tishoy_hero'))
}

const learn = async (ctx, next) => {
    let req = ctx.request.body
    skill.data.find(req.id, ctx.mongo.db('tishoy_hero'))
}

const random = async (ctx, next) => {
    let req = ctx.request.body
    skill.data.find(req.id, ctx.mongo.db('tishoy_hero'))
}


export default {
    init,
    query,
    learn,
    random
}