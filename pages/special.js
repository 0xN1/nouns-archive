import Noggles from '@/components/asset/noggles'
import CardWrapper from '@/components/card/CardWrapper'
import SpecialCard from '@/components/card/SpecialCard'
import BackLink from '@/components/page/BackLink'
import Description from '@/components/page/Description'
import SearchBar from '@/components/page/SearchBar'
import Separator from '@/components/page/Separator'
import Title from '@/components/page/Title'
import useLocalStorage from '@/hooks/useLocalStorage'
import useScrollPosition from '@/hooks/useScrollPosition'
import { toSlug } from '@/lib/utils'
import BaseTemplate from '@/template/BaseTemplate'
import { useState, useRef, useEffect } from 'react'

const DEBUG_MODE = false

export default function NounsSpecial({ initialData, pageData }) {
    const [data, setData] = useState(initialData)

    const parentSlug = toSlug(pageData['Project Title'])
    const searchRef = useRef(null)
    const [scroll, setScroll] = useLocalStorage(`${parentSlug}-scroll`, 0)
    const [search, setSearch] = useLocalStorage(`${parentSlug}-search`, '')

    useScrollPosition(setScroll, scroll)

    const filterBySearch = (data, search) => {
        if (search === '') {
            return data
        } else {
            const filteredData = data.filter((entry) => {
                const tempTitle = entry['Project Title'].toLowerCase()

                return tempTitle.includes(search)
            })
            return filteredData
        }
    }

    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase()
        const filteredData = filterBySearch(initialData, searchQuery)
        setData(filteredData)
        setSearch(searchQuery)
    }

    useEffect(() => {
        if (search !== '') {
            const filteredData = filterBySearch(initialData, search)
            setData(filteredData)
        }
        searchRef.current.value = search
    }, [setSearch, search, initialData])

    return (
        <BaseTemplate>
            <BackLink url={'/'} name={'Home'} />
            <Noggles />
            <Title title={pageData['Project Title']} />
            <Description desc={pageData.Description} link={pageData.Link} />
            <SearchBar handleSearch={handleSearch} ref={searchRef} />
            <Separator />
            {DEBUG_MODE && (
                <p className="mx-auto my-8 h-96 w-2/3 overflow-auto whitespace-pre-wrap p-8 text-justify">
                    {JSON.stringify(data, null, 2)}
                </p>
            )}
            <CardWrapper>
                {data.map((special) => (
                    <SpecialCard special={special} key={special.id} />
                ))}
            </CardWrapper>
        </BaseTemplate>
    )
}

export async function getStaticProps() {
    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/b319b929cd0c480696a802e052567daf',
    )
    const data = await res.json()

    const filteredData = data
        .filter((entry) => {
            return entry['No'] > 0
        })
        .filter((entry) => {
            return entry['DB'] !== undefined
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
