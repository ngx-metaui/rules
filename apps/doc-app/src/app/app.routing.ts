import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'getting-started',
    loadChildren: './components/doc-page/doc-page.module#DocPageModule',
    data: { title: 'Getting Started' , path: 'assets/docs/getting-started.md'}
  },
  {
    path: 'oss-rules',
    loadChildren: './components/doc-page/doc-page.module#DocPageModule',
    data: { title: 'OSS Rules' , path: 'assets/docs/oss-rules.md'}
  },
  {
    path: 'oss-syntax',
    loadChildren: './components/doc-page/doc-page.module#DocPageModule',
    data: { title: 'OSS Syntax', path: 'assets/docs/oss-syntax.md'}
  },
  {
    path: 'metaui-architecture',
    loadChildren: './components/doc-page/doc-page.module#DocPageModule',
    data: { title: 'MetaUI Architecture' , path: 'assets/docs/metaui-architecture.md'}
  },
  {
    path: '',
    redirectTo: 'getting-started',
    pathMatch: 'full',
  }
];
