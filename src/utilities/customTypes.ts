export interface Category{
    id: number,
    category?: string
}

export interface Movie{
    id?: number
    title: string,
    description?: string,
    runtime?: string,
    budget?: number,
    gross?: number,
    overallRating?: number,
    releaseDate?: string,
    ProductionCompanyId: number | undefined,
    posterId? : number,
    categories?: Category[]
}

export interface Studies{
    id?: number,
    actorId?: number,
    graduationYear: number,
    institutionId: number,
    degreeId: number
}

export interface Award{
    id?: number,
    awardId: number,
    year: number,
    movie: string,
    movieCharacter: string
}

export interface ProductionCompany{
    id?: number,
    name: string
}

export interface Address{ 
    streetId: number, 
    streetNumber: number, 
    buildingNumber: number, 
    appartmentNumber: number 
}

export interface Name{
    firstName: string 
    lastName: string
}

export interface Language{
    id?: number
    language: string
}

export interface Actor{
    id?: number,
    firstName: string,
    lastName: string,
    fbProfileLink?: string,
    shortDescription?: string,
    recentPhotoId?: number,
    nationalityId?: number,
    dateOfBirth?: number
}

export interface ProductionCrewMember{
    id?: number,
    firstName: string,
    lastName: string,
    dateOfBirth?: number,
    addressId?: number,
    typeId?: number,
    productionCompanyId: number
}
