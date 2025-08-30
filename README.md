# Todo App

A modern, full-featured Todo application built with Next.js, TypeScript, Material-UI, and Zustand for state management. This app uses local JSON file storage with API routes instead of external APIs, making it completely self-contained and easy to run locally.

## 🚀 Features

- ✅ Create, read, update, and delete todos
- 🎯 Mark todos as complete/incomplete
- 🎨 Beautiful Material-UI interface
- 📱 Responsive design for all devices
- 🔄 Real-time state management with Zustand
- 💾 Local JSON file storage (no external database required)
- 🚀 Fast development with Next.js hot reload
- 📝 TypeScript for type safety

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: Zustand
- **Data Storage**: Local JSON file with Node.js File System API
- **API**: Next.js API Routes
- **Styling**: MUI Components + CSS-in-JS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16.0 or higher)
- npm, yarn, pnpm, or bun package manager

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd todoapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

The page auto-updates as you edit the files thanks to Next.js hot reload functionality.

## 📁 Project Structure

```
todoapp/
├── app/                    # Next.js App Router directory
│   ├── api/               # API routes for todo operations
│   │   └── todos/         # Todo CRUD endpoints
│   ├── components/        # React components
│   ├── store/            # Zustand store configuration
│   ├── types/            # TypeScript type definitions
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page component
├── data/                 # JSON file storage
│   └── todos.json       # Local database file
├── public/              # Static assets
└── package.json        # Project dependencies
```

## 🔌 API Endpoints

The app uses Next.js API routes for data operations:

- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/[id]` - Update a specific todo
- `DELETE /api/todos/[id]` - Delete a specific todo

All data is stored in a local `data/todos.json` file using Node.js File System operations.

## 🎯 Key Components

- **TodoList**: Main component displaying all todos
- **TodoItem**: Individual todo item with edit/delete actions
- **AddTodo**: Form component for creating new todos
- **TodoStore**: Zustand store managing application state

## 🎨 Material-UI Integration

The app uses Material-UI components for a consistent, modern design:
- Typography and spacing following Material Design principles
- Responsive Grid system
- Interactive buttons and form elements
- Loading states and animations
- Dark/light theme support (if implemented)

## 📊 State Management

Zustand provides lightweight, efficient state management:
- Global todo state
- Async actions for API calls
- Optimistic updates for better UX
- Minimal boilerplate compared to Redux

## 🚀 Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🔧 Development Notes

- The JSON file (`data/todos.json`) is automatically created on first run
- File system operations are handled server-side via API routes
- TypeScript provides compile-time type checking for better code quality
- MUI theming can be customized in the theme configuration
- Zustand store is lightweight and doesn't require providers

## 📚 Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Material-UI Documentation](https://mui.com/getting-started/installation/) - comprehensive MUI component guide
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction) - simple state management
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - TypeScript language reference

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Issues & Support

If you encounter any issues or have questions:
1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs

---

**Happy coding! 🚀**