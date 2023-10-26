import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { lastValueFrom } from 'rxjs';
import { ProductModalComponent } from '../product-modal/product-modal.component';

declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public click_away = false;
  @ViewChild('addProduct') addProductModal!: ProductModalComponent;

  public count: number = 0;
  public dropdownVisible = false;
  public id_selected: any = '';
  public products: Product[] = [];
  public all_products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private renderer: Renderer2,
    private el: ElementRef,
    public router: Router
  ) { }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Handle click events
  }

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    try {
      // Fetch products and categorize them into pages
      this.all_products = await lastValueFrom(
        this.productsService.getProducts('1')
      );

      let ids = 1;
      this.all_products.forEach((element) => {
        if (ids >= 10 && ids <= 20) {
          element.page = 3;
        }
        if (ids >= 5 && ids <= 10) {
          element.page = 2;
        }
        if (ids >= 1 && ids <= 5) {
          element.page = 1;
        }

        ids++;
      });
      this.products = this.all_products.filter((element) => element.page == 1);


      this.count = this.all_products.length;
      console.log(this.products);
    } catch (error) { }
  }

  changePage(event: any) {
    // Change the displayed page based on user selection
    const selectedValue = event.target.value;
    this.products = this.all_products.filter((element) => {
      if (element.page !== undefined && element.page !== null) {
        return element.page <= selectedValue * 1;
      }
      return false;
    });
  }

  showDropdown(product_id: any) {
    // Show or hide the dropdown menu for a product
    this.dropdownVisible = !this.dropdownVisible;
    this.id_selected = product_id;
    this.click_away = false;
  }

  editarItem(product: any) {
    // Open the product modal for editing
    this.addProductModal.openModal(product);
  }

  async eliminarItem(id: any) {
    // Delete a product and handle the result
    try {
      await lastValueFrom(this.productsService.deleteProducts('1', id))
    } catch (error) {
      alert("Se elimino correctamente!")
      window.location.reload();
    }

  }

  addItems() {
    // Open the product modal for adding a new item
    this.addProductModal.openModal("1");
  }

  setSeleccionado(event: any) {
    // Set the selected item
  }
}
interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
  page?: number;
}
