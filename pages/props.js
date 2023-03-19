import BlockList from '@/template/BlockList'
import PropsCard from '@/components/card/PropsCard'
import Noggles from '@/components/asset/noggles'

export async function getStaticProps() {
    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/6b8443b4ebbc45e881f52cc09d4e1d10',
    )

    const data = await res.json()

    return {
        props: {
            data,
        },
    }
}

const Props = ({ data }) => {
    console.log(data)
    return (
        <BlockList>
            <div className="pt-4"></div>
            <Noggles />
            <h1 className="p-8 font-gibson text-7xl uppercase">
                Funded Proposals
            </h1>
            <div className="p-4">
                <div className="grid-rows grid justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data?.map((prop) => (
                        <PropsCard key={prop.id} prop={prop} />
                    ))}
                </div>
            </div>
        </BlockList>
    )
}

export default Props
