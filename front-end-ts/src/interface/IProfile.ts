export interface IProfile {
  categories: {category: string}[];
  catNotNulls: {id:number, name: string, category: string}[];
  catNulls: {id: number, name: string}[];
}

/* interfaz de usuarios de la pestaña de administración del propio user*/
export interface IProfileUser{
  id: number,
  name: string,
  category: string
}

/* interfaz de la pestaña de portfolio de cada usuario */
export interface IportfolioUser{
  categories : { category : string}[],
  result: { 
    id: number, 
    name: string, 
    category: string | null}[]
}
