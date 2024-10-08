"use client";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAppDispatch } from "@/src/redux/hook";
import { logout } from "@/src/redux/features/auth/authSlice";
import { useGetCurrentUserQuery } from "@/src/redux/features/auth/authApi";
const NavbarDropdown = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: userData } = useGetCurrentUserQuery({});

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    //  todo: handle protected route
    router.push("/");
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" src={userData?.data?.profileImage} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => handleNavigation("/dashboard/profile")}>
          Dashboard
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={() => handleLogout()}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdown;
