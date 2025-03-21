# LetWeHire

A modern tech hiring platform connecting companies with top talent for freelance, contract, and full-time roles.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.io/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Form Validation**: [Zod](https://github.com/colinhacks/zod)
- **UI Icons**: [Lucide Icons](https://lucide.dev/)
- **Theme Toggle**: [next-themes](https://github.com/pacocoursey/next-themes)

## Features

- User authentication (sign up, login, password reset)
- Role-based access control (admin, client, talent)
- Dark mode support
- Responsive design
- Job posting and application system
- Talent profiles and portfolio showcasing
- Client company profiles
- Real-time notifications
- Admin dashboard for platform management

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/letwebuild.git
cd letwebuild
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Copy the `.env.local.example` file to `.env.local` and update the values:

```bash
cp .env.local.example .env.local
```

Add your Supabase URL and anon key to the `.env.local` file.

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Database Setup

1. Create a new Supabase project
2. Set up the database tables according to the schema defined in `src/lib/supabase.ts`
3. Configure authentication providers (email/password, Google, GitHub)
4. Set up storage buckets for file uploads (resumes, portfolios, etc.)

## Project Structure

- `src/app/*` - Next.js app router pages
- `src/components/*` - React components
- `src/context/*` - React context providers
- `src/lib/*` - Utility functions and Supabase client
- `public/*` - Static assets

## Deployment

### Vercel Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/):

1. Create a new project on Vercel and connect your GitHub repository
2. Set up the following environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

The project includes a `postinstall` script that automatically installs all required dependencies and builds the project during deployment.

### Troubleshooting Deployment Issues

If you encounter issues during deployment:

1. **Missing dependencies**: Ensure all required packages are properly installed. The `postinstall` script should handle this, but you can manually install any missing packages.

2. **Build errors**: Check your environment variables are correctly set. The application uses mock data when environment variables are not available, but for production, real Supabase credentials are recommended.

3. **Type errors**: If you encounter TypeScript errors during build, update the affected components. The project has been configured to handle most common type issues.

4. **CSS optimization issues**: The project uses the `critters` package for CSS optimization. If you face issues with CSS rendering, consider disabling the `optimizeCss` experiment in `next.config.js`.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [React Hook Form Documentation](https://react-hook-form.com/get-started)

---

Built with ❤️ by [Your Name]
