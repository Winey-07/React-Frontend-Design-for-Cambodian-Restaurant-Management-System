export default function Modal({ isOpen, title, onClose, children }) {
  if (!isOpen) return null; // don't render anything when closed

  return (
    // Dark overlay behind the modal. Clicking it closes the modal.
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* stopPropagation = clicking INSIDE the white box won't close it */}
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-bold text-[#2C3E50]">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
