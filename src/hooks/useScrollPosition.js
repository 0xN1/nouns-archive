import { useEffect } from 'react'

function useScrollPosition(setScroll, scroll) {
    function debounce(func, delay) {
        let timeoutId
        return function (...args) {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(() => {
                func.apply(this, args)
                timeoutId = null
            }, delay)
        }
    }

    useEffect(() => {
        // save scroll position when user scrolls
        const handleScroll = debounce(() => {
            setScroll(window.scrollY)
        }, 100) // adjust the delay as needed

        window.addEventListener('scroll', handleScroll)

        // set scroll position when component mounts
        window.scrollTo(0, scroll)

        // cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [setScroll, scroll])
}

export default useScrollPosition
