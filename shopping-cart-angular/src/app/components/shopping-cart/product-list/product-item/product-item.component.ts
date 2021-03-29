import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MessengerService } from 'src/app/services/messenger.service';
import { CartService } from 'src/app/services/cart.service'
import { WishlistService } from 'src/app/services/wishlist.service'

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem!: Product;
  @Input() addedToWishlist!: boolean;

  constructor(
    private msg: MessengerService, 
    private cartService: CartService, 
    private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {
  }

  handleAddToCartBtn() {
    this.cartService.addProductToCart(this.productItem).subscribe( () => {
      this.msg.sendMsg(this.productItem);
    });
  }

  hanldeAddToWishlist() {
    this.wishlistService.addProductToWishlist(this.productItem.id).subscribe( () => {
      this.addedToWishlist = true;
    });
    
    
  }
  handleRemoveFromWishlist() {
    this.wishlistService.removeProductFromWishlist(this.productItem.id).subscribe( () => {
      this.addedToWishlist = false;
    });
  }

}
