import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Plaza } from '../../../../entity/plaza';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../environments/environment';
import { ImagesDefault } from '../../../../shared/constants/images-default.constant';

@Component({
  selector: 'app-viaje-plaza-item',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './viaje-plaza-item.component.html',
  styleUrl: './viaje-plaza-item.component.css'
})
export class ViajePlazaItemComponent {

  @Input() public plaza?:Plaza
  @Input() public hideButtons:boolean = true

  @Output() onAccept = new EventEmitter<number>()
  @Output() onReject = new EventEmitter<number>()
  @Output() onDelete = new EventEmitter<number>()

  readonly imagesDefault = ImagesDefault

  accept(){
    this.onAccept.emit(this.plaza?.id)
  }

  reject(){
    this.onReject.emit(this.plaza?.id)
  }

  remove(){
    this.onDelete.emit(this.plaza?.id)
  }

  usuarioImg(){

    let url = environment.BASE_CLOUDINARY_IMAGE_URL;

    if(this.plaza?.imagen) url += this.plaza.imagen
    else url += this.imagesDefault.usuarioDefault

    url += '.jpg'

    return url
  }

}
