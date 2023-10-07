export default interface IError extends Error{
    message:string
    statusCode:number
}