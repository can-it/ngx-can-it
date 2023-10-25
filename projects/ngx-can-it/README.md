# NgxCanIt

NgxCanIt is an Angular library that provides an easy and efficient way to implement authorization in your application. With NgxCanIt, you can quickly integrate complex authorization scenarios into your app in just a few minutes.

## Features

- Simplified authorization implementation: NgxCanIt simplifies the process of adding authorization functionality to your Angular app with the provided `CanItPipe` and `CanItDirective`.
- Support for nested authorization scenarios: Use `NgxCanIt.forNewScope()` to create a new authorization scope, which helps in cases where the app has multiple authorization contexts.

## Installation

To install NgxCanIt, you can use npm, yarn, or pnpm. Run one of the following commands in your project directory:

```shell
npm install ngx-can-it
```

```shell
yarn add ngx-can-it
```

```shell
pnpm add ngx-can-it
```

## Usage

1. Import the `NgxCanItModule` into your Angular application's module:

```typescript
import { NgxCanItModule } from 'ngx-can-it';

@NgModule({
  imports: [
    // ...
    NgxCanItModule.forNewScope(),
    // ...
  ],
})
export class AppModule { }
```

2. Implement authorization logic in your component:

```typescript
import { Component } from '@angular/core';
import { NgxCanItService } from 'ngx-can-it';

@Component({
  selector: 'app-my-component',
  template: `
    <div *canIt="['view', 'user']">
      <!-- Content visible to users with [view, user] permission -->
    </div>
    <div *canIt="['view', 'products']">
      <!-- Content visible to users with [view, products] permission -->
    </div>
  `,
})
export class MyComponent {
  constructor(private canItService: NgxCanItService) {}

  // Check user permissions
  checkPermissions() {
    const canViewUser$ = this.canItService.can(['view', 'user']);
    const canDeleteUser$ = this.canItService.can(['delete', 'user']);
    // ...
  }
}
```
