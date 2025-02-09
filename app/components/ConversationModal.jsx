export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-federal-blue rounded-lg p-4 max-w-md w-full">
        <button className="text-black float-right text-xl font-bold" onClick={onClose}>x</button>
        {children}
      </div>
    </div>
  );
}
