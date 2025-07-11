# Stockit

> _This is the client-side (Next.js) app for Stockit. The content and features are closely aligned with the [Stockit Backend](https://github.com/VaibhavTalkhande/stockit-backend), which provides the REST API and business logic. It also have a desktop version built with ElectronJS. For full backend features, API endpoints, and business logic, see the backend README._

Stockit is a modern inventory, sales, and customer management solution for retail stores. The frontend is built with [Next.js](https://nextjs.org) and communicates with a Node.js/Express/MongoDB backend. Stockit provides a responsive dashboard for managing your business, with authentication, analytics, and AI-powered business suggestions (via Gemini AI).

> **Backend is deployed on Render.**

## Related Projects

- **Frontend Nextjs GitHub:** [https://github.com/VaibhavTalkhande/stockit](https://github.com/VaibhavTalkhande/stockit)
- **Frontend Deployed App Link:** [https://stockit-wine.vercel.app](https://stockit-wine.vercel.app)
- **ElectronJS Desktop App:** [https://github.com/VaibhavTalkhande/stockit-desktop](https://github.com/VaibhavTalkhande/stockit-desktop)
- **Backend GitHub:** [https://github.com/VaibhavTalkhande/stockit-backend](https://github.com/VaibhavTalkhande/stockit-backend)

---

## Features

- **User Authentication:** Register, login, logout, JWT-based session management.
- **Password Management:** Forgot/reset password with secure email token flow.
- **Store Management:** Each user is associated with a store.
- **Product Management:** Add, edit, delete, and track products and stock.
- **Customer Management:** Add, edit, delete customers, view purchase history and insights.
- **Sales Management:** Create sales, track products sold, payment status, Stripe integration.
- **Billing & Email:** Generate and email bills/receipts to customers.
- **Payment Integration:** Stripe Checkout for online payments.
- **AI Business Suggestions:** Uses Gemini API to analyze store data and provide actionable business advice.
- **Analytics:** Daily sales, top-selling products, and more.
- **Fast, Responsive UI:** Built with Next.js, React, and Tailwind CSS.

---

## Getting Started

To run the Stockit frontend locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VaibhavTalkhande/stockit.git
   cd stockit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add:
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.onrender.com
   ```
   (Replace with your actual backend URL.)

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

---

## Project Structure

- `app/` - Main Next.js app directory (pages, layouts, etc.)
- `components/` - Reusable React components (e.g., Navbar, AuthProvider)
- `store/` - State management and providers
- `public/` - Static assets

---

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-toastify](https://fkhadra.github.io/react-toastify/)

---

## Deployment

Stockit frontend can be easily deployed on [Vercel](https://vercel.com/) or any platform that supports Next.js.

1. Push your code to a GitHub repository.
2. Import your project into Vercel.
3. Set the required environment variables in the Vercel dashboard.
4. Deploy!

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.

---

## License

MIT

---

_Made with ❤️ using Next.js. See also the [Stockit Backend](https://github.com/VaibhavTalkhande/stockit-backend) and [ElectronJS Desktop App](https://github.com/VaibhavTalkhande/stockit-desktop)._
