import Router from 'koa-router'; const router = Router({   prefix: '/articles' });

import Code from '../../code'

router.prefix('/exams')

/**
 * 安排考试
 * request {session, id:Int, exam:}
 * response {code}
 */
router.post('/examing', async (ctx, next) => {
  let req = ctx.request.body
  ctx.body = {
    code: Code.LOGIC_SUCCESS
  }
})

/**
 * 重置用户信息接口
 * request {session, id:Int, self:JSON}
 * response {code}
 */
router.post('/pass', async (ctx, next) => {
  let req = ctx.request.body
  ctx.body = {
    code: Code.LOGIC_SUCCESS
  }
})

/**
 * 重考试
 * request {session, id:Int, self:JSON}
 * response {code}
 */
router.post('/retry', async (ctx, next) => {
  let req = ctx.request.body
  ctx.body = {
    code: Code.LOGIC_SUCCESS
  }
})

/**
 * 给分
 * request {session, id:Int, self:JSON}
 * response {code}
 */
router.post('/score', async (ctx, next) => {
  let req = ctx.request.body
  ctx.body = {
    code: Code.LOGIC_SUCCESS
  }
})

/**
 * 重置用户信息接口
 * request {session, id:Int, self:JSON}
 * response {code}
 */
router.post('/over', async (ctx, next) => {
  let req = ctx.request.body
  ctx.body = {
    code: Code.LOGIC_SUCCESS
  }
})

module.exports = router
