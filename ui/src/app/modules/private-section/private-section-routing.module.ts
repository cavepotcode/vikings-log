import { Routes, RouterModule } from '@angular/router';
import { PrivateComponent } from './components/private/private.component'

const routes: Routes = [
  { 
    path: 'privateLogs', 
    component: PrivateComponent,
    children:[]
  },
];

export const PrivateRouting = RouterModule.forRoot(routes);
