"use client";

import { Drawer, DrawerContent, DrawerBody } from "@heroui/react";
import SideBar from "./SideBar";

const MobileSidebar = ({ isOpen, onOpenChange }) => {
  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="left"
      size="xs"
    >
      <DrawerContent>
        <DrawerBody className="p-0">
          <SideBar collapsed={false} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;
