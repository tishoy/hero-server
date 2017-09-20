import Router from 'koa-router'
import Player from '../controllers/player'
const router = Router({ prefix: '/player' });

// login
router.get('/login', Player.login)
router.get('/register', Player.register)


// logout
router.get('/mongo', async (ctx, next) => {
    const result = await ctx.mongo.db('test').collection('users').insert({ name: 'tishoy' }, 0, 1);
    const userId = result.ops[0]._id.toString();
    console.log(userId)
    ctx.body = await ctx.mongo.db('test').collection('users').find().toArray();
    console.log(ctx.body)
    // ctx.mongo.db('test').collection('users').remove({
    //   _id: mongo.ObjectId(userId)
    // })
})

// register

// info

// 

module.exports = router