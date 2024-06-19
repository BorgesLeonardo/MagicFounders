import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../views/UserLogin.vue';
import UserRegister from '../views/UserRegister.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import ResetPassword from '../views/ResetPassword.vue';
import HomePage from '../views/HomePage.vue';
import AllProjects from '../views/AllProjects.vue';
import ProjectDetails from '../views/ProjectDetails.vue';
import CreateProject from '../views/CreateProject.vue';
import EditProject from '../views/EditProject.vue';
import UserProfile from '../views/UserProfile.vue'; 

const routes = [
  { path: '/', name: 'UserLogin', component: UserLogin },
  { path: '/register', name: 'UserRegister', component: UserRegister },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/reset-password/:token', name: 'ResetPassword', component: ResetPassword, props: true },
  { path: '/home', name: 'HomePage', component: HomePage },
  { path: '/projects', name: 'AllProjects', component: AllProjects },
  { path: '/project/:id', name: 'ProjectDetails', component: ProjectDetails },
  { path: '/create-project', name: 'CreateProject', component: CreateProject },
  { path: '/edit-project/:id', name: 'EditProject', component: EditProject, props: true },
  { path: '/profile', name: 'UserProfile', component: UserProfile }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
