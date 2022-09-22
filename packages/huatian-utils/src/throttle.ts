// |---300ms---|---300---|
type FN = (...args: any[]) => any
export function throttle<T extends FN>(fn: T, delay: number = 300) : (...args: Parameters<T>) => ReturnType<T> {
    let lastResult: any
    let inThrottle: boolean = false
    return (...args: any[]) => {
        if(!inThrottle) {
            inThrottle = true
            setTimeout(() => {
                inThrottle = false
            }, delay);
            lastResult = fn(...args)
        }
        
        return lastResult
    }
}

// function wait(ms: number) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, ms);
//     })
// }

// async function run() {
//     const fn = throttle((msg: number) => {
//         console.log('running...', msg)
//     })

//     for(let i = 0; i < 10; i++) {
//         await wait(100)
//         fn(i)
//     }
// }
// run()