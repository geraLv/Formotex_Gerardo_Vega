import mongoose from 'mongoose';

const DEFAULT_LOCAL_URI = 'mongodb://127.0.0.1:27017/formotex_inventory';
const PLACEHOLDER_REGEX = /\{\{\s*(RAW:)?([A-Z0-9_]+)\s*\}\}/gi;

type CandidateError = {
  target: string;
  message: string;
};

function maskUri(uri: string): string {
  return uri.replace(/(mongodb(?:\+srv)?:\/\/)([^@]+)@/, '$1***@');
}

function applyPlaceholders(uri: string): string {
  return uri.replace(PLACEHOLDER_REGEX, (_, rawPrefix: string | undefined, varName: string) => {
    const envValue = process.env[varName];
    if (envValue === undefined) {
      throw new Error(`Variable de entorno ${varName} requerida para resolver el URI de MongoDB`);
    }
    return rawPrefix ? envValue : encodeURIComponent(envValue);
  });
}

export async function connectDB(preferredUri?: string) {
  const candidateUris = Array.from(
    new Set(
      [
        preferredUri?.trim(),
        process.env.MONGO_URI_LOCAL?.trim(),
        DEFAULT_LOCAL_URI,
      ].filter(Boolean) as string[]
    )
  );

  const errors: CandidateError[] = [];

  for (const uri of candidateUris) {
    let resolvedUri: string;
    try {
      resolvedUri = applyPlaceholders(uri);
    } catch (resolveError) {
      const message = resolveError instanceof Error ? resolveError.message : String(resolveError);
      errors.push({ target: uri, message });
      console.warn(`No se pudo preparar el URI ${maskUri(uri)}: ${message}`);
      continue;
    }

    try {
      await mongoose.connect(resolvedUri);
      console.log(`MongoDB conectado en ${maskUri(resolvedUri)} (db: ${mongoose.connection.name})`);
      return;
    } catch (connectError) {
      const message = connectError instanceof Error ? connectError.message : String(connectError);
      errors.push({ target: resolvedUri, message });
      console.warn(`No se pudo conectar usando ${maskUri(resolvedUri)}: ${message}`);
    }
  }

  console.error('Error conectando a MongoDB. No fue posible establecer conexion con ninguno de los URIs configurados.');
  for (const attempt of errors) {
    console.error(` - ${maskUri(attempt.target)}: ${attempt.message}`);
  }
  process.exit(1);
}
