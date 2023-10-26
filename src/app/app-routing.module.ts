import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
//Define Routes 
const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'ProductModal', component: ProductModalComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  // Export the configured RouterModule
  exports: [RouterModule]
})
export class AppRoutingModule { }
