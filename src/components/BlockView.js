// Render block page from notion

import { useState, useEffect } from 'react'

export default function BlockView({ blockId }) {
    const [block, setBlock] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/notion/block?id=${blockId}`)
            const data = await res.json()

            // sort by created time
            // data.results.sort((a, b) => {
            //     return new Date(a.created_time) - new Date(b.created_time)
            // })

            // sort alphabetically
            // data.results.sort((a, b) => {
            //     if (a.child_page?.title < b.child_page?.title) {
            //         return -1
            //     }
            //     if (a.child_page?.title > b.child_page?.title) {
            //         return 1
            //     }
            //     return 0
            // })

            // filter by type child_page
            // data.results = data.results.filter((item) => {
            //     return item.type === 'child_page'
            // })

            // filter out type paragraph
            data.results = data.results.filter((item) => {
                return item.type !== 'paragraph'
            })

            setBlock(data.results)
            // console.log(data.results)
        }
        fetchData()
    }, [blockId])

    return (
        <div className="p-4">
            <h1 className="text-center text-3xl">BlockView</h1>
            {block.map((item) => (
                <div key={item.id}>
                    <br />
                    {item.child_page?.title && (
                        <div className="mt-6 select-none text-center text-2xl font-bold">
                            {`📄 ${item.child_page?.title}`}
                        </div>
                    )}
                    {item.child_database?.title && (
                        <div className="mt-6 select-none text-center text-2xl font-bold">
                            {`🗄️ ${item.child_database?.title}`}
                        </div>
                    )}
                    <br />
                    <div className="text-sm">ID: {item.id}</div>
                </div>
            ))}
        </div>
    )
}
