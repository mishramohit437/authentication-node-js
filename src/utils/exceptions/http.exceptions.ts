class HttpException extends Error {
    public status:number;
    public message: string;
    
    constructor(status:number,messge:string) {
        super(messge);
        this.status = status;
        this.message = messge;
    }
}

export default HttpException;