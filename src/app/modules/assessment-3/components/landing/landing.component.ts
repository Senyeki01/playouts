import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

interface DataSource {
  code: string,
  description: string,
  rate: string,
  rate_float: number,
  symbol: string
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  chartName!: string;
  disclaimer!: string;
  updatedTime!: Date;

  displayedColumns: string[] = ['code', 'description', 'rate', 'rate_float', 'symbol'];
  dataSource!: MatTableDataSource<DataSource>;

  constructor(public api: ApiService) {
    this.api.getData()
      .subscribe((data: any) => {
        this.chartName = data.chartName;
        this.disclaimer = data.disclaimer;
        this.updatedTime = new Date(data.time.updatedISO);

        let _data: DataSource[] = [];

        Object.keys(data.bpi).forEach((bpiKey: string) => {
          _data.push(data.bpi[bpiKey])
        })
        console.log(_data);
        this.dataSource = new MatTableDataSource(_data);
      })
  }
}
