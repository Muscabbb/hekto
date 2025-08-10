# HEKTO - Modern E-commerce Platform

A full-stack e-commerce application built with Next.js 15, featuring user authentication, product management, shopping cart, payment processing, and admin dashboard.

## 🚀 Features

### Core E-commerce Features

- **Product Catalog**: Browse and search products with advanced filtering
- **Shopping Cart**: Add/remove items, persistent cart across sessions
- **User Authentication**: Secure sign-up/sign-in with Clerk
- **Payment Processing**: Stripe integration for secure payments
- **Product Search**: Elasticsearch-powered search with real-time results
- **Product Recommendations**: AI-powered product suggestions
- **User Interactions**: Track product views, cart additions, and purchases
- **Responsive Design**: Mobile-first design with Tailwind CSS

### Admin Dashboard

- **Product Management**: Create, edit, and delete products
- **Analytics Dashboard**: Sales metrics and user interaction analytics
- **User Management**: View and manage user accounts
- **Payment Tracking**: Monitor payment status and transaction history

### Technical Features

- **Server-Side Rendering**: Next.js 15 with App Router
- **Database**: MongoDB with Prisma ORM
- **Search Engine**: Elasticsearch integration
- **File Uploads**: UploadThing for image management
- **Real-time Updates**: Dynamic content updates
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context API
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Carousel**: Embla Carousel
- **Charts**: Recharts for analytics

### Backend

- **Runtime**: Node.js
- **Database**: MongoDB
- **ORM**: Prisma
- **Authentication**: Clerk
- **Payments**: Stripe
- **Search**: Elasticsearch
- **File Storage**: UploadThing

### Development Tools

- **Language**: TypeScript
- **Linting**: ESLint
- **Package Manager**: npm
- **Environment**: dotenv

## 📁 Project Structure

```
hekto/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Authentication pages
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── (consumers)/         # Public-facing pages
│   │   │   ├── cart/
│   │   │   ├── products/
│   │   │   ├── recommendations/
│   │   │   └── components/
│   │   ├── admin/               # Admin dashboard
│   │   │   ├── analytics/
│   │   │   └── products/
│   │   └── api/                 # API routes
│   │       ├── admin/
│   │       ├── clerk/
│   │       ├── stripe/
│   │       └── products/
│   ├── components/              # Reusable UI components
│   │   └── ui/                  # shadcn/ui components
│   ├── context/                 # React Context providers
│   ├── lib/                     # Utility libraries
│   │   └── elastic/             # Elasticsearch configuration
│   ├── services/                # External service integrations
│   ├── types/                   # TypeScript type definitions
│   └── utils/                   # Helper functions
├── prisma/
│   └── schema.prisma            # Database schema
├── public/                      # Static assets
└── package.json
```

## 🗄️ Database Schema

### User Model

- **id**: Unique identifier
- **clerkUserId**: Clerk authentication ID
- **email**: User email address
- **name**: User display name
- **role**: User role (admin/user)
- **imageUrl**: Profile image URL

### Interactions Model

- **userId**: Reference to User
- **productId**: Product identifier
- **interactionType**: Type of interaction (view, add_to_cart, purchase)
- **timestamps**: Created and updated dates

### Payment Model

- **userId**: Reference to User
- **stripePaymentId**: Stripe payment intent ID
- **amount**: Payment amount
- **status**: Payment status (pending, completed, failed, canceled)
- **productIds**: Array of purchased product IDs
- **addresses**: Shipping and billing addresses
- **metadata**: Additional payment information

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB database
- Elasticsearch instance
- Clerk account
- Stripe account
- UploadThing account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd hekto
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="mongodb://..."

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
   CLERK_SECRET_KEY="sk_..."
   CLERK_WEBHOOK_SECRET="whsec_..."

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
   STRIPE_SECRET_KEY="sk_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."

   # Elasticsearch
   ELASTICSEARCH_URL="https://..."
   ELASTICSEARCH_API_KEY="..."
   INDEX_NAME="hekto"

   # API
   NEXT_PUBLIC_API_URL="http://localhost:3000/api"

   # UploadThing
   UPLOADTHING_SECRET="sk_..."
   UPLOADTHING_APP_ID="..."
   ```

4. **Database Setup**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio
- `npx prisma generate` - Generate Prisma client

## 🔧 Configuration

### Clerk Setup

1. Create a Clerk application
2. Configure sign-in/sign-up options
3. Set up webhooks for user management
4. Add environment variables

### Stripe Setup

1. Create a Stripe account
2. Get API keys from dashboard
3. Configure webhooks for payment events
4. Set up payment methods

### Elasticsearch Setup

1. Set up Elasticsearch instance
2. Create index for products
3. Configure search mappings
4. Add API credentials

## 🎯 Usage

### For Customers

1. **Browse Products**: Visit the home page to see featured products
2. **Search**: Use the search bar to find specific products
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Checkout**: Proceed to cart and complete payment with Stripe
5. **Account**: Sign up/in to track orders and preferences

### For Administrators

1. **Access Admin**: Navigate to `/admin` (requires admin role)
2. **Manage Products**: Add, edit, or remove products
3. **View Analytics**: Monitor sales and user interactions
4. **User Management**: View registered users and their activities

## 🔒 Security Features

- **Authentication**: Secure user authentication with Clerk
- **Authorization**: Role-based access control
- **Payment Security**: PCI-compliant payment processing with Stripe
- **Data Validation**: Input validation with Zod schemas
- **Environment Variables**: Secure configuration management

## 🚀 Deployment

The application is deployed on Vercel and can be accessed at: **https://hekto-ruddy.vercel.app/**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**
