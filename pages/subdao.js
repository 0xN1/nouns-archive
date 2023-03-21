import { useState } from 'react'
import BaseTemplate from '@/template/BaseTemplate'
import Noggles from '@/components/asset/noggles'
import DAOCard from '@/components/card/DAOCard'
import BackLink from '@/components/page/BackLink'
import SearchBar from '@/components/page/SearchBar'
import Description from '@/components/page/Description'
import Title from '@/components/page/Title'

export default function SubDAOList({ initialData, pageData, raw }) {
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
            <Title title="SubDAOs" />
            <Description desc={pageData.Description} link={pageData.Link} />
            <SearchBar handleSearch={handleSearch} />
            {/* <span className="my-8 w-3/4 rounded-xl bg-[#707070] p-[1px]"></span> */}
            <div className="p-4">
                <div className="grid-rows grid justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((dao) => (
                        <DAOCard dao={dao} key={dao.No} />
                    ))}
                </div>
            </div>
        </BaseTemplate>
    )
}

export async function getStaticProps() {
    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/df5655a805ee496dbc53fa6409fd2bd5',
    )
    const data = await res.json()

    const filteredData = data.filter((entry) => {
        return entry['No'] > 0
    })

    const pageData = data.filter((entry) => {
        return entry['No'] === undefined
    })

    return {
        props: {
            initialData: filteredData,
            pageData: pageData[0],
            raw: data,
        },
        revalidate: 60,
    }
}
