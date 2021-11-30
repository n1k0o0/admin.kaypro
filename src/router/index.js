import { createWebHistory, createRouter } from 'vue-router'

import Index               from '../pages/Index.vue'
import Login               from '../pages/auth/Login.vue'
import Users               from '@/pages/users/Index.vue'
import UserEdit            from '@/pages/users/Edit.vue'
import InternalUsers       from '@/pages/internal-users/Index.vue'
import InternalUsersCreate from '@/pages/internal-users/Create.vue'
import InternalUsersEdit   from '@/pages/internal-users/Edit.vue'
import Trainings           from '@/pages/trainings/Index.vue'
import TrainingsEdit       from '@/pages/trainings/Edit.vue'
import TrainingsCreate     from '@/pages/trainings/Create.vue'
import Application         from '@/pages/applications/Index.vue'
import ApplicationEdit     from '@/pages/applications/Edit.vue'
import News                from '@/pages/news/Index.vue'
import NewsEdit            from '@/pages/news/Edit.vue'
import NewsCreate          from '@/pages/news/Create.vue'

const routes = [
  { path: '/', name: 'dashboard', component: Index },
  { path: '/login', name: 'auth', component: Login },
  { path: '/users', name: 'users', component: Users },
  { path: '/users/:id', name: 'users-edit', component: UserEdit },
  { path: '/internal-users', name: 'internal-users', component: InternalUsers },
  {
    path     : '/internal-users-create',
    name     : 'internal-users-create',
    component: InternalUsersCreate,
  },
  {
    path     : '/internal-users/:id',
    name     : 'internal-users-edit',
    component: InternalUsersEdit,
  },
  { path: '/trainings', name: 'trainings', component: Trainings },
  {
    path     : '/trainings/:id',
    name     : 'trainings-edit',
    component: TrainingsEdit,
  },
  {
    path     : '/trainings-create',
    name     : 'trainings-create',
    component: TrainingsCreate,
  },
  {
    path     : '/applications',
    name     : 'applications',
    component: Application,
  },
  {
    path     : '/applications/:id',
    name     : 'applications-edit',
    component: ApplicationEdit,
  },
  {
    path     : '/news',
    name     : 'news',
    component: News,
  },
  {
    path     : '/news/:id',
    name     : 'news-edit',
    component: NewsEdit,
  },
  {
    path     : '/news-create',
    name     : 'news-create',
    component: NewsCreate,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
