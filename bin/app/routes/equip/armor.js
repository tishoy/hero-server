import Router from 'koa-router'

import Armor from '../../controllers/equip/armor'

import Code from '../../code'

const router = Router({ prefix: '/armor' })

router.get('/config', Armor.config)
router.post('/fix', Armor.fix)

module.exports = router
