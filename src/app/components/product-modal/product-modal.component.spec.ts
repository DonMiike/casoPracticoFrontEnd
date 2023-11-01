import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductModalComponent } from './product-modal.component';
import { from } from 'rxjs';


describe('ProductModalComponent', () => {
  let component: ProductModalComponent;
  let fixture: ComponentFixture<ProductModalComponent>;

  // Before each test, set up the testing module and create the component
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductModalComponent],
      imports: [HttpClientTestingModule,ReactiveFormsModule],
    })
      .compileComponents();
    // Create a fixture and get the component instance
    fixture = TestBed.createComponent(ProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // Test: It should create the component successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
