import Router from 'koa-router'; 
const router = Router({   prefix: '/' });

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    test: 'Oh It’s Working!'
  })
})

router.get('/test', async (ctx, next) => {
  ctx.body = 'Oh It’s Working!'
})

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

router.post('/routes', async (ctx, next) => {
  console.log(ctx.request)
  console.log(ctx.request.body)
  let addr = "http://localhost:3008/"
  ctx.body = {
    
  }
})

module.exports = router
