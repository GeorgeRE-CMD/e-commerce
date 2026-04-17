import { IProductsList } from './../../interface/all-products-interface/all-products-interface';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllProductsService } from '../../services/all-products/all-products-service';
import { ProductDetailsService } from '../../services/product-details/product-details-service';
import { NgClass } from '@angular/common';
import { ShopComponent } from "../shop-component/shop-component";
import { CartService } from '../../services/cart/cart-service';

@Component({
  selector: 'app-product-details-component',
  imports: [ShopComponent, NgClass],
  templateUrl: './product-details-component.html',
  styleUrl: './product-details-component.css',
})
export class ProductDetailsComponent implements OnInit {
  activeRoute = inject(ActivatedRoute);
  productS = inject(AllProductsService);
  productDetails = inject(ProductDetailsService);
  cartS = inject(CartService);
  isLoading = signal(false);
  success = signal(false);
  productDetail: WritableSignal<IProductsList | null> = signal(null);
  product: WritableSignal<IProductsList[]> = signal([]);
  isProductsLoading = true
  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next: (res) => {
        const id = res['productId'];
        this.getProductDetails(id);
      },
    })
    this.getProductDetails(this.activeRoute.snapshot.params['productId']);
  }


  // getFullStars(rating: number = 0): number {
  //   return Math.floor(rating);
  // }

  // hasHalfStar(rating: number = 0, star: number): boolean {
  //   return star === Math.ceil(rating) && rating % 1 !== 0;
  // }
  getProductDetails(id: string) {
    this.productDetails.productDetails(id).subscribe({
      next: (res) => {
        this.productDetail.set(res.data);

        // 🔥 هنا السحر
        const categoryId = res.data.category._id;

        this.productS.allProducts().subscribe({
          next: (productsRes: any) => {

            // ✅ فلترة حسب الكاتيجوري
            const filtered = productsRes.data.filter(
              (p: IProductsList) =>
                p.category._id === categoryId &&
                p._id !== res.data._id // عشان ما يظهرش نفس المنتج
            );

            this.product.set(filtered);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



  addTocart() {
    const product = this.productDetail();
    if (!product || !product._id) return;

    this.isLoading.set(true);
    this.success.set(false); // start with cart icon

    this.cartS.addProductsToCart(product._id).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.success.set(true);
        this.cartS.totalCartItems.set(res.numOfCartItems)
        setTimeout(() => {
          this.success.set(false); // flip to checkmark
        }, 1000);
        console.log(res);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.success.set(false); // stay on cart if failed
        console.log(err);
      }
    });
  }

}
