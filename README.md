# Visits Counter Badge Generator

A Next.js application that generates customizable SVG badges for tracking visits to your projects or websites.

## Features

- 🎨 **Native Color Picker**: Uses HTML5 native color inputs for maximum compatibility and simplicity
- 🎯 **Real-time Preview**: See your badge changes instantly as you customize
- 🔧 **Highly Customizable**: Control colors, labels, shadows, and more
- 📊 **Visit Tracking**: Automatic visit counting with MongoDB storage
- 🔐 **Pass Key Protection**: Secure badge count modification
- 📋 **Easy Integration**: Copy-paste ready URLs for embedding

## Usage

### 1. Badge Generator Interface

Visit the main page to use the interactive badge generator:

- Set your unique ID and pass key
- Customize colors using native HTML5 color inputs
- Preview your badge in real-time
- Copy the generated URL for use

### 2. Badge URL Parameters

Your badge URL will look like:

```
https://yourdomain.com/your-unique-id?label=Visits&CBGC=1CA2F1&...
```

#### Available Parameters:

- `label`: Badge label text (default: "Visits")
- `PK`: Pass key for secure operations
- `SETC`: Set specific count (requires correct pass key)
- `LBGC`: Label background color (hex without #, default: "484848")
- `CBGC`: Count background color (hex without #, default: "1CA2F1")
- `LTC`: Label text color (hex without #, default: "ffffff")
- `CTC`: Count text color (hex without #, default: "ffffff")
- `LSHW`: Label shadow color (hex without #, default: "1")
- `CSHW`: Count shadow color (hex without #, default: "1")
- `SHWO`: Shadow opacity (0-100, default: "30")
- `swap`: Swap label and count positions (0 or 1, default: "0")

### 3. Embedding in README

```markdown
![Visits](https://yourdomain.com/your-unique-id)
```

### 4. HTML Embedding

```html
<img src="https://yourdomain.com/your-unique-id" alt="Visits" />
```

## Environment Setup

Make sure to set your MongoDB connection string. Copy `.env.example` to `.env` and update:

```env
MONGODB_URI=your_mongodb_connection_string
port=3000
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit http://localhost:3000 to access the badge generator interface (or another port if 3000 is in use).
