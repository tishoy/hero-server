import Router from 'koa-router'
import Player from '../controllers/player'
const router = Router({ prefix: '/player' });

// login
router.post('/login', Player.login)
router.post('/session_login', Player.login)
router.post('/logout', Player.logout)
router.post('/register', Player.register)
router.post('/detail', Player.detail)


module.exports = router