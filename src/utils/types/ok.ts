export interface StatusOk<T> {
    success: boolean,
    message: string,
    data: T
}