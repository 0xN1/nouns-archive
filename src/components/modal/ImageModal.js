import { motion as m } from 'framer-motion'

// image modal component
const ImageModal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-black bg-opacity-25 p-10 backdrop-blur-sm"
            onClick={handleClose}
        >
            <div className="w-11/12">{children}</div>
        </m.div>
    )
}

export default ImageModal
