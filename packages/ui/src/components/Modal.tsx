'use client';

import ModalPortal from './ModalPortal';
import Spinner from './Spinner';

type Props = {
  title: string;
  onClose: () => void;
  isLoading?: boolean;
  isOpen?: boolean;
  children?: React.ReactNode;
};

const Modal: React.FC<Props> = ({ title, onClose, isLoading = false, isOpen = false, children }) => {
  return (
    <ModalPortal onClose={onClose} isOpen={isOpen}>
      <div className="bg-slate-800 z-50 rounded-md flex flex-col min-w-[330px] w-min h-min relative text-white">
        {isLoading && (
          <div className="w-full h-full absolute rounded-md flex justify-center items-center backdrop-blur-[1.5px]">
            <Spinner />
          </div>
        )}
        <h4 className="text-base border-b py-3 px-6 mb-4">{title}</h4>
        {children}
      </div>
    </ModalPortal>
  );
};

export default Modal;
