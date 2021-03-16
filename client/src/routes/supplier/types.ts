export interface SupplierDetailParams {
    supplierid: string
    suppliername: string
}

export interface SupplierDetailCoworkersParams extends SupplierDetailParams {
    coworkerid: string
    coworkername: string
}

export interface SupplierDetailDocumentsParams extends SupplierDetailCoworkersParams {
    documentid: string
    documentname: string
}
