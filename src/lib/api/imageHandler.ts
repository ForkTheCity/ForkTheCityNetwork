// Image handling utilities for base64 conversion with validation
// Warns if images exceed recommended size limits

const MAX_IMAGE_SIZE = 500 * 1024; // 500KB in bytes
const WARN_IMAGE_SIZE = 300 * 1024; // 300KB warning threshold

export interface ImageConversionResult {
  success: boolean;
  base64?: string;
  error?: string;
  warning?: string;
  originalSize: number;
}

/**
 * Convert a File object to base64 string
 * Validates file type and size
 */
export const fileToBase64 = (file: File): Promise<ImageConversionResult> => {
  return new Promise((resolve) => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      resolve({
        success: false,
        error: 'File must be an image',
        originalSize: file.size
      });
      return;
    }

    // Check size
    if (file.size > MAX_IMAGE_SIZE) {
      resolve({
        success: false,
        error: `Image size (${formatBytes(file.size)}) exceeds maximum allowed size (${formatBytes(MAX_IMAGE_SIZE)}). Please compress or resize the image.`,
        originalSize: file.size
      });
      return;
    }

    const reader = new FileReader();
    
    reader.onload = () => {
      const base64 = reader.result as string;
      const result: ImageConversionResult = {
        success: true,
        base64,
        originalSize: file.size
      };

      // Add warning if size is large
      if (file.size > WARN_IMAGE_SIZE) {
        result.warning = `Image size is ${formatBytes(file.size)}. Consider compressing for better performance.`;
      }

      resolve(result);
    };

    reader.onerror = () => {
      resolve({
        success: false,
        error: 'Failed to read image file',
        originalSize: file.size
      });
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Convert multiple files to base64 strings
 * Returns array of results with individual success/error states
 */
export const filesToBase64 = async (
  files: FileList | File[]
): Promise<ImageConversionResult[]> => {
  const fileArray = Array.from(files);
  const promises = fileArray.map(file => fileToBase64(file));
  return Promise.all(promises);
};

/**
 * Convert FileList to array of base64 strings
 * Only returns successful conversions, logs errors
 */
export const processImageUploads = async (
  files: FileList | File[]
): Promise<{ base64Images: string[]; errors: string[]; warnings: string[] }> => {
  const results = await filesToBase64(files);
  
  const base64Images: string[] = [];
  const errors: string[] = [];
  const warnings: string[] = [];

  results.forEach((result, index) => {
    if (result.success && result.base64) {
      base64Images.push(result.base64);
      if (result.warning) {
        warnings.push(`Image ${index + 1}: ${result.warning}`);
      }
    } else if (result.error) {
      errors.push(`Image ${index + 1}: ${result.error}`);
    }
  });

  return { base64Images, errors, warnings };
};

/**
 * Validate base64 image string
 */
export const isValidBase64Image = (base64: string): boolean => {
  if (!base64 || typeof base64 !== 'string') return false;
  
  // Check if it starts with data:image/
  if (!base64.startsWith('data:image/')) return false;
  
  // Check if it has base64 encoding indicator
  if (!base64.includes('base64,')) return false;
  
  return true;
};

/**
 * Get image dimensions from base64 string
 * Useful for validation and display
 */
export const getImageDimensions = (base64: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = base64;
  });
};

/**
 * Estimate base64 string size in bytes
 */
export const estimateBase64Size = (base64: string): number => {
  // Remove data URL prefix
  const base64Data = base64.split(',')[1] || base64;
  
  // Base64 encoding increases size by ~33%
  // Each character in base64 represents 6 bits
  // Size in bytes = (length * 6) / 8
  return Math.ceil((base64Data.length * 6) / 8);
};

/**
 * Format bytes to human-readable string
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Check total storage usage
 * Warns if localStorage is getting full
 */
export const checkStorageUsage = (): { used: number; available: number; percentage: number } => {
  let used = 0;
  
  // Calculate total size of localStorage
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      used += localStorage[key].length + key.length;
    }
  }
  
  // Most browsers limit localStorage to ~5-10MB
  // We'll assume 5MB as conservative estimate
  const available = 5 * 1024 * 1024; // 5MB in bytes
  const percentage = (used / available) * 100;
  
  return { used, available, percentage };
};
