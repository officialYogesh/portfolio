# Portfolio Assets Organization

This directory contains all static assets for the portfolio website, organized according to Next.js best practices for optimal performance and maintainability.

## 📁 Folder Structure

```
public/
├── images/
│   ├── profile/          # Profile photos and personal images
│   ├── projects/         # Project screenshots and thumbnails
│   └── gallery/          # Additional gallery images
├── documents/            # Downloadable files (resume, certificates)
├── icons/               # Custom icons and logos
├── assets/
│   └── data/            # JSON files, fonts, and other data assets
└── [existing SVG files] # Default Next.js assets
```

## 🖼️ Images Directory

### `/images/profile/`

Store personal and professional photos:

- `profile.jpg` - Main profile photo (recommended: 500x500px, optimized)
- `profile-hero.jpg` - Hero section photo (recommended: 800x800px)
- `about-illustration.svg` - Custom illustration for about page
- `profile-casual.jpg` - Casual/alternative profile photo

**Optimization Guidelines:**

- Use WebP format when possible for better compression
- Provide multiple sizes for responsive design
- Keep file sizes under 500KB for web optimization

### `/images/projects/`

Project-related visual assets:

- `project-name/` - Create subfolders for each project
  - `thumbnail.jpg` - Project card thumbnail (recommended: 400x300px)
  - `hero.jpg` - Project detail page hero image
  - `screenshot-1.jpg` - Feature screenshots
  - `demo.gif` - Animated demonstrations (keep under 2MB)

**Naming Convention:**

- Use kebab-case for filenames
- Include descriptive names: `e-commerce-dashboard.jpg`
- Use semantic suffixes: `-thumbnail`, `-hero`, `-screenshot-01`

### `/images/gallery/`

Additional visual content:

- `tech-stack/` - Technology logos and icons
- `achievements/` - Award certificates and recognitions
- `events/` - Conference photos, meetup images
- `blog/` - Blog post featured images

## 📄 Documents Directory

### `/documents/`

Downloadable files and official documents:

- `resume/`
  - `yogesh-patil-resume.pdf` - Main resume file
  - `yogesh-patil-resume-dev.pdf` - Developer-focused version
  - `yogesh-patil-cv.pdf` - Detailed CV
- `certificates/`
  - `aws-developer-associate.pdf`
  - `mongodb-certified-developer.pdf`
- `portfolio/`
  - `portfolio-deck.pdf` - Portfolio presentation
  - `case-study-project-name.pdf` - Detailed project case studies

**File Guidelines:**

- Keep PDFs under 5MB for web performance
- Use descriptive, SEO-friendly filenames
- Include version dates in filename if needed

## 🎨 Icons Directory

### `/icons/`

Custom icons and logos:

- `logo/`
  - `logo.svg` - Main logo (scalable vector)
  - `logo-dark.svg` - Dark theme variant
  - `logo-light.svg` - Light theme variant
  - `favicon/` - Favicon variants (16x16, 32x32, etc.)
- `tech/`
  - `react.svg`, `nextjs.svg`, etc. - Technology icons
- `social/`
  - `github.svg`, `linkedin.svg`, etc. - Social media icons

**Icon Guidelines:**

- Use SVG format for scalability
- Maintain consistent style across icon set
- Optimize SVGs (remove unnecessary metadata)

## 📊 Assets/Data Directory

### `/assets/data/`

Configuration and data files:

- `resume-data.json` - Structured resume data
- `projects-metadata.json` - Extended project information
- `testimonials.json` - Client/colleague testimonials
- `fonts/` - Custom font files (if not using CDN)
- `animations/` - Lottie animations or other animation assets

## 🔧 Best Practices

### File Naming

- Use **kebab-case** for all filenames
- Include descriptive names that indicate content
- Add semantic suffixes where helpful
- Avoid spaces and special characters

### Image Optimization

- Compress images before uploading
- Use appropriate formats: JPG for photos, PNG for graphics with transparency, SVG for vectors
- Consider WebP format for modern browsers
- Provide multiple sizes for responsive images

### Accessibility

- Include descriptive alt text information
- Ensure sufficient color contrast in images
- Provide text alternatives for complex graphics

### Performance

- Keep individual files under reasonable size limits
- Use lazy loading for images below the fold
- Leverage Next.js Image component for automatic optimization

## 📝 File Size Guidelines

| Asset Type          | Recommended Size | Maximum Size |
| ------------------- | ---------------- | ------------ |
| Profile Photos      | 100-300KB        | 500KB        |
| Project Thumbnails  | 50-150KB         | 300KB        |
| Project Screenshots | 100-500KB        | 1MB          |
| Documents (PDFs)    | 1-3MB            | 5MB          |
| Icons (SVG)         | 1-10KB           | 50KB         |
| Animated GIFs       | 500KB-1MB        | 2MB          |

## 🚀 Integration with Next.js

All assets in the `public` directory are accessible via URL:

- `public/images/profile/profile.jpg` → `/images/profile/profile.jpg`
- `public/documents/resume.pdf` → `/documents/resume.pdf`

Use the Next.js Image component for optimized loading:

```jsx
import Image from "next/image";

<Image
  src="/images/profile/profile.jpg"
  alt="Profile photo"
  width={400}
  height={400}
  priority // for above-the-fold images
/>;
```

## 📋 Maintenance Checklist

- [ ] Regularly audit file sizes and optimize large assets
- [ ] Update resume and certificates as needed
- [ ] Maintain consistent naming conventions
- [ ] Remove unused assets during cleanup
- [ ] Backup important documents externally
- [ ] Test all download links periodically

---

_This structure follows Next.js best practices and modern web development standards for optimal performance and maintainability._
