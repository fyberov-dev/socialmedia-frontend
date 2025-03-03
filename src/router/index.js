import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";
import PostEditView from "@/views/PostEditView.vue";
import ChatsView from "@/views/ChatsView.vue";
import PostView from "@/views/PostView.vue";
import GroupsView from "@/views/group/GroupsView.vue";


const routes = [
    {
        path: "/",
        name: "HomeView",
        component: HomeView
    },
    {
        path: "/auth/register",
        name: "RegisterView",
        component: RegisterView
    },
    {
        path: "/auth/login",
        name: "LoginView",
        component: LoginView
    },
    {
      path: "/profile/:id",
      name: "ProfileView",
      component: ProfileView
    },
    {
        path: "/post/:id",
        name: "PostView",
        component: PostView
    },
    {
        path: "/post/:id/edit",
        name: "PostEditView",
        component: PostEditView
    },
    {
        path: "/chats",
        name: "ChatsView",
        component: ChatsView
    },
    {
        path: "/groups",
        name: "GroupsView",
        component: GroupsView
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});