import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Main from "./components/Main/Main";
import PlaneInformation from "./components/PlaneInformation/PlaneInformation";
import NotFound from "./components/NotFound/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<Main />} />
      <Route path="plane-information/:plane" element={<PlaneInformation />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}
