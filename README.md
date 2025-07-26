# TinyCompress - Free Image Compressor

A free, browser-based image compressor and resizer that processes images locally without uploading to any server. Reduce image file size, change format, and adjust dimensions while maintaining quality.

## ✨ Features

- **🖼️ Smart Compression**: Compress images to target file sizes (80KB, 100KB, 200KB, 300KB, 400KB, or custom)
- **📏 Resize Images**: Custom width and height with automatic aspect ratio preservation
- **🔄 Multiple Formats**: Convert to JPEG, PNG, or WebP
- **🎛️ Quality Control**: Adjustable quality settings for JPEG and WebP formats
- **📱 Drag & Drop**: Easy file selection with drag and drop support
- **👀 Side-by-Side Preview**: Compare original and compressed images
- **🔒 Privacy First**: All processing done locally in your browser
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **⚡ Instant Download**: Download optimized images immediately

## 🚀 Quick Start

1. **Download** the project files
2. **Open** `index.html` in your web browser
3. **Start compressing** - no installation required!

## 📖 How to Use

### Step 1: Select Your Image
- Click the drop zone to browse files, or
- Drag and drop an image file directly onto the drop zone

### Step 2: Configure Settings
- **Target Size**: Choose from preset sizes or enter a custom size in KB
- **Output Format**: Select JPEG (best for photos), PNG (best for graphics with transparency), or WebP (good compression for both)
- **Dimensions**: Optionally set custom width and/or height in pixels
- **Quality**: Adjust quality slider for JPEG and WebP formats (10-100%)

### Step 3: Compress
- Click the "Compress Image" button
- Watch the progress bar as your image is processed
- Preview the results side by side

### Step 4: Download
- Review the file size reduction and quality
- Click the download link to save your compressed image

## 🛠️ Technical Details

### Supported Formats
- **Input**: All browser-supported image formats (JPEG, PNG, WebP, GIF, etc.)
- **Output**: JPEG, PNG, WebP

### Compression Algorithm
- Uses HTML5 Canvas API for image processing
- Implements iterative quality reduction for target size optimization
- Maintains aspect ratio when resizing
- Progressive compression with up to 10 attempts for optimal results

### Browser Compatibility
- Modern browsers with HTML5 Canvas support
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📁 Project Structure

```
tinycompress/
├── index.html          # Main HTML interface
├── style.css           # Styling and responsive design
├── main.js             # Core compression logic and UI interactions
└── README.md           # This file
```

## 🔧 Key Features Explained

### Smart Size Targeting
The app automatically adjusts quality settings to reach your target file size while maintaining the best possible image quality.

### Format-Specific Optimization
- **JPEG**: Best for photographs, supports quality adjustment
- **PNG**: Best for graphics with transparency, lossless compression
- **WebP**: Modern format with excellent compression ratios

### Responsive Design
The interface adapts to different screen sizes, making it perfect for both desktop and mobile use.

## 🤝 Contributing

Feel free to contribute to this project! Here are some ways you can help:

- Report bugs or issues
- Suggest new features
- Improve the UI/UX
- Add support for more image formats
- Optimize the compression algorithms

## 📞 Contact & Support

- **Creator**: [Amit Gajare](https://www.instagram.com/amitgajare_)
- **Email**: syntaxamit@proton.me
- **Instagram**: [@amitgajare_](https://www.instagram.com/amitgajare_)

## 📄 License

This project is open source and available under the MIT License. Feel free to use, modify, and distribute as needed.

## 🙏 Acknowledgments

- Built with vanilla JavaScript, HTML5, and CSS3
- Uses HTML5 Canvas API for image processing
- Fonts: Atkinson Hyperlegible Next and Oswald from Google Fonts

---

**Made with ❤️ by [Amit Gajare](https://www.instagram.com/amitgajare_)**

*Need help? Contact us at syntaxamit@proton.me* 