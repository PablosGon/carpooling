import { Component, Input } from '@angular/core';
import { Profile } from '../../interfaces/profile.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  @Input() public profile?:Profile

  goToUserPage(){
    if(this.profile!.id) window.location.href="/usuario" + this.profile!.id
  }

}
