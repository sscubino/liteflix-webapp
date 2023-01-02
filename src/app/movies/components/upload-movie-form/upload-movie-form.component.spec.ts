import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMovieFormComponent } from './upload-movie-form.component';

describe('UploadMovieComponent', () => {
  let component: UploadMovieFormComponent;
  let fixture: ComponentFixture<UploadMovieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadMovieFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMovieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
