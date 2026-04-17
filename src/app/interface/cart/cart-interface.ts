export interface ICartInterfaceResponse {
    status: string
    numOfCartItems: number
    cartId: string
    data: ICartData
}

export interface ICartData {
    _id: string
    cartOwner: string
    products: ICartProduct[]
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
}

export interface ICartProduct {
    count: number
    _id: string
    product: ICart2Product2
    price: number
}

export interface ICart2Product2 {
    subcategory: ICartSubcategory[]
    _id: string
    title: string
    quantity: number
    imageCover: string
    category: ICartCategory
    brand: ICartBrand
    ratingsAverage: number
    id: string
}

export interface ICartSubcategory {
    _id: string
    name: string
    slug: string
    category: string
}

export interface ICartCategory {
    _id: string
    name: string
    slug: string
    image: string
}

export interface ICartBrand {
    _id: string
    name: string
    slug: string
    image: string
}


