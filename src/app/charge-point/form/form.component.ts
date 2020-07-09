import { Component, OnInit, Inject } from '@angular/core';
import {
  ChargePointService,
  ChargePoint,
  OrganizationService,
  Organization,
} from 'src/api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less'],
})
export class FormComponent implements OnInit {
  organizations: Organization[] = [];

  constructor(
    public svcChargePoint: ChargePointService,
    public svcOrganization: OrganizationService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { chargePoint: ChargePoint }
  ) {}

  ngOnInit(): void {
    this.svcOrganization
      .getAllOrganizations()
      .subscribe((result) => (this.organizations = result));

    if (this.data.chargePoint === undefined) {
      this.data.chargePoint = { cpo: {} };
    }
  }

  submit(): void {}

  cancel(): void {
    this.dialogRef.close(0);
  }

  confirm(): void {
    let obs: Observable<{}>;
    if (this.data.chargePoint.id === undefined) {
      obs = this.svcChargePoint.addChargePoint(this.data.chargePoint);
    } else {
      obs = this.svcChargePoint.updateChargePoint(
        this.data.chargePoint.id,
        this.data.chargePoint
      );
    }
    obs.subscribe(
      () => this.dialogRef.close(1),
      (error) => this.dialogRef.close(0)
    );
  }

  objectComparisonFunction(option, value): boolean {
    return option.id === value.id;
  }
}
