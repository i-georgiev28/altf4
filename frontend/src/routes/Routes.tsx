import { createBrowserRouter, RouterProvider } from "react-router";

import {Profile} from '@/pages/Profile';
import {Field} from '@/pages/Field';
import {Fields} from '@/pages/Fields';
import * as Register from '@/pages/auth/Register';
import { useAuth } from "@/provider/authProvider";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { Index } from "@/pages/Index";

const Routes = () => {
    const { token } = useAuth();
  
    // Define public routes accessible to all users
    const routesForPublic = [
      {
        path: "/",
        element: <Index />,
      }
    ];
  
    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
      {
        path: "/fields",
        element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
        children: [
          {
            path: "",
            element: <Fields />,
          },
          {
            path: ":id",
            element: <Field />,
          },
        ],
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ];
    
    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
      {
        path: "/f",
        element: <div>Home Page</div>,
      }
      // {
      //   path: "/login",
      //   element: <LogIn/>,
      // },
    ];
  
    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
      ...routesForPublic,
      ...(!token ? routesForNotAuthenticatedOnly : []),
      ...routesForAuthenticatedOnly,
    ]);
  
    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
  };
  
  export default Routes;