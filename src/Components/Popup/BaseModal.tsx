import Modal from "react-modal";
import React from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function BaseModal({ isOpen, onClose, title, children }: BaseModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      appElement={document.getElementById("root")!}
      onRequestClose={onClose}           // يربط الزر × أو الضغط على الخارج
      shouldCloseOnOverlayClick={true}   // يتيح الغلق عند الضغط على الخارج
      className="bg-white z-50 p-6 rounded shadow-lg mx-auto my-4 w-full max-w-4xl h-auto min-h-[80vh] relative"
      overlayClassName="fixed inset-0 bg-black/70 flex justify-center items-start p-4"
    >
      <div className="flex justify-between">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 text-2xl font-bold z-50 cursor-pointer"
        >
          <i className="fa fa-multiply "></i>
        </button>
      </div>
      {children}
    </Modal>
  );
}
