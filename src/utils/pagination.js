
export default function paginate(itemArray, pageNumber, pageSize) {

    let startIndex = (pageNumber - 1) * pageSize;
    const finalArray = [];
    for(let i = 0; i < pageSize; i++)
    {
        if(itemArray[startIndex]) finalArray.push(itemArray[startIndex]);
        startIndex++;
    }

    return finalArray;
}