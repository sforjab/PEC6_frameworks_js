import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ArticleService } from '../services/article-service.service';

// Validador personalizado para el campo 'name'
function nameArticleValidator(control: AbstractControl): ValidationErrors | null {
  // Si el nombre ingresado se encuentra en la lista de nombres prohibidos, se devuelve un objeto con la clave 'forbiddenNameError' y el valor del nombre ingresado.
  const forbiddenNames = ['Prueba', 'Test', 'Mock', 'Fake'];
  const enteredName = control.value;
  if (forbiddenNames.includes(enteredName)) {
    return { forbiddenNameError: { value: enteredName } };
  }
  // Si el nombre ingresado no está en la lista de nombres prohibidos, se devuelve 'null', indicando que la validación ha pasado.
  return null;
}

@Component({
  selector: 'app-article-new-reactive',
  templateUrl: './article-new-reactive.component.html',
  styleUrls: ['./article-new-reactive.component.css']
})
export class ArticleNewReactiveComponent {
  // Añadimos el modificador '!' para indicar que la propiedad será inicializada en algún momento antes de su uso
  public articleForm!: FormGroup;
  // Variable para controlar si se ha enviado el formulario
  public submitted = false;
  // Almacenamos los valores enviados
  public submittedValues: any = null;

  
  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.articleForm = this.fb.group({
      name: ['', [Validators.required, nameArticleValidator]],
      price: [null, [Validators.required, Validators.min(0.1)]],
      imageUrl: ['', [Validators.required, Validators.pattern('^(https?:\\/\\/)(www\\.)?[A-Za-z0-9]+(\\.[A-Za-z]{2,3})\\/[^\s]*\\.(?:png|jpe?g|gif)$')]],
      isOnSale: [false]
    });
  }

  // Obtenemos los 'FormControl' de los distintos campos
  get name() { return this.articleForm.get('name'); }
  get price() { return this.articleForm.get('price'); }
  get imageUrl() { return this.articleForm.get('imageUrl'); }
  get isOnSale() { return this.articleForm.get('isOnSale'); }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const article = this.articleForm.value;
      this.articleService.create(article).subscribe(
        () => {
          // Lógica adicional después de crear el artículo, como redireccionar o mostrar un mensaje de éxito.
          this.submittedValues = { ...this.articleForm.value };
          this.submitted = true;
          console.log('Creando artículo', this.articleForm.value);
        },
        (error: any) => {
          // Manejo de errores en caso de fallo en la creación del artículo.
        }
      );
    } else {
      // Aseguramos que se muestren los mensajes de error marcando los campos como 'touched'
      this.articleForm.markAllAsTouched();
    }
  } 
}