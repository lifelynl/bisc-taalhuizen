export enum NotificationType {
    success = 'success',
    warning = 'warning',
    error = 'error',
}

export interface Parameters {
    id: string
    type: NotificationType
    title: string
    message: string
    timeout: number
    dismiss: () => void
}

export interface Options {
    wait?: number
    timeout?: number
    onClick?: (notification: Parameters) => void
}
