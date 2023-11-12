import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';

Vue.use(VueRouter);
const routes = [
    {
        path:'/login',
        name:'LoginForm',
        component: LoginForm,
        meta:{public: true} //mark this route as public
    },
    {
        path:'/register',
        name:'Register',
        component: RegisterForm,
        meta:{public: true} //mark this route as public
    },

];

const router = new VueRouter({
    mode: "history",
    routes,
  });

router.beforeEach((to, from, next)=> {
    const isAuthenticated = !!localStorage.getItem('token');

    if (!isAuthenticated && !to.meta.public){
        next('/login');
    }else{
        next();
    }
});
export default router;