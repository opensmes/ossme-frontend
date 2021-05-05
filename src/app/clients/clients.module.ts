import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientListComponent } from './client-list/client-list.component';
import { MaterialModule } from './../common/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClientListComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [ClientListComponent],
})
export class ClientsModule {}
