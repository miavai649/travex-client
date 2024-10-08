import { ReactNode } from "react";

import Sidebar from "@/src/components/ui/dashboard/Sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-start">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 lg:p-10 p-5">{children}</div>
    </div>
  );
};

export default DashboardLayout;
