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
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = "Books";
  searchMode: boolean = false;

  // pagination support properties
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  previousKeyword: string = "";

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute)
    { 
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

    // Note: Angular will reuse a component if it's currently being viewed
    //
    // if we have a differenct category id than previous one
    // then set pageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, pageNumber=${this.pageNumber}`);

    this.productService
      .getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currentCategoryId)
      .subscribe(
          data => {
          this.products = data._embedded.products;
          this.pageNumber = data.page.number + 1;
          this.pageSize = data.page.size;
          this.totalElements = data.page.totalElements;
        }
      );
  }

  updatePageSize(event: Event) {

    this.pageSize = Number((<HTMLInputElement>event.target).value);
    this.pageNumber = 1;
    this.listProducts();
  }

  handleSearchProducts() {

    let keyword = this.route.snapshot.paramMap.get('keyword');

    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }

    if (keyword != null) {

      this.previousKeyword = keyword;
      console.log(`keyword=${keyword}, pageNumber=${this.pageNumber}`);

      this.productService
        .searchProductsPaginate(this.pageNumber - 1, this.pageSize, keyword)
        .subscribe(this.processResult());
    }
    else {
      throw new Error("keyword is null");
    }
  }

  private processResult() {
    return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }
}
