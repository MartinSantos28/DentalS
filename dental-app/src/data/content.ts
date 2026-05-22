import { CLINIC_BRAND_IMAGE } from '../utils/publicAsset'

export type Doctor = {
  id: string
  name: string
  title: string
  specialty: string
  bio: string
  credentials?: string[]
}

export type ClinicService = {
  id: string
  label: string
  description: string
}

export const SITE = {
  name: 'DS Dental Aesthetics',
  shortName: 'DS',
  doctorName: 'Dr. Daniel Sarmiento',
  tagline: 'Odontología Estética ✨',
  address: 'Cintalapa, Chiapas, México',
  city: 'Cintalapa',
  phone: '961-254-4233',
  contactPhone: '(961) 254-4233',
  whatsapp: '529612544233',
  instagram: 'https://www.instagram.com/ds_dentalaesthetics/',
  instagramHandle: '@ds_dentalaesthetics',
  cofepris: 'COFEPRIS 2507012002A00771',
  cedProf: 'CED. PROF. 14926123',
  mapsQuery: 'DS Dental Aesthetics, Cintalapa, Chiapas, México',
  mapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=DS+Dental+Aesthetics+Cintalapa+Chiapas',
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=DS+Dental+Aesthetics+Cintalapa+Chiapas',
}

/** Servicios oficiales del consultorio (flyer institucional) */
export const CLINIC_SERVICES: ClinicService[] = [
  {
    id: 'limpieza',
    label: 'Limpieza Dental',
    description:
      'Profilaxis profesional para eliminar placa y sarro, mantener encías sanas y prevenir caries.',
  },
  {
    id: 'blanqueamiento',
    label: 'Blanqueamiento',
    description:
      'Tratamiento para aclarar el tono de los dientes y lograr una sonrisa más brillante y uniforme.',
  },
  {
    id: 'ortodoncia',
    label: 'Ortodoncia',
    description:
      'Corrección de la posición dental con brackets o alineadores para una sonrisa alineada y funcional.',
  },
  {
    id: 'odontopediatria',
    label: 'Odontopediatría',
    description:
      'Atención dental especializada para niños, en un ambiente cómodo y con enfoque preventivo.',
  },
  {
    id: 'endodoncia',
    label: 'Endodoncia',
    description:
      'Tratamiento de conducto para salvar piezas dentales afectadas por caries profunda o trauma.',
  },
  {
    id: 'protesis',
    label: 'Prótesis',
    description:
      'Rehabilitación protésica fija o removible para restaurar función masticatoria y estética.',
  },
  {
    id: 'extracciones',
    label: 'Extracciones',
    description:
      'Extracciones dentales indicadas con técnicas seguras y cuidado postoperatorio.',
  },
  {
    id: 'resinas',
    label: 'Resinas',
    description:
      'Restauraciones estéticas en composite del color del diente para caries y fracturas.',
  },
]

export const SERVICE_TABS = CLINIC_SERVICES.map((s) => s.label)

export const NAV_ITEMS = [
  { label: 'RESERVAR CITA', path: '/booking', isAction: true },
  { label: 'SERVICIOS', path: '/services' },
  { label: 'NOSOTROS', path: '/teams' },
  { label: 'CONTACTO', path: '/contact' },
]

export const HERO = {
  number: '01',
  title: 'Odontología Estética de la mejor calidad',
  description:
    'En DS Dental Aesthetics contamos con distintos tratamientos odontológicos de la mejor calidad. Limpieza dental, blanqueamiento, ortodoncia, endodoncia, prótesis y más. Atendemos en Cintalapa con el Dr. Daniel Sarmiento.',
}

export const TEAMS_INTRO = {
  number: 'Nosotros',
  title: 'Transformamos sonrisas con diseño y precisión',
  description:
    `${SITE.doctorName} dirige ${SITE.name} en ${SITE.city}, ofreciendo tratamientos de odontología estética con resultados naturales. Conoce nuestro trabajo y agenda tu consulta.`,
  imageSrc: CLINIC_BRAND_IMAGE,
  imageAlt: `${SITE.doctorName} — ${SITE.name}, odontología estética en ${SITE.city}`,
}

export const MISSION = {
  title: '¿Por qué elegirnos?',
  text: 'Nuestra misión es ofrecerte odontología estética de excelencia, con atención cercana y tratamientos de calidad que realzan tu salud bucal y la armonía de tu sonrisa. Cada procedimiento se realiza bajo supervisión profesional, cumpliendo con los estándares sanitarios vigentes en México.',
}

export const FEATURES = [
  '8 especialidades odontológicas',
  'Atención personalizada en Cintalapa',
  'Profesional con cédula y registro COFEPRIS',
  'Agenda tu cita en línea o por WhatsApp',
]

export const DOCTORS_HOME: Doctor[] = [
  {
    id: 'daniel-sarmiento',
    name: 'Dr. Daniel Sarmiento',
    title: 'Odontología Estética',
    specialty: 'Odontología Estética',
    bio: 'Odontólogo a cargo de DS Dental Aesthetics. Ofrece limpieza dental, blanqueamiento, ortodoncia, endodoncia, prótesis, extracciones, resinas y odontopediatría en Cintalapa.',
    credentials: [SITE.cedProf, SITE.cofepris],
  },
]

export const DOCTORS_TEAM: Doctor[] = [...DOCTORS_HOME]

export const SERVICES_HERO = {
  title: 'Nuestros Servicios',
  subtitle: '¡Agenda tu cita!',
  cta: 'Tratamientos de calidad para toda la familia',
}

export const CONTACT = {
  title: 'Contáctanos',
  subtitle:
    '¿Quieres agendar una cita o resolver dudas? Escríbenos o llámanos. Estamos en Cintalapa para atenderte.',
  talkTitle: 'Llámanos',
  talkDescription:
    'Agenda tu cita por teléfono o envíanos un mensaje por WhatsApp. Con gusto te atenderemos.',
  instagramTitle: 'Síguenos en Instagram',
  instagramDescription:
    'Conoce nuestros tratamientos, resultados y novedades en nuestra cuenta oficial.',
  locationTitle: 'Ubicación',
}
