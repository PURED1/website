# PURED1 Golf Tech Dashboard

A comprehensive golf technology dashboard showcasing the future of golf entertainment. Built with modern web technologies and following a sophisticated design system.

## 🏌️ Features

### Hero Section
- **Coming Soon** landing page with PURED1 branding
- Animated logo with floating effect
- Call-to-action buttons for notifications and information
- Responsive design with smooth animations

### Quick Actions
- **Highlights**: Watch the best moments from today's rounds
- **Scan QR Code**: Quick access to course information and scoring
- **Hole in One Alerts**: Real-time notifications for amazing shots

### Leaderboards
- **Hole in One Leaderboard**: Last 10 hole-in-one achievements
- **Closest to Pin Leaderboard**: Today's best shots with course filtering
- Real-time updates simulation
- Interactive course selection dropdown

### Social Integration
- Facebook, Instagram, TikTok, and LinkedIn links
- Hover effects with platform-specific colors
- Responsive grid layout

## 🎨 Design System

The dashboard follows a sophisticated design system with:

### Theme
- **Mode**: Dark theme for modern aesthetics
- **Primary Gradient**: Green to yellow (`#1b5e20` to `#fdd835`)
- **Background**: Deep black (`#0f0f0f`)
- **Surface**: Dark gray (`#1a1a1a`)
- **Accent**: Lime green (`#cddc39`)

### Typography
- **Font Family**: Inter (with Arial fallback)
- **Headings**: Bold, uppercase styling
- **Body**: Clean, readable text with proper line height

### Components
- **Buttons**: Gradient primary, secondary variants
- **Cards**: Elevated design with shadows
- **Navigation**: Fixed navbar with blur effects
- **Animations**: Smooth transitions and hover effects

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (for development server)

### Installation
1. Clone or download the project files
2. Install dependencies: `npm install`
3. Start development server: `npm run dev` or `npm start`
4. Open `http://localhost:8000` in your web browser
5. The dashboard will load automatically

### File Structure
```
PURED2/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and design system
├── PillNav.css         # PillNav component styles
├── PillNav.js          # PillNav component logic
├── script.js           # JavaScript functionality
├── package.json        # Dependencies & scripts
└── README.md           # Project documentation
```

### Dependencies
- **GSAP**: Professional animation library for smooth transitions
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Inter font family for typography

## 🎯 Key Features

### Interactive Elements
- **Smooth Scrolling**: Navigation links scroll to sections
- **Course Filtering**: Filter closest to pin by course
- **Real-time Updates**: Simulated leaderboard updates
- **Notifications**: Toast-style notifications for user feedback

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface elements

### Performance
- Optimized animations
- Efficient DOM manipulation
- Minimal external dependencies

## 🎮 User Interactions

### Quick Actions
- Click any quick action button to see simulated functionality
- Notifications provide feedback for each action
- Loading states for better UX

### Leaderboards
- Use the course dropdown to filter closest to pin results
- Hover over leaderboard rows for visual feedback
- Real-time updates occur every 30 seconds

### Navigation
- **PillNav Component**: Advanced animated navigation with GSAP
- Smooth scrolling to sections
- Active state indicators
- Mobile-responsive hamburger menu
- Hover animations with circular pill effects

### Social Links
- Click social media cards for simulated platform opening
- Hover effects with platform-specific colors
- Responsive grid layout

## 🎨 Customization

### Colors
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-gradient: linear-gradient(90deg, #1b5e20, #fdd835);
    --background: #0f0f0f;
    --surface: #1a1a1a;
    --accent: #cddc39;
}
```

### Data
Update leaderboard data in `script.js`:
```javascript
const holeInOneData = [
    { rank: 1, player: "Player Name", course: "Course Name", hole: 16, date: "2024-01-15" }
];
```

### Logo
Replace the logo URL in all instances:
```html
<img src="YOUR_LOGO_URL" alt="PURED1 Logo">
```

## 🔧 Technical Details

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- CSS Grid and Flexbox for layouts
- Intersection Observer for scroll animations
- GSAP-powered smooth animations
- Efficient event delegation
- Minimal reflows and repaints

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast design

## 🚀 Future Enhancements

### Planned Features
- Real API integration for live data
- User authentication system
- Advanced filtering options
- Mobile app integration
- Real-time chat functionality
- Tournament management system

### Technical Improvements
- Progressive Web App (PWA) capabilities
- Service worker for offline functionality
- Advanced caching strategies
- Performance monitoring
- Analytics integration

## 📱 Mobile Experience

The dashboard is fully responsive and optimized for mobile devices:
- Touch-friendly buttons and interactions
- Optimized layouts for small screens
- Fast loading times
- Smooth animations

## 🎯 Use Cases

### Golf Courses
- Display leaderboards on course TVs
- Share highlights with members
- Promote social media engagement

### Golf Events
- Real-time tournament updates
- Player achievement tracking
- Social media integration

### Golf Apps
- Embeddable dashboard component
- API integration for live data
- Customizable branding

## 📄 License

This project is created for PURED1 golf technology platform. All rights reserved.

## 🤝 Support

For questions or support regarding the PURED1 Golf Tech Dashboard, please contact the development team.

---

**PURED1** - Revolutionizing golf entertainment through technology 🏌️‍♂️
