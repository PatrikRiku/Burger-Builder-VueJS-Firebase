import Home from './components/Home'
import Error from './components/404.vue'
import BurgerOrder from './components/BurgerOrder.vue'
import ChefAdmin from './components/ChefAdmin.vue'

const routes = [
    {path: '/', component: Home, name: 'home'},
    {path: '/burgerorder', component: BurgerOrder, name: 'burgerorder'},
    {path: '/chefadmin', component: ChefAdmin, name: 'chefadmin'},
    {path: '/404', component: Error, name: '404'},
    {path: '*', component: Error, name: '404'}
];

export default routes;