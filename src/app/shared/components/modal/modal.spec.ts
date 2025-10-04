import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal';
import { CommonModule } from '@angular/common';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    
    // Correctly set InputSignal values using setInput
    fixture.componentRef.setInput('title', 'Test Modal Title');
    fixture.componentRef.setInput('isOpen', true);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Test Modal Title');
  });

  it('should emit closeModal event when close button is clicked', () => {
    spyOn(component.closeModal, 'emit');
    const closeButton = fixture.nativeElement.querySelector('button');
    closeButton.click();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should not be visible when isOpen is false', () => {
    // Correctly set InputSignal value for this test
    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.fixed')).toBeNull();
  });
});