import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsComponent } from './products.component';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ProductsService } from 'src/app/services/products.service';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductModalComponent],
      imports: [RouterTestingModule],
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

    spyOn(productsService, 'getProducts').and.returnValue(of(mockProducts));

    fixture.detectChanges();

    expect(component.products).toEqual(mockProducts);
    expect(component.all_products).toEqual(mockProducts);
  });

  it('should change displayed page based on user selection', () => {
 
    const mockProducts = [
      {
        id: '1',
        name: 'Product 1',
        page: 1,
      },
      {
        id: '2',
        name: 'Product 2',
        page: 2,
      },
    ];

    spyOn(productsService, 'getProducts').and.returnValue(of(mockProducts));

    fixture.detectChanges();

    component.changePage({ target: { value: '1' } });
    expect(component.products.length).toBe(1);
    expect(component.products[0].id).toBe('1');

    component.changePage({ target: { value: '2' } });
    expect(component.products.length).toBe(2);
    expect(component.products[0].id).toBe('1');
    expect(component.products[1].id).toBe('2');
  });

  it('should show and hide the dropdown menu', () => {
  
    const product_id = '1';

    expect(component.dropdownVisible).toBeFalse();
    expect(component.id_selected).toBeNull();

    component.showDropdown(product_id);

    expect(component.dropdownVisible).toBeTrue();
    expect(component.id_selected).toBe(product_id);

    component.showDropdown(product_id);
    expect(component.dropdownVisible).toBeFalse();
    expect(component.id_selected).toBeNull();
  });
});
