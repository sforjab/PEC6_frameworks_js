import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage'
})
export class DefaultImagePipe implements PipeTransform {

  // El método 'transform' es requerido por la interfaz 'PipeTransform' y se utiliza para transformar el valor de entrada
  transform(imageUrl: string): string {
    // Verificamos si la URL de la imagen está vacía
    if (imageUrl.trim() === '') {
      // En ese caso, devolvemos la ruta de la imagen por defecto
      return 'assets/images/default-image.jpg';
    } else {
      // Si la URL no está vacía, la devolvemos sin cambios
      return imageUrl;
    }
  }

}
