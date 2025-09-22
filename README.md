# Tobarsinho Shop

Tienda online creada con **React**, **Firebase** y **Bootstrap**.  
Permite:

- Registro e inicio de sesión de usuarios.
- Listado de productos con imágenes y precios.
- Carrito de compras con cantidades y total dinámico.
- Formulario de contacto funcional conectado a Firebase.

## Tecnologías utilizadas

- React
- Firebase Auth & Firestore
- Bootstrap 5
- JavaScript (ES6+)

## Estructura del proyecto

/public
/images -> Imágenes de los productos
/src
/components -> Componentes: ProductList, ProductItem, Cart, Formulario, Login
App.js -> Componente principal
firebaseConfig.js -> Configuración Firebase

## Instalación y ejecución

1. Clonar el repositorio:

2. Instalar dependencias: npm install

3. Ejecutar la aplicación: npm start

## Despliegue en Netlify

1. Crear una cuenta en [Netlify](https://www.netlify.com/).  
2. Conectar el repositorio de GitHub.  
3. Configurar build command: `npm run build`  
4. Publish directory: `build/`  
5. Publicar y copiar el link final.

## Notas

- Asegúrate de configurar tu **firebaseConfig.js** con tus credenciales de Firebase.
- La app es **responsive** y funciona en dispositivos móviles y escritorio.