import { useRouter } from 'next/router'
// import PropSinglePage from '@/components/prop/PropSinglePage'

const Proposal = () => {
    const router = useRouter()
    const { id } = router.query

    // return <PropSinglePage propId={id} />
    return (
        <div>
            <h1>Proposal {id}</h1>
        </div>
    )
}

export default Proposal
