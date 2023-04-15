import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
export const navData = [
  {
    routerlink: 'dashboard',
    icon: 'fa-solid fa-calendar-days',
    label: 'Dashboard'
  },  
  {
    routerlink: 'documents',
    icon: 'fa-solid fa-pen-to-square',
    label: 'Documents'
  },
  {
    routerlink: 'students',
    icon: 'fa-solid fa-pen-to-square',
    label: 'Documents'
  },
] 

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  screenWidth = 0;
  collapsed = false;
  navData = navData;
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }
  
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }
  
  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
