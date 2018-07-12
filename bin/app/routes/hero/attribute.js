
import Router from 'koa-router'; 
const router = Router({   prefix: '/attribute' });

import Attribute from '../../controllers/hero/attribute'

// router.get('')
router.post('/grow', Attribute.grow)


module.exports = router