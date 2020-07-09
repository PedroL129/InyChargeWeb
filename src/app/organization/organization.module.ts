import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ApiModule } from '../../api';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    ApiModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [],
})
export class OrganizationModule {}
