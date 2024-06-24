import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonMergeComponent } from './json-merge.component';

describe('JsonMergeComponent', () => {
  let component: JsonMergeComponent;
  let fixture: ComponentFixture<JsonMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonMergeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JsonMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
