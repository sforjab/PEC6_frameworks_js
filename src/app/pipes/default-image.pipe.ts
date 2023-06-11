import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage'
})
export class DefaultImagePipe implements PipeTransform {

  transform(imageUrl: string): string {
    if (imageUrl.trim() === '') {
      return 'assets/images/default-image.jpg'; // Ruta de la imagen por defecto
    } else {
      return imageUrl;
    }
  }

}
