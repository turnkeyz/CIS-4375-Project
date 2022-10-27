function formatDateTimeFromSQLTOJS(datetime){
    var arr1 = datetime.split('-')
    var year = arr1[0]
    var month = arr1[1]
    var arr2 = arr1[2].split(':')
    var day = arr2[0].slice(0,2)
    var min = arr2[1]
    var hour = arr2[0].slice(3,5)
    let new_date = `${month}-${day}-${year}`
    let yMD_date = `${year}-${month}-${day}`
    let new_time = `${hour}:${min}`
    return [new_date, yMD_date, new_time]    
}
export {formatDateTimeFromSQLTOJS}