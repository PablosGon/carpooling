import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { Cloudinary } from '@cloudinary/url-gen';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CloudinaryModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';

  ngOnInit(){
    const cld = new Cloudinary({cloud: {cloudName: 'dilfzvvw4'}});
    cld.image()
  }
}
