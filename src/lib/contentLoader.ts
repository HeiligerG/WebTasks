import { BundleSchema, type Bundle } from '../types/content';

export async function loadBundle(url: string): Promise<Bundle> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to load bundle from "${url}": ${response.status} ${response.statusText}`
    );
  }

  const raw = await response.json();
  const parsed = await BundleSchema.parseAsync(raw);
  return parsed;
}

export async function loadAllBundles(urls: string[]): Promise<Bundle[]> {
  const results = await Promise.allSettled(urls.map((url) => loadBundle(url)));

  const bundles: Bundle[] = [];
  const errors: { url: string; reason: string }[] = [];

  results.forEach((result, index) => {
    const url = urls[index];
    if (result.status === 'fulfilled') {
      bundles.push(result.value);
    } else {
      const message =
        result.reason instanceof Error ? result.reason.message : String(result.reason);
      console.error(`[ContentLoader] Failed to load or validate bundle "${url}":`, message);
      errors.push({ url, reason: message });
    }
  });

  if (errors.length > 0) {
    const summary = errors.map((e) => `- ${e.url}: ${e.reason}`).join('\n');
    throw new Error(`One or more bundles failed to load:\n${summary}`);
  }

  return bundles;
}
