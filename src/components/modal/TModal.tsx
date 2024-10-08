"use client";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { ReactNode } from "react";

type TSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "full";

interface IProps {
  buttonText: string;
  title: string;
  children: ReactNode | ((closeModal: () => void) => ReactNode);
  buttonVariant?:
    | "light"
    | "solid"
    | "bordered"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  buttonClassName?: string;
  icon?: ReactNode;
  size?: TSize;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

export default function TModal({
  buttonText,
  title,
  children,
  size = "md",
  color,
  buttonVariant = "light",
  buttonClassName,
  icon,
}: IProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const closeModal = () => {
    onClose();
  };

  return (
    <>
      <Button
        className={buttonClassName}
        color={color}
        startContent={icon}
        variant={buttonVariant}
        onPress={onOpen}
      >
        {buttonText}
      </Button>
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        placement="center"
        scrollBehavior={"inside"}
        size={size}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                {typeof children === "function"
                  ? children(closeModal)
                  : children}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
