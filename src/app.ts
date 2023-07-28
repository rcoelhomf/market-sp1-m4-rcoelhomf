import express, { Application, json } from 'express'
import { attProduct, createNewProduct, deleteProduct, getAllProducts, getProductsById } from './logic'
import { verifyId, verifyName } from './middleware'

const app: Application = express()
app.use(json())

app.post('/products', verifyName, createNewProduct)

app.get('/products', getAllProducts)

app.get('/products/:id', verifyId, getProductsById)

app.patch('/products/:id', verifyId, verifyName, attProduct)

app.delete('/products/:id', verifyId, deleteProduct)

app.listen(3000, () => {
    console.log('Application has started at http://localhost:3000')
})