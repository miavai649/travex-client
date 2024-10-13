import { ReactNode } from "react";

import Sidebar from "@/src/components/ui/dashboard/Sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="sticky z-50 top-0 lg:h-screen lg:w-72">
        <Sidebar />
      </div>

      <div className="flex-1 z-10 overflow-y-auto lg:p-10 p-5">{children}</div>
    </div>
  );
};

export default DashboardLayout;
