---
layout: post
title: Material-Angular-Select Select All
tags: ['Angular', 'Material']
---

# Material Angular 下拉多选

```html
    <mat-form-field appearance="outline" >
      <mat-label>LabelName</mat-label>
      <mat-select formControlName="equipment" multiple required>
        <mat-select-trigger>{{ showEquipments }}</mat-select-trigger>
        <mat-option *ngIf="equipmentList.length" #allSelected (click)="toggleAllSelection()" [value]="'all'">全选</mat-option>
        <mat-option *ngFor="let item of equipmentList" [value]="item.equipmentCode" (click)="tosslePerOne()">{{ item.equipmentName }}</mat-option>
      </mat-select>
    </mat-form-field>
```

```ts
class AComponent {
  editForm = this.fb.group({
    equipment: []
  })
  equipmentCodeNameMap = new Map();
  equipmentList: any[] = [];
  @ViewChild('allSelected') private allSelected!: MatOption;

  constructor(protected fb: FormBuilder) {
    this.equipmentList.forEach(eq => {
      this.equipmentCodeNameMap.set(eq.equipmentCode, eq.equipmentName)
    })
  }

  get showEquipments() {
    if(this.editForm.get('equipment')?.value?.length>0) {
      return this.editForm.get('equipment')!.value.filter((item: any) => item !== 'all').map((item: any) => this.equipmentCodeNameMap.get(item))
    }else {
      return this.editForm.get('equipment')!.value
    }
  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.editForm.controls.equipment
        .patchValue([...this.equipmentList.map(item => item.equipmentCode), 'all']);
    } else {
      this.editForm.controls.equipment.patchValue([]);
    }
  }

  tosslePerOne(): void {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return
    }
    if (this.editForm.controls.equipment.value.length === this.equipmentList.length) {
      this.allSelected.select();
    }
  }
}
```
