import Router from 'koa-router'
import Player from '../controllers/player'
const router = Router({ prefix: '/player' });

// login
router.get('/login', Player.login)
router.get('/register', Player.register)
router.get('/modify', Player.modify)


module.exports = router