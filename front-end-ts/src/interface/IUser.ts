




/* TODO: terminar*/
export interface IAdminUser{
    id: number,
    name: string,
    email: string,
    active: boolean,
    isAdmin: boolean
}
 export interface IDevInformation{
     name : string,
     gender : string,
     age : {
        day:string,
        month: string,
        year: string
     }
     country:string,
     state: string
 }

 export interface IUserCard {
     id: number,
     name : string,
     avatar: string | null,
     header: string | null,
     country : string | null,
     state : string | null
 }

export interface IUser {
    id: number,
    email: string | null,
    name: string ,
    age : string | null,
    gender : string | null,
    country : string | null,
    state : string | null,
    header : string | null,
    avatar : string | null,
    feature : string | null,
    cv_photo : string | null,
    cv_studies: string | null,
    cv_works: string | null,
    cv_experience: string | null,
    job_desired: boolean,
    colaboration_desired: boolean,
    likes: number,
    seen: number,
    isDeveloper: boolean,
    outstanding: boolean,
    ip: string,
    last_visit: string,
    active: number
}
