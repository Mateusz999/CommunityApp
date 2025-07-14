import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailsPage from "../../features/activities/details/ActivityDetailsPage";
import Counter from "../../features/counter/Counter";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/account/LoginForm";
import RequireAuth from "./RequireAuth";
import RegisterForm from "../../features/account/RegisterForm";
import ProfilesPage from "../../features/activities/profiles/ProfilePage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />,children: [
                {path: 'activities',element: <ActivityDashboard />},
                {path: 'activities/:id',element: <ActivityDetailsPage />},
                {path: 'createActivity',element: <ActivityForm  key='create'/>},
                {path: 'manage/:id',element: <ActivityForm  />},
                {path: 'counter',element: <Counter  />},
                {path: 'profiles/:id',element: <ProfilesPage  />},
            ]},
            {path: '',element: <HomePage/>},

            {path: 'errors',element: <TestErrors  />},
            {path: 'not-found',element: <NotFound  />},
            {path: 'server-error',element: <ServerError  />},
            {path: 'server-*',element: <Navigate replace to='/not-found' />},
            {path: 'login',element: <LoginForm />},
            {path: 'register',element: <RegisterForm />}
        ]
    }
])