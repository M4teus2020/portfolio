// Sites de clientes mostrados no /sites. Só entra o que o dono autorizar.
// Vazio: a seção "Feitos aqui perto" fica escondida.
export interface SiteExample {
  name: string
  city: string
  url: string
  image?: string
}

export const siteExamples: SiteExample[] = []
