import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFriendComponent } from './my-friend.component';

describe('MyFriendComponent', () => {
  let component: MyFriendComponent;
  let fixture: ComponentFixture<MyFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
