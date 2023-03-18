export async function getStaticProps() {
    try {
        const res = await fetch(
            'https://notion-api.splitbee.io/v1/table/1330bf9251614e64ae3de2b26b522051',
        )
        const data = await res.json()

        return {
            props: {
                proposals: data.results,
                error: null,
            },
        }
    } catch (error) {
        return {
            props: {
                proposals: null,
                error: 'Error fetching data',
            },
        }
    }
}

const OnChainView = ({ proposals, error }) => {
    if (error) {
        return <div>Error: {error}</div>
    }

    console.log(proposals)

    return (
        <div>
            <h1>OnChainView</h1>
            {JSON.stringify(proposals)}
        </div>
    )
}

export default OnChainView
