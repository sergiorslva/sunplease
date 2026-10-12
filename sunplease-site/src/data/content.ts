export const navigation = [
	{ label: 'Início', href: '#inicio' },
	{ label: 'Soluções', href: '#solucoes' },
	{ label: 'Vantagens', href: '#vantagens' },
	{ label: 'Como Funciona', href: '#como-funciona' },
	{ label: 'Quem Somos', href: '#sobre' },
	{ label: 'Contato', href: '#contato' },
] as const;

export const benefits = [
	{ number: '01', title: 'Parcelas menores que a conta de luz', text: 'Planeje a troca de gasto por investimento com mais previsibilidade para sua casa.', icon: '/images/kingsun-layout/icone-parcelas.png' },
	{ number: '02', title: 'Diversas linhas de credito', text: 'Avaliamos alternativas de financiamento para viabilizar seu projeto solar.', icon: '/images/kingsun-layout/icone-credito.png' },
	{ number: '03', title: 'Voce investe no seu patrimonio', text: 'Um sistema bem dimensionado valoriza o imovel e amplia sua autonomia energetica.', icon: '/images/kingsun-layout/icone-patrimonio.png' },
	{ number: '04', title: 'Seguranca e economia imediata', text: 'Projeto, homologacao e instalacao conduzidos por uma equipe especializada.', icon: '/images/kingsun-layout/icone-seguranca.png' },
] as const;

export const steps = [
	{ number: '1', title: 'Diagnostico', text: 'Entendemos seu consumo, rotina e objetivos para estimar o melhor caminho.', icon: '/images/kingsun-layout/processo-diagnostico.png' },
	{ number: '2', title: 'Projeto', text: 'Dimensionamos a solucao solar e os equipamentos adequados para o imovel.', icon: '/images/kingsun-layout/processo-projeto.png' },
	{ number: '3', title: 'Homologacao', text: 'Conduzimos a documentacao necessaria junto a concessionaria de energia.', icon: '/images/kingsun-layout/processo-homologacao.png' },
	{ number: '4', title: 'Instalacao', text: 'Executamos a instalacao com cuidado tecnico, seguranca e acompanhamento.', icon: '/images/kingsun-layout/processo-instalacao.png' },
	{ number: '5', title: 'Monitoramento', text: 'Acompanhamos a geracao para manter o sistema trabalhando com confianca.', icon: '/images/kingsun-layout/processo-monitoramento.png' },
] as const;

export const layoutImages = {
	hero: '/images/kingsun-layout/hero-residencia-carregador.png',
	solutions: '/images/kingsun-layout/solucoes-paineis-residenciais.png',
	advantages: '/images/kingsun-layout/familia-energia-solar.png',
	future: '/images/kingsun-layout/futuro-sustentavel.jpg',
	about: '/images/kingsun-layout/quem-somos-paineis.jpg',
} as const;
