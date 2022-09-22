/**
 * 防抖
 */
type FN = (...args: any[]) => any
export function debounce<T extends FN>(fn: T, delay: number = 300):(...args: Parameters<T>) => ReturnType<T> {
    let I: any, lastResult: any
    return (...args: any[]) => {
        clearTimeout(I)
        I = setTimeout(() => {
            lastResult = fn(...args)
        }, delay);
        return lastResult
    }
}

// const fn = debounce((msg: string) => {
//     console.log(msg)
//     return Number(msg)
// })

// for(var i= 0; i<1000; i++) {
//     fn(i)
// }