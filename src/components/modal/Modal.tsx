import React, { useEffect, useContext } from "react";
import { Context } from "../../store/ContextProvider";
import ReactPortal from "./ReactPortal";
import Image from "next/image";
import { Loading } from "../../components/ui";

interface ModalProps {
  children: JSX.Element;
  isOpen: boolean;
  handleClose: () => void;
}

export const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
  const { loadingModal } = useContext(Context);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <div className="fixed top-0 left-0 w-screen h-screen z-30 bg-neutral-800 opacity-50" />
        <div className="fixed rounded z-40 overflow-hidden bg-neutral-800 bg-opacity-90 w-[600px] left-1/2 ml-[-300px] top-[10%] pt-3 pb-20 px-3">
          <div className="flex flex-row-reverse mb-9">
            <button onClick={handleClose}>
              <Image
                className="opacity-90	hover:opacity-100"
                src="/close.svg"
                alt="close"
                width={25}
                height={25}
              />
            </button>
          </div>
          <div>
            {children}
            {loadingModal && (
              <Loading width={42} height={42} className="mx-auto mt-5" />
            )}
          </div>
        </div>
      </>
    </ReactPortal>
  );
};

export default Modal;
