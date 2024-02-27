function multiplyBy2(num){
    return num*2
}
multiplyBy2.stored = 5
multiplyBy2(3) // 6
multiplyBy2.stored // 5
multiplyBy2.prototype // {} prazan objekt

// u JS-u svaka funkcija ima i svoj objekt-ni dio
//te se na taj nacin preko propertija prototype moze spremiti link na funkciju