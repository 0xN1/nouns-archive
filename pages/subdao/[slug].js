import { toSlug } from '@/lib/utils'
import BaseTemplate from '@/template/BaseTemplate'
import BackLink from '@/components/page/BackLink'
import Noggles from '@/components/asset/noggles'
import Link from 'next/link'
import Image from 'next/image'
import { getLink, getLinkName } from '@/lib/utils'
import { useState } from 'react'
import ContestCard from '@/components/card/ContestCard'

export async function getStaticPaths() {
    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/df5655a805ee496dbc53fa6409fd2bd5',
    )
    const data = await res.json()

    const filteredData = data.filter((entry) => {
        return entry['No'] > 0
    })

    const paths = filteredData.map((dao) => ({
        params: {
            slug: toSlug(dao['Project Title']),
        },
    }))

    return {
        paths,
        fallback: 'blocking',
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params

    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/df5655a805ee496dbc53fa6409fd2bd5',
    )
    const data = await res.json()

    const filteredData = data.filter((entry) => {
        return entry['No'] > 0
    })

    const dao = filteredData.find((d) => toSlug(d['Project Title']) === slug)

    if (!dao) {
        // If no matching dao was found, return a 404 page
        return { notFound: true }
    } else {
        const res = await fetch(
            `https://notion-api.splitbee.io/v1/table/${dao.DB}`,
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
}

const SubDAOContestList = ({ initialData, pageData, raw }) => {
    const [data, setData] = useState(initialData)

    // handle search base on id / title
    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase()
        const filteredData = initialData.filter((entry) => {
            const tempTitle = entry['Project Title']?.toLowerCase()

            return tempTitle?.includes(searchQuery)
        })

        setData(filteredData)
    }
    return (
        <BaseTemplate>
            <BackLink url={`/subdao`} name="SubDAOs" />
            <Noggles />
            <h1 className="p-8 text-center font-gibson text-7xl uppercase">
                {pageData['Project Title']}
            </h1>

            {/* <p className="mx-auto w-2/3 whitespace-pre-wrap p-8 text-justify">
                {JSON.stringify(data, null, 2)}
            </p> */}

            <div className="mb-16 mt-4 flex w-2/3 flex-col items-center justify-center gap-4 rounded-3xl border-x-4 border-t-4 border-black bg-[#FFF3F8] p-8 shadow-xl [border-bottom-width:12px]">
                <div className="break-words text-center">
                    {pageData.Description}
                </div>
                <div className="flex flex-row gap-4">
                    {pageData.Link &&
                        pageData.Link?.split('\n').map((link) => (
                            <a
                                href={getLink(link)}
                                target="_blank"
                                rel="noreferrer"
                                key={getLinkName(link)}
                            >
                                <div className="mt-4 rounded-full border-2 border-black bg-yellow-400 px-4 py-2">
                                    {getLinkName(link)}
                                </div>
                            </a>
                        ))}
                </div>
            </div>

            <div className="mb-16 flex w-1/2 flex-col items-center gap-4">
                <input
                    className="mx-2 w-full rounded-xl border-2 border-black bg-transparent p-2"
                    type="text"
                    placeholder="Search here"
                    onChange={handleSearch}
                />
            </div>

            {/* <span className="my-8 w-3/4 rounded-xl bg-[#707070] p-[1px]"></span> */}

            <div className="p-4">
                <div className="grid-rows grid justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((contest) => (
                        <ContestCard contest={contest} key={contest.id} />
                    ))}
                </div>
            </div>
        </BaseTemplate>
    )
}

export default SubDAOContestList
