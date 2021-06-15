import { Component, OnInit } from "@angular/core";

import {
  PoPageDynamicEditActions,
  PoPageDynamicEditField,
} from "@po-ui/ng-templates";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-pet-edit",
  templateUrl: "./pet-edit.component.html",
  styleUrls: ["./pet-edit.component.css"],
})
export class PetEditComponent implements OnInit {
  // PLEASE ADD THE API URL SERVICE HERE
  readonly apiService = environment.service;

  readonly fields: Array<PoPageDynamicEditField> = [
    { property: "id", label: "Id", key: true, visible: false },
    { property: "nome", label: "Nome" },
    { property: "raca", label: "Raça" },
    { property: "dono", label: "Dono" },
  ];

  public readonly actions: PoPageDynamicEditActions = {
    save: "/table",
    saveNew: "/new",
  };

  constructor() {}

  ngOnInit() {}
}
