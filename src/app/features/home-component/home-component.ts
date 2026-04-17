import {  IProductsList } from './../../interface/all-products-interface/all-products-interface';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AllProductsService } from '../../services/all-products/all-products-service';
import { RouterLink } from "@angular/router";
import { NgClass } from '@angular/common';
import { CategoryService } from '../../services/categories/category-service';
import { ICategories } from '../../interface/all-categories/all-categories-interface';
import { ShopComponent } from "../shop-component/shop-component";



@Component({
  selector: 'app-home-component',
  imports: [RouterLink, NgClass, ShopComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {
  private categoriesS = inject(CategoryService);
  private productsS = inject(AllProductsService);
  categories: ICategories[] = [];
  products: WritableSignal<IProductsList[]> = signal([])
  isCategoriesLoading = true;
  isProductsLoading = true
  currentIndex = 0;
  ngOnInit(): void {
    this.getAllCategories()
    this.getAllProducts()
  }
  slides = [
    {
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da',
      title: 'Fast & Free Delivery',
      subtitle: 'Same day delivery available',
      primaryBtn: 'Order Now',
      secondaryBtn: 'Delivery Info'
    },
    {
      image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650',
      title: 'Premium Quality Guaranteed',
      subtitle: 'Fresh from farm to your table',
      primaryBtn: 'Shop Now',
      secondaryBtn: 'Learn More'
    },
    {
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
      title: 'Fresh Products Delivered to your door',
      subtitle: 'Get 20% off your first order',
      primaryBtn: 'Shop Now',
      secondaryBtn: 'View Deals'
    }
  ];

  next(): void {
    this.currentIndex =
      (this.currentIndex + 1) % this.slides.length;
  }

  prev(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }


  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  getAllCategories() {
    this.isCategoriesLoading = true;
    this.categoriesS.getAllCategories().subscribe({
      next: (res) => {
        if (!res.data) return;
        this.isCategoriesLoading = false;
        this.categories = res.data;
        console.log(res);
      },
      error: (err) => {
        this.isCategoriesLoading = false;
        console.log(err);
      },
    })
  }
  getAllProducts() {
    this.isProductsLoading = true;
    this.productsS.allProducts().subscribe({
      next: (res) => {
        this.isProductsLoading = false;
        this.products.set(res.data)
        console.log(res);
      },
      error: (err) => {
        this.isProductsLoading = false;
        console.log(err);
      }
    })
  }
}
