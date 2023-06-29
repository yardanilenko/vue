import { createRouter,createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import PaymentsList from '../components/PaymentList.vue'

const routes = [
    {path: '/', name: 'HelloWorld', component: HelloWorld},
    {path: '/payment', name: 'PaymentsList', component: PaymentsList}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router