


import { AppComponent } from '../app/app.component';
//import { PriceProductComponent } from './modules/product-price/pages/price-product/price-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {
    path: 'scanner',//TODO (Private)
      component: AppComponent,
    

  },

  // {
  //   path: 'product-location',//TODO (Private)
  //     component: SearchProductComponent,
  //   loadChildren: () => import(`./modules/product-location/product-location.module`).then(m => m.ProductLocationModule),

  // },
  // {
  //   path: 'product-price',//TODO (Private)
  //     component: PriceProductComponent,
  //   loadChildren: () => import(`./modules/product-price/product-price.module`).then(m => m.ProductPriceModule),

  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

