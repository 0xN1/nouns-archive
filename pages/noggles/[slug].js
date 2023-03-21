import { BASE_URL } from '@/lib/constants'
import BaseTemplate from '@/template/BaseTemplate'
import { toSlug } from '@/lib/utils'

export async function getStaticPaths() {
    const res = await fetch(
        `${BASE_URL}/api/notion/block?id=7f6bd21b453c49bb8fdee607e1d901c0`,
    )
    const nogglesContest = await res.json()
    const data = nogglesContest.results.filter(
        (item) => item.type === 'child_database',
    )

    const paths = data.map((contest) => ({
        params: {
            slug: toSlug(contest.child_database.title),
            id: contest.id,
        },
    }))

    return {
        paths,
        fallback: 'blocking',
    }
}

// export async function getStaticProps({ params }) {
//     console.log(params)

//     const { id } = params

//     // Fetch the data for the specified proposal
//     const res = await fetch(`https://notion-api.splitbee.io/v1/table/${id}`)
//     const data = await res.json()

//     // Pass the data to the page via props
//     return {
//         props: {
//             data,
//         },
//         revalidate: 60,
//     }
// }

export async function getStaticProps({ params }) {
    const { slug } = params

    // Look up the corresponding ID for this slug
    const res = await fetch(
        `${BASE_URL}/api/notion/block?id=7f6bd21b453c49bb8fdee607e1d901c0`,
    )
    const nogglesContest = await res.json()
    const data = nogglesContest.results.filter(
        (item) => item.type === 'child_database',
    )
    const contest = data.find((c) => toSlug(c.child_database.title) === slug)

    if (!contest) {
        // If no matching contest was found, return a 404 page
        return { notFound: true }
    } else {
        const res = await fetch(
            `https://notion-api.splitbee.io/v1/table/${contest.id}`,
        )
        const data = await res.json()

        contest.data = data
    }

    // Pass the data to the page via props
    return {
        props: {
            data: contest,
        },
    }
}

const NogglesContest = ({ data }) => {
    return (
        <BaseTemplate>
            <div className="mx-auto w-2/3 whitespace-pre-wrap p-8 text-justify">
                {JSON.stringify(data, null, 2)}
            </div>
        </BaseTemplate>
    )
}

export default NogglesContest
