export type Doctor = {
  id: string
  name: string
  title: string
  specialty: string
  bio: string
  credentials?: string[]
}

export type ServiceCategory = {
  id: string
  label: string
  title: string
  subtitle: string
  description: string
  services: string[]
}

export type TeamMember = {
  id: string
  name: string
  category: string
  experience: string
  credentials: string[]
}

export type NavItem = {
  label: string
  path: string
}
