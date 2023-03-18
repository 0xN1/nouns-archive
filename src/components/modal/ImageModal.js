// image modal component
const ImageModal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div
            className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-black bg-opacity-25 p-10 backdrop-blur-sm"
            onClick={handleClose}
        >
            <div className="w-3/4">{children}</div>
        </div>
    )
}

export default ImageModal
