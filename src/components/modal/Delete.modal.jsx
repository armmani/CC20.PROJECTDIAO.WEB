function DeleteModal({
  isOpen,
  onConfirm,
  onCancel,
  title = "Confirm Delete",
  message = "Confirm Delete?",
}) {
  return (
    <dialog open={isOpen} className="modal bg-transparent" onClose={onCancel}>
      <div className="modal-box bg-[#2A1D13] border border-[#3E2B20]">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onCancel}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-[#CD7438]">{title}</h3>
        <p className="py-4 text-[#98735B]">{message}</p>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn bg-[#CD7438] text-[#2A1D13]"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default DeleteModal;
