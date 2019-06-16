import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletPaneComponent } from './wallet-pane.component';

describe('WalletPaneComponent', () => {
  let component: WalletPaneComponent;
  let fixture: ComponentFixture<WalletPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
