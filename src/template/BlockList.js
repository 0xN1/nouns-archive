import Footer from '@/components/Footer'
import Header from '@/components/Header'

function BlockList({ children, ...props }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between bg-[#FBF9F5] font-inter">
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default BlockList
