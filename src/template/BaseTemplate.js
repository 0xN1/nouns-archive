export default function BaseTemplate({ children, ...props }) {
    return (
        <div className="flex w-full flex-col items-center justify-between">
            {children}
        </div>
    )
}
