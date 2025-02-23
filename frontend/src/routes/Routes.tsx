import { createBrowserRouter, RouterProvider } from "react-router";

import { Profile } from "@/pages/Profile";
import { Array } from "@/pages/Array";
import { Arrays } from "@/pages/Arrays";
import * as Register from "@/pages/auth/Register";
import { useAuth } from "@/provider/authProvider";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { Index } from "@/pages/Index";

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/",
      element: <Index />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/arrays",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <Arrays />,
        },
        {
          path: ":id",
          element: <Array />,
        },
      ],
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,

    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
