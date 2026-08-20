const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const sourceLogo = path.join(__dirname, "../public/logo.webp");

const ANDROID_ICON_SIZES = [
  { folder: "mipmap-mdpi", size: 48 },
  { folder: "mipmap-hdpi", size: 72 },
  { folder: "mipmap-xhdpi", size: 96 },
  { folder: "mipmap-xxhdpi", size: 144 },
  { folder: "mipmap-xxxhdpi", size: 192 },
];

async function generateIcons() {
  console.log("Processing Bhargav Tech 4.0 logo for Android & Web...");

  // Generate web favicon & app icons
  await sharp(sourceLogo)
    .resize(32, 32)
    .toFile(path.join(__dirname, "../public/favicon.ico"));

  await sharp(sourceLogo)
    .resize(192, 192)
    .toFile(path.join(__dirname, "../public/icon.png"));

  await sharp(sourceLogo)
    .resize(180, 180)
    .toFile(path.join(__dirname, "../public/apple-icon.png"));

  console.log("✓ Web favicon and apple icons generated!");

  // Generate Android launcher icons with comfortable ~78% inner scaling (zoomed out padding)
  for (const { folder, size } of ANDROID_ICON_SIZES) {
    const targetDir = path.join(__dirname, `../android/app/src/main/res/${folder}`);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const innerSize = Math.round(size * 0.72);
    const padding = Math.round((size - innerSize) / 2);

    const launcherPath = path.join(targetDir, "ic_launcher.png");
    const roundPath = path.join(targetDir, "ic_launcher_round.png");
    const foregroundPath = path.join(targetDir, "ic_launcher_foreground.png");

    // Resized inner graphic
    const innerGraphicBuffer = await sharp(sourceLogo)
      .resize(innerSize, innerSize, { fit: "contain" })
      .toBuffer();

    // Standard Launcher Icon
    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 5, g: 10, b: 20, alpha: 1 }
      }
    })
    .composite([{ input: innerGraphicBuffer, top: padding, left: padding }])
    .png()
    .toFile(launcherPath);

    // Round Launcher Icon
    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 5, g: 10, b: 20, alpha: 1 }
      }
    })
    .composite([{ input: innerGraphicBuffer, top: padding, left: padding }])
    .png()
    .toFile(roundPath);

    // Foreground Icon (Adaptive Icon with transparent padding)
    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
    .composite([{ input: innerGraphicBuffer, top: padding, left: padding }])
    .png()
    .toFile(foregroundPath);

    console.log(`✓ Generated zoomed-out icons for ${folder} (${size}x${size}, inner: ${innerSize}px)`);
  }

  console.log("All Android & Web App Icons generated successfully!");
}

generateIcons().catch(console.error);
