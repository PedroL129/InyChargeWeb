import { Component, OnInit, Inject } from '@angular/core';
import { OrganizationService, Organization } from 'src/api';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent implements OnInit {
  dataSource: Organization[] = [];
  displayedColumns: string[] = ['id', 'name', 'legalEntity', 'actions'];
  selected: Organization;
  constructor(
    private svcOrganization: OrganizationService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  loadData(): void {
    this.svcOrganization
      .getAllOrganizations()
      .subscribe((value) => (this.dataSource = value));
  }

  ngOnInit(): void {
    this.loadData();
  }

  deleteItem(entity: Organization): void {
    this.svcOrganization.deleteOrganization(entity.id).subscribe((success) => {
      this.snackBar.open('Removed', 'Done', {
        duration: 3000,
      });
      this.loadData();
    },
    error => {
      console.error(error);
      this.snackBar.open('Error at remove element', 'Done', {
        duration: 3000,
      });
    });
  }

  addOrEdit(row: Organization): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '250px',
      data: { isNew: true, organization: row },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }
    });
  }
}
