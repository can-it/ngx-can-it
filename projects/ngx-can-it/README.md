# @can-it/ngx (NgxCanIt)

An Angular library that provides an easy and efficient way to implement authorization in your application. With NgxCanIt, you can quickly integrate complex authorization scenarios into your app in just a few minutes.

## ⛔ Project Status
The project is still under development, which means there will be frequent breaking changes in versions 0.x.x. Please wait until version 1.0.0 for a more stable release.

## Features

- Simplified authorization implementation: NgxCanIt simplifies the process of adding authorization functionality to your Angular app with the provided `CanItPipe`, `CanItDirective`, etc..
- Support for nested authorization scenarios: Use `NgxCanItModule.forNewScope()` to create a new authorization scope, which helps in cases where the app has multiple authorization contexts.

## Installation

To install NgxCanIt, you can use npm, yarn, or pnpm. Run one of the following commands in your project directory:

```shell
npm install @can-it/ngx
```

```shell
yarn add @can-it/ngx
```

```shell
pnpm add @can-it/ngx
```

## Usage

1. Import the `NgxCanItModule` into your Angular application's module:

```typescript
import { NgxCanItModule } from '@can-it/ngx';

@NgModule({
  imports: [
    // ...
    NgxCanItModule.forNewScope(),
    // ...
  ],
})
export class AppModule { }
```

**Notice**:
You can import this NgModule multiple times by using `NgxCanItModule.forNewScope()` and `NgxCanItModule.forChild()`.
- `forNewScope(actionComparator?: Comparator, riComparator?: Comparator)` creates a new Policy State and comparators. You have to use the `PolicyStore` to set the permissions for this module, and all the directives, pipes, and components will use this state in their logic.
- `forChild()` is used to register for submodules and lazy-loaded submodules when you want to reuse the parent Policy State module.

2. Use the `PolicyStore` to set the permissions for the current user:

```typescript
import { Component } from '@angular/core';
import { PolicyStore } from '@can-it/ngx';

@Component({
  selector: 'app-component',
  template: `
    <!-- your component template -->
    <app-products-component></app-products-component>
  `,
})
export class AppComponent implements OnInit {
  constructor(private PolicyStore: PolicyStore) {}

  ngOnInit(): void {
    this.PolicyStore.update({
      allow: [
        ['edit', 'products'],
        ['view', 'users'],
      ]
    });
  }
}
```

3. Implement authorization logic in your component using the `canIt` pipe, `*canIt` directive, or `CanItService`:

```typescript
import { Component } from '@angular/core';
import { CanItService } from '@can-it/ngx';

@Component({
  selector: 'app-products-component',
  template: `
    <!-- Using *canIt directive -->
    <div *canIt="['edit', 'products'] else notAuthorized">
      <ul>
        <li>product 1</li>
        <li>product 2</li>
        <li>product 3</li>
      </ul>
    </div>
    <ng-template #notAuthorized>
      You cannot access this content.
    </ng-template>


    <!-- Using canIt pipe -->
    <button [class.inactive]="!(['create', 'products'] | canIt | async)">
      New Product
    </button>
  `,
})
export class ProductsComponent {
  constructor(private canItService: CanItService) {}

  // Check user permissions
  canViewUsers() {
    // using CanItService
    return this.canItService.can(['view', 'users']);
    // ...
  }
}
```
