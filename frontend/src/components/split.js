function cakeList(list, rows){
    const sortedList = [];
    let rowIndex = 0;
    for(let i=0;i<rows;i++){
      sortedList[i]=[]
    }
    let count=0
    list.forEach(item=>{
      sortedList[rowIndex].push(item)
      
      if (count ===2){
        rowIndex++
      }
      count ++
    })
    return sortedList
  }
export {cakeList}