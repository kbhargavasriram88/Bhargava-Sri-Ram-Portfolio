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

const SPLASH_SIZES = [
  { folder: "drawable", w: 512, h: 512 },
  { folder: "drawable-port-mdpi", w: 320, h: 480 },
  { folder: "drawable-port-hdpi", w: 480, h: 800 },
  { folder: "drawable-port-xhdpi", w: 720, h: 1280 },
  { folder: "drawable-port-xxhdpi", w: 960, h: 1600 },
  { folder: "drawable-port-xxxhdpi", w: 1280, h: 1920 },
  { folder: "drawable-land-mdpi", w: 480, h: 320 },
  { folder: "drawable-land-hdpi", w: 800, h: 480 },
  { folder: "drawable-land-xhdpi", w: 1280, h: 720 },
  { folder: "drawable-land-xxhdpi", w: 1600, h: 960 },
  { folder: "drawable-land-xxxhdpi", w: 1920, h: 1280 },
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

  // Generate Android launcher icons
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

    const innerGraphicBuffer = await sharp(sourceLogo)
      .resize(innerSize, innerSize, { fit: "contain" })
      .toBuffer();

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

    console.log(`✓ Generated icons for ${folder} (${size}x${size})`);
  }

  // Generate native Android Splash Screens matching the cyber dark theme
  for (const { folder, w, h } of SPLASH_SIZES) {
    const targetDir = path.join(__dirname, `../android/app/src/main/res/${folder}`);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const splashPath = path.join(targetDir, "splash.png");
    const logoSize = Math.round(Math.min(w, h) * 0.35);
    const innerGraphicBuffer = await sharp(sourceLogo)
      .resize(logoSize, logoSize, { fit: "contain" })
      .toBuffer();

    await sharp({
      create: {
        width: w,
        height: h,
        channels: 4,
        background: { r: 2, g: 6, b: 23, alpha: 1 }
      }
    })
    .composite([{ input: innerGraphicBuffer, top: Math.round((h - logoSize) / 2), left: Math.round((w - logoSize) / 2) }])
    .png()
    .toFile(splashPath);

    console.log(`✓ Generated native splash screen for ${folder} (${w}x${h})`);
  }

  console.log("All Android & Web App Icons and Native Splash Screens generated successfully!");
}

generateIcons().catch(console.error);
