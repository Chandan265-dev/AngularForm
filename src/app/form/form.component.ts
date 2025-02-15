// import { NgIf } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-form',
//   standalone: true,
//   imports: [ReactiveFormsModule, NgIf],
//   templateUrl: './form.component.html',
//   styleUrl: './form.component.scss'
// })
// export class FormComponent {
//   form: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.form = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       gender: ['', Validators.required],
//       hobbies: this.fb.array([]),  
//       address: ['', Validators.required],
//       age: [18, Validators.required],
//       date: ['', Validators.required],  
//       // dropdown: ['', Validators.required], 
//       color: ['#000000', Validators.required], 
//       file: [null], 
//       // number: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
//       phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Phone validation
//       country: ['', Validators.required],
//     });
//   }


//   // get hobbies(): FormArray {
//   //   return this.form.get('hobbies') as FormArray;
//   // }
//   onSubmit() {
//     if (this.form.valid) {
//       console.log('Form Submitted:', this.form.value);

//       this.form.reset();
//       this.form.setValue({
//         name: '',
//         email: '',
//         password: '',
//         gender: '',
//         hobbies: [], 
//         address: '',
//         age: 18,
//         date: '',
//         dropdown: '',
//         color: '#000000',
//         file: '',
//         number: ''
//       });

//       const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//       checkboxes.forEach((checkbox: any) => {
//         checkbox.checked = false;
//       });
//     } else {
//       console.log('Form Invalid');
//     }
//   }

//   onCheckboxChange(event: any) {
//     let hobbies = this.form.get('hobbies')?.value || [];

//     if (event.target.checked) {
//       hobbies = [...hobbies, event.target.value]; 
//     } else {
//       hobbies = hobbies.filter((hobby: string) => hobby !== event.target.value); 
//     }

//     this.form.patchValue({ hobbies: hobbies });
//   }


//   onFileChange(event: any) {
//     const file = event.target.files[0];
//     this.form.patchValue({ file: file });
//   }
// }









import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
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

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      console.log('Hobbies:', this.form.value.hobbies);
      
      // Reset form properly
      this.form.reset({
        age: 18,
        color: '#000000'
      });
      
      // Clear file input
      this.fileInput.nativeElement.value = '';
    } else {
      console.log('Form Invalid');
      this.form.markAllAsTouched();
    }
  }

  onCheckboxChange(event: any) {
    const hobbies = this.form.get('hobbies')?.value || [];
    
    if (event.target.checked) {
      hobbies.push(event.target.value);
    } else {
      const index = hobbies.indexOf(event.target.value);
      if (index >= 0) {
        hobbies.splice(index, 1);
      }
    }
    
    this.form.get('hobbies')?.setValue(hobbies);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({ file: file });
    }
  }
}