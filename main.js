// Elements
const imageInput = document.getElementById('imageInput');
const dropZone = document.getElementById('dropZone');
const dropText = document.getElementById('dropText');
const sizeSelect = document.getElementById('sizeSelect');
const customSizeInput = document.getElementById('customSizeInput');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const formatOptions = document.getElementById('formatOptions');
const qualityControl = document.getElementById('qualityControl');
const qualitySlider = document.getElementById('qualitySlider');
const qualityValue = document.getElementById('qualityValue');
const originalPreview = document.getElementById('originalPreview');
const compressedPreview = document.getElementById('compressedPreview');
const progressBarInner = document.querySelector('.progress-bar-inner');
const originalSizeDisplay = document.getElementById('originalSize');
const compressedSizeDisplay = document.getElementById('compressedSize');
const reductionPercent = document.getElementById('reductionPercent');
const downloadLink = document.getElementById('downloadLink');
const originalDimensions = document.getElementById('originalDimensions');
const compressedDimensions = document.getElementById('compressedDimensions');

// Variables
let selectedFormat = 'jpeg';
let currentQuality = 0.8;

// Event Listeners
document.getElementById('compressBtn').addEventListener('click', compressImage);

// Format selection
formatOptions.addEventListener('click', (e) => {
  if (e.target.classList.contains('format-option')) {
    // Remove active class from all options
    document.querySelectorAll('.format-option').forEach(opt => {
      opt.classList.remove('active');
    });
    
    // Add active class to selected option
    e.target.classList.add('active');
    
    // Update selected format
    selectedFormat = e.target.dataset.format;
    
    // Show/hide quality control for formats that support it
    qualityControl.style.display = (selectedFormat === 'png') ? 'none' : 'block';
  }
});

// Quality slider
qualitySlider.addEventListener('input', () => {
  const value = qualitySlider.value;
  qualityValue.textContent = `${value}%`;
  currentQuality = value / 100;
});

// Target size select change
sizeSelect.addEventListener('change', () => {
  customSizeInput.style.display = (sizeSelect.value === 'custom') ? 'block' : 'none';
});

// Drag and drop functionality
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.style.borderColor = '#2196F3';
});

dropZone.addEventListener('dragleave', () => {
  dropZone.style.borderColor = '#ddd';
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.style.borderColor = '#ddd';
  if (e.dataTransfer.files.length) {
    imageInput.files = e.dataTransfer.files;
    if (imageInput.files[0].type.startsWith('image/')) {
      previewOriginalImage();
    }
  }
});

imageInput.addEventListener('change', previewOriginalImage);

function previewOriginalImage() {
  const file = imageInput.files[0];
  if (!file || !file.type.startsWith('image/')) {
    return;
  }
  
  // Display original file size
  const originalSizeKB = (file.size / 1024).toFixed(2);
  originalSizeDisplay.textContent = `${originalSizeKB} KB`;
  
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.src = event.target.result;
    
    img.onload = function() {
      // Display original image preview
      originalPreview.src = event.target.result;
      originalPreview.style.display = 'block';
      
      // Display original dimensions
      originalDimensions.textContent = `${img.width} × ${img.height} px`;
    };
  };
  
  reader.readAsDataURL(file);
}

function getTargetSizeKB() {
  if (sizeSelect.value === 'custom') {
    const customSize = parseInt(customSizeInput.value);
    return isNaN(customSize) ? 200 : customSize;
  }
  return parseInt(sizeSelect.value);
}

function compressImage() {
  const file = imageInput.files[0];
  if (!file) {
    alert('Please select an image.');
    return;
  }
  
  // Reset progress bar
  progressBarInner.style.width = '0%';
  
  // Get settings
  const targetSizeKB = getTargetSizeKB();
  const targetWidth = parseInt(widthInput.value) || null;
  const targetHeight = parseInt(heightInput.value) || null;
  
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.src = event.target.result;
    
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Calculate new dimensions
      let newWidth = targetWidth || img.width;
      let newHeight = targetHeight || img.height;
      
      // Maintain aspect ratio if only one dimension is provided
      if (targetWidth && !targetHeight) {
        newHeight = Math.round((img.height / img.width) * targetWidth);
      } else if (targetHeight && !targetWidth) {
        newWidth = Math.round((img.width / img.height) * targetHeight);
      }
      
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      
      // Get the mime type based on selected format
      let mimeType = 'image/jpeg';
      if (selectedFormat === 'png') {
        mimeType = 'image/png';
      } else if (selectedFormat === 'webp') {
        mimeType = 'image/webp';
      }
      
      // Start with user-selected quality for formats that support it
      let quality = currentQuality;
      if (selectedFormat === 'png') {
        quality = undefined; // PNG doesn't use quality parameter
      }
      
      let attempt = 1;
      const maxAttempts = 10;
      
      function compressWithQuality() {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              alert('Error compressing image. Try a different format.');
              return;
            }
            
            const compressedSizeKB = blob.size / 1024;
            
            // Update progress
            const progress = Math.min(100, (attempt / maxAttempts) * 100);
            progressBarInner.style.width = `${progress}%`;
            
            if (selectedFormat !== 'png' && compressedSizeKB > targetSizeKB && attempt < maxAttempts) {
              // Reduce quality and try again (not for PNG)
              quality -= 0.1;
              quality = Math.max(0.1, quality); // Don't go below 0.1
              attempt++;
              compressWithQuality();
            } else {
              // We're done
              const url = URL.createObjectURL(blob);
              compressedPreview.src = url;
              compressedPreview.style.display = 'block';
              
              // Show compressed dimensions
              compressedDimensions.textContent = `${newWidth} × ${newHeight} px`;
              
              // Update progress bar to 100%
              progressBarInner.style.width = '100%';
              
              // Display compressed file size
              compressedSizeDisplay.textContent = `${compressedSizeKB.toFixed(2)} KB`;
              
              // Calculate and display reduction percentage
              const originalSizeKB = parseFloat(originalSizeDisplay.textContent);
              const reduction = 100 - (compressedSizeKB / originalSizeKB * 100);
              reductionPercent.textContent = `${reduction.toFixed(1)}%`;
              
              // Set appropriate extension
              let extension = selectedFormat;
              if (selectedFormat === 'jpeg') extension = 'jpg';
              
              // Enable download link
              downloadLink.href = url;
              downloadLink.download = `compressed_image.${extension}`;
              downloadLink.style.display = 'block';
              downloadLink.textContent = `Download ${selectedFormat.toUpperCase()} (${Math.round(compressedSizeKB)} KB)`;
            }
          },
          mimeType,
          quality
        );
      }
      
      compressWithQuality();
    };
  };
  
  reader.readAsDataURL(file);
}

// Initialize drag & drop
if ('draggable' in document.createElement('span')) {
  dropText.style.display = 'block';
  dropZone.style.border = '2px dashed #ddd';
  dropZone.style.borderRadius = '5px';
  dropZone.style.padding = '25px';
  dropZone.style.textAlign = 'center';
  dropZone.style.cursor = 'pointer';
  
  // Hide the default file input styling
  imageInput.style.opacity = 0;
  imageInput.style.position = 'absolute';
  imageInput.style.width = '100%';
  imageInput.style.height = '100%';
  imageInput.style.top = 0;
  imageInput.style.left = 0;
  imageInput.style.cursor = 'pointer';
}