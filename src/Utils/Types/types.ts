export type Comment = {
    id: number;
    by: string;
    time: number;
    text?: string;
    kids?: number[];
    score?:number
  };

export type Storytype = {
    story: {
    url:string,
    by:string,
    title:string,
    kids?: number[];
    time:number,
    id:number,
    score:number
    }
    
}

export type Story = {
    url:string,
    by:string,
    title:string,
    kids?: number[];
    time:number,
    id:number,
    score:number,
    text?:string
}