// get notion page id for proposal No

import { queryDatabase } from '@/lib/notion'

const getProposalID = async (req, res) => {
    // const propDB = req.query.propDB
    const pageId = '1330bf9251614e64ae3de2b26b522051' // onchain prop prod db
    // const pageId = '7560d477d44b404baa2e70afd5ecf52b' // onchain prop test db
    const data = await queryDatabase(pageId)

    if (!data) {
        res.status(500).json({
            message: 'An error occurred while getting the page.',
        })
        return
    }

    // filter data, return id if item.properties.No.number is equal to req.query.id

    const filteredData = data.results.filter(
        (item) => item.properties.No.number === parseInt(req.query.id),
    )

    return res.status(200).json(filteredData[0].id)

    // If the data is retrieved successfully, return it as JSON
    // return res.status(200).json(data)
}

export default getProposalID
