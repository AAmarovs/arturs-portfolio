import { useEffect, useMemo, useRef, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import './App.css'

const tabs = ['webflow', 'react', 'ichgram', 'html', 'zeromoney']
const languages = ['en', 'de', 'ru']
const profilePhoto = '/media/profile/profile-photo.jpg'

const content = {
  en: {
    loading: 'Portfolio',
    brandRole: 'Portfolio',
    nav: { welcome: 'Welcome', about: 'About me', work: 'Portfolio', contact: 'Contact' },
    hero: {
      eyebrow: 'Full-Stack Developer',
      title: 'Welcome to my portfolio.',
      text: 'I build modern websites and applications with clean frontend structure, practical backend logic, and presentation quality that feels polished from the first screen.',
      primary: 'Explore projects',
      secondary: 'About me',
    },
    about: {
      eyebrow: 'About me',
      title: 'Developer profile, direction, and working focus.',
      body: 'This area will be refined further, but it already introduces my direction as a full-stack developer, my current stack, and the kind of products I am building for portfolio, applications, and client work.',
      stats: [
        { label: 'Direction', value: 'Full-Stack Web Development' },
        { label: 'Focus', value: 'React.js, Node.js, Webflow' },
        { label: 'Goal', value: 'Strong portfolio and real client-ready presentation' },
      ],
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Selected work categories',
      subtitle: 'The left panel stays fixed as the project overview. The right panel presents media, demos, and interface screens in a layered showcase slider.',
      projects: {
        webflow: {
          label: 'Webflow',
          title: 'Webflow Landing Page Development',
          description: 'A freelance Webflow landing page project designed and built from scratch. My role covered the visual direction, layout composition, responsive structure, and final implementation in Webflow, with a focus on clean presentation, usability, and a polished client-ready result.',
          stack: 'Webflow, Responsive Design, Landing Page Architecture',
        },
        react: {
          label: 'React.js',
          title: 'React E-Commerce Frontend',
          description: 'A React.js-based e-commerce frontend focused on interface quality, responsive layout, and clear user flow. My role covered page implementation, product presentation, filtering logic, cart interactions, and REST API integration into a cohesive user-facing application.',
          stack: 'React.js, Vite, Responsive UI, REST API Integration',
        },
        ichgram: {
          label: 'ICHGram',
          title: 'Full-Stack Social Media Application',
          description: 'A full-stack social media web application inspired by Instagram. My role covered the React interface, protected navigation, post feed, explore grid, search panels, notifications, messaging views, authentication flow, and backend API integration into one working product.',
          stack: 'React.js, Node.js, Express, MongoDB, REST API, Authentication',
        },
        html: {
          label: 'HTML5/CSS3/JS',
          title: 'Responsive Event Discovery Platform',
          description: 'A two-page event platform built with HTML5, CSS3, and Vanilla JavaScript from a Figma-based layout. My role covered full frontend implementation, responsive page structure, UI styling, event rendering, filtering behavior, and interactive functionality that goes beyond a static landing page.',
          stack: 'HTML5, CSS3, Vanilla JavaScript, Responsive Web Interface',
        },
        zeromoney: {
          label: 'ZeroMoney',
          title: 'Desktop Personal Finance Tracker',
          description: 'A personal desktop finance tracker built with Electron for managing debts, monthly payments, savings, and yearly overviews. My role covered the product idea, interface structure, local data workflow, and packaging into a standalone Windows application for practical day-to-day use.',
          stack: 'Electron.js, JavaScript, Desktop UI, Local Storage',
        },
      },
      controls: {
        previous: 'Previous slide',
        next: 'Next slide',
        play: 'Play video',
        pause: 'Pause video',
        fullscreen: 'Open fullscreen',
        closeFullscreen: 'Close fullscreen',
      },
      empty: 'Project media will be added here after the final selection.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'I hope you enjoyed this portfolio and decide to work with me.',
      text: 'The closing section is prepared for direct communication, networking links, and further collaboration after the portfolio review.',
      email: 'artur.amarov@gmail.com',
      phone: '+49 15205484812',
    },
    footer: 'Built as a portfolio website for presentation, applications, and client communication.',
  },
  de: {
    loading: 'Portfolio',
    brandRole: 'Portfolio',
    nav: { welcome: 'Start', about: 'Uber mich', work: 'Portfolio', contact: 'Kontakt' },
    hero: {
      eyebrow: 'Full-Stack Entwickler',
      title: 'Willkommen in meinem Portfolio.',
      text: 'Ich entwickle moderne Websites und Anwendungen mit sauberer Frontend-Struktur, praktischer Backend-Logik und einer Praesentation, die bereits auf dem ersten Screen hochwertig wirkt.',
      primary: 'Projekte ansehen',
      secondary: 'Uber mich',
    },
    about: {
      eyebrow: 'Uber mich',
      title: 'Entwicklerprofil, Richtung und fachlicher Fokus.',
      body: 'Dieser Bereich wird spaeter weiter verfeinert, zeigt aber bereits meine Ausrichtung als Full-Stack Entwickler, meinen aktuellen Stack und die Art von Produkten, die ich fuer Portfolio, Bewerbungen und Kundenarbeit entwickle.',
      stats: [
        { label: 'Richtung', value: 'Full-Stack Webentwicklung' },
        { label: 'Fokus', value: 'React.js, Node.js, Webflow' },
        { label: 'Ziel', value: 'Starkes Portfolio und klientenreife Praesentation' },
      ],
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Ausgewaehlte Projektkategorien',
      subtitle: 'Die linke Seite bleibt als Projektuebersicht stabil. Rechts werden Medien, Demos und UI-Screens in einem geschichteten Showcase-Slider praesentiert.',
      projects: {
        webflow: {
          label: 'Webflow',
          title: 'Webflow Landing Page Development',
          description: 'Ein Freelance-Landingpage-Projekt in Webflow, das von Grund auf gestaltet und umgesetzt wurde. Meine Rolle umfasste die visuelle Richtung, die Layout-Komposition, die responsive Struktur und die finale Umsetzung in Webflow mit Fokus auf saubere Praesentation, Nutzbarkeit und ein kliententaugliches Ergebnis.',
          stack: 'Webflow, Responsive Design, Landing Page Architecture',
        },
        react: {
          label: 'React.js',
          title: 'React E-Commerce Frontend',
          description: 'Ein React.js-basiertes E-Commerce-Frontend mit Fokus auf Interface-Qualitaet, responsive Layouts und einen klaren Nutzerfluss. Meine Rolle umfasste die Umsetzung der Seiten, die Produktdarstellung, Filterlogik, Warenkorb-Interaktionen und die REST-API-Anbindung des bereitgestellten Backends an eine konsistente Benutzeroberflaeche.',
          stack: 'React.js, Vite, Responsive UI, REST API Integration',
        },
        ichgram: {
          label: 'ICHGram',
          title: 'Full-Stack Social Media Application',
          description: 'Eine Full-Stack Social-Media-Webanwendung, inspiriert von Instagram. Meine Rolle umfasste das React-Interface, geschuetzte Navigation, Feed, Explore-Grid, Suche, Benachrichtigungen, Nachrichtenansichten, Authentifizierung und die Backend-API-Anbindung zu einem funktionierenden Produkt.',
          stack: 'React.js, Node.js, Express, MongoDB, REST API, Authentication',
        },
        html: {
          label: 'HTML5/CSS3/JS',
          title: 'Responsive Event Discovery Platform',
          description: 'Eine zweitseitige Event-Plattform auf Basis von HTML5, CSS3 und Vanilla JavaScript, umgesetzt nach einem Figma-Mockup. Meine Rolle umfasste die komplette Frontend-Entwicklung, responsive Seitenstruktur, UI-Styling, Event-Rendering, Filterverhalten und interaktive Funktionen ueber eine rein statische Darstellung hinaus.',
          stack: 'HTML5, CSS3, Vanilla JavaScript, Responsive Web Interface',
        },
        zeromoney: {
          label: 'ZeroMoney',
          title: 'Desktop Personal Finance Tracker',
          description: 'Ein persoenlicher Finanztracker als Electron-Desktop-Anwendung zur Verwaltung von Schulden, monatlichen Zahlungen, Ruecklagen und Jahresuebersichten. Meine Rolle umfasste die Produktidee, die Interface-Struktur, den lokalen Datenfluss und die Verpackung als eigenstaendige Windows-Anwendung fuer den praktischen Alltag.',
          stack: 'Electron.js, JavaScript, Desktop UI, Local Storage',
        },
      },
      controls: {
        previous: 'Vorherige Folie',
        next: 'Naechste Folie',
        play: 'Video abspielen',
        pause: 'Video pausieren',
        fullscreen: 'Vollbild offnen',
        closeFullscreen: 'Vollbild schliessen',
      },
      empty: 'Projektmedien werden hier nach der finalen Auswahl hinzugefugt.',
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Ich hoffe, dir hat dieses Portfolio gefallen und wir arbeiten bald zusammen.',
      text: 'Der Abschlussbereich ist fuer direkte Kommunikation, Networking-Links und weitere Zusammenarbeit nach dem Portfolio-Review vorbereitet.',
      email: 'E-Mail',
      phone: 'Telefon',
    },
    footer: 'Entwickelt als Portfolio-Website fuer Praesentation, Bewerbungen und Kundenkommunikation.',
  },
  ru: {
    loading: 'Портфолио',
    brandRole: 'Portfolio',
    nav: { welcome: 'Главная', about: 'Обо мне', work: 'Портфолио', contact: 'Контакты' },
    hero: {
      eyebrow: 'Фуллстек разработчик',
      title: 'Добро пожаловать.',
      text: 'Я создаю современные сайты и приложения с аккуратной фронтенд-структурой, понятной логикой и подачей, которая сразу выглядит как цельный продукт.',
      primary: 'Смотреть проекты',
      secondary: 'Обо мне',
    },
    about: {
      eyebrow: 'Обо мне',
      title: 'Кто я как разработчик и на чем строится мой подход.',
      body: 'Я full-stack разработчик с фокусом на React.js, Node.js, Webflow и чистую UI-реализацию. Для меня важно собирать проекты так, чтобы они были не только рабочими по логике, но и выглядели как законченные продукты: с понятным сценарием, аккуратной структурой и сильной визуальной подачей.',
      stats: [
        { label: 'Направление', value: 'Full-Stack Web Development' },
        { label: 'Стек', value: 'React.js, Node.js, Webflow, JavaScript' },
        { label: 'Подход', value: 'Интерфейсы, логика, адаптивность и product-ready presentation' },
      ],
    },
    portfolio: {
      eyebrow: 'Портфолио',
      title: 'Выбранные категории работ',
      subtitle: 'Здесь собраны проекты разного типа: коммерческий Webflow-лендинг, frontend-приложения, desktop-инструмент и интерфейсы, где можно посмотреть не только код, но и итоговую подачу продукта.',
      projects: {
        webflow: {
          label: 'Webflow',
          title: 'Webflow Landing Page Development',
          description: 'Фриланс-проект по разработке landing page на Webflow, который я спроектировал и собрал с нуля. Моя роль включала визуальное направление, композицию макета, адаптивную структуру и финальную реализацию в Webflow с фокусом на чистую подачу, удобство и клиентский уровень результата.',
          stack: 'Webflow, Responsive Design, Landing Page Architecture',
        },
        react: {
          label: 'React.js',
          title: 'React E-Commerce Frontend',
          description: 'React.js e-commerce frontend с фокусом на качество интерфейса, адаптивную верстку и понятный пользовательский сценарий. Моя роль включала реализацию страниц, подачу товаров, логику фильтрации, взаимодействие с корзиной и REST API integration предоставленного backend в цельное пользовательское приложение.',
          stack: 'React.js, Vite, Responsive UI, REST API Integration',
        },
        ichgram: {
          label: 'ICHGram',
          title: 'Full-Stack Social Media Application',
          description: 'Full-stack веб-приложение социальной сети в стиле Instagram. Моя роль включала React-интерфейс, защищенную навигацию, ленту постов, explore-сетку, поиск, уведомления, сообщения, авторизацию и интеграцию backend API в цельный рабочий продукт.',
          stack: 'React.js, Node.js, Express, MongoDB, REST API, Authentication',
        },
        html: {
          label: 'HTML5/CSS3/JS',
          title: 'Responsive Event Discovery Platform',
          description: 'Двухстраничная event-платформа на HTML5, CSS3 и Vanilla JavaScript, собранная по макету из Figma. Моя роль — полная фронтенд-реализация: адаптивная структура страниц, стилизация интерфейса, рендер событий, логика фильтров и интерактивное поведение, выходящее за рамки простой статической верстки.',
          stack: 'HTML5, CSS3, Vanilla JavaScript, Responsive Web Interface',
        },
        zeromoney: {
          label: 'ZeroMoney',
          title: 'Desktop Personal Finance Tracker',
          description: 'Личный desktop-трекер финансов на Electron для учета долгов, ежемесячных платежей, накоплений и годовых обзоров. Моя роль включала продуктовую идею, структуру интерфейса, локальную работу с данными и упаковку проекта в самостоятельное Windows-приложение для повседневного использования.',
          stack: 'Electron.js, JavaScript, Desktop UI, Local Storage',
        },
      },
      controls: {
        previous: 'Предыдущий слайд',
        next: 'Следующий слайд',
        play: 'Воспроизвести видео',
        pause: 'Пауза',
        fullscreen: 'Открыть на весь экран',
        closeFullscreen: 'Закрыть полноэкранный режим',
      },
      empty: 'Медиа проекта будут добавлены сюда после финального отбора.',
    },
    contact: {
      eyebrow: 'Контакты',
      title: 'Надеюсь, вам понравилось это портфолио и вы решите сотрудничать со мной.',
      text: 'Это портфолио собрано как профессиональная витрина моих проектов, подхода к интерфейсам и уровня реализации. Я открыт к full-time позициям, freelance-задачам и сотрудничеству, где важны сильный UI, аккуратный код и доведение продукта до рабочего результата.',
      email: 'artur.amarov@gmail.com',
      phone: '+49 15205484812',
    },
    footer: 'Портфолио-сайт, собранный для откликов, презентации проектов и профессиональной коммуникации.',
  },
}

const projectMedia = {
  webflow: [
    { type: 'video', key: 'webflow-video', src: '/media/webflow/Webflow_landing.mp4', poster: '/media/webflow/webflow-home-hero-about.png' },
    { type: 'image', key: 'webflow-home-hero-about', src: '/media/webflow/webflow-home-hero-about.png' },
    { type: 'image', key: 'webflow-about-problems', src: '/media/webflow/webflow-about-problems.png' },
    { type: 'image', key: 'webflow-about-story-problems', src: '/media/webflow/webflow-about-story-problems.png' },
    { type: 'image', key: 'webflow-services-preview', src: '/media/webflow/webflow-services-preview.png' },
    { type: 'image', key: 'webflow-reviews-faq', src: '/media/webflow/webflow-reviews-faq.png' },
    { type: 'image', key: 'webflow-faq-details', src: '/media/webflow/webflow-faq-details.png' },
    { type: 'image', key: 'webflow-services-main', src: '/media/webflow/webflow-services-main.png' },
    { type: 'image', key: 'webflow-services-footer', src: '/media/webflow/webflow-services-footer.png' },
  ],
  react: [
    { type: 'video', key: 'react-video', src: '/media/react/demo.mp4', poster: '/media/react/homepage-hero.png' },
    { type: 'image', key: 'react-home-hero', src: '/media/react/homepage-hero.png' },
    { type: 'image', key: 'react-home-discount', src: '/media/react/homepage-categories-discount.png' },
    { type: 'image', key: 'react-home-sale', src: '/media/react/homepage-sale.png' },
    { type: 'image', key: 'react-contact-map', src: '/media/react/contact-map.png' },
    { type: 'image', key: 'react-categories', src: '/media/react/categories-page.png' },
    { type: 'image', key: 'react-products', src: '/media/react/all-products-page.png' },
    { type: 'image', key: 'react-cart', src: '/media/react/shopping-cart-page.png' },
  ],
  ichgram: [
    { type: 'video', key: 'ichgram-video', src: '/media/ichgram/ichgram-demo.mp4', poster: '/media/ichgram/ichgram-home-feed.png' },
    { type: 'image', key: 'ichgram-home-feed', src: '/media/ichgram/ichgram-home-feed.png' },
    { type: 'image', key: 'ichgram-search-panel', src: '/media/ichgram/ichgram-search-panel.png' },
    { type: 'image', key: 'ichgram-explore-grid', src: '/media/ichgram/ichgram-explore-grid.png' },
    { type: 'image', key: 'ichgram-messages-empty-state', src: '/media/ichgram/ichgram-messages-empty-state.png' },
    { type: 'image', key: 'ichgram-notifications-panel', src: '/media/ichgram/ichgram-notifications-panel.png' },
  ],
  html: [
    { type: 'video', key: 'html-video', src: '/media/html/meetup-home.mp4', poster: '/media/html/meetup-homepage-hero.png' },
    { type: 'image', key: 'html-home-hero', src: '/media/html/meetup-homepage-hero.png' },
    { type: 'image', key: 'html-home-events-near', src: '/media/html/meetup-homepage-events-near.png' },
    { type: 'image', key: 'html-home-categories', src: '/media/html/meetup-homepage-categories.png' },
    { type: 'image', key: 'html-events-filters', src: '/media/html/meetup-events-page-filters.png' },
    { type: 'image', key: 'html-events-results', src: '/media/html/meetup-events-page-results.png' },
    { type: 'image', key: 'html-events-map', src: '/media/html/meetup-events-page-map.png' },
  ],
  zeromoney: [
    { type: 'video', key: 'zeromoney-video', src: '/media/zeromoney/zeromoney-demo.mp4', poster: '/media/zeromoney/zeromoney-home-overview.png' },
    { type: 'image', key: 'zeromoney-home-overview', src: '/media/zeromoney/zeromoney-home-overview.png' },
    { type: 'image', key: 'zeromoney-march-detail', src: '/media/zeromoney/zeromoney-march-detail.png' },
    { type: 'image', key: 'zeromoney-graphs-overview', src: '/media/zeromoney/zeromoney-graphs-overview.png' },
  ],
}

function formatTime(value) {
  if (!Number.isFinite(value)) return '0:00'
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function wrapIndex(index, length) {
  if (length <= 0) return 0
  return ((index % length) + length) % length
}

const portfolioAssets = Object.values(projectMedia).flat()
const preloadAssets = Array.from(
  new Map(
    portfolioAssets
      .flatMap((item) => [item.src, item.poster].filter(Boolean))
      .map((src) => [src, { src }]),
  ).values(),
)

function App() {
  const [language, setLanguage] = useState('en')
  const [activeTab, setActiveTab] = useState('react')
  const [slideIndex, setSlideIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [assetUrls, setAssetUrls] = useState({})
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef(null)
  const showcaseRef = useRef(null)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(timer)
          window.setTimeout(() => setLoaded(true), 220)
          return 100
        }
        return Math.min(current + 5, 100)
      })
    }, 190)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    let isCancelled = false
    const createdUrls = []

    async function preloadPortfolioMedia() {
      const loadedAssets = {}

      await Promise.all(preloadAssets.map(async (asset) => {
        try {
          const response = await fetch(asset.src, { cache: 'force-cache' })
          if (!response.ok) {
            throw new Error(`Failed to preload ${asset.src}`)
          }

          const blob = await response.blob()
          const objectUrl = URL.createObjectURL(blob)
          createdUrls.push(objectUrl)
          loadedAssets[asset.src] = objectUrl

          if (!isCancelled) {
            setAssetUrls((current) => ({ ...current, [asset.src]: objectUrl }))
          }
        } catch {
          loadedAssets[asset.src] = asset.src
        }
      }))

      if (!isCancelled) {
        setAssetUrls((current) => ({ ...loadedAssets, ...current }))
      }
    }

    preloadPortfolioMedia()

    return () => {
      isCancelled = true
      createdUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === showcaseRef.current)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const t = useMemo(() => content[language], [language])
  const activeProject = t.portfolio.projects[activeTab]
  const mediaItems = projectMedia[activeTab] ?? []
  const activeSlideIndex = wrapIndex(slideIndex, mediaItems.length)
  const currentMedia = mediaItems[activeSlideIndex]
  const isVideoSlide = currentMedia?.type === 'video'
  const getAssetSrc = (src) => assetUrls[src] || src

  useEffect(() => {
    const video = videoRef.current
    if (!video || !isVideoSlide) {
      return undefined
    }

    const syncInitialState = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        setDuration(video.duration)
      }
      setCurrentTime(video.currentTime || 0)
      setIsPlaying(!video.paused)
    }

    const handleLoadedMetadata = () => syncInitialState()
    const handleDurationChange = () => syncInitialState()
    const handleTimeUpdate = () => setCurrentTime(video.currentTime)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    const frame = window.requestAnimationFrame(syncInitialState)

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('durationchange', handleDurationChange)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    video.play().catch(() => setIsPlaying(false))

    return () => {
      window.cancelAnimationFrame(frame)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('durationchange', handleDurationChange)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [activeTab, activeSlideIndex, isVideoSlide])

  const handleTabChange = (tab) => {
    videoRef.current?.pause()
    setSlideIndex(0)
    setCurrentTime(0)
    setDuration(0)
    setIsPlaying(true)
    setActiveTab(tab)
  }

  const goToSlide = (index) => setSlideIndex(wrapIndex(index, mediaItems.length))
  const goToPrevious = () => setSlideIndex((current) => wrapIndex(current - 1, mediaItems.length))
  const goToNext = () => setSlideIndex((current) => wrapIndex(current + 1, mediaItems.length))

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }

  const handleSeek = (event) => {
    const video = videoRef.current
    if (!video) return
    const nextTime = Number(event.target.value)
    video.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const openFullscreen = async () => {
    const target = showcaseRef.current
    if (!target || !target.requestFullscreen) return
    await target.requestFullscreen()
  }

  const closeFullscreen = async () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      await document.exitFullscreen()
    }
  }

  return (
    <>
      <Analytics />
      {!loaded && (
        <div className="loading-screen" aria-live="polite">
          <div className="loading-content">
            <p className="loading-title">{t.loading}</p>
            <div className="loading-bar" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>
            <p className="loading-progress">{progress}%</p>
          </div>
        </div>
      )}

      <div className={`page-shell ${loaded ? 'is-visible' : 'is-hidden'}`}>
        <header className="site-header">
          <a className="brand" href="#welcome">
            <span className="brand-mark"><img src={profilePhoto} alt="Arturs Amarovs" /></span>
            <span className="brand-copy">
              <strong>Arturs Amarovs</strong>
              <span>{t.brandRole}</span>
            </span>
          </a>

          <nav className="site-nav" aria-label="Main navigation">
            <a href="#welcome">{t.nav.welcome}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#portfolio">{t.nav.work}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <div className="language-switcher" aria-label="Language switcher">
            {languages.map((lang) => (
              <button key={lang} className={language === lang ? 'is-active' : ''} type="button" onClick={() => setLanguage(lang)}>
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        <main>
          <section className="welcome-section" id="welcome">
            <div className="welcome-panel">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>{t.hero.title}</h1>
              <p className="welcome-text">{t.hero.text}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#portfolio">{t.hero.primary}</a>
                <a className="button button-secondary" href="#about">{t.hero.secondary}</a>
              </div>
            </div>
          </section>

          <section className="about-section" id="about">
            <div className="section-heading">
              <p className="eyebrow">{t.about.eyebrow}</p>
              <h2>{t.about.title}</h2>
            </div>

            <div className="about-grid">
              <div className="profile-photo-frame">
                <div className="profile-photo-ring">
                  <img src={profilePhoto} alt="Arturs Amarovs portrait" />
                </div>
              </div>

              <div className="about-card">
                <p>{t.about.body}</p>
                <div className="about-stats">
                  {t.about.stats.map((item) => (
                    <article className="stat-card" key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="portfolio-section" id="portfolio">
            <div className="section-heading">
              <p className="eyebrow">{t.portfolio.eyebrow}</p>
              <h2>{t.portfolio.title}</h2>
            </div>

            <p className="section-subtitle section-subtitle-portfolio">{t.portfolio.subtitle}</p>

            <div className="tab-row" role="tablist" aria-label="Project categories">
              {tabs.map((tab) => (
                <button key={tab} className={activeTab === tab ? 'tab-button is-active' : 'tab-button'} type="button" onClick={() => handleTabChange(tab)}>
                  {t.portfolio.projects[tab].label}
                </button>
              ))}
            </div>

            <div className="project-showcase">
              <article className="project-description-card">
                <p className="project-label">{activeProject.label}</p>
                <h3>{activeProject.title}</h3>
                <p>{activeProject.description}</p>
                <div className="stack-pill">{activeProject.stack}</div>
              </article>

              <div className="media-showcase-card" ref={showcaseRef}>
                {isFullscreen && (
                  <button type="button" className="fullscreen-close-button" aria-label={t.portfolio.controls.closeFullscreen} onClick={closeFullscreen}>
                    ×
                  </button>
                )}

                <div className="media-stage" role="region" aria-label={`${activeProject.label} media slider`}>
                  {mediaItems.map((item, index) => {
                    const offset = index - activeSlideIndex
                    const normalizedOffset = ((offset + mediaItems.length + Math.floor(mediaItems.length / 2)) % mediaItems.length) - Math.floor(mediaItems.length / 2)
                    const isActive = index === activeSlideIndex
                    const positionClass = isActive
                      ? 'is-current'
                      : normalizedOffset === 1 || normalizedOffset === -(mediaItems.length - 1)
                        ? 'is-next'
                        : normalizedOffset === -1 || normalizedOffset === mediaItems.length - 1
                          ? 'is-prev'
                          : 'is-hidden'
                    const shouldLoadMedia = positionClass !== 'is-hidden'

                    return (
                      <article key={item.key} className={`media-slide ${positionClass}`} aria-hidden={!isActive}>
                        <div className="media-slide-inner">
                          {shouldLoadMedia && item.type === 'video' && (
                            <video
                              ref={isActive ? videoRef : null}
                              className="media-asset"
                              src={getAssetSrc(item.src)}
                              poster={item.poster ? getAssetSrc(item.poster) : undefined}
                              autoPlay={isActive}
                              muted
                              loop
                              playsInline
                              preload="auto"
                            />
                          )}
                          {shouldLoadMedia && item.type === 'image' && (
                            <img className="media-asset" src={getAssetSrc(item.src)} alt={item.key} loading="eager" decoding="async" />
                          )}
                          {shouldLoadMedia && item.type === 'placeholder' && (
                            <div className="media-placeholder-card">
                              <span>{t.portfolio.empty}</span>
                            </div>
                          )}
                        </div>
                      </article>
                    )
                  })}
                </div>

                <div className="media-controls">
                  <div className="arrow-group arrow-group--rich">
                    <button type="button" className="arrow-button" aria-label={t.portfolio.controls.previous} onClick={goToPrevious}>←</button>

                    {isVideoSlide ? (
                      <div className="inline-player-controls">
                        <button type="button" className="player-control-button" aria-label={isPlaying ? t.portfolio.controls.pause : t.portfolio.controls.play} onClick={togglePlayback}>
                          {isPlaying ? '❚❚' : '▶'}
                        </button>
                        <span className="time-readout">{formatTime(currentTime)}</span>
                        <input
                          className="timeline-slider"
                          type="range"
                          min="0"
                          max={Math.max(duration, 0.1)}
                          step="0.1"
                          value={Math.min(currentTime, Math.max(duration, 0.1))}
                          onInput={handleSeek}
                          onChange={handleSeek}
                        />
                        <span className="time-readout">{formatTime(duration)}</span>
                        {!isFullscreen && (
                          <button type="button" className="player-control-button" aria-label={t.portfolio.controls.fullscreen} onClick={openFullscreen}>⛶</button>
                        )}
                      </div>
                    ) : isFullscreen ? (
                      <div className="inline-player-controls inline-player-controls--empty" aria-hidden="true" />
                    ) : (
                      <div className="inline-player-controls inline-player-controls--image">
                        <button type="button" className="player-control-button" aria-label={t.portfolio.controls.fullscreen} onClick={openFullscreen}>⛶</button>
                      </div>
                    )}

                    <button type="button" className="arrow-button" aria-label={t.portfolio.controls.next} onClick={goToNext}>→</button>
                  </div>

                  <div className="dot-row" aria-label="Slider navigation">
                    {mediaItems.map((item, index) => (
                      <button key={item.key} type="button" className={index === activeSlideIndex ? 'dot-button is-active' : 'dot-button'} onClick={() => goToSlide(index)}>
                        <span className="sr-only">{index + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="contact-section" id="contact">
            <div className="section-heading">
              <p className="eyebrow">{t.contact.eyebrow}</p>
              <h2>{t.contact.title}</h2>
            </div>
            <p className="section-subtitle section-subtitle-contact">{t.contact.text}</p>
            <div className="contact-grid">
              <a className="contact-link" href="https://github.com/AAmarovs" target="_blank" rel="noreferrer"><span className="icon-circle">GH</span><span>github.com/AAmarovs</span></a>
              <a className="contact-link" href="https://www.linkedin.com/in/amarovit" target="_blank" rel="noreferrer"><span className="icon-circle">in</span><span>linkedin.com/in/amarovit</span></a>
              <a className="contact-link" href="mailto:artur.amarov@gmail.com"><span className="icon-circle">@</span><span>{t.contact.email}</span></a>
              <a className="contact-link" href="tel:+4915205484812"><span className="icon-circle">ph</span><span>{t.contact.phone}</span></a>
            </div>
          </section>
        </main>

        <footer className="site-footer"><p>{t.footer}</p></footer>
      </div>
    </>
  )
}

export default App













