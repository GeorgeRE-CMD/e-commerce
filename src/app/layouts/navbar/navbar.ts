import { Component, computed, inject } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from "@angular/router";
import { CartService } from '../../services/cart/cart-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  cartService = inject(CartService);
  flowbiteService = inject(FlowbiteService);
  totalItems = computed(()=>{
    return this.cartService.totalCartItems()
  })

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
