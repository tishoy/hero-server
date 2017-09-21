import Router from 'koa-router';
import Skill from '../../controllers/hero/skill'

const router = Router({ prefix: '/skill' })

router.get('/learn', Skill.learn)
router.get('/query', Skill.query)
router.get('/random', Skill.random)

module.exports = router