export function wait(ms: number): Promise<any> {
    return new Promise((reslove) => {
        setTimeout(() => {
            reslove(null)
        }, ms);
    })
}