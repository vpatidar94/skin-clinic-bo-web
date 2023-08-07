export interface ProductVo {

    /* ************************************ Instance Fields ************************************ */
    productCode: number;
    purchaseDate: Date;
    productName: string;
    drug: string;
    company: string;
    productType: string;
    qtyPerStrip: number;
    pricePerStrip: number;
    price: number;
    expiryDate: Date;
}