# UserFlow Dashboard

A dark-blue dashboard built with React and Vite. It provides a clean user management interface with:

- glassmorphism dashboard styling
- user count summary card
- add user form
- searchable user table
- animated appearance effects

## Setup

```bash
cd "c:\Users\Admin\Desktop\my-frontend"
npm install
npm run dev
```

Open the app at `http://localhost:5174/`.

## GitHub Pages

This project uses `vite` base path support for GitHub Pages.

To publish:

```bash
npm run build:docs
```

Then set the repository Pages source to:
- Branch: `main`
- Folder: `/docs`

After that, the site should work at:
`https://AK1732.github.io/my-frontend/`

## API

This frontend expects the API to run at `http://localhost:5000/users`.
Supported endpoints:

- `GET /users`
- `POST /users`
- `DELETE /users/:id`

## License

MIT
