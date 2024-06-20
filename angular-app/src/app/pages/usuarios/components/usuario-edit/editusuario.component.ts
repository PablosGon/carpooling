import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../../entity/usuario';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';

@Component({
  selector: 'app-editusuario',
  standalone: true,
  imports: [FormsModule, UsuarioFormComponent],
  templateUrl: './editusuario.component.html',
  styleUrl: './editusuario.component.css'
})
export class EditusuarioComponent {

  private route = inject(ActivatedRoute);
  id = parseInt(this.route.snapshot.paramMap.get('id')!);

  constructor(private usuarioService:UsuarioService){}

  async updateUsuario(usuario:Usuario){
    this.usuarioService.updateUsuario(this.id, usuario).subscribe(data => window.location.href='usuario/' + this.id)
  }

}
