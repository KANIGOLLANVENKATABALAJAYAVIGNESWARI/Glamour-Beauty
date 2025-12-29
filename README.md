# Beauty Parlour Booking System

A comprehensive web application for managing beauty parlour bookings with role-based access control. Built using only HTML, CSS, and JavaScript with no external frameworks.

## ⚠️ Security Warning

**This is a demo application using localStorage for data persistence and client-side authentication. In a production environment, you should:**

- Use a proper backend database (PostgreSQL, MySQL, MongoDB)
- Implement server-side authentication with JWT tokens
- Use HTTPS for all communications
- Implement proper input validation and sanitization
- Add CSRF protection
- Use environment variables for sensitive configuration

## Features

### 🏠 Public Landing Page
- Service listings with pricing in Indian Rupees (INR)
- Interactive booking form with Indian location dropdown
- Responsive design for all devices
- Contact information display

### 🔐 Role-Based Authentication
- **Customer**: Book appointments, manage profile, view loyalty points
- **Admin**: Manage artists, services, bookings, and system settings
- **Owner**: View analytics, revenue reports, and business insights

### 👥 Customer Dashboard
- View and manage current bookings
- Booking history with ratings
- Profile management
- Loyalty points system
- Quick booking functionality

### 🛠️ Admin Dashboard
- Artist management (Add/Edit/Delete)
- Service management (Add/Edit/Delete)
- Booking oversight and management
- Homepage content management
- Contact information updates

### 📊 Owner Dashboard
- Revenue analytics with Chart.js
- Booking trends and patterns
- Service popularity analysis
- Artist performance metrics
- Customer feedback insights

## Demo Accounts

Use these accounts to test different roles:

| Role | Email | Password |
|------|-------|----------|
| Customer | customer@demo.com | password123 |
| Admin | admin@demo.com | admin123 |
| Owner | owner@demo.com | owner123 |

## File Structure

```
web/
├── index.html              # Landing page
├── login.html              # Login page
├── admin_dashboard.html    # Admin dashboard
├── customer_dashboard.html # Customer dashboard
├── owner_dashboard.html    # Owner dashboard
├── style.css              # Main stylesheet
├── script.js              # Main JavaScript file
└── README.md              # This file
```

## Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in a modern web browser
3. **Navigate** to the login page to test different roles
4. **Explore** the various dashboards and features

## Features in Detail

### Currency Handling
- All prices displayed in Indian Rupees (₹)
- Automatic formatting using JavaScript's Intl.NumberFormat
- Consistent currency display across all pages

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

### Data Persistence
- Uses localStorage for data storage
- Sample data automatically initialized
- Data persists between browser sessions

### Booking System
- Real-time availability checking
- Time slot management
- Artist assignment
- Status tracking (pending, confirmed, completed, cancelled)

### Loyalty Points
- Automatic point awarding for bookings
- Point redemption system
- Transaction history
- Customer engagement tracking

### Analytics & Reporting
- Revenue trends over time
- Service popularity analysis
- Booking distribution patterns
- Customer satisfaction metrics

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

### Adding New Services
1. Open `script.js`
2. Add service to `SAMPLE_DATA.services` array
3. Include required fields: id, name, category, duration, price, description, status

### Adding New Artists
1. Open `script.js`
2. Add artist to `SAMPLE_DATA.artists` array
3. Include required fields: id, name, specialization, experience, bio, rating, status

### Modifying Styling
1. Edit `style.css`
2. CSS variables are defined at the top for easy theming
3. Responsive breakpoints are clearly marked

### Adding New Features
1. Extend the JavaScript functions in `script.js`
2. Add corresponding HTML elements
3. Update CSS for styling
4. Test across different roles and devices

## Technical Implementation

### Authentication Flow
1. User enters credentials on login page
2. JavaScript validates against stored user data
3. Successful login stores user session in localStorage
4. Role-based redirection to appropriate dashboard

### Data Management
- All data stored in localStorage as JSON
- Automatic data initialization on first load
- CRUD operations for all entities
- Data validation and error handling

### Chart Integration
- Uses Chart.js CDN for analytics
- Responsive chart rendering
- Real-time data updates
- Multiple chart types (line, bar, doughnut)

## Troubleshooting

### Common Issues

**Login not working:**
- Check browser console for errors
- Ensure JavaScript is enabled
- Clear localStorage and refresh page

**Charts not displaying:**
- Check internet connection (Chart.js loaded from CDN)
- Verify data is properly formatted
- Check browser console for errors

**Data not persisting:**
- Ensure localStorage is enabled
- Check browser storage limits
- Clear browser cache if needed

### Browser Console
Open browser developer tools (F12) and check the console for any error messages.

## Future Enhancements

- Email notifications for bookings
- SMS integration for reminders
- Payment gateway integration
- Advanced reporting features
- Multi-location support
- Mobile app development
- Real-time chat support

## Support

For questions or issues:
1. Check the browser console for error messages
2. Verify all files are properly loaded
3. Ensure JavaScript is enabled
4. Test in different browsers

## License

This project is for educational and demonstration purposes. Feel free to use and modify as needed.

---

**Remember**: This is a demo application. For production use, implement proper backend security and data management.
