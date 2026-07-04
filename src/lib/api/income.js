import { serverFetch } from "../core/server"

export const getIncomes = async(email)=>{
return serverFetch(`/api/incomes?email=${email}`)
}