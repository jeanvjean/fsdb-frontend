const emailRegEx = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const validateEmail = (email) => {
  return emailRegEx.test(email);
};

export const imgCropInitialState = {
  src: null,
  imageRef: null,
  croppedImageUrl: null,
  crop: {
    unit: '%',
    width: 30,
    aspect: 16 / 16,
  },
};

export const getCroppedImg = (image, crop, fileName) => {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }
      blob.name = fileName;
      const fileUrl = URL.createObjectURL(blob);
      return resolve({ fileUrl, blob });
    }, 'image/jpeg');
  });
};


export const getURLParameter = (location, name) => {
  return (
    decodeURIComponent(
      (new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(location.search) || [
        null,
        '',
      ])[1].replace(/\+/g, '%20')
    ) || null
  );
};

export const getDateDifference = (start, end ) => {
  const date1 = new Date(start);
const date2 = new Date(end);
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
return diffDays
}
