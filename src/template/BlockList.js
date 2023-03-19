// template for BlockList

function BlockList({ children, ...props }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#FBF9F5] p-4 font-inter">
            {children}
        </div>
    )
}

export default BlockList
