import Router from 'koa-router'; const router = Router({   prefix: '/articles' });
const fs = require("fs")

import Code from '../../code'


router.prefix('/users')

/**
 * 用户名可用接口
 * request {account:String, password:String, type:Int}
 * response {code}
 */
router.post('/available', function (ctx, next) {
  let req = ctx.request.body
  console.log(ctx.request)
  if (req.account === "tishoy" && req.password === "hantishoy123" && req.type === 1) {
    ctx.body = { code: Code.LOGIC_SUCCESS }
  } else {
    ctx.body = { code: 10001, session: "" }
  }
})

/**
 * 注册接口
 * request {account:String, password:String, type:Int}
 * response {code}
 */
router.post('/register', function (ctx, next) {
  let req = ctx.request.body
  console.log(ctx.request)
  if (req.account === "tishoy" && req.password === "hantishoy123" && req.type === 1) {
    ctx.body = { code: Code.LOGIC_SUCCESS, session: "tishoy_1_training" }
  } else {
    ctx.body = { code: 10001, session: "", students: [] }
  }
})

/**
 * 登录接口
 * request {account:String, password:String, type:Int}
 * response {code, session}
 */
router.post('/login', function (ctx, next) {
  let req = ctx.request.body
  console.log(ctx.request)
  if (req.account === "tishoy" && req.password === "hantishoy123" && req.type === 1) {
    ctx.body = {
      code: Code.LOGIC_SUCCESS, session: "tishoy_1_com", data: ALL_DATA
    }
  } else if (req.account === "tishoy" && req.password === "hantishoy123" && req.type === 2) {
    ctx.body = {
      code: Code.LOGIC_SUCCESS, session: "tishoy_1_org", data: ALL_DATA
    }
  } else {
    ctx.body = { code: 10001, session: "", students: [] }
  }
})

/**
 * 获取用户信息接口
 * request {session, base:1, finance:1, express:1, admin:1}
 * response {code, data:JSON}
 */
router.post('/info', function (ctx, next) {
  let req = ctx.request.body
  console.log(ctx.request)
  if (req.base !== undefined) {
    ctx.body = {
      code: Code.LOGIC_SUCCESS,
      data: {

      }
    }
  }
  if (req.finance !== undefined) {
    ctx.body = { code: Code.LOGIC_SUCCESS }
  }
  if (req.express !== undefined) {
    ctx.body = { code: Code.LOGIC_SUCCESS }
  }
  if (req.admin !== undefined) {
    ctx.body = { code: Code.LOGIC_SUCCESS }
  }
})

/**
 * 重置用户信息接口
 * request {session, base:JSON, finance:JSON, express:JSON, admin:JSON}
 * response {code}
 */
router.post('/reset', function (ctx, next) {
  let req = ctx.request.body
  console.log(ctx.request)
  if (req.base !== undefined) {
    ctx.body = { code: Code.LOGIC_SUCCESS }
  }
  if (req.finance !== undefined) {
    ctx.body = { code: Code.LOGIC_SUCCESS }
  }
  if (req.express !== undefined) {
    ctx.body = { code: Code.LOGIC_SUCCESS }
  }
  if (req.admin !== undefined) {
    ctx.body = { code: Code.LOGIC_SUCCESS }
  }
  ctx.body = { code: Code.ERROR_PARAM_KEY }
})

module.exports = router
