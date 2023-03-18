import { useState } from 'react'
import Link from 'next/link'

export default function OnChainProps({ initialData }) {
    const [data, setData] = useState(initialData)

    // handle search base on project title and description
    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase()
        const filteredData = initialData.filter((entry) => {
            const tempTitle = entry['Project Title'].toLowerCase()
            const tempDesc = entry.Description.toLowerCase()
            const tempTeam = entry['Team']?.toLowerCase()

            console.log(tempTeam)

            return (
                tempTitle.includes(searchQuery) ||
                tempDesc.includes(searchQuery) ||
                tempTeam?.includes(searchQuery)
            )
        })

        setData(filteredData)
    }

    // handle sort by project alphabetical / date
    const handleSort = (e) => {
        const sortQuery = e.target.value
        const sortedData = [...data]

        if (sortQuery === 'atoz') {
            sortedData.sort((a, b) => {
                const titleA = a['Project Title'].toLowerCase()
                const titleB = b['Project Title'].toLowerCase()

                if (titleA < titleB) {
                    return -1
                }
                if (titleA > titleB) {
                    return 1
                }
                return 0
            })
        }

        if (sortQuery === 'ztoa') {
            sortedData.sort((a, b) => {
                const titleA = a['Project Title'].toLowerCase()
                const titleB = b['Project Title'].toLowerCase()

                if (titleA < titleB) {
                    return 1
                }
                if (titleA > titleB) {
                    return -1
                }
                return 0
            })
        }

        if (sortQuery === 'latest') {
            sortedData.sort((a, b) => {
                const dateA = new Date(a.Date)
                const dateB = new Date(b.Date)

                return dateB - dateA
            })
        }

        if (sortQuery === 'oldest') {
            sortedData.sort((a, b) => {
                const dateA = new Date(a.Date)
                const dateB = new Date(b.Date)

                return dateA - dateB
            })
        }

        setData(sortedData)
    }

    // handle filter by category
    const handleFilter = (e) => {
        const filterQuery = e.target.value

        if (filterQuery === 'all') {
            setData(initialData)
        } else {
            const filteredData = initialData.filter((entry) => {
                const tempCategory = entry.Category.map((item) =>
                    item.toLowerCase(),
                )

                return tempCategory.includes(filterQuery)
            })

            setData(filteredData)
        }
    }

    // console.log(data)

    return (
        <div className="flex flex-col items-center justify-center gap-4 bg-[#FBF9F5] p-4 pt-32 font-inter">
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="229.167"
                    height="85.937"
                    viewBox="0 0 229.167 85.937"
                >
                    <g
                        id="Group_139"
                        data-name="Group 139"
                        transform="translate(-326.43 -216.6)"
                    >
                        <g
                            id="Group_18"
                            data-name="Group 18"
                            transform="translate(383.722 230.923)"
                        >
                            <path
                                id="Path_1"
                                data-name="Path 1"
                                d="M671.78,317.26v42.969h28.646V302.937H671.78Z"
                                transform="translate(-671.78 -302.937)"
                                fill="#fff"
                            />
                            <path
                                id="Path_2"
                                data-name="Path 2"
                                d="M1276.143,302.937v57.292h28.646V302.937Z"
                                transform="translate(-1175.883 -302.937)"
                                fill="#fff"
                            />
                        </g>
                        <g
                            id="Group_19"
                            data-name="Group 19"
                            transform="translate(412.367 230.923)"
                        >
                            <path
                                id="Path_3"
                                data-name="Path 3"
                                d="M844.455,317.26v42.969H873.1V302.937H844.455Z"
                                transform="translate(-844.455 -302.937)"
                                fill="#040505"
                            />
                            <path
                                id="Path_4"
                                data-name="Path 4"
                                d="M1448.818,302.937v57.292h28.646V302.937Z"
                                transform="translate(-1348.558 -302.937)"
                                fill="#040505"
                            />
                        </g>
                        <path
                            id="Path_5"
                            data-name="Path 5"
                            d="M469.659,216.6v28.646H455.336V216.6H369.4v28.646H326.43v42.969h14.323V259.569H369.4v42.969h85.938V259.569h14.323v42.969H555.6V216.6Zm-28.646,57.292v14.323H383.722V230.923h57.292v42.969Zm100.26-28.646v42.969H483.982V230.923h57.292Z"
                            fill="#e50019"
                        />
                    </g>
                </svg>
            </div>
            <h1 className="p-8 text-center font-gibson text-7xl uppercase">
                Onchain Proposals
            </h1>
            <div className="flex w-1/2 flex-col items-center gap-4">
                <input
                    className="mx-2 w-full rounded-xl border-2 border-black bg-transparent p-2"
                    type="text"
                    placeholder=" Search here"
                    onChange={handleSearch}
                />

                <div className="flex w-full flex-row items-center justify-center gap-4">
                    <select
                        className="w-1/2 rounded-xl border-2 border-black bg-transparent p-2 md:w-1/4"
                        onChange={handleFilter}
                    >
                        <option value="all">All</option>
                        <option value="art">Art</option>
                        <option value="tech">Tech</option>
                        <option value="marketing">Marketing</option>
                        <option value="charity">Charity</option>
                        <option value="physical">Physical</option>
                        <option value="operational">Operational</option>
                        <option value="investment">Investment</option>
                        <option value="staking">Staking</option>
                        <option value="community">Community</option>
                        <option value="other">Other</option>
                    </select>

                    <select
                        className="w-1/2 rounded-xl border-2 border-black bg-transparent p-2 md:w-1/4"
                        onChange={handleSort}
                    >
                        <option value="oldest">Oldest</option>
                        <option value="latest">Recent</option>
                        <option value="atoz">A to Z</option>
                        <option value="ztoa">Z to A</option>
                    </select>
                </div>
            </div>

            <span className="my-8 w-3/4 rounded-xl bg-[#707070] p-[1px]"></span>

            <ul className="grid-rows grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((proposal) => (
                    <Link
                        href={`/on-chain-props/${proposal.No}`}
                        key={proposal.id}
                    >
                        <li
                            className="relative h-[400px] w-[300px] overflow-hidden rounded-3xl border-x-4 border-t-4 border-black [border-bottom-width:12px]"
                            key={proposal.id}
                        >
                            <img
                                className="h-[236px] w-[300px] border-b-4 border-black object-cover"
                                src={
                                    proposal.Thumbnails?.[0].url
                                        ? proposal.Thumbnails?.[0].url
                                        : 'https://placehold.co/300x300/FBF9F5/000000?text=Nouns+Archive&font=raleway'
                                }
                                alt={proposal.Thumbnails?.[0].name}
                            />

                            <h1 className="h-20 overflow-hidden break-words px-5 py-4 text-2xl">
                                {proposal['Project Title'].length > 40 ? (
                                    <>
                                        {proposal['Project Title'].slice(0, 37)}{' '}
                                        ...
                                    </>
                                ) : (
                                    <>{proposal['Project Title']}</>
                                )}
                            </h1>

                            {/* <div>
                                <p className="p-2 text-sm">
                                    People:
                                    {proposal['Team ']?.map((person) => (
                                        <span className="font-bold">
                                            {person.slice(0, 10)}...
                                        </span>
                                    ))}
                                </p>
                            </div> */}

                            <div className="absolute bottom-4 left-6">
                                <p className=" text-lg">Prop #{proposal.No}</p>
                                <p className="text-sm">Date: {proposal.Date}</p>
                            </div>

                            {/* <p className="mt-4 py-4 px-2 text-sm">
                            {proposal.Category.join(', ')}
                        </p> */}
                            {/* <p className=" whitespace-pre-wrap break-words p-2">
                            {proposal.Description}
                        </p> */}

                            {/* <Link href={`/on-chain-props/${proposal.No}`}>
                            <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                                View Proposal
                            </button>
                        </Link> */}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch(
        'https://notion-api.splitbee.io/v1/table/1330bf9251614e64ae3de2b26b522051',
    )
    const initialData = await res.json()

    // sort the data by oldest
    initialData.sort((a, b) => {
        return new Date(a.Date) - new Date(b.Date)
    })

    return {
        props: {
            initialData,
        },
        revalidate: 60,
    }
}
