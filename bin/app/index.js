const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')
const convert = require('koa-convert')
const mongo = require('koa-mongo')

const index = require('./routes/index')
// 玩家 player
const player = require('./routes/player')
/**
 * 个人能力
 */
import hero from './routes/hero/attribute'
import skill from './routes/hero/skill'
import location from './routes/hero/location'

/**
 * 武器装备
 */
import book from './routes/equip/book'
import armor from './routes/equip/armor'
import weapon from './routes/equip/weapon'
/**
 * 物品
 */
import treasure_map from './routes/item/treasure_map'
import material from './routes/item/material'
import recipe from './routes/item/recipe'
/**
 * 游戏内社交
 */
// npc npc
import npc from './routes/social/npc'
import pet from './routes/social/pet'

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(convert(cors()))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(mongo())

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(player.routes(), player.allowedMethods())
app.use(hero.routes(), hero.allowedMethods())
app.use(skill.routes(), skill.allowedMethods())
app.use(location.routes(), location.allowedMethods())
app.use(book.routes(), book.allowedMethods())
app.use(armor.routes(), armor.allowedMethods())
app.use(weapon.routes(), weapon.allowedMethods())
app.use(treasure_map.routes(), treasure_map.allowedMethods())
app.use(material.routes(), material.allowedMethods())
app.use(npc.routes(), npc.allowedMethods())
app.use(pet.routes(), pet.allowedMethods())

module.exports = app
