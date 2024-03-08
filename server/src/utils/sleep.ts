/**
 * Sleep utility, especially meant for testing.
 * Duration (ms) defaults to 2000.
 */
export const sleep = async (duration?: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, duration ?? 2000)
    })
}
