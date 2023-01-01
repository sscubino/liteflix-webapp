import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMoviePageComponent } from './upload-movie.component';

describe('UploadMovieComponent', () => {
  let component: UploadMoviePageComponent;
  let fixture: ComponentFixture<UploadMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadMoviePageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
