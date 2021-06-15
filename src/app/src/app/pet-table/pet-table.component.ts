import { Component, OnInit } from "@angular/core";

import { PoPageDynamicTableActions, PoPageDynamicTableField } from "@po-ui/ng-templates";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-pet-table",
  templateUrl: "./pet-table.component.html",
  styleUrls: ["./pet-table.component.css"],
})
export class PetTableComponent implements OnInit {
  // PLEASE ADD THE API URL SERVICE HERE
  readonly apiService = environment.service;

  readonly actions: PoPageDynamicTableActions = {
    new: "/new",
    edit: "/edit/:id",
    remove: true,
  };

  readonly fields: Array<PoPageDynamicTableField> = [
    { property: "id", label: "Id", key: true },
    { property: "nome", label: "Nome" },
    { property: "raca", label: "Raça" },
    { property: "dono", label: "Dono" },
  ];
  constructor() {}

  ngOnInit() {}
}
