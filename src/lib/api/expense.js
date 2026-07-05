import { serverFetch } from "../core/server"

export const getExpenses = async(email)=>{
return serverFetch(`/api/expenses?email=${email}`)
}