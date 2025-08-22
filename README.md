# Pured1 Website

A professional dark-themed website for Pured1, featuring sleek design with glowing green and yellow accents. Built with modern web technologies and responsive design.

## Features

### 🎨 Design
- **Dark Theme**: Professional dark background with modern aesthetics
- **Brand Colors**: Green (#00ff88) and yellow (#ffff00) glowing accents
- **Responsive**: Fully responsive design for all devices
- **Modern UI**: Clean, tech-forward interface with smooth animations

### 🔐 Authentication
- **Login/Create Account**: Tabbed interface for user authentication
- **Form Validation**: Client-side validation for all required fields
- **User Session**: Local storage-based session management
- **Email Notifications**: Automatic email notifications for new account creation

### 📱 Pages
1. **Landing Page** (`index.html`): Login and account creation
2. **Home Page** (`home.html`): Main landing with logo and social links
3. **Account Page** (`account.html`): User details and highlights section
4. **About Us** (`about.html`): Company information and features

### 🎯 User Flow
1. **Account Creation**: Collects user information including:
   - First Name & Last Name
   - Username
   - Email Address
   - Playing status (Yes/No toggle)
   - Course name (optional)

2. **Email Notification**: Sends notification to `Dixonwelborn@pured1.com` with:
   - User's full name
   - Username
   - Email address
   - Account creation timestamp
   - Course name (if provided)

3. **Navigation**: Simple navigation with Home, My Account, About Us, and Log Out

## Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. For development, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

### File Structure
```
PURED1/
├── index.html          # Landing page (login/signup)
├── home.html           # Home page
├── account.html        # User account page
├── about.html          # About us page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript**: Client-side functionality and form handling
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

### Key Features
- **Form Switching**: Smooth tab transitions between login and signup
- **Toggle Switch**: Custom styled toggle for "playing now" status
- **Glow Effects**: Animated glowing buttons and accents
- **Responsive Design**: Mobile-first approach with breakpoints
- **Local Storage**: User session persistence
- **Social Media Integration**: Direct links to Instagram, TikTok, and YouTube

### Color Scheme
- **Primary Green**: `#00ff88` (glowing accents)
- **Primary Yellow**: `#ffff00` (secondary accents)
- **Background**: Dark gradient from `#0a0a0a` to `#1a1a1a`
- **Text**: White and light gray variations

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development Notes

### Email Notifications
Currently, email notifications are logged to the console and stored in localStorage. In a production environment, you would:
1. Set up a backend server
2. Configure email service (SendGrid, AWS SES, etc.)
3. Replace the `sendEmailNotification` function with actual API calls

### Security Considerations
- This is a frontend-only demo
- In production, implement proper authentication
- Add CSRF protection and input sanitization
- Use HTTPS for all communications

### Future Enhancements
- Backend integration
- Database storage
- Real email notifications
- User profile editing
- Highlight upload functionality
- Admin dashboard

## License
This project is proprietary to Pured1.

## Contact
For questions or support, contact: Dixonwelborn@pured1.com
