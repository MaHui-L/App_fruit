import Vue from 'vue'
import VueRouter from 'vue-router'
import CategoryInsert from '../views/category/insert'
import CategoryQuery from '../views/category/query'
import CategoryEdit from '../views/category/Edit'
import GoodsInsert from '../views/goods/insert'
import GoodsQuery from '../views/goods/query'
import GoodsEdit from '../views/goods/Edit'
// import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'mains',
        component: () => import('../views/main/Mains.vue'),
        meta: {title: '甜果后台管理', auth: true},
        children:
            [
                {
                    path: 'categoryadd',
                    name: 'cateInsert', component: CategoryInsert, meta: {title: '商品分类添加', auth: true}
                },
                {
                    path: 'categoryquery',
                    name: 'cateQuery', component: CategoryQuery, meta: {title: '商品分类查看', auth: true}
                },
                {
                    path: 'categoryedit',
                    name: 'cateEdit', component: CategoryEdit, meta: {title: '商品分类修改', auth: true}
                },
                {
                    path: 'goodsadd',
                    name: 'goodsInsert', component: GoodsInsert, meta: {title: '商品添加', auth: true}
                },
                {
                    path: 'goodsquery',
                    name: 'goodsQuery', component: GoodsQuery, meta: {title: '商品查看', auth: true}
                },
                {
                    path: 'goodsedit',
                    name: 'goodsEdit', component: GoodsEdit, meta: {title: '商品修改', auth: true}
                },
            ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue'),
        meta: {title: '甜果APP后台登录'}
    }
];

const router = new VueRouter({
    routes
});

//全局前置守卫
router.beforeEach((to, from, next) => {
    let title = to.meta.title || '甜果生鲜系统';
    document.title = title;//设置每个组件的标题
    if (to.meta.auth) {
        let token = sessionStorage.getItem('token');
        if (token && token != '') {
            next()
        } else {
            next('/login?redirect='+to.name)
        }
    } else {
        next();
    }
});

export default router
