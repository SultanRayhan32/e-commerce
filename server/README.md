# e-commerce
### USER
| Route  | HTTP   | Headers   | Body  | Description  |    response      |
|---|---|---|---|---|----|
|  /register | POST  |  none | username:string(Required),   password:string(Requeired)    | Register a new User   |      data    |
| /login  | POST  |  none | username:string(Required),   password:string(Requeired)   | Login User  |       data     |

### CART

| Route  | HTTP   | Headers   | Body  | Description  |    response      |
|---|---|---|---|---|----|
|  /cart | POST  |  token |  stock:number , quantity:number    | Add A new Cart   |      data    |
| /cart | GET  |  token | none   | Get Cart  |       data     |
| /cart/checkout | POST  |  token | ProductList:array , User:ObjectId , alamat:string , status:string  , total harga:number | Checkout |       data     |

| Route  | HTTP   | Headers   | Body  | Description  |    response      |
|---|---|---|---|---|----|
|  /product | POST  |  token |  name:string , price:number ,  image:string ,Stock:number    | Add A new product   |      data    |
| /product | GET  |  token | none   | Get product  |       data     |
| /product/:id | PUT  |  token | ProductList:array , User:ObjectId , alamat:string , status:string  , total harga:number | Checkout |       data     |
