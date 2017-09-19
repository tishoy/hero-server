import Router from 'koa-router'; const router = Router({   prefix: '/articles' });

import Code from '../../code'

router.prefix('/students')

/**
 * 新增学员
 * request {session, student:JSON}
 * response {code}
 */
router.post('/insert', async (ctx, next) => {
  let req = ctx.request.body
  ctx.body = {
    code: Code.LOGIC_SUCCESS
  }
})

/**
 * 删除学员
 * request {session, id:Int}
 * response {code}
 */
router.post('/remove', async (ctx, next) => {
  let req = ctx.request.body
  ctx.body = {
    code: Code.LOGIC_SUCCESS
  }
})

/**
 * 修改学员基础信息
 * request {session, id:Int, base:JSON}
 * response {code}
 */
router.post('/base', async (ctx, next) => {
  let req = ctx.request.body
  ctx.body = {
    code: Code.LOGIC_SUCCESS
  }
})

/**
 * 修改学员个人信息
 * request {session, id:Int, self:JSON}
 * response {code}
 */
router.post('/self', async (ctx, next) => {
  let req = ctx.request.body
  ctx.body = {
    code: Code.LOGIC_SUCCESS
  }
})

/**
 * 增加学员经历
 * request {session, id:Int, exp:JSON}
 * response {code}
 */
router.post('/addexp', async (ctx, next) => {
  let req = ctx.request.body
  ctx.body = {
    code: Code.LOGIC_SUCCESS
  }
})

/**
 * 删除学员经历
 * request {session, id:Int, exp_id:Int}
 * response {code}
 */
router.post('/delexp', async (ctx, next) => {
  let req = ctx.request.body
  ctx.body = {
    code: Code.LOGIC_SUCCESS
  }
})

module.exports = router
