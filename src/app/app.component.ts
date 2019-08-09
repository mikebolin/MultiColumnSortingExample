import { Component } from '@angular/core';
import { products } from './products';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

@Component({
    selector: 'my-app',
    template: `
      <kendo-grid
          [resizable]="true"
          [data]="gridView"
          [height]="530"
          [sortable]="{
            allowUnsort: true,
            mode: multiple ? 'multiple' : 'single'
            }"
          [sort]="sort"
          (sortChange)="sortChange($event)"
        >
        <kendo-grid-column field="ProductID" title="ID" width="80">
        </kendo-grid-column>
                <kendo-grid-column field="UnitsInStock" title="UnitsInStock" width="80">
        </kendo-grid-column>
        <kendo-grid-column field="ProductName" title="Product Name" width="230">
        </kendo-grid-column >
        <kendo-grid-column field="SCAC" title="SCAC" width="230">
        </kendo-grid-column>
      </kendo-grid>
  `
})
export class AppComponent {
    public multiple = true;
    public allowUnsort = true;
    public sort: SortDescriptor[] = [{
      field: 'ProductName',
      dir: 'asc'
    }];
    public gridView: GridDataResult;
    public products: any[] = products;

    constructor() {
        this.loadProducts();
    }

    public sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadProducts();
    }

    private loadProducts(): void {
        this.gridView = {
            data: orderBy(this.products, this.sort),
            total: this.products.length
        };
    }
}
