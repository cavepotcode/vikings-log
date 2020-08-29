import { Routes, RouterModule } from '@angular/router';
import { PrivateComponent } from './components/private/private.component';
import { LogComponent } from './components/log/log.component';

const routes: Routes = [
  {
    path: 'private',
    component: PrivateComponent,
    children: [
      {
        path: 'logs',
        children: [{
          path: ':id',
          component: LogComponent,
        }]
      },
    ]
  },
];

export const PrivateRouting = RouterModule.forRoot(routes);
