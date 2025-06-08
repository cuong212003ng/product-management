module.exports = (query) => {
    let keyword = ""

    if(query.keyword) {
        keyword = query.keyword

        const regex = new RegExp(keyword, "i")
        return regex
    }
}