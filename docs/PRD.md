# Portfolio Website - Product Requirements Document (PRD)

## 1. Project Overview

### 1.1 Project Summary

Development of a modern, responsive portfolio website for Yogesh Patil, a fullstack developer, showcasing technical expertise, projects, and professional background.

### 1.2 Objectives

- **Primary**: Create a professional online presence that effectively showcases development skills and projects
- **Secondary**: Demonstrate technical proficiency through modern web technologies and best practices
- **Tertiary**: Provide an accessible platform for potential employers/clients to learn about and contact Yogesh

### 1.3 Target Audience

- **Primary**: Potential employers (HR managers, technical recruiters, hiring managers)
- **Secondary**: Fellow developers and tech community members
- **Tertiary**: Potential clients for freelance opportunities

## 2. Technical Requirements

### 2.1 Technology Stack

- **Framework**: Next.js 15.x (App Router)
- **Styling**: Tailwind CSS 4.x (latest alpha/beta version)
- **Package Manager**: pnpm
- **Runtime**: Node.js 18+
- **TypeScript**: Yes (for type safety and better developer experience)
- **Deployment**: Vercel (recommended for Next.js optimization)
- **Forms**: Vercel Forms for contact form handling
- **Animations**: Framer Motion for complex animations with performance optimization

### 2.2 Performance Requirements

- **Lighthouse Score**: 95+ for all categories (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1
- **Bundle Size**: Initial page load < 100KB compressed
- **Image Optimization**: Next.js Image component with lazy loading and modern formats (WebP, AVIF)
- **Animation Performance**: 60fps animations with proper optimization and `will-change` properties

### 2.3 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement**: Graceful degradation for older browsers

### 2.4 Responsive Design

- **Breakpoints**: Mobile-first approach
  - Mobile: 320px - 768px
  - Tablet: 768px - 1024px
  - Desktop: 1024px - 1440px
  - Large Desktop: 1440px+

## 3. Functional Requirements

### 3.1 Core Pages

#### 3.1.1 Home Page

**Purpose**: Landing page that introduces Yogesh and provides navigation to other sections

**Components**:

- Hero section with animated introduction and dynamic typing effects
- Brief professional summary
- Call-to-action buttons (View Work, Get in Touch, Download Resume)
- Animated tech stack showcase with bubble UI visualization
- Featured projects preview (2-3 projects)
- Quick contact links to social media

**Technical Specifications**:

- Smooth scroll navigation with parallax effects
- Complex animations using Framer Motion (scroll-triggered, hover effects, morphing shapes)
- Optimized hero illustration/graphic
- Interactive bubble animation for tech stack visualization
- Particle effects background (performance optimized)

#### 3.1.2 About Page

**Purpose**: Detailed information about Yogesh's background, skills, and experience

**Components**:

- Professional illustration (not photo)
- Detailed bio/story with animated text reveals
- Interactive skills visualization using bubble/node UI
- Animated experience timeline
- Education background with icons
- Certifications and achievements
- Downloadable resume (PDF)

**Animations**:

- Scroll-triggered animations for each section
- Interactive skill bubbles that expand on hover
- Timeline animations with progress indicators
- Morphing illustrations

#### 3.1.3 Projects Page

**Purpose**: Comprehensive showcase of development projects

**Components**:

- Project grid/masonry layout with hover animations
- Filter by technology/category with smooth transitions
- Project cards with:
  - Project thumbnail/preview with hover effects
  - Title and brief description
  - Technology stack badges
  - Links to live demo and source code
  - Project status (completed/in-progress)

**Filters**:

- All Projects
- Web Applications
- Mobile Applications
- Open Source
- Featured

**Animations**:

- Staggered card animations on load
- Smooth filter transitions
- Hover effects with image zoom and overlay animations

#### 3.1.4 Project Detail Pages

**Purpose**: In-depth information about individual projects

**Components**:

- Hero image/video preview with parallax
- Project overview and objectives
- Detailed description with animated sections
- Technology stack used with bubble visualization
- Key features and functionality
- Screenshots/demo gallery with lightbox
- Challenges and solutions
- Live demo and GitHub links
- Next/Previous project navigation

**Animations**:

- Hero parallax scrolling
- Section reveals on scroll
- Interactive technology stack visualization
- Gallery hover and transition effects

#### 3.1.5 Resume Page

**Purpose**: Dedicated page for resume showcase and download

**Components**:

- Resume preview/viewer (interactive CV)
- Download button for PDF version
- Key highlights and achievements
- Skills breakdown with visual indicators
- Work experience timeline
- Education and certifications
- Contact information

**Animations**:

- Page transition animations
- Interactive resume sections
- Skill level animations
- Timeline progression effects

#### 3.1.6 Contact Page

**Purpose**: Multiple ways for visitors to get in touch

**Components**:

- Contact form with validation (Vercel Forms integration)
- Social media links with hover animations
- Professional email
- Location information (if applicable)
- Response time expectations
- Contact form fields:
  - Name (required)
  - Email (required, validated)
  - Subject (optional)
  - Message (required)
  - Form submission success/error states

**Animations**:

- Form field focus animations
- Button hover and click effects
- Success/error message transitions

### 3.2 Global Components

#### 3.2.1 Navigation Header

- Logo/brand name with animation
- Navigation menu (responsive hamburger menu on mobile)
- **Theme Selector**: Dropdown for color scheme selection
- Active page indicator with smooth transitions
- Smooth page transitions

#### 3.2.2 Footer

- Copyright information
- Social media links with hover effects
- Quick navigation links
- "Built with" technology credits

#### 3.2.3 Theme System

- **Multiple Color Schemes** with user selection:
  - **Dracula**: Dark purple theme with vibrant colors
  - **One Dark**: Deep dark theme with high contrast
  - **Nord**: Cool blue-based arctic theme
  - **Gruvbox**: Warm earth-tone theme
  - **Solarized Dark**: Balanced dark theme
  - **Horizon**: Modern dark theme with vivid highlights
  - **Palenight**: Dark theme with purple accents
- User preference persistence in localStorage
- System preference detection
- Smooth theme transitions with CSS custom properties
- Theme selector dropdown in header

## 4. Design Requirements

### 4.1 Design System

**Multiple Color Palettes** (User Selectable):

**Dracula Theme**:

- **Background**: #282a36
- **Foreground**: #f8f8f2
- **Accent**: #bd93f9 (Purple)
- **Secondary**: #ff79c6 (Pink)
- **Success**: #50fa7b (Green)

**One Dark Theme**:

- **Background**: #1e1e1e
- **Foreground**: #dcdcdc
- **Accent**: #61dafb (Cyan)
- **Secondary**: #f78c6c (Orange)
- **Success**: #98c379 (Green)

**Nord Theme**:

- **Background**: #2e3440
- **Foreground**: #d8dee9
- **Accent**: #88c0d0 (Blue)
- **Secondary**: #5e81ac (Blue-gray)
- **Success**: #a3be8c (Green)

**Gruvbox Theme**:

- **Background**: #282828
- **Foreground**: #fbf1c7
- **Accent**: #d79921 (Yellow)
- **Secondary**: #cc241d (Red)
- **Success**: #98971a (Green)

**Typography**:

- **Headings**: Inter or Poppins (modern sans-serif)
- **Body**: System font stack with good letter spacing
- **Code**: JetBrains Mono or Fira Code
- **Animations**: Typography animations with morphing effects

### 4.2 Visual Elements

- **Gradient Backgrounds**: Dynamic gradients that change with themes
- **Complex Animations**: Framer Motion with scroll triggers, hover effects, page transitions
- **Icons**: Lucide React or Heroicons with animation capabilities
- **Illustrations**: Custom SVG illustrations related to each page content
- **Bubble UI**: Interactive bubble visualization for tech stack and skills
- **Shadows**: Theme-appropriate shadow systems
- **Spacing**: Consistent spacing scale using Tailwind's spacing system

### 4.3 Layout Principles

- **Grid System**: CSS Grid and Flexbox for layouts
- **White Space**: Generous use of white space for clarity
- **Visual Hierarchy**: Clear typography scales and visual weight
- **Accessibility**: WCAG 2.1 AA compliance
- **Animation Hierarchy**: Layered animation timing for engaging UX

## 5. Content Requirements

### 5.1 Tech Stack Showcase (Hardcoded - Configurable)

**Frontend Technologies**:

- TypeScript, JavaScript, React, Next.js, Vue.js, Angular
- HTML5, CSS3, Sass/SCSS, Tailwind CSS, Material-UI

**Backend Technologies**:

- Node.js, Express.js, Nest.js, Python, Django, FastAPI
- MongoDB, PostgreSQL, MySQL, Redis

**Tools & Others**:

- Git, Docker, AWS, Vercel, tRPC, React Query, Cypress, Jest

**Visual Representation**: Interactive bubble UI where each technology is represented as a bubble with:

- Technology icon/logo
- Proficiency level (bubble size)
- Hover effects showing experience details
- Connections between related technologies

### 5.2 Featured Projects (Hardcoded - Configurable)

**Project 1: Covid-19 India Tracker**

- **Description**: "A comprehensive React-based dashboard for tracking COVID-19 statistics across India with real-time data visualization and state-wise analysis."
- **Technologies**: React, JavaScript, Chart.js, Material-UI, Node.js
- **Features**: Interactive maps, real-time data updates, responsive design
- **Status**: Completed
- **GitHub**: placeholder-link
- **Live Demo**: placeholder-link

**Project 2: E-Commerce Platform**

- **Description**: "Full-stack e-commerce solution with modern payment integration, inventory management, and customer analytics."
- **Technologies**: Next.js, TypeScript, PostgreSQL, Stripe, Tailwind CSS
- **Features**: Payment processing, admin dashboard, responsive design
- **Status**: Completed
- **GitHub**: placeholder-link
- **Live Demo**: placeholder-link

**Project 3: Real-Time Chat Application**

- **Description**: "WebSocket-based chat application with room management, file sharing, and real-time notifications."
- **Technologies**: React, Node.js, Socket.io, MongoDB, Express.js
- **Features**: Real-time messaging, file uploads, user authentication
- **Status**: In Progress
- **GitHub**: placeholder-link
- **Live Demo**: placeholder-link

### 5.3 Professional Information (Hardcoded - Configurable)

**Basic Information**:

- **Name**: Yogesh Patil
- **Title**: Full Stack Developer
- **Experience**: 5+ years
- **Location**: Mumbai, India
- **Email**: [redacted]
- **Availability**: Open to opportunities

**Professional Summary**:
"Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and modern JavaScript technologies. Frequently praised as detail-oriented by peers, I can be relied upon to help your company achieve its goals by providing sustainable and scalable solutions."

**Education**:

- **Degree**: Bachelor of Engineering in Computer Science
- **University**: University of Mumbai
- **Year**: 2019

**Certifications**:

- AWS Certified Developer Associate
- MongoDB Certified Developer
- Google Cloud Professional Cloud Architect

## 6. SEO and Analytics Requirements

### 6.1 SEO Optimization

- **Meta Tags**: Proper title, description, and Open Graph tags for all pages
- **Structured Data**: JSON-LD markup for person and organization schemas
- **Sitemap**: XML sitemap generation
- **Robots.txt**: Proper indexing directives
- **Page Speed**: Optimized for Core Web Vitals
- **Mobile-First**: Mobile-friendly design and functionality

### 6.2 Analytics and Monitoring

- **Google Analytics 4**: User behavior and traffic analysis
- **Google Search Console**: Search performance monitoring
- **Performance Monitoring**: Web Vitals tracking
- **Error Tracking**: Basic error monitoring setup

## 7. Accessibility Requirements

### 7.1 WCAG 2.1 AA Compliance

- **Color Contrast**: Minimum 4.5:1 ratio for normal text, 3:1 for large text
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **Alternative Text**: Descriptive alt text for all images and illustrations
- **Animation Controls**: Respect for `prefers-reduced-motion`

### 7.2 Inclusive Design

- **Font Sizes**: Scalable text up to 200% without horizontal scrolling
- **Motion Preferences**: Respect prefers-reduced-motion
- **Language**: Proper lang attributes
- **Theme Accessibility**: All themes maintain WCAG compliance

## 8. Animation Requirements

### 8.1 Complex Animation System

**Page Transitions**:

- Smooth page transitions with Framer Motion
- Custom transition effects between routes
- Loading states with engaging animations

**Scroll Animations**:

- Scroll-triggered reveals for sections
- Parallax effects for hero sections
- Progress indicators for long pages

**Interactive Animations**:

- Hover effects on cards and buttons
- Click animations with haptic feedback simulation
- Technology stack bubble animations
- Morphing illustrations

**Performance Optimizations**:

- GPU acceleration for smooth 60fps animations
- Proper `will-change` property usage
- Animation cleanup and memory management
- Reduced motion detection and fallbacks

### 8.2 Bubble UI Implementation

**Tech Stack Visualization**:

- D3.js or custom React component for bubble creation
- Physics-based animations for natural movement
- Collision detection and bubble interactions
- Responsive bubble sizing based on proficiency
- Color coding based on technology categories

## 9. Development Phases

### Phase 1: Project Setup and Core Infrastructure (Week 1)

- Next.js 15 project initialization with TypeScript and Tailwind CSS 4.x
- Development environment setup with pnpm
- Basic project structure and file organization
- Core layout components (Header, Footer, Layout)
- Multi-theme system implementation with user selection
- Basic responsive grid system
- Framer Motion setup and configuration

**Deliverables**:

- Working development environment
- Core component library
- Multi-theme system with dropdown selector
- Basic responsive layout
- Animation framework setup

### Phase 2: Content Pages Development (Week 2)

- Home page with hero section and animated tech stack showcase
- About page with bubble UI skills visualization
- Projects listing page with filtering and animations
- Individual project detail pages
- Resume page with interactive CV and download functionality
- Contact page with Vercel forms integration

**Deliverables**:

- All main pages with content and animations
- Working contact form with Vercel integration
- Project showcase functionality
- Resume page with download capability
- Responsive design implementation

### Phase 3: Advanced Features and Animations (Week 3)

- Complex animations and micro-interactions implementation
- Bubble UI system for tech stack and skills
- Performance optimization for animations
- SEO implementation
- Accessibility improvements
- Form validation and error handling
- Image optimization

**Deliverables**:

- Polished user experience with complex animations
- Interactive bubble UI for skills visualization
- Optimized performance
- SEO-ready website
- Accessible design

### Phase 4: Testing and Deployment (Week 4)

- Cross-browser testing
- Mobile device testing
- Performance auditing with animation testing
- Accessibility testing
- Content review and updates
- Production deployment to Vercel

**Deliverables**:

- Fully tested website
- Production deployment
- Analytics setup
- Documentation for content updates

## 10. Success Metrics

### 10.1 Technical Metrics

- **Lighthouse Scores**: 95+ across all categories
- **Core Web Vitals**: All metrics in "Good" range
- **Animation Performance**: Consistent 60fps with no jank
- **Accessibility Score**: WCAG 2.1 AA compliance
- **Cross-browser Compatibility**: 100% functionality across target browsers

### 10.2 Business Metrics

- **Loading Performance**: Page load time < 3 seconds
- **User Engagement**: Average session duration > 2 minutes
- **Contact Form**: Functional with proper validation and submission
- **Mobile Experience**: Optimal experience across all device sizes
- **Theme Adoption**: Usage analytics for different color themes

## 11. Post-Launch Requirements

### 11.1 Maintenance

- **Content Updates**: Easy configuration system for updating hardcoded content
- **Security**: Regular dependency updates
- **Performance Monitoring**: Ongoing monitoring of Core Web Vitals and animation performance
- **Analytics Review**: Monthly review of user behavior and theme preferences

### 11.2 Future Enhancements

- **Additional Themes**: More color scheme options based on user feedback
- **PWA Features**: Offline functionality and app-like experience
- **Advanced Animations**: More sophisticated 3D animations and interactions
- **CMS Integration**: Headless CMS for easier content management
- **Theme Customization**: Allow users to create custom color themes

## 12. Theme Integration Resources

Based on research, the following popular developer themes will be implemented:

### 12.1 Theme Sources and References

- **Dracula**: [Official Dracula Theme](https://draculatheme.com/) - Most popular dark theme across platforms
- **One Dark Pro**: Based on Atom's One Dark theme, most downloaded VS Code theme
- **Nord**: [Nord Theme](https://www.nordtheme.com/) - Arctic-inspired color palette
- **Horizon**: Modern theme with vivid syntax highlighting
- **Gruvbox**: Retro groove color scheme with warm earth tones
- **Solarized**: Precision colors designed for programming

### 12.2 Implementation Strategy

- Use CSS custom properties for theme switching
- Store theme preference in localStorage
- Implement smooth transitions between themes
- Ensure all themes maintain WCAG 2.1 AA compliance
- Test animations with each theme for consistency

## 13. Configuration System

### 13.1 Content Configuration

All hardcoded content will be centralized in configuration files for easy updates:

**File Structure**:

```
/config
  - personal-info.ts
  - projects.ts
  - skills.ts
  - education.ts
  - themes.ts
```

**Update Process**:

- Simple TypeScript interfaces for type safety
- JSON-like structure for easy editing
- Hot reload in development
- Build-time validation for required fields

This approach allows for easy content updates without touching component code, while maintaining type safety and development experience.

## 14. Questions for Clarification

Before proceeding with development, I need clarification on the following:

### 14.1 Content and Branding

1. **Professional Information**:

   - Current job title and company?
   - Years of experience in development?
   - Preferred professional tagline or bio?
   - Education background to highlight?

2. **Projects**:

   - Which specific projects should be featured beyond the Covid-19 tracker?
   - Do you have live demo URLs and GitHub repositories for these projects?
   - Any client projects that can be showcased (with permission)?
   - Open source contributions to highlight?

3. **Contact Information**:
   - Preferred contact email for the website?
   - Which social media profiles to include?
   - Location information to display (city/country)?
   - Current availability status (open to work, freelance, etc.)?

### 14.2 Technical Preferences

1. **Animations**:

   - Preference for animation library (Framer Motion, CSS animations, or minimal)?
   - Level of animation complexity desired?

2. **Blog**:

   - Do you want a blog section initially, or is this for future consideration?
   - If yes, what topics would you write about?

3. **Forms**:
   - Preferred method for handling contact form submissions (email service, API)?
   - Need for spam protection (reCAPTCHA)?

### 14.3 Design Preferences

1. **Color Scheme**:

   - Should we stick close to your current color palette, or are you open to variations?
   - Any specific colors to avoid or include?

2. **Photography**:
   - Do you have professional photos for the about section?
   - Preference for illustrations vs. photographs in design?

Please provide clarification on these points so I can ensure the PRD aligns perfectly with your vision and requirements.
