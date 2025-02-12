import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      hobbies: this.fb.array([]),  
      address: ['', Validators.required],
      age: [18, Validators.required] 
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);

      this.form.reset();
      this.form.setValue({
        name: '',
        email: '',
        password: '',
        gender: '',
        hobbies: [], 
        address: '',
        age: 18 
      });

      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox: any) => {
        checkbox.checked = false;
      });
    } else {
      console.log('Form Invalid');
    }
  }

  onCheckboxChange(event: any) {
    let hobbies = this.form.get('hobbies')?.value || [];

    if (event.target.checked) {
      hobbies = [...hobbies, event.target.value]; 
    } else {
      hobbies = hobbies.filter((hobby: string) => hobby !== event.target.value); 
    }

    this.form.patchValue({ hobbies: hobbies });
  }
}