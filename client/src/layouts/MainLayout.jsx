import Sidebar from "../components/Sidebar";
import {Outlet} from "react-router-dom";
import WelcomeBanner from "../components/WelcomeBanner";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-neutral-50 text-gray-900">
      <Sidebar />

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <WelcomeBanner />
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;