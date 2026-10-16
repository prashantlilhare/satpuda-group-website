import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";

/* Home ships in the initial bundle; everything else is split per route. */
const About = lazy(() => import("./pages/About"));
const VisionMission = lazy(() => import("./pages/VisionMission"));
const DirectorMessage = lazy(() => import("./pages/DirectorMessage"));
const BTechPolytechnic = lazy(() => import("./pages/BTechPolytechnic"));
const DEdBEd = lazy(() => import("./pages/DEdBEd"));
const ITI = lazy(() => import("./pages/ITI"));
const School = lazy(() => import("./pages/School"));
const Contact = lazy(() => import("./pages/Contact"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },

      { path: "/about", element: <About /> },
      { path: "/about/vision-mission", element: <VisionMission /> },
      { path: "/about/director-message", element: <DirectorMessage /> },
      /* the principal's message page was retired; old links land on About */
      { path: "/about/principal-message", element: <Navigate to="/about" replace /> },

      { path: "/institutes/btech-polytechnic", element: <BTechPolytechnic /> },
      { path: "/institutes/ded-bed", element: <DEdBEd /> },
      { path: "/institutes/iti", element: <ITI /> },
      { path: "/institutes/school", element: <School /> },

      { path: "/contact", element: <Contact /> },

      { path: "/privacy-policy", element: <Legal kind="privacy" /> },
      { path: "/terms", element: <Legal kind="terms" /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
