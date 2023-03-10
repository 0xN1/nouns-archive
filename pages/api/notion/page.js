import { getPage } from '@/lib/notion'

const page = async (req, res) => {
    const pageId = req.query.id
    const data = await getPage(pageId)

    if (!data) {
        res.status(500).json({
            message: 'An error occurred while retrieving the page.',
        })
        return
    }

    // If the data is retrieved successfully, return it as JSON
    return res.status(200).json(data)
}

export default page
