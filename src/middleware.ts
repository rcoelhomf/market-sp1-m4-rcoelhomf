import { NextFunction, Request, Response } from "express";
import { market } from "./database";

export const verifyName = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body

    const existingName = market.find(item => item.name === name)

    existingName ? (res.status(409).json({
        "message": "Product already registered."
    })) : next()

}

export const verifyId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    res.locals.id = id

    const existingId = market.find(item => item.id === Number(id))

    !existingId ? (res.status(404).json({
        "message": "Product not found."
    })) : next()
}