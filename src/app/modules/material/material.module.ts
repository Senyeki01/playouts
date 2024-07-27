import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';

const ImportExport = [
  MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, MatSidenavModule,
  MatTableModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ImportExport
  ],
  exports: [
    ImportExport
  ]
})
export class MaterialModule { }
