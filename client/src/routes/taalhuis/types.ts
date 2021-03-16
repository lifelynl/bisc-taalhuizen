export interface TaalhuisDetailParams {
    taalhuisid: string
    taalhuisname: string
}

export interface TaalhuisCoworkersDetailParams extends TaalhuisDetailParams {
    coworkerid: string
}
