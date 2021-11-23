import {createWebHistory, createRouter} from "vue-router"

import Index from "../pages/Index.vue"
import Login from "../pages/auth/Login.vue"
import Users from "@/pages/users/Index.vue"
import UserEdit from "@/pages/users/Edit.vue"
import InternalUsers from "@/pages/internal-users/Index.vue"
import InternalUsersCreate from "@/pages/internal-users/Create.vue"
import InternalUsersEdit from "@/pages/internal-users/Edit.vue"


const routes = [
    {path: "/", name: "dashboard", component: Index},
    {path: "/login", name: "auth", component: Login},
    {path: "/users", name: "users", component: Users},
    {path: "/users/:id", name: "users-edit", component: UserEdit},
    {path: "/internal-users", name: "internal-users", component: InternalUsers},
    {path: "/internal-users-create", name: "internal-users-create", component: InternalUsersCreate},
    {path: "/internal-users-edit/:id", name: "internal-users-edit", component: InternalUsersEdit},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
