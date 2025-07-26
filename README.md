# IEEE Student Branch UKFCET Website

This is the official website for the IEEE Student Branch at UKF College of Engineering and Technology. The website is built using Next.js, React, Tailwind CSS, and Shadcn UI components.

## Features

- Server-side rendering for improved performance and SEO
- Responsive design for all device sizes
- Interactive UI components with smooth animations
- 3D background scene using Three.js
- Contact form with validation

## Tech Stack

- **Next.js**: For server-side rendering and routing
- **React**: UI library
- **Tailwind CSS**: For styling
- **Shadcn UI**: For pre-built accessible components
- **Three.js**: For 3D scene in the hero section
- **React Hook Form**: For form handling
- **Zod**: For form validation
- **React Query**: For data fetching and caching

## Getting Started

### Prerequisites

- Node.js (v16.14 or newer)
- npm, yarn, or bun

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ieeesbukfcet/website.git
   cd website/nextremake
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
nextremake/
├── app/                # Next.js app router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page
│   ├── not-found.tsx   # 404 page
│   ├── providers.tsx   # Context providers
│   └── scripts.js      # Client-side scripts
├── components/         # React components
│   ├── ui/             # Reusable UI components
│   ├── sections/       # Page sections
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer component
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── public/             # Static assets
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── package.json        # Project dependencies
```

## Deployment

The site can be deployed to platforms like Vercel, Netlify, or any hosting service that supports Next.js applications.

```bash
npm run build
# or
yarn build
# or
bun build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
