import { createClient, type ContentfulClientApi } from "contentful";

let cachedClient: ContentfulClientApi<undefined> | null = null;

export function isContentfulConfigured(): boolean {
  return Boolean(
    import.meta.env.CONTENTFUL_SPACE_ID?.trim() &&
      import.meta.env.CONTENTFUL_DELIVERY_TOKEN?.trim(),
  );
}

function getClient(): ContentfulClientApi<undefined> {
  if (cachedClient) return cachedClient;

  const space = import.meta.env.CONTENTFUL_SPACE_ID?.trim();
  const accessToken = import.meta.env.CONTENTFUL_DELIVERY_TOKEN?.trim();

  if (!space || !accessToken) {
    throw new Error(
      "Faltan las variables de entorno CONTENTFUL_SPACE_ID y/o CONTENTFUL_DELIVERY_TOKEN.",
    );
  }

  cachedClient = createClient({
    space,
    accessToken,
  });

  return cachedClient;
}

export interface PresentacionPerfume {
  id: string;
  categoria: string;
  mililitros: string;
  precio: number;
  enOferta: boolean;
  porcentajeDescuento: number;
  precioFinal: number;
}

export interface Perfume {
  id: string;
  nombre: string;
  descripcion: string;
  marca: string;
  genero: string;
  aromas: string[];
  imagen: string;
  presentaciones: PresentacionPerfume[];
}

export interface Contacto {
  diasYHorarios: string;
  whatsapp: string;
  tiktok: string;
  instagram: string;
  metodosEntrega: string[];
  puntosEncuentro: string[];
}

export interface DatosTienda {
  descripcionInicio: string;
  contacto: Contacto;
  perfumes: Perfume[];
}

export async function getDatosTienda(): Promise<DatosTienda> {
  const client = getClient();

  const [presentacionRes, contactoRes, perfumesRes] = await Promise.all([
    client.getEntries({
      content_type: "presentacion",
      limit: 1,
    }),
    client.getEntries({
      content_type: "contacto",
      limit: 1,
    }),
    client.getEntries({
      content_type: "perfume",
      include: 2,
      limit: 1000,
    }),
  ]);

  // 1. Texto de presentación de inicio
  const descripcionInicio =
    (presentacionRes.items[0]?.fields?.descripcion as string | undefined) ?? "";

  // 2. Datos de contacto y logística
  const c = (contactoRes.items[0]?.fields ?? {}) as Record<string, unknown>;
  const rawMetodos = c.metodosDeEntrega ?? c.metodosEntrega;
  const rawPuntos = c.puntosDeEncuentro ?? c.puntosEncuentro;

  const contacto: Contacto = {
    diasYHorarios: typeof c.diasYHorarios === "string" ? c.diasYHorarios : "",
    whatsapp: typeof c.whatsapp === "string" ? c.whatsapp : "",
    tiktok: typeof c.tiktok === "string" ? c.tiktok : "",
    instagram: typeof c.instagram === "string" ? c.instagram : "",
    metodosEntrega: Array.isArray(rawMetodos)
      ? rawMetodos.filter((item): item is string => typeof item === "string")
      : [],
    puntosEncuentro: Array.isArray(rawPuntos)
      ? rawPuntos.filter((item): item is string => typeof item === "string")
      : [],
  };

  // 3. Catálogo de perfumes con sus presentaciones vinculadas
  const perfumes: Perfume[] = perfumesRes.items
    .map((item) => {
      const f = item.fields as Record<string, unknown>;
      const imagenField = f.imagen as
        | { fields?: { file?: { url?: string } } }
        | undefined;
      const rawUrl = imagenField?.fields?.file?.url;
      const urlImagen = rawUrl
        ? `${rawUrl.startsWith("http") ? rawUrl : `https:${rawUrl}`}?fm=webp&w=600&q=80`
        : "";

      const rawPresentaciones = Array.isArray(f.presentaciones)
        ? (f.presentaciones as Array<{
            sys?: { id?: string };
            fields?: Record<string, unknown>;
          }>)
        : [];

      // Mapea cada presentación hija (ignorando las que sigan en borrador)
      const presentaciones: PresentacionPerfume[] = rawPresentaciones
        .filter(
          (p): p is { sys: { id: string }; fields: Record<string, unknown> } =>
            Boolean(p && p.fields && p.sys?.id),
        )
        .map((p) => {
          const pf = p.fields;
          const precio = Number(pf.precio) || 0;
          const enOferta = Boolean(pf.enOferta);
          const porcentajeDescuento = Number(pf.porcentajeDescuento) || 0;

          const precioFinal =
            enOferta && porcentajeDescuento > 0
              ? Math.round(precio * (1 - porcentajeDescuento / 100))
              : precio;

          return {
            id: p.sys.id,
            categoria: typeof pf.categoria === "string" ? pf.categoria : "",
            mililitros: typeof pf.mililitros === "string" ? pf.mililitros : "",
            precio,
            enOferta,
            porcentajeDescuento,
            precioFinal,
          };
        });

      return {
        id: item.sys.id,
        nombre: typeof f.nombre === "string" ? f.nombre : "",
        descripcion: typeof f.descripcion === "string" ? f.descripcion : "",
        marca: typeof f.marca === "string" ? f.marca : "",
        genero: typeof f.genero === "string" ? f.genero : "",
        aromas: Array.isArray(f.aromas)
          ? f.aromas.filter((a): a is string => typeof a === "string")
          : [],
        imagen: urlImagen,
        presentaciones,
      };
    })
    .filter((perfume) => perfume.presentaciones.length > 0);

  return {
    descripcionInicio,
    contacto,
    perfumes,
  };
}
