
import { BilingualContent } from './types';

export const CONTENT: BilingualContent = {
  EN: {
    nav: {
      logo: 'jm20 Organic',
      langLabel: 'EN | ES'
    },
    hero: {
      tagline: 'Purely from the source',
      headline: 'Nature, curated for your home.',
      subheadline: 'Ethically sourced, 100% organic, and delivered with a zero-carbon footprint. Experience the purest flavors of the season.',
      cta: 'Shop the Harvest'
    },
    categories: {
      seasonal: {
        title: 'Seasonal Harvest',
        subtitle: 'Freshly Picked',
        description: 'Vibrant fruits and vegetables sourced directly from local regenerative farms.',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200'
      },
      artisan: {
        title: 'Artisan Pantry',
        subtitle: 'Crafted with Care',
        description: 'Small-batch honeys, cold-pressed oils, and ancient grain flours.',
        image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=1200'
      },
      wellness: {
        title: 'Herb & Wellness',
        subtitle: 'Natural Vitality',
        description: 'Hand-blended teas and wild-harvested botanical remedies.',
        image: 'https://plus.unsplash.com/premium_photo-1693266635481-37de41003239?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      eco: {
        title: 'Eco Essentials',
        subtitle: 'Sustainable Living',
        description: 'Refillable cleaning solutions and plastic-free household goods.',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200'
      },
      subscription: {
        title: 'Subscription',
        subtitle: 'The Weekly Box',
        description: 'The best of the season, delivered to your door every Tuesday.',
        image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=1200'
      }
    },
    process: {
      title: 'Our Commitment',
      steps: [
        { title: 'Regenerative Farming', description: 'Restoring soil health and promoting biodiversity through ancient wisdom and new tech.' },
        { title: 'Ethical Supply', description: 'Transparent pricing that ensures every farmer and artisan is paid fairly and promptly.' },
        { title: 'Zero Waste', description: 'Circular logistics with compostable packaging and reusable glass containers.' }
      ]
    },
    impact: {
      title: 'Real Change',
      stats: [
        { label: 'Carbon Neutral', value: '100%' },
        { label: 'Local Farms', value: '150+' },
        { label: 'Waste Saved', value: '12 Tons' }
      ]
    },
    support: {
      title: 'Customer Service',
      tagline: 'Here for you',
      description: 'Need help? Our agents are here to help.',
      cta: 'Talk to an expert',
      image: '',
      agents: [
        { id: 'billing', title: 'Billing Agent', icon: 'CreditCard', description: ['Transaction history', 'Payment methods', 'Billing disputes'] },
        { id: 'orders', title: 'Order & Tracking', icon: 'Truck', description: ['Real-time shipping', 'Delivery dates', 'Carrier info'] },
        { id: 'refunds', title: 'Refunds & Cancellations', icon: 'RefreshCcw', description: ['Cancellation eligibility', 'Refund tracking', 'Returns'] },
        { id: 'tech', title: 'Technical Support', icon: 'Cpu', description: ['Login issues', 'App errors', 'Device compatibility'] },
        { id: 'policy', title: 'Policies & Info', icon: 'Shield', description: ['Data rights', 'Exchange policies', 'Store services'] }
      ]
    },
    footer: {
      copyright: '© 2024 jm20 Organic Collective.',
      tag: 'Grown with respect for the Earth.'
    },
    widget: {
      label: 'Assistant',
      greeting: 'Select an expert to begin',
      placeholder: 'Type your message...'
    }
  },
  ES: {
    nav: {
      logo: 'jm20 Orgánico',
      langLabel: 'ES | EN'
    },
    hero: {
      tagline: 'Puro desde el origen',
      headline: 'Naturaleza curada para tu hogar.',
      subheadline: 'De origen ético, 100% orgánico y entregado con huella de carbono cero. Vive los sabores más puros de la temporada.',
      cta: 'Comprar Cosecha'
    },
    categories: {
      seasonal: {
        title: 'Cosecha de Temporada',
        subtitle: 'Recién Recogido',
        description: 'Frutas y verduras vibrantes traídas directamente de granjas locales regenerativas.',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200'
      },
      artisan: {
        title: 'Despensa Artesanal',
        subtitle: 'Hecho con Cuidado',
        description: 'Mieles de lote pequeño, aceites prensados en frío y harinas de granos ancestrales.',
        image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=1200'
      },
      wellness: {
        title: 'Hierbas y Bienestar',
        subtitle: 'Vitalidad Natural',
        description: 'Tés mezclados a mano y remedios botánicos de recolección silvestre.',
        image: 'https://plus.unsplash.com/premium_photo-1693266635481-37de41003239?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      eco: {
        title: 'Esenciales Eco',
        subtitle: 'Vida Sostenible',
        description: 'Soluciones de limpieza recargables y artículos para el hogar sin plástico.',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200'
      },
      subscription: {
        title: 'Suscripción jm20',
        subtitle: 'La Caja Semanal',
        description: 'Lo mejor de la temporada, entregado en su puerta cada martes.',
        image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=1200'
      }
    },
    process: {
      title: 'Nuestro Compromiso',
      steps: [
        { title: 'Agricultura Regenerativa', description: 'Restaurando la salud del suelo a través de sabiduría ancestral y tecnología.' },
        { title: 'Suministro Ético', description: 'Precios transparentes que aseguran un pago justo a agricultores y artesanos.' },
        { title: 'Residuo Cero', description: 'Logística circular con envases compostables y vidrio reutilizable.' }
      ]
    },
    impact: {
      title: 'Cambio Real',
      stats: [
        { label: 'Carbono Neutral', value: '100%' },
        { label: 'Granjas Locales', value: '150+' },
        { label: 'Residuos Ahorrados', value: '12 Ton' }
      ]
    },
    support: {
      title: 'Servicio al Cliente',
      tagline: 'Estamos para ti',
      description: '¿Necesitas ayuda? Nuestros agentes están aquí para ayudarte.',
      cta: 'Hablar con un experto',
      image: '',
      agents: [
        { id: 'billing', title: 'Agente Facturación', icon: 'CreditCard', description: ['Historial transacciones', 'Métodos de pago', 'Disputas'] },
        { id: 'orders', title: 'Pedidos y Envío', icon: 'Truck', description: ['Seguimiento real', 'Fechas de entrega', 'Transportista'] },
        { id: 'refunds', title: 'Reembolsos', icon: 'RefreshCcw', description: ['Elegibilidad', 'Seguimiento reembolso', 'Devoluciones'] },
        { id: 'tech', title: 'Soporte Técnico', icon: 'Cpu', description: ['Acceso a cuenta', 'Errores app', 'Compatibilidad'] },
        { id: 'policy', title: 'Políticas', icon: 'Shield', description: ['Privacidad', 'Cambios y devoluciones', 'Servicios'] }
      ]
    },
    footer: {
      copyright: '© 2024 Colectivo Orgánico jm20.',
      tag: 'Cultivado con respeto por la Tierra.'
    },
    widget: {
      label: 'Asistente',
      greeting: 'Selecciona un experto para comenzar',
      placeholder: 'Describe tu solicitud...'
    }
  }
};
