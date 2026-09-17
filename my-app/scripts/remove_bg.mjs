import { removeBackground } from "@imgly/background-removal-node";
import fs from "fs";
import path from "path";

async function main() {
  console.log("Starting background removal...");
  const inputPath = path.resolve("../hero_selfie/image.png");
  const outputPath = path.resolve("./public/hero-person.png");

  console.log("Input:", inputPath);
  console.log("Output:", outputPath);

  const fileBuffer = fs.readFileSync(inputPath);
  const blob = new Blob([fileBuffer], { type: "image/png" });

  const resultBlob = await removeBackground(blob);
  const buffer = Buffer.from(await resultBlob.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
  console.log("Background removal successful! Saved to:", outputPath);
}

main().catch(err => {
  console.error("Error in background removal:", err);
  process.exit(1);
});
