import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number;
  currentCategoryName: string;
  searchMode: boolean;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute)
    { 
      this.currentCategoryId = 1;
      this.currentCategoryName = "Books";
      this.searchMode = false;
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    this.listProducts();
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword')
    
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }

  handleListProducts() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    const hasCategoryName: boolean = this.route.snapshot.paramMap.has('name');

    if (hasCategoryId && hasCategoryName) {
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
      let temp = this.route.snapshot.paramMap.get('name')?.toString();
      if (temp != null) {
        this.currentCategoryName = temp.toString();
      }
    } else {
      this.currentCategoryId = 1;
      this.currentCategoryName = "Books";
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  handleSearchProducts() {

    let keyword = this.route.snapshot.paramMap.get('keyword');
    if (keyword != null) {

      this.productService.searchProducts(keyword).subscribe(
        data => {
          this.products = data;
        }
      );
    }
    else {
      throw new Error("keyword is null");
    }
  }
}
