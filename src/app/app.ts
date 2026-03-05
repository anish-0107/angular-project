import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { ErrorHandle } from "./shared/error-handle/error-handle";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ErrorHandle,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('final-angular');
}
