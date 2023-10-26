import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
})
export class ProductModalComponent implements OnInit {
  // Indicates whether the form is in edit mode
  public edit = false;
  // Initialize the form
  myForm: FormGroup;
  // Marks the form as submitted
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {
    // Initialize the form with validation rules
    this.myForm = this.fb.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      fechaLiberacion: [
        '',
        [Validators.required, this.fechaLiberacionValidator],
      ],
      fechaRevision: [''],
    });
  }

  fechaLiberacionValidator(control: any) {
    // Custom validator function for the release date
    const fechaLiberacion = new Date(control.value);
    const currentDate = new Date();

    const fechaLiberacionUTC = new Date(
      Date.UTC(
        fechaLiberacion.getUTCFullYear(),
        fechaLiberacion.getUTCMonth(),
        fechaLiberacion.getUTCDate()
      )
    );

    const currentDateUTC = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate()
      )
    );

    return fechaLiberacionUTC >= currentDateUTC ? null : { invalidDate: true };
  }

  ngOnInit(): void {
    // Disable the revision date input
    this.myForm.get('fechaRevision')!.disable();
  }
  public showModal = false;

  openModal(product: any) {
    // Open the modal for editing
    this.myForm.get('id')!.enable();
    this.myForm.patchValue({ id: product.id });
    this.myForm.patchValue({ logo: product.logo });
    this.myForm.patchValue({ descripcion: product.description });
    this.myForm.patchValue({ nombre: product.name });
    const fechaLiberacion = new Date(product.date_release);
    const fechaRevision = new Date(product.date_revision);

    const newDateFormat = this.formatFecha(fechaLiberacion);
    const newDateFormat2 = this.formatFecha(fechaRevision);

    this.myForm.patchValue({ fechaLiberacion: newDateFormat });
    this.myForm.patchValue({ fechaRevision: newDateFormat2 });
    if (product != '1') {
      this.myForm.get('id')!.disable();
      this.edit = true;
    } else {
      this.edit = false;
    }

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  async send() {
    // Mark the form as submitted
    this.formSubmitted = true;

    if (this.myForm.valid) {
      // Send the form data if it's valid
      this.myForm.get('fechaRevision')!.enable();

      const form: any = {
        id: this.myForm.value.id,
        name: this.myForm.value.nombre,
        description: this.myForm.value.descripcion,
        logo: this.myForm.value.logo,
        date_release: this.myForm.value.fechaLiberacion,
        date_revision: this.myForm.value.fechaRevision,
      };
      try {
        console.log('Formulario válido, valores enviados:', form);
        await lastValueFrom(this.productsService.addProducts('1', form));
        this.showModal = false;
        alert('Se envió correctamente!');
        window.location.reload();
      } catch (error) {
        alert('No se pudieron enviar los datos!');
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  async update() {
    // Mark the form as submitted
    this.formSubmitted = true;

    if (this.myForm.valid) {
      // Update the data if the form is valid
      this.myForm.get('fechaRevision')!.enable();
      this.myForm.get('id')!.enable();

      const form: any = {
        id: this.myForm.value.id,
        name: this.myForm.value.nombre,
        description: this.myForm.value.descripcion,
        logo: this.myForm.value.logo,
        date_release: this.myForm.value.fechaLiberacion,
        date_revision: this.myForm.value.fechaRevision,
      };
      console.log(form);

      try {
        console.log('Formulario válido, valores enviados:', form);
        await lastValueFrom(this.productsService.editProducts('1', form));
        this.showModal = false;
        alert('Se Actualizó correctamente!');
        window.location.reload();
      } catch (error) {
        alert('No se pudieron actualizar los datos!');
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  setDate() {
    // Set the revision date based on the release date
    const fechaLiberacion = new Date(this.myForm.value.fechaLiberacion);
    fechaLiberacion.setFullYear(fechaLiberacion.getFullYear() + 1);
    const newDateFormat = this.formatFecha(fechaLiberacion);

    this.myForm.patchValue({ fechaRevision: newDateFormat });
    console.log('Formulario válido, valores enviados:', this.myForm.value);
  }

  formatFecha(fecha: any) {
    // Format the date
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate() + 1;


    const mesFormateado = mes < 10 ? `0${mes}` : mes;
    const diaFormateado = dia < 10 ? `0${dia}` : dia;

    return `${año}-${mesFormateado}-${diaFormateado}`;
  }
}
