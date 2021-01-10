import { createRouter, createWebHistory } from "@ionic/vue-router";

import Contacts from "../views/ViewContacts.vue";

const routes = [
  {
    path: "/",
    redirect: "/contacts",
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: Contacts,
  },
  {
    path: "/contacts/:id",
    component: () => import("../views/ViewContactDetail.vue"),
  },
  {
    path: "/contacts/add",
    component: () => import("../views/ViewContactDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
