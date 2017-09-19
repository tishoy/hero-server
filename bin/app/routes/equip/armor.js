import Router from 'koa-router'
import armor from './controller/armor'
import Code from '../../code'


const router = Router({ prefix: '/armor' })

/**
 * 查询接口
 * request {session, collection:String, sentence:JSON}
 * response {code}
 */
router.post('/', async (ctx, next) => {
    console.log("123");

    let req = ctx.request.body

    ctx.body = {
        code: Code.LOGIC_SUCCESS,
        data: ALL_DATA
    }

})


module.exports = router
