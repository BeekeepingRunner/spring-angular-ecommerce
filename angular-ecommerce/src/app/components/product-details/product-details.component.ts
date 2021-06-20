import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private route : ActivatedRoute,
    private productService : ProductService,
    private productId : number,
    public product : Product
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => {
        this.handleProductDetails();
      }
    )
  }

  handleProductDetails() {
    if (this.route.snapshot.paramMap.has('id')) {

      this.productId = Number(this.route.snapshot.paramMap.get('id'));
      this.productService.getProduct(productId).subscribe(
        data => {
          this.product = data;
        }
      );
    }
  }
}
