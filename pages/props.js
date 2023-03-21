import PropsCard from '@/components/card/PropsCard'
import Noggles from '@/components/asset/noggles'
import BaseTemplate from '@/template/BaseTemplate'
import BackLink from '@/components/page/BackLink'
import SearchBar from '@/components/page/SearchBar'
import { useState } from 'react'
import Description from '@/components/page/Description'
import Title from '@/components/page/Title'

export async function getStaticProps() {
    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/6b8443b4ebbc45e881f52cc09d4e1d10',
    )

    const data = await res.json()

    return {
        props: {
            initialData: data,
        },
        revalidate: 60,
    }
}

const Props = ({ initialData }) => {
    const [data, setData] = useState(initialData)

    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase()
        const filteredData = initialData.filter((entry) => {
            const tempTitle = entry['Project Title']?.toLowerCase()
            const tempDesc = entry.Description?.toLowerCase()

            return (
                tempTitle?.includes(searchQuery) ||
                tempDesc?.includes(searchQuery)
            )
        })

        setData(filteredData)
    }

    return (
        <BaseTemplate>
            <BackLink url="/" name="Home" />
            <Noggles />
            <Title title="Funded Proposals" />
            <Description
                desc="Looking to get funding for a Nounish project? There are many ways to go about doing so! Through NSFW : Small Grants, Prop House & On-Chain Proposals."
                link={`Get Funded|https://nouns.center/funding\nDiscourse|https://discourse.nouns.wtf`}
            />
            <SearchBar handleSearch={handleSearch} />
            <div className="p-4">
                <div className="grid-rows grid justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data?.map((prop) => (
                        <PropsCard key={prop.id} prop={prop} />
                    ))}
                </div>
            </div>
        </BaseTemplate>
    )
}

export default Props
