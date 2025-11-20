# 🔗 ShortLink - Professional URL Shortener.

A modern, feature-rich URL shortening service built with React, TypeScript, and Vite. ShortLink provides a seamless experience for creating, managing, and tracking shortened URLs with built-in QR code generation and analytics.

![ShortLink Banner](https://img.shields.io/badge/ShortLink-URL%20Shortener-blue?style=for-the-badge&logo=link&logoColor=white)

## ✨ Features

### 🎯 Core Features
- **URL Shortening**: Convert long URLs into short, memorable links
- **Custom Aliases**: Create personalized short URLs with custom slugs
- **QR Code Generation**: Generate and download QR codes for any shortened URL
- **Click Tracking**: Monitor click statistics for each shortened link
- **Real-time Validation**: Instant URL validation with visual feedback

### 🔐 Authentication & User Management
- **User Authentication**: Secure login and signup system
- **Session Persistence**: Stay logged in across browser sessions
- **User Dashboard**: Personal dashboard for managing all your links
- **Profile Management**: User profile with avatar and account details

### 📊 Dashboard Features
- **URL Management**: View, edit, and delete your shortened URLs
- **Analytics Overview**: Track clicks and engagement metrics
- **QR Code Download**: Export QR codes as PNG images
- **Quick Actions**: Copy, visit, and share links instantly

### 🎨 UI/UX Features
- **Modern Design**: Clean, professional interface with glassmorphism effects
- **Dark Mode Support**: Full dark/light theme toggle
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Popup and transition animations for enhanced UX
- **Toast Notifications**: Real-time feedback for user actions

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Blazehue/ShortLink.git
   cd ShortLink
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` (or the port shown in your terminal)

## 📦 Build for Production

```bash
# Create an optimized production build
npm run build

# Preview the production build
npm run preview
```

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling

### UI Components & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Re-usable component library
- **Lucide React** - Beautiful icon library

### State Management & Routing
- **React Context API** - Global state management
- **React Router v6** - Client-side routing
- **TanStack Query** - Server state management

### Additional Libraries
- **QRCode** - QR code generation
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **date-fns** - Date manipulation

## 📁 Project Structure

```
ShortLink/
├── public/
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── ErrorBoundary.tsx
│   │   ├── Navigation.tsx
│   │   └── UrlShortener.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx  # Authentication context
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── useTheme.ts
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── pages/
│   │   ├── Analytics.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── MyUrls.tsx
│   │   ├── NotFound.tsx
│   │   └── SignUp.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 🎮 Usage Guide

### Creating Short URLs

1. **For Guest Users**:
   - Visit the homepage
   - Enter your long URL in the input field
   - (Optional) Click "Customize short URL" to add a custom alias
   - Click "Shorten URL"
   - Copy and share your short link!

2. **For Authenticated Users**:
   - Sign up or log in to your account
   - Navigate to the Dashboard
   - Enter your URL and customize if needed
   - All your URLs are saved and manageable

### Managing Your URLs

1. **Dashboard Access**:
   - Log in to your account
   - Click "Dashboard" in the navigation
   - View all your shortened URLs

2. **Available Actions**:
   - 📋 **Copy**: Copy the short URL to clipboard
   - 🔗 **Visit**: Open the original URL in a new tab
   - 📱 **QR Code**: Generate and download QR code
   - 🗑️ **Delete**: Remove the shortened URL

### Generating QR Codes

1. Click the "QR Code" button on any shortened URL
2. View the generated QR code in the modal
3. Click "Download" to save as PNG
4. Share the QR code on social media, print materials, etc.

### Authentication

**Demo Mode**: The app accepts any credentials for demonstration purposes.

- **Sign Up**: Use any email and password to create an account
- **Log In**: Use your email and password to access your dashboard
- **Log Out**: Click your avatar > Log out

## ⚙️ Configuration

### Customization

#### Theme Colors
Edit `tailwind.config.ts` to customize the color scheme:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // Add more custom colors
    }
  }
}
```

#### Base URL for Short Links
Modify the short URL domain in:
- `src/components/UrlShortener.tsx`
- `src/pages/Dashboard.tsx`

Replace `short.link` with your custom domain.

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Code Quality

The project uses:
- **ESLint** for code linting
- **TypeScript** for type checking

## 🚨 Troubleshooting

### Common Issues

**Issue**: Blank screen on load
- **Solution**: Clear browser cache and localStorage, then reload

**Issue**: QR codes not generating
- **Solution**: Ensure `qrcode` package is installed: `npm install qrcode @types/qrcode`

**Issue**: Dark mode not working
- **Solution**: Check that theme provider is properly set up in `App.tsx`

**Issue**: URLs not persisting
- **Solution**: Check browser's localStorage permissions

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **shadcn/ui** for the amazing component library
- **Radix UI** for accessible primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for beautiful icons
- **Vite** for blazing fast development experience

## 📞 Contact & Support

- **GitHub**: [@Blazehue](https://github.com/Blazehue)
- **Repository**: [ShortLink](https://github.com/Blazehue/ShortLink)
- **Issues**: [Report a bug](https://github.com/Blazehue/ShortLink/issues)

## 🗺️ Roadmap

### Upcoming Features
- [ ] Backend API integration
- [ ] Database persistence
- [ ] Advanced analytics dashboard
- [ ] Link expiration dates
- [ ] Password-protected links
- [ ] Bulk URL upload
- [ ] API key management
- [ ] Team collaboration features

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/Blazehue">Blazehue</a></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
