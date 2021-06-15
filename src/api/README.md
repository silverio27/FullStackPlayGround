# .net 5 + angular + po-ui

## .net 5 web api

Crie o projeto com o comando abaixo:

```CMD
dotnet new webapi -o api
```

> Apague as classes **WeatherForecast.cs** e **Controllers/WeatherForecastController.cs**

Navegue até a pasta do projeto

```CMD
cd api
```

Crie um arquivo de gitignore
````CMD
dotnet new gitignore
````

Crie a pasta **Models** e crie a classe **Pet**:

```CMD
md Models
cd . > Models/Pet.cs
```

A classe Pet.cs deve ter o seguinte código:

```C#
namespace api.Models
{
    public class Pet
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Raca { get; set; }
        public string Dono { get; set; }
    }
}
```

Instale o pacote Microsoft.EntityFrameworkCore.InMemory

```CMD
dotnet add package Microsoft.EntityFrameworkCore.InMemory --version 5.0.7
```

Crie a pasta **Data** e crie a classe **DataContext**:

```CMD
md Data
cd . > Data/DataContext.cs
```

A classe DataContext.cs deve ter o seguinte código:

```C#
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options) { }
        public DbSet<Pet> Pet { get; set; }
    }
}
```

Adicione o trecho abaixo no método ConfigureServices na classe Startup.cs

````C#
public void ConfigureServices(IServiceCollection services)

    services.AddControllers();
    services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "api", Version = "v1" });
    })

    //adicione este trecho
    services.AddDbContext<DataContext>(opt => opt.UseInMemoryDatabase("DataBase"));
}
````

Instale a ferramenta de geração de código

````CMD
dotnet tool install -g dotnet-aspnet-codegenerator
````
ou atualize caso ela já esteja instalada
````CMD
dotnet tool update -g dotnet-aspnet-codegenerator
````

````CMD
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
````

Gere o scaffolding do model Pet.cs
````CMD
dotnet aspnet-codegenerator controller -name PetController -async -api -m Pet -dc DataContext -outDir Controllers
````

Observe o código criado em Controllers/PetController.cs, foi criada uma operação de crud completo.

instale a extensão do vscode Thunder Client ou utilize o postmand para testar

utilize o endpoint https://localhost:5001/api/pet e alterne os métodos GET/POST/PUT/DELETE

para permitir os teste do endpoint no aplicativo angular temos q liberar o cors
em Startup.cs altere  o método Configure

````C#
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "api v1"));
            }

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
````

refatore o método GetPet em Controllers/PetController.cs para compatibilidade 
com o contrato de api do po-ui: https://po-ui.io/guides/api#successMessagesForCollections

````C#
...
        [HttpGet]
        public async Task<ActionResult<dynamic>> GetPet()
        {
            var pets =  await _context.Pet.ToListAsync();

            return new {
                hasNext = false,
                items = pets
            };
        }
...
````
