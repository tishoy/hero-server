import Router from 'koa-router';
import Book from '../../controllers/equip/book'

const router = Router({ prefix: '/book' });

import Code from '../../code'

router.get('/test', Book.library)
router.get('/library', Book.library)
router.get('/read', Book.read)
router.post('/borrow', Book.borrow)

module.exports = router
