function profit(arr){
    let profit = 0;
    let isBought = false;
    let l = arr.length;
    for(let i=0;i<l; i++){
        if(arr[i+1]>arr[i]&&!isBought){
            isBought = true;
            profit-=arr[i];
        }
        if((arr[i+1]<arr[i]||(arr[i-1]<arr[i]&&i===l-1))&&isBought){
            isBought = false;
            profit+=arr[i];
        }
    }
    return profit;
}

console.log(profit( [7,1,5,3,6,4]));
console.log(profit([1,2,3,4,5]));
console.log(profit([7,6,4,3,1]));