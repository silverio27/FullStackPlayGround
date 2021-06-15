import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PoPageDynamicTableModule } from '@po-ui/ng-templates';

import { PetTableComponent } from './pet-table.component';

describe('PetTableComponent', () => {
  let component: PetTableComponent;
  let fixture: ComponentFixture<PetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PoPageDynamicTableModule
      ],
      declarations: [ PetTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
