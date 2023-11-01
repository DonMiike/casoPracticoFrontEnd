import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsComponent } from './products.component';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ProductsService } from 'src/app/services/products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductModalComponent],
      imports: [RouterTestingModule, HttpClientTestingModule,ReactiveFormsModule],
      providers: [ProductsService],
    });

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on initialization', () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'logo1.png',
        date_release: '2023-10-26',
        date_revision: '2023-10-27',
        page: 1,
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        logo: 'logo2.png',
        date_release: '2023-10-26',
        date_revision: '2023-10-27',
        page: 2,
      },
    ];
    const mockProductsFromServices:any=[]
    const authorId='1'

    productsService.getProducts(authorId).subscribe((response:any) => {

      if (authorId === '1') {

        response = mockProductsFromServices;
      }console.log(response);
    }, (error:any) => {

      console.error(error);
    });


    fixture.detectChanges();

    expect(component.products).toEqual(mockProductsFromServices);
    expect(component.all_products).toEqual(mockProductsFromServices);
  });


})
