function maxSubArr(arr) {
    let max = 0;
    let tmp = 0;

    for (let item of arr) {
        tmp += item;
        if(tmp>max)
            max = tmp;
        if (tmp < 0) tmp = 0;
    }

    return max;
}

console.log(maxSubArr([-2,1,-3,4,-1,2,1,-5,4]))