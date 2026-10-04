export const company = {
	name: 'KingSun',
	description: 'Soluções inteligentes em energia solar e mobilidade elétrica para um futuro mais leve.',
	whatsappNumber: '5511967966763',
	whatsappMessage: 'Ola! Quero simular minha economia com a KingSun.',
	phone: '+55 (11) 96796-6763',
	email: 'contato@kingsun.com.br',
	address: 'São Paulo - SP',
	canonicalSiteUrl: '',
	socialLinks: { instagram: '#', linkedin: '#' },
} as const;

export function whatsappUrl(message = company.whatsappMessage) {
	return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
