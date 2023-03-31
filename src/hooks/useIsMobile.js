import { useState, useEffect } from 'react'

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 768) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize)

            handleResize() // Check on initial render

            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }
    }, [])

    return isMobile
}

export default useIsMobile
