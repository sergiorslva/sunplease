export const company = {
	name: 'SunPlease',
	description: 'Solucoes inteligentes em energia solar e mobilidade eletrica para um futuro mais leve.',
	whatsappNumber: '5500000000000',
	whatsappMessage: 'Ola! Quero simular minha economia com a SunPlease.',
	phone: '+55 (00) 0000-0000',
	email: 'ola@sunplease.com.br',
	address: 'Seu endereco, Sua cidade - UF',
	canonicalSiteUrl: '',
	socialLinks: { instagram: '#', linkedin: '#' },
} as const;

export function whatsappUrl(message = company.whatsappMessage) {
	return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
