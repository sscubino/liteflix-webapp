import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMovieModalComponent } from './upload-movie-modal.component';

describe('UploadMovieModalComponent', () => {
  let component: UploadMovieModalComponent;
  let fixture: ComponentFixture<UploadMovieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadMovieModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMovieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
