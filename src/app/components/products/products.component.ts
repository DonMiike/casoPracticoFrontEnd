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
  ) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    /* const buttonElement =
      this.el.nativeElement.querySelector('.btn-three-dots');

    if (!buttonElement.contains(event.target as Node)) {
      this.dropdownVisible = false;
    } */
  }

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    try {
      this.all_products = await lastValueFrom(
        this.productsService.getProducts('1')
      );
      // debugger;
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
      // debugger;

      this.count = this.all_products.length;
      console.log(this.products);
    } catch (error) {}
  }

  changePage(event: any) {
    // debugger;
    const selectedValue = event.target.value;
    this.products = this.all_products.filter((element) => {
      if (element.page !== undefined && element.page !== null) {
        return element.page <= selectedValue * 1;
      }
      return false;
    });
  }

  showDropdown(product_id: any) {
    // debugger;
    this.dropdownVisible = !this.dropdownVisible;
    this.id_selected = product_id;
    this.click_away = false;
  }

  editarItem(product:any) {
     debugger;
    this.addProductModal.openModal(product);

    // Lógica para editar el elemento
  }

  async eliminarItem(id:any) {
     debugger;
     try {
      await lastValueFrom(this.productsService.deleteProducts('1', id))
      //alert("Se elimino correctamente!")
    } catch (error) {
      //alert("No se pudieron eliminar los datos!")
      window.location.reload();
    }
    // Lógica para eliminar el elemento
  }

  addItems() {
    this.addProductModal.openModal("1");
  }

  setSeleccionado(event: any) {}
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
