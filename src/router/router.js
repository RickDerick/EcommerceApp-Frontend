import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import AddProduct from '@/components/AddProduct';
import ProductList from '@/components/ProductList';
import EditProduct from '@/components/EditProduct'
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

    {
        path:'/add-product',
        name:'AddProduct',
        component: AddProduct,
        meta:{public: false} //mark this route as private
    },
    
    {
        path:'/edit-product:id',
        name:'EditProduct',
        component: EditProduct,
        meta:{public: false} //mark this route as private
    },
    
    {
        path:'/',
        name:'ProductList',
        component: ProductList,
        meta:{public: false} //mark this route as private
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