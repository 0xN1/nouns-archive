import { Client } from '@notionhq/client'
import Redis from 'ioredis'

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
})

const redis = new Redis(process.env.REDIS_URL, {
    // tls: {
    //     rejectUnauthorized: false, // set this to false for local development
    // },
    connectTimeout: 10000,
})

redis.on('error', (err) => {
    console.log('Redis error: ', err)
})

redis.on('connect', () => {
    console.log('Redis connected')
})

export async function queryDatabase(databaseId) {
    const cachedData = await redis.get(`notion-db:${databaseId}`)

    if (cachedData) {
        return JSON.parse(cachedData)
    }

    const response = await notion.databases.query({
        database_id: databaseId,
    })

    await redis.set(
        `notion-db:${databaseId}`,
        JSON.stringify(response),
        'EX',
        3600,
    ) // cache for 1 hour

    return response
}

export async function retrieveDatabase(databaseId) {
    const cachedData = await redis.get(`notion-dbo:${databaseId}`)

    if (cachedData) {
        return JSON.parse(cachedData)
    }

    const response = await notion.databases.retrieve({
        database_id: databaseId,
    })

    await redis.set(
        `notion-dbo:${databaseId}`,
        JSON.stringify(response),
        'EX',
        3600,
    ) // cache for 1 hour

    return response
}

export async function getBlock(blockId) {
    const cachedData = await redis.get(`notion-block:${blockId}`)

    if (cachedData) {
        return JSON.parse(cachedData)
    }

    const response = await notion.blocks.children.list({
        block_id: blockId,
    })

    await redis.set(
        `notion-block:${blockId}`,
        JSON.stringify(response),
        'EX',
        3600,
    ) // cache for 1 hour

    return response
}

export async function getBlockChildren(blockId) {
    const cachedData = await redis.get(`notion-block-child:${blockId}`)

    if (cachedData) {
        return JSON.parse(cachedData)
    }

    const response = await notion.blocks.children.list({
        block_id: blockId,
    })

    await redis.set(
        `notion-block-child:${blockId}`,
        JSON.stringify(response),
        'EX',
        3600,
    ) // cache for 1 hour

    return response
}

export async function getPage(pageId) {
    const cachedData = await redis.get(`notion-page:${pageId}`)

    if (cachedData) {
        return JSON.parse(cachedData)
    }

    const response = await notion.pages.retrieve({
        page_id: pageId,
    })

    await redis.set(
        `notion-page:${pageId}`,
        JSON.stringify(response),
        'EX',
        3600,
    ) // cache for 1 hour

    return response
}
