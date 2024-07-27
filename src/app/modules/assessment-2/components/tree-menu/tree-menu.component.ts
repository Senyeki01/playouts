import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-tree-menu',
  templateUrl: './tree-menu.component.html',
  styleUrls: ['./tree-menu.component.scss']
})
export class TreeMenuComponent {
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();

  constructor(private dataService: DataService) {
    this.dataService.getManagerScene().subscribe((res: any) => {
      this.dataSource.data = [res];
      console.log(res)
    })
  }

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
}
