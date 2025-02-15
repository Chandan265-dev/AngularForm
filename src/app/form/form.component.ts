import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  form: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      hobbies: this.fb.array([]), 
      address: ['', Validators.required],
      age: [18, Validators.required],
      date: ['', Validators.required],
      color: ['#000000', Validators.required],
      file: [null],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      country: ['', Validators.required],
    });
  }

  get hobbies(): FormArray {
    return this.form.get('hobbies') as FormArray;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);

      this.form.reset({
        age: 18,
        color: '#000000'
      });

      this.fileInput.nativeElement.value = '';
    } else {
      console.log('Form Invalid');
      this.form.markAllAsTouched();
    }
  }

  onCheckboxChange(event: any) {
    const hobbyValue = event.target.value;

    if (event.target.checked) {
      this.hobbies.push(new FormControl(hobbyValue));
    } else {
      const index = this.hobbies.controls.findIndex(
        (control) => control.value === hobbyValue
      );
      if (index >= 0) {
        this.hobbies.removeAt(index);
      }
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({ file: file });
    }
  }
}