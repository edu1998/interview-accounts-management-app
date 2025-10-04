# AccountsMangementApp

AccountsMangementApp es una aplicación web desarrollada con Angular cuyo objetivo es facilitar la gestión de cuentas: permitir la visualización, creación de cuentas de banco de manera eficiente y centralizada. Está pensada como una solución para administrar información de cuentas en entornos empresariales o de proyectos.

## Características principales
- Listado de cuentas
- Creación cuentas
- Interfaz amigable, responsiva y moderna gracias a Angular

## Requisitos previos
Asegúrate de tener instalado lo siguiente antes de comenzar:

- [Node.js](https://nodejs.org/) (recomendado: versión 18.x o superior)
- [Angular CLI](https://angular.dev/tools/cli) (recomendado: versión 16.x o superior)

Si no tienes Angular CLI, instálalo globalmente:
```bash
npm install -g @angular/cli
```

## Instalación y ejecución local
Sigue estos pasos para correr la aplicación en tu entorno local:

1. Clona este repositorio y accede a la carpeta del proyecto:
   ```bash
   git clone <URL-del-repositorio>
   cd accounts-mangement-app
   ```

2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```

4. Abre tu navegador y navega a `http://localhost:4200/` para ver la aplicación en ejecución. La aplicación recargará automáticamente al detectar cambios en los archivos fuente.

## Comandos útiles

### Generar componentes u otros elementos
Utiliza Angular CLI para generar componentes, servicios y más:
```bash
ng generate component nombre-componente
```
Consulta todas las opciones disponibles:
```bash
ng generate --help
```

### Construir la aplicación para producción
Para compilar el proyecto y optimizarlo para producción:
```bash
ng build
```
El resultado se almacenará en la carpeta `dist/`.

### Ejecutar pruebas unitarias
Para ejecutar las pruebas unitarias con [Karma](https://karma-runner.github.io):
```bash
ng test
```

### Pruebas end-to-end (E2E)
Para pruebas de extremo a extremo:
```bash
ng e2e
```
*Nota: Angular CLI puede requerir que configures una herramienta de testing end-to-end a tu elección.*

## Más información
Consulta la [documentación oficial de Angular](https://angular.dev/) para aprender más sobre el framework y sus herramientas.
