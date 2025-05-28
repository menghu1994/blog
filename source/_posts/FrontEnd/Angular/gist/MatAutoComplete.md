---
layout: post
title: Angular Material MatInput Autocomplete
excerpt: Angular Material输入组件自动完成
index_img: https://img0.baidu.com/it/u=1569655928,1360085629&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=375
tags: ['Angular', 'Gist', 'Material']
categories:
 - FrontEnd
---

# Angular Material输入组件自动完成

```js
@Component({
  selector: 'app-select-all',    
  imports: [MatSelectModule, MatOptionModule],
  template: `
    <form [formGroup]="form">
      <mat-form-field appearance="standard">
        <mat-label>生产线</mat-label>
        <input matInput formControlName="productionLine" [matAutocomplete]="auto" (ngModelChange)="codeInput($event)">
        <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selectLine($event)">
          <mat-option *ngFor="let line of productionLineList" [value]="line.name" [matTooltip]="line.name" >
            {{line.name}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </form>
  `
})
export class SelectAllComponent implements OnInit {
  basicForm = this.fb.group({
    productionLine: [null, Validators.required]
  })
  productionLineList = [{name: 'P1'}, {name: 'P2'},{name: 'P3'}]

  productionLineTerms = new Subject<string>();

  constructor(
    private fb:FormBuilder,
    protected productionLineService: ProductionLineService,
  ) {
    this.basicForm.valueChanges.pipe(debounceTime(300)).subscribe(result => {
      if(this.basicForm.valid) {
        // 根据过滤条件查询信息或其他操作
      }
    })
  }

  ngOnInit(): void {
    this.productionLineTerms.pipe(
      debounceTime(400),
      filter((val: string): boolean => this.basicForm.valid),
      switchMap((val: string): ObservableInput<any> =>
      this.productionLineService.query({ page: 0, size: 20, "name.contains": val })
    )).subscribe(res => {
      this.productionLineList = res.body ?? [];
    })
  }

  codeInput(val?: string): void {
    if(val) {
      this.productionLineTerms.next(val)
    } else {
      // 清空操作  
    }
  }

  selectLine($event: MatAutocompleteSelectedEvent): void {
    // $event.option.value
    // 选择操作
  }

}
```
