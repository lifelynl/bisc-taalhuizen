class FormsUtils {
    public getFormDataFromFormEvent<TData>(e: React.FormEvent<HTMLFormElement>): TData {
        const data = new FormData(e.currentTarget)
        const form = Object.fromEntries(Array.from(data.entries())) as any
        return form
    }
}

export const Forms = new FormsUtils()
