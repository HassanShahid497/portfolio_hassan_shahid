import sharp from "sharp";
import fs from "fs";
import path from "path";

async function upscale() {
  console.log("Upscaling images with sharp...");
  const origPath = path.resolve("../hero_selfie/image.png");
  const origCutoutPath = path.resolve("./public/hero-person.png");
  const outHdImage = path.resolve("./public/hero-image.png");
  const outHdPerson = path.resolve("./public/hero-person.png");

  // 1. Load original photo (1024x572) and upscale 2x to 2048x1144 with Lanczos3 + Sharpening
  console.log("Processing Full HD Base Image...");
  const hdImageBuffer = await sharp(origPath)
    .resize(2048, 1144, {
      kernel: sharp.kernel.lanczos3,
      fit: "fill"
    })
    .sharpen({
      sigma: 1.2,
      m1: 1.0,
      m2: 2.0
    })
    .png({ quality: 100, compressionLevel: 6 })
    .toBuffer();

  fs.writeFileSync(outHdImage, hdImageBuffer);
  console.log("Saved HD Base Image:", outHdImage, hdImageBuffer.length, "bytes");

  // 2. Extract alpha channel from original cutout, resize alpha channel to 2048x1144
  console.log("Processing Full HD Cutout...");
  const cutoutAlpha = await sharp(origCutoutPath)
    .extractChannel(3) // Alpha channel
    .resize(2048, 1144, {
      kernel: sharp.kernel.lanczos3,
      fit: "fill"
    })
    .toBuffer();

  // 3. Composite the HD sharpened image with the HD alpha mask
  // Join the sharpened RGB with the resized alpha
  const hdPersonBuffer = await sharp(hdImageBuffer)
    .ensureAlpha()
    .joinChannel(cutoutAlpha)
    .png({ quality: 100, compressionLevel: 6 })
    .toBuffer();

  fs.writeFileSync(outHdPerson, hdPersonBuffer);
  console.log("Saved HD Cutout Person:", outHdPerson, hdPersonBuffer.length, "bytes");

  console.log("Done! Both images upscaled to 2048x1144 (Full HD+) with sharpened face and details.");
}

upscale().catch(err => {
  console.error("Upscale error:", err);
  process.exit(1);
});
