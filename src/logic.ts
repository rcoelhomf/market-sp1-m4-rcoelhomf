import { Request, Response } from 'express'
import { market } from './database'
import { Products } from './interfaces'

let count = 0

export const createNewProduct = (req: Request, res: Response): Response => {
    count++
    const newDate = Date.now() + 31536000000
    const expiration = new Date(newDate)

    const newProduct: Products = {
        id: count,
        ...req.body,
        expirationDate: expiration,
    }

    market.push(newProduct)

    return res.status(201).json(newProduct)
}

export const getAllProducts = (req: Request, res: Response): Response => {
    const total = market.reduce((accumulator, current) => accumulator + current.price, 0)
    const marketProducts = {
        total: total, 
        products: market
    }

    return res.status(200).json(marketProducts)
}

export const getProductsById = (req: Request, res: Response): Response => {
    const index = market.findIndex(item => item.id === Number(res.locals.id))
    const product = market[index]
    
    return res.status(200).json(product)
}

export const attProduct = (req: Request, res: Response): Response => {
    const index = market.findIndex(item => item.id === Number(res.locals.id))
    const attItem = {
        ...market[index],
        ...req.body
    }

    market[index] = attItem

    return res.status(200).json(attItem)
}

export const deleteProduct = (req: Request, res: Response): Response => {
    const index = market.findIndex(item => item.id === Number(res.locals.id))
    market.splice(index, 1)

    return res.status(204).json()
}