export const isPro = (subExpiryUnixTime: number) => {
    return Math.floor(Date.now() / 1000) < subExpiryUnixTime
}