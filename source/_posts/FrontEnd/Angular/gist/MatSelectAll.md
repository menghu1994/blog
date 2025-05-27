---
layout: post
title: Angular Material MatSelect Select All
index_img: https://opensource.google/images/projects/os-projects-angular_thumbnail.png
tags: ['Angular', 'Gist', 'Material']
categories:
 - FrontEnd
---

# Angular Material组件下拉选择全选

```js
@Component({
  selector: 'app-select-all',    
  imports: [MatSelectModule, MatOptionModule],
  template: `
    <form [formGroup]="form">
      <mat-form-field appearance="fill">
        <mat-label>生产线</mat-label>
        <mat-select formControlName="productionLine" multiple>
          <mat-select-trigger>{{ showPLs }}</mat-select-trigger>
          <mat-option #allSelected (click)="toggleAllSelection()" [value]="'all'">全选</mat-option>
          <mat-option *ngFor="let item of productionLineList" [value]="item" (click)="tosslePerOne(allSelected.viewValue)">{{ item.name }}</mat-option>
        </mat-select>
      </mat-form-field>
    </form>
  `
})
export class SelectAllComponent {
  basicForm = this.fb.group({
    productionLine: [null, Validators.required]
  })
  productionLineList = [{name: 'P1'}, {name: 'P2'},{name: 'P3'}]

  
  @ViewChild('allSelected') private allSelected: MatOption;

  constructor(
    private fb:FormBuilder
  ) {
    this.basicForm.valueChanges.pipe(debounceTime(300)).subscribe(result => {
      if(this.basicForm.valid) {
        // 根据过滤条件查询信息或其他操作
      }
    })
  }

  get showPLs() {
    if(this.basicForm.get('productionLine').value && this.basicForm.get('productionLine').value.length>0) {
      return this.basicForm.get('productionLine').value.filter(item => item !== 'all').map(item => item.name)
    }else {
      return this.basicForm.get('productionLine').value?.map(item => item.name)
    }
  }

  toggleAllSelection(): void {
    if (this.allSelected.selected) {
      this.basicForm.controls.productionLine
        .patchValue([...this.productionLineList, 'all']);
    } else {
      this.basicForm.controls.productionLine.patchValue([]);
    }
  }

  tosslePerOne(all): void {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return
    }
    if (this.basicForm.controls.productionLine.value.length === this.productionLineList.length) {
      this.allSelected.select();
    }
  }
}
```
