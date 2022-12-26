import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTumbnailComponent } from './movie-tumbnail.component';

describe('MovieTumbnailComponent', () => {
  let component: MovieTumbnailComponent;
  let fixture: ComponentFixture<MovieTumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieTumbnailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieTumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
