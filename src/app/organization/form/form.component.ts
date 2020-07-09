import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { OrganizationService, Organization } from 'src/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less'],
})
export class FormComponent implements OnInit {
  constructor(
    public svcOrganization: OrganizationService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { organization: Organization }
  ) {}

  ngOnInit(): void {
    if (this.data.organization === undefined) {
      this.data.organization = {};
    }
  }

  submit(): void {
    console.log('submit');
  }

  cancel(): void {
    this.dialogRef.close(0);
  }

  confirm(): void {
    let obs: Observable<{}>;
    if (this.data.organization.id === undefined) {
      obs = this.svcOrganization.addOrganization(this.data.organization);
    } else {
      obs = this.svcOrganization.updateOrganization(
        this.data.organization.id,
        this.data.organization
      );
    }
    obs.subscribe(
      () => this.dialogRef.close(1),
      (error) => this.dialogRef.close(0)
    );
  }
}
