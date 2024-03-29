export interface FacetValue {
    value: string // E.g: "En Succursale"
    lookupValue: string // E.g: "En Succursale"
    numberOfResults: number
    score: number
    valueType: string // E.g: "Standard"
    checked: boolean
    exclude: boolean
}

export interface FacetItem {
    field: string
    title: string
    values: FacetValue[];
}

export interface FacetList {
    [id: string]: FacetItem
}

export interface RawFacetValue {
    value: string 
    lookupValue: string
    numberOfResults: number
    score: number
    valueType: string
    computedFieldResults: []
}

export interface RawFacet {
    field: string
    values: RawFacetValue[]
}