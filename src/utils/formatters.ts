export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

export const getFileType = (extension: string): string => {
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const videoExts = ['mp4', 'avi', 'mkv', 'mov', 'flv', 'wmv'];
  const audioExts = ['mp3', 'wav', 'flac', 'aac', 'm4a'];
  const docExts = ['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx', 'ppt', 'pptx'];

  if (imageExts.includes(extension)) return 'Image';
  if (videoExts.includes(extension)) return 'Video';
  if (audioExts.includes(extension)) return 'Audio';
  if (docExts.includes(extension)) return 'Document';

  return 'Other';
};
