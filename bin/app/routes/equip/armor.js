import Router from 'koa-router'

import armor from '../../controllers/equip/armor'

import Code from '../../code'

const router = Router({ prefix: '/armor' })

router.get('/test', async (ctx, next) => {
    ctx.body = 'Oh It’s Working!'
})

/**
 * 查询接口
 * request {session, collection:String, sentence:JSON}
 * response {code}
 */
router.post('/fix', async (ctx, next) => {
    console.log("123");

    let req = ctx.request.body
    ctx.body = armor.fix(req)
    // ctx.body = {
    //     code: Code.LOGIC_SUCCESS,
    //     data: ALL_DATA
    // }

})


module.exports = router
