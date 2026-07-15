// Modal.tsx
import { type ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export default function Preview_Modal({ isOpen, onClose, children }: ModalProps) {
    const modalRoot = document.getElementById("modal-root") as HTMLElement;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-w-[90%]"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </div>,
        modalRoot
    );
}
