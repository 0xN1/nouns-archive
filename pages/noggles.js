import BaseTemplate from '@/template/BaseTemplate'
import BackLink from '@/components/page/BackLink'
import Noggles from '@/components/asset/noggles'
import Image from 'next/image'
import Link from 'next/link'
import { BASE_URL } from '@/lib/constants'
import { useState } from 'react'
import { toSlug } from '@/lib/utils'

export default function NogglesContestList({ initialData }) {
    const [data, setData] = useState(initialData)

    // handle search base on id / title
    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase()
        const filteredData = initialData.filter((entry) => {
            const tempTitle = entry.child_database.title.toLowerCase()
            const tempId = entry.id.toString()

            return (
                tempTitle.includes(searchQuery) || tempId.includes(searchQuery)
            )
        })

        setData(filteredData)
    }

    return (
        <BaseTemplate>
            <BackLink url="/" name="Home" />
            <Noggles />
            <h1 className="p-8 text-center font-gibson text-7xl uppercase">
                Noggles
            </h1>

            {/* <p className="mx-auto w-2/3 whitespace-pre-wrap p-8 text-justify"> */}
            {/* {JSON.stringify(data, null, 2)} */}
            {/* {name} */}
            {/* {id} */}
            {/* {data.map((item) => {
                return item.child_database.title
            })} */}
            {/* </p> */}

            <div className="mb-16 mt-4 w-2/3 break-words rounded-3xl border-x-4 border-t-4 border-black bg-[#FFF3F8] p-8 text-justify shadow-xl [border-bottom-width:12px]">
                Mauris varius sagittis metus at pretium. Quisque nunc libero,
                semper consequat tristique accumsan, fermentum eget sapien.
                Etiam ullamcorper velit interdum dui laoreet imperdiet.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; In hac habitasse platea dictumst. Donec
                est justo, placerat ac nisi sit amet, vehicula.
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
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className="relative flex flex-col items-center justify-center transition-all duration-150  hover:-translate-y-2 hover:shadow-gray-300"
                        >
                            <div className="h-[350px] w-[300px] overflow-hidden rounded-3xl border-x-4 border-t-4 border-black shadow-xl [border-bottom-width:12px] ">
                                <Link
                                    href={`/noggles/${toSlug(
                                        item.child_database.title,
                                    )}`}
                                >
                                    <Image
                                        className="h-[350px] w-[300px] border-b-4 border-black object-cover"
                                        src="https://placehold.co/300x350/FBF9F5/000000?text=Nouns+Archive&font=raleway"
                                        width={300}
                                        alt="nouns-archive"
                                        height={350}
                                    />
                                </Link>
                            </div>
                            <div
                                className="-mt-8 rounded-full border-2 border-black bg-yellow-400 px-4 py-2 shadow-xl
                "
                            >
                                <h1 className="font-gibson text-xl uppercase">
                                    {item.child_database.title.length > 15
                                        ? item.child_database.title.slice(
                                              0,
                                              15,
                                          ) + '...'
                                        : item.child_database.title}
                                </h1>
                            </div>
                            <span className="p-4">
                                {toSlug(item.child_database.title)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </BaseTemplate>
    )
}

export async function getStaticProps() {
    const res = await fetch(
        `${BASE_URL}/api/notion/block?id=7f6bd21b453c49bb8fdee607e1d901c0`,
        // `${BASE_URL}/api/notion/block?id=94860375634742588a7e8eb237acb61b`,
    )
    const nogglesContest = await res.json()
    const data = nogglesContest.results.filter(
        (item) => item.type === 'child_database',
    )

    return {
        props: {
            initialData: data,
        },
        revalidate: 60,
    }
}
