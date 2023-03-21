export const toSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
}

export const getLink = (link) => {
    const linkArray = link.split('|')
    return linkArray[1]
}

export const getLinkName = (link) => {
    const linkArray = link.split('|')
    return linkArray[0]
}
