import { Component, OnInit } from '@angular/core';
import { ChargePoint, ChargePointService } from 'src/api';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent implements OnInit {
  dataSource: ChargePoint[] = [];
  displayedColumns: string[] = ['id', 'identity', 'cpo', 'actions'];
  selected: ChargePoint;
  constructor(
    private svcChargePoint: ChargePointService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  loadData(): void {
    this.svcChargePoint
      .getAllChargerPoints()
      .subscribe((value) => (this.dataSource = value));
  }

  ngOnInit(): void {
    this.loadData();
  }

  deleteItem(entity: ChargePoint): void {
    this.svcChargePoint.deleteChagerPoint(entity.id).subscribe(
      (success) => {
        this.snackBar.open('Removed', 'Done', {
          duration: 3000,
        });
        this.loadData();
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Error at remove element', 'Done', {
          duration: 3000,
        });
      }
    );
  }

  addOrEdit(row: ChargePoint): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '250px',
      data: { isNew: true, chargePoint: row },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }else{
        this.snackBar.open('Error at save', 'Done', {
          duration: 3000,
        });
      }
    });
  }
}
