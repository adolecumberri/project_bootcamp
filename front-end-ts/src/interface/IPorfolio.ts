export interface IPortfolioCard {
    id : number,
    title : string,
    avatar : string,
    description? : string,
    likes : number,
    views : number,
    visible : number,
    active : number
  }

export interface IPorfolioCard_explore{
  id_user: number,
  id_portfolio: number,
  avatar: string,
  likes: number,
  views: number,
  header: string
}


  export interface IPortfolioCard_creator{
    id: number,
    avatar: string
  }

  