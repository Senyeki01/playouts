import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

const ImportExport = [
  MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule
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
