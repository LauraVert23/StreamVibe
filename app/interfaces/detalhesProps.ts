export interface detalhesProps {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    original_language:string;
    vote_average:string;
    genres: {id:string, name:string}[];
    production_companies: {id:number, name:string, logo_path:string}[];
}