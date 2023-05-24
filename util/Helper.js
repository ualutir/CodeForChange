export const googleSheetJSONParser = (json) => {
    const keys = json.values[0]
    const jsonData = json.values.slice(1)
    const dataObj = jsonData.map(row => Object.assign({}, ...keys.map(
        (colName, index) => ({
            [colName]: row[index]
        })
    )))
    return dataObj
}