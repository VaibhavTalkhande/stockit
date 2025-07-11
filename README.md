# Stockit

Stockit is your go-to stock management solution, designed to help you efficiently track products, sales, and customers. Built with [Next.js](https://nextjs.org), Stockit provides a modern, responsive dashboard for managing your inventory and business operations.

## Related Projects

- **Frontend Nextjs GitHub:** [https://github.com/VaibhavTalkhande/stockit](https://github.com/VaibhavTalkhande/stockit)
- **Frontend Deployed App Link:** [https://stockit-wine.vercel.app](https://stockit-wine.vercel.app)
- **ElectronJS Desktop App:** [https://github.com/VaibhavTalkhande/stockit-desktop](https://github.com/VaibhavTalkhande/stockit-desktop)

- **Backend GitHub:** [https://github.com/VaibhavTalkhande/stockit-backend](https://github.com/VaibhavTalkhande/stockit-backend)

---
## Features

- 📦 Product management: Add, edit, and track your products.
- 🛒 Sales tracking: View and manage sales orders.
- 👥 Customer insights: Monitor your customer base and activity.
- 📊 Dashboard: Get real-time statistics on revenue, orders, customers, and inventory.
- 🔒 Authentication: Secure login and user management.
- ⚡ Fast and responsive UI.

## Getting Started

To run Stockit locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/stockit.git
   cd stockit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the following (replace with your actual backend URL):

   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open the app:**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Main Next.js app directory (pages, layouts, etc.)
- `components/` - Reusable React components (e.g., Navbar, AuthProvider)
- `store/` - State management and providers
- `public/` - Static assets

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-toastify](https://fkhadra.github.io/react-toastify/)

## Deployment

Stockit can be easily deployed on [Vercel](https://vercel.com/) or any platform that supports Next.js.

1. Push your code to a GitHub repository.
2. Import your project into Vercel.
3. Set the required environment variables in the Vercel dashboard.
4. Deploy!

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

---

Made with ❤️ using Next.js.
