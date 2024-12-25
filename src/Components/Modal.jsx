import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ title, children, onOpen, open }) {
  if (!open) return null;

  return (
    <>
      <div onClick={() => onOpen(false)} className="backdrop z-10"></div>
      <div className="modal z-20">
        <div className="modal__header">
          <h2 className="title text-lg font-bold">{title}</h2>
          <button onClick={() => onOpen(false)}>
            <XCircleIcon className="icon close" />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}

export default Modal;
