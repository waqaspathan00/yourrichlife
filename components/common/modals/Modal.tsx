import React, { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";

type ModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    children: React.ReactNode;
};
export default function Modal({ isModalOpen, setIsModalOpen, children }: ModalProps) {
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="mt-8 flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="inline-block w-11/12 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all lg:w-1/3">
                                <IoClose
                                    size={32}
                                    onClick={() => closeModal()}
                                    className="absolute right-4 top-4 cursor-pointer"
                                />
                                <div className="mt-4 p-4 lg:p-8">{children}</div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
