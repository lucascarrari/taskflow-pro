import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Toast } from '../toast/toast';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Sidebar, Toast],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  isSidebarCollapsed = false;

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}