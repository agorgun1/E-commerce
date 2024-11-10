import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items = [
    { name: 'Item 1', description: 'Description of Item 1', price: 29.99 },
    { name: 'Item 2', description: 'Description of Item 2', price: 49.99 },
    { name: 'Item 3', description: 'Description of Item 3', price: 19.99 },
    { name: 'Item 4', description: 'Description of Item 4', price: 9.99 }
  ];

  cart: any[] = []; 
  isCartModalOpen = false; 
  loggedInUser: string | null = null; 

  constructor(private router: Router) {}

  ngOnInit() {

    this.loggedInUser = localStorage.getItem('loggedInUser');
    if (!this.loggedInUser) {
      this.router.navigate(['/login']);
    }
  }

  addToCart(item: any) {
    this.cart.push(item);
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  toggleCartModal() {
    this.isCartModalOpen = !this.isCartModalOpen;
  }

  calculateTotal() {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }

  logout() {

    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
