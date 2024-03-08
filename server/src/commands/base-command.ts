import { CommandRunner } from 'nest-commander'

export abstract class BaseCommand implements CommandRunner {
    public constructor(private taskName: string) {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async run(passedParams: string[], options?: Record<string, any> | undefined): Promise<void> {
        console.clear()
        this.log('started')

        try {
            await this.runCommand(passedParams, options)

            this.log('completed')

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            this.log('failed --', err.message ?? err)
        }

        process.exit(0)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public abstract runCommand(passedParams: string[], options?: Record<string, any> | undefined): Promise<void>

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public log(message: string, params?: any) {
        console.log(`[${this.taskName}]: ${message}`, params || '')
    }
}
