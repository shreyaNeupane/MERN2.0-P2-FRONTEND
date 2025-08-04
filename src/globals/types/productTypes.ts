import type { Status } from "./types"
import singleProduct from './../../pages/singleProduct/SingleProduct';

interface User{
    id: string,
    email:string,
    password : string,
}
interface Category{
    id:string,
    categoryName:string
}
export interface Product {
    id: string,
    productName : string,
    productDescription: string,
    productPrice:number,
    productTotalStockQty : number,
    productImageUrl : string,
    createdAt : string,
    updatedAt : string,
    categoryId : string,
    User:User
    Category:Category

}
export interface ProductState{
    product : Product[],
    status :Status,
    singleProduct : Product |null
}