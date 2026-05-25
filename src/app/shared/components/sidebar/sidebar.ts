import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {
  LucideAngularModule,
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Columns3,
  ChevronLeft,
  ChevronRight
} from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideAngularModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  @Input() isCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  readonly icons = {
    dashboard: LayoutDashboard,
    projects: FolderKanban,
    tasks: CheckSquare,
    kanban: Columns3,
    collapse: ChevronLeft,
    expand: ChevronRight
  };
}