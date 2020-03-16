import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'getting-started',
    loadChildren: () => import('./components/doc-page/doc-page.module').then(m => m.DocPageModule),
    data: { title: 'Getting Started' , path: 'assets/docs/getting-started.md'}
  },
  {
    path: 'oss-rules',
    loadChildren: () => import('./components/doc-page/doc-page.module').then(m => m.DocPageModule),
    data: { title: 'OSS Rules' , path: 'assets/docs/oss-rules.md'}
  },
  {
    path: 'oss-syntax',
    loadChildren: () => import('./components/doc-page/doc-page.module').then(m => m.DocPageModule),
    data: { title: 'OSS Syntax', path: 'assets/docs/oss-syntax.md'}
  },
  {
    path: 'metaui-architecture',
    loadChildren: () => import('./components/doc-page/doc-page.module').then(m => m.DocPageModule),
    data: { title: 'MetaUI Architecture' , path: 'assets/docs/metaui-architecture.md'}
  },
  {
    path: '',
    redirectTo: 'getting-started',
    pathMatch: 'full',
  }
];
