/**
 * Image generation service using Google's Imagen API
 * Same implementation as Flutter app's imagen_service.dart
 */

const IMAGEN_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict";

export interface GenerateImagesParams {
  recipeName: string;
  description: string;
  numberOfImages?: number;
}

/**
 * Generates food images for a recipe using Google's Imagen API
 * Returns array of base64 encoded image strings
 */
export async function generateRecipeImages({
  recipeName,
  description,
  numberOfImages = 1,
}: GenerateImagesParams): Promise<string[]> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || "";
  
  if (!apiKey) {
    console.warn("Google AI API Key is missing. Skipping image generation.");
    return [];
  }

  const prompt = `A professional, high-quality, delicious food photography shot of ${recipeName}. ${description}. Creating a mouth-watering presentation with perfect lighting. 4k, potentially garnished with herbs.`;

  try {
    console.log("Generating recipe images...");
    
    const response = await fetch(`${IMAGEN_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          sampleCount: numberOfImages,
          aspectRatio: "1:1",
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("Image generation failed:", response.status, errorText);
      // Return empty array - allow recipe creation to continue without images
      return [];
    }

    const data = await response.json();

    if (data.predictions) {
      const images: string[] = [];
      
      for (const prediction of data.predictions) {
        if (prediction.bytesBase64Encoded) {
          // Convert to data URL for display
          const dataUrl = `data:image/png;base64,${prediction.bytesBase64Encoded}`;
          images.push(dataUrl);
        }
      }

      console.log(`Generated ${images.length} images`);
      return images;
    }

    return [];
  } catch (error) {
    console.warn("Image generation failed (likely 404 or no access):", error);
    // Fallback: Return empty array to allow recipe creation to continue without images
    return [];
  }
}
