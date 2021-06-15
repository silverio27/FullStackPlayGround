# .net 5 + angular + po-ui

## angular web app + po-ui

> Esse projeto utiliza a versão Angular CLI: 12.0.1

Crie o projeto com o comando abaixo:

```CMD
ng new app
```

Diga sim para a pergunta sobre criação de rota e escolha CSS como linguagem de estilo

Adicione o pacote de ui do Po-UI

```CMD
ng add @po-ui/ng-components
```

Diga sim para criação do procedimento e para criação de menu lateral

Adicione o pacote de template do PO-UI

```CMD
ng add @po-ui/ng-templates
```

crie o componente de leitura de dados

```CMD
ng generate @po-ui/ng-templates:po-page-dynamic-table
```

quando perguntado, informe o nome PetTable

crie o componente de edição de dados

```CMD
ng generate @po-ui/ng-templates:po-page-dynamic-edit
```

adicione as rotas em app-routingo.module.ts

```TS
const routes: Routes = [
  { path: 'new', component: PetEditComponent },
  { path: 'edit/:id', component: PetEditComponent },
  { path: 'table', component: PetTableComponent },
  { path: '', pathMatch: 'full', redirectTo: 'table' },
];
```
altere o código de app.component.html para adicionar elemento router-outlet e o título do aplicativo

```HTML
<div class="po-wrapper">
  <po-toolbar p-title="Pet App"></po-toolbar>

  <po-menu [p-menus]="menus"></po-menu>

  <router-outlet></router-outlet>
</div>

```

altere o código de app.component.ts para dar suporte as rotas criadas

````TS
import { Component } from "@angular/core";

import { PoMenuItem } from "@po-ui/ng-components";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  readonly menus: Array<PoMenuItem> = [{ label: "Pets", link: "/table" }];
}
````

adicione a propriedade service em environments/environment.ts

```TS
export const environment = {
  production: false,
  service: 'http://localhost:5000/api/pet'
};
```

altere o endpoint e as propriedades em pet-table/pet-table.component.ts

```TS
...
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pet-table',
  templateUrl: './pet-table.component.html',
  styleUrls: ['./pet-table.component.css']
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
  ...
```

adicione a propriedade field em pet-table/pet-table.component.html

````HTML
<po-page-dynamic-table
  p-title="PetTable"
  [p-actions]="actions"
  [p-service-api]="apiService"
  [p-fields]="fields">

  <!-- BUILD YOUR CONTENT PAGE HERE -->
</po-page-dynamic-table>

````

em em pet-edit/pet-edit.component.ts

```TS
...
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['./pet-edit.component.css']
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
...
```

o código de app.component.html
````HTML
<po-page-dynamic-edit
  p-title="PetEdit"
  [p-service-api]="apiService"
  [p-fields]="fields"
  [p-actions]="actions">

  <!-- BUILD YOUR CONTENT PAGE HERE -->
</po-page-dynamic-edit>
````
