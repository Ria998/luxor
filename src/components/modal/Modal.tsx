import React, { useEffect } from "react";
import ReactPortal from "./ReactPortal";

interface ModalProps {
  children: JSX.Element;
  isOpen: boolean;
  handleClose: () => void;
}

export const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
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
        <div className="fixed rounded z-40 overflow-hidden bg-slate-700 w-[600px] left-1/2 ml-[-300px] top-[10%] pt-2 pb-9 px-3">
          <div className="flex flex-row-reverse mb-5">
            <button onClick={handleClose}>Close</button>
          </div>
          <div className="">{children}</div>
        </div>
      </>
    </ReactPortal>
  );
};

export default Modal;
