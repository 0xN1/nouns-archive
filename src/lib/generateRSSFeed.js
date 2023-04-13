import fs from 'fs'
import path from 'path'
import { Feed } from 'feed'

function generateRSSFeed(pageData, baseUrl, pagePath) {
    const feed = new Feed({
        title: 'Nouns Archive',
        description: 'Archive Center for Nouns DAO',
        id: baseUrl,
        link: baseUrl,
        language: 'en',
        image: `${baseUrl}/nouns-archive.svg`,
        favicon: `${baseUrl}/nouns-archive.svg`,
        feedLinks: {
            json: `${baseUrl}${pagePath}/feed.json`,
            atom: `${baseUrl}${pagePath}/atom.xml`,
            rss: `${baseUrl}${pagePath}/rss.xml`,
        },
        author: {
            name: 'Nouns Archive',
            email: 'team@archives.wtf',
            link: baseUrl,
        },
    })

    pageData.forEach((item) => {
        feed.addItem({
            title: item.title,
            id: `${baseUrl}${item.link}`,
            link: `${baseUrl}${item.link}`,
            description: item.description,
            content: item.description,
            image: item.image,
            author: [
                {
                    name: 'Nouns Archive',
                    email: 'team@archives.wtf',
                    link: baseUrl,
                },
            ],
            date: new Date(item.date),
        })
    })

    const rss = feed.rss2()
    const json = feed.json1()
    const atom = feed.atom1()

    fs.mkdirSync(path.join(`./public${pagePath}`), { recursive: true })

    fs.writeFileSync(`./public${pagePath}/rss.xml`, rss)
    fs.writeFileSync(`./public${pagePath}/feed.json`, json)
    fs.writeFileSync(`./public${pagePath}/atom.xml`, atom)
}

export default generateRSSFeed
