import { forwardRef, useEffect } from 'react'

const SearchBar = forwardRef(({ handleSearch }, ref) => {
    useEffect(() => {
        const handleKeyPress = (e) => {
            // If Cmd/Ctrl + K is pressed, focus on the search input
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                ref.current.focus()
            }
        }

        document.addEventListener('keydown', handleKeyPress)
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [ref])

    return (
        <div className="mb-8 flex w-1/2 flex-col items-center gap-4">
            <input
                className="mx-2 w-full rounded-xl border-2 border-black bg-transparent p-2"
                type="text"
                placeholder="Search here"
                onChange={handleSearch}
                ref={ref}
            />
        </div>
    )
})

SearchBar.displayName = 'SearchBar'

export default SearchBar
