import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonDublicateComponent } from './json-dublicate.component';

describe('JsonDublicateComponent', () => {
  let component: JsonDublicateComponent;
  let fixture: ComponentFixture<JsonDublicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonDublicateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JsonDublicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
