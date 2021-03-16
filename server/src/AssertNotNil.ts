export function assertNotNil(input: unknown, message?: string): asserts input {
    if (input === null || input === undefined) {
        throw new Error(message ?? 'Expected value to be not null/undefined, but it is')
    }
}
