export default function CardWrapper({ children, className }) {
    return (
        <div className={`p-4 ${className}`}>
            <div className="grid-rows grid justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {children}
            </div>
        </div>
    )
}
