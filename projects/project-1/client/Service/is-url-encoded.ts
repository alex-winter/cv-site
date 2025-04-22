export function isURLEncoded(str: string) {
    try {
        return str !== decodeURIComponent(str)
    } catch (e) {
        return false
    }
}