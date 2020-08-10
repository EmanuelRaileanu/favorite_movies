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
    ProductionCompanyId: number,
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