import Router from 'koa-router'; 
const router = Router({   prefix: '/attribute' });

// router.get('')
router.post('/grow', Attribute.grow)


module.exports = router