import { useRouter } from 'next/router'
import PropSinglePage from '@/components/prop/PropSinglePage'

const Proposal = () => {
    const router = useRouter()
    const { pid } = router.query

    return <PropSinglePage propId={pid} />
}

export default Proposal
