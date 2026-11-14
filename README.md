# Next Auth App

Aplicación de autenticación con Next.js y NextAuth.js. Permite iniciar sesión con Google, GitHub o con correo y contraseña.

**Demo:** https://next-auth-app-pink.vercel.app

## Cómo registrarse

1. Entra a la página y haz clic en **Regístrate**, o ve directo a `/register`.
2. Completa tu nombre, correo y una contraseña de al menos 6 caracteres.
3. Haz clic en **Crear cuenta**. Te llevará a la página de inicio de sesión.

La contraseña se guarda cifrada con bcrypt.

## Cómo iniciar sesión

Puedes entrar de tres formas:

- **Correo y contraseña:** escribe los datos con los que te registraste y haz clic en **Iniciar sesión**.
- **Google:** haz clic en **Continue with Google** y elige tu cuenta.
- **GitHub:** haz clic en **Continue with GitHub** y autoriza la aplicación.

Al entrar se muestra el **Dashboard**, y desde el menú puedes ir a **Profile** o **Cerrar Sesión**.

## Bloqueo por intentos fallidos

Si ingresas una contraseña incorrecta 3 veces seguidas, la cuenta se bloquea por 5 minutos. Mientras tanto no se podrá iniciar sesión aunque la contraseña sea correcta.

## Rutas protegidas

`/dashboard` y `/profile` solo son accesibles con sesión iniciada. Si intentas entrar sin sesión, se redirige a la página de inicio de sesión.

## Ejecutar en local

```bash
npm install
npm run dev
```

Crear un archivo `.env` con las variables `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_ID`, `GITHUB_SECRET`, `NEXTAUTH_URL` y `NEXTAUTH_SECRET`.
