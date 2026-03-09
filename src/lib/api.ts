import type {
  Advantage,
  Clinic,
  Contacts,
  Doctor,
  FAQ,
  Founder,
  Service,
  Tip,
} from "./types";

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`/api/proxy?path=${encodeURIComponent(endpoint)}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  getAdvantages: () => fetchApi<Advantage[]>("/advantages"),
  getAdvantage: (id: number) => fetchApi<Advantage>(`/advantages/${id}`),

  getClinics: () => fetchApi<Clinic[]>("/admin/clinics/"),
  getClinic: (id: number) => fetchApi<Clinic>(`/admin/clinics/${id}`),

  getContacts: () => fetchApi<Contacts>("/client/contacts"),

  getDoctors: (params?: { category_id?: number; clinic_id?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.category_id) searchParams.set("category_id", String(params.category_id));
    if (params?.clinic_id) searchParams.set("clinic_id", String(params.clinic_id));
    const query = searchParams.toString();
    return fetchApi<Doctor[]>(`/client/doctors/${query ? `?${query}` : ""}`);
  },
  getDoctor: (id: number) => fetchApi<Doctor>(`/client/doctors/${id}`),

  getFaqs: () => fetchApi<FAQ[]>("/admin/faqs/"),

  getFounders: () => fetchApi<Founder[]>("/founders"),
  getFounder: (id: number) => fetchApi<Founder>(`/founders/${id}`),

  getServices: () => fetchApi<Service[]>("/admin/services/"),

  getTips: () => fetchApi<Tip[]>("/client/tips"),
};
