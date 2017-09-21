import Router from 'koa-router'; 

const router = Router({   prefix: '/location' });

import Code from '../../code'

router.prefix('/clazz')

/**
 * 设立新班级
 * request {session, id:Int, clazz:JSON}
 * response {code}
 */
router.post('/new', async (ctx, next) => {
  let req = ctx.request.body
  ctx.body = {
    code: Code.LOGIC_SUCCESS
  }
})

// /**
//  * 安排考试
//  * request {session, id:Int, exam:}
//  * response {code}
//  */
// router.post('/examing', async (ctx, next) => {
//   let req = ctx.request.body
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

/**
 * 加入班级
 * request {session, id:Int, clazz:Int}
 * response {code}
 */
router.post('/entrance', async (ctx, next) => {
  let req = ctx.request.body
  ctx.body = {
    code: Code.LOGIC_SUCCESS
  }
})

/**
 * 退出班级
 * request {session, id:Int, clazz:Int}
 * response {code}
 */
router.post('/exit', async (ctx, next) => {
  let req = ctx.request.body
  ctx.body = {
    code: Code.LOGIC_SUCCESS
  }
})

module.exports = router
