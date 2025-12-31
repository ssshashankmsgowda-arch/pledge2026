
export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous') // needed to avoid CORS issues on CodeSandbox
        image.src = url
    })

export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<string> {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        return ''
    }

    // set canvas size to match the desired crop size, but enforce a minimum quality
    const MIN_SIZE = 1200;
    const aspect = pixelCrop.width / pixelCrop.height;

    // We want the output to be at least MIN_SIZE on the smallest dimension
    let outputWidth = pixelCrop.width;
    let outputHeight = pixelCrop.height;

    // Use a simpler approach: Always output a high-res square-ish image if possible.
    // Or just enforce 1200px width/height scaling.

    // Logic: If natural crop is smaller than 1200, scale it up.
    if (Math.min(outputWidth, outputHeight) < MIN_SIZE) {
        if (outputWidth < outputHeight) {
            outputWidth = MIN_SIZE;
            outputHeight = MIN_SIZE / aspect;
        } else {
            outputHeight = MIN_SIZE;
            outputWidth = MIN_SIZE * aspect;
        }
    }

    canvas.width = outputWidth;
    canvas.height = outputHeight;

    // Enable high quality image scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        outputWidth,
        outputHeight
    )

    // As Base64 string
    return canvas.toDataURL('image/png')
}
