declare interface AssetRequestQueryParams {
    search?: string,
    ids?: string,
    limit?: number,
    offset?: number
}

declare interface HistoryRequestQueryParams{
    interval: string,
    start?: number,
    end?: number
}

declare interface ExcxhangeRatesRequestQueryParams{
    accessKey: string,
    symbols?: string,
    target?: string,
    expand?: string,
}

declare interface LocationSearchParams{
    limit?: number,
    current?: number
}