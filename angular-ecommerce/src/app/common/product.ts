export class Product {

    constructor(
        private sku: number,
        private name: string,
        private description: string,
        private unitPrice: number,
        private imageUrl: string,
        private active: boolean,
        private unitsInStock: number,
        private dateCreated: Date,
        private lastUpdated: Date
    ) {

    }
}
