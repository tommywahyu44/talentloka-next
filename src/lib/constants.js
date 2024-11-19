export const localStorageKeys = {
  earlyOnboardingClient: 'earlyOnboardingClient',
}

/// Lottie
export const lottieFiles = {
  loading: 'https://lottie.host/ad2eb7f6-0db1-44b6-8d16-86a7e6da8149/32ojLcX4gf.lottie',
}

/// Client Dashboard
export const clientDashboard = {
  sortOptions: [
    { name: 'Code (A-Z)', href: '', value: 'code', type: 'asc' },
    { name: 'Code (Z-A)', href: '', value: 'code', type: 'desc' },
    { name: 'Name (A-Z)', href: '', value: 'name', type: 'asc' },
    { name: 'Name (Z-A)', href: '', value: 'name', type: 'desc' },
    { name: 'Height (A-Z)', href: '#', value: 'heightCm', type: 'asc' },
    { name: 'Height (Z-A)', href: '', value: 'heightCm', type: 'desc' },
    { name: 'Weight (A-Z)', href: '', value: 'weightKg', type: 'asc' },
    { name: 'Weight (Z-A)', href: '', value: 'weightKg', type: 'desc' },
    { name: 'Date of Birth (A-Z)', href: '', value: 'dobYear', type: 'asc' },
    { name: 'Date of Birth (Z-A)', href: '', value: 'dobYear', type: 'desc' },
    { name: 'Industry (A-Z)', href: '', value: 'brands', type: 'asc' },
    { name: 'Industry (Z-A)', href: '', value: 'brands', type: 'desc' },
    { name: 'Product Field (A-Z)', href: '', value: 'events', type: 'asc' },
    { name: 'Product Field (Z-A)', href: '', value: 'events', type: 'desc' },
    {
      name: 'Average Fee (A-Z)',
      href: '',
      value: 'previousSalaryAmount',
      type: 'asc',
    },
    {
      name: 'Average Fee (Z-A)',
      href: '',
      value: 'previousSalaryAmount',
      type: 'desc',
    },
  ],
  filters: [
    {
      id: 'gender',
      name: 'commonGender',
      options: [
        { value: 'All', label: 'All', checked: false },
        { value: 'Female', label: 'commonFemale', checked: true },
        { value: 'Male', label: 'commonMale', checked: false },
      ],
    },
    {
      id: 'city',
      name: 'commonCity',
      options: [
        { value: 'All', label: 'All', checked: true },
        { value: 'Bali', label: 'Bali', checked: false },
        { value: 'Jakarta', label: 'Jakarta', checked: false },
        { value: 'Surabaya', label: 'Surabaya', checked: false },
        { value: 'Bandung', label: 'Bandung', checked: false },
      ],
    },
    {
      id: 'race',
      name: 'commonEthnic',
      options: [
        { value: 'All', label: 'All', checked: true },
        { value: 'Indonesian', label: 'Indonesian', checked: false },
        { value: 'Chinese', label: 'Indonesian - Chinese', checked: false },
      ],
    },
    {
      id: 'country',
      name: 'commonCountry',
      options: [
        { value: 'All', label: 'All', checked: false },
        { value: 'Indonesia', label: 'Indonesia', checked: true },
        { value: 'Singapore', label: 'Singapore', checked: false },
        { value: 'Malaysia', label: 'Malaysia', checked: false },
        { value: 'Vietnam', label: 'Vietnam', checked: false },
        { value: 'Thailand', label: 'Thailand', checked: false },
      ],
    },
    {
      id: 'role',
      name: 'commonRole',
      options: [
        { value: 'All', label: 'All', checked: false },
        { value: 'SPG', label: 'commonPromotor', checked: true },
        { value: 'Model', label: 'commonModel', checked: false },
      ],
    },
    {
      id: 'industry',
      name: 'commonIndustry',
      options: [
        { value: 'All', label: 'All', checked: true },
        { value: 'Automotive', label: 'Automotive', checked: false },
        { value: 'Bank', label: 'Bank', checked: false },
        { value: 'Baby / kids care', label: 'Baby / kids care', checked: false },
        { value: 'Beauty tools', label: 'Beauty tools', checked: false },
        { value: 'Fashion', label: 'Fashion', checked: false },
        { value: 'Education', label: 'Education', checked: false },
        {
          value: 'Food and beverages',
          label: 'Food and beverages',
          checked: false,
        },
        { value: 'Furniture', label: 'Furniture', checked: false },
        { value: 'Franchise', label: 'Franchise', checked: false },
        { value: 'Haircare', label: 'Haircare', checked: false },
        { value: 'Homecare', label: 'Homecare', checked: false },
        { value: 'Jewelry', label: 'Jewelry', checked: false },
        { value: 'Make up', label: 'Make up', checked: false },
        {
          value: 'Manufacturing goods',
          label: 'Manufacturing goods',
          checked: false,
        },
        {
          value: 'Medicine / healthcare',
          label: 'Medicine / healthcare',
          checked: false,
        },
        { value: 'Perfume', label: 'Perfume', checked: false },
        { value: 'Skincare', label: 'Skincare', checked: false },
        { value: 'Sports', label: 'Sports', checked: false },
        { value: 'Technology', label: 'Technology', checked: false },
        {
          value: 'Tobacco / cigarettes',
          label: 'Tobacco / cigarettes',
          checked: false,
        },
        { value: 'Watches', label: 'Watches', checked: false },
        { value: 'Wedding expo', label: 'Wedding expo', checked: false },
      ],
    },
    {
      id: 'product',
      name: 'commonProductField',
      options: [
        { value: 'All', label: 'All', checked: true },
        { value: 'Bazaar', label: 'Bazaar', checked: false },
        {
          value: 'Company Events / Expo / Exhibition',
          label: 'Company Events / Expo / Exhibition',
          checked: false,
        },
        {
          value: 'Company Gathering',
          label: 'Company Gathering',
          checked: false,
        },
        { value: 'Conference', label: 'Conference', checked: false },
        { value: 'Exhibition', label: 'Exhibition', checked: false },
        { value: 'Fair', label: 'Fair', checked: false },
        { value: 'Fashion Week', label: 'Fashion Week', checked: false },
        { value: 'Festival', label: 'Festival', checked: false },
        { value: 'Party Event', label: 'Party Event', checked: false },
        {
          value: 'Product Launching',
          label: 'Product Launching',
          checked: false,
        },
        { value: 'Seminar', label: 'Seminar', checked: false },
      ],
    },
  ],
  cardEntity: [
    '',
    {
      city: 'BALI',
      confirmed: true,
      country: 'Indonesia',
      dob: '1992',
      dobYear: 1992,
      gender: 'Male',
      heightCm: 177,
      name: 'Prasetiansyah',
      notes: '',
      profilePicture: [
        'https://firebasestorage.googleapis.com/v0/b/hireplace.appspot.com/o/promotor_spg%2FBL00001-PP-1.png?alt=media&token=47707dcf-cae2-4ae9-bb76-386b6a08f6a6',
        'https://firebasestorage.googleapis.com/v0/b/hireplace.appspot.com/o/promotor_spg%2FBL00001-PP-2.png?alt=media&token=d4c1c5af-274c-42f6-9d96-d2e9eaa4e4f5',
        'https://firebasestorage.googleapis.com/v0/b/hireplace.appspot.com/o/promotor_spg%2FBL00001-PP-3.png?alt=media&token=85744712-1204-40c7-9579-90a8cc7f95c4',
        'https://firebasestorage.googleapis.com/v0/b/hireplace.appspot.com/o/promotor_spg%2FBL00001-PP-4.png?alt=media&token=45ce4406-7e91-4a5c-9b2e-8d8ddfdec9c5',
      ],
      race: 'Indonesian',
      shirt: '',
      shoesEU: '',
      role: 'SPG',
      weightKg: 70,
      brands: [],
      events: [],
      hasTattoo: false,
      tattooLocation: '',
      isWearHijab: false,
      introVideoUrl: '',
      previousSalaryAmount: 0,
      previousSalaryCurrency: '',
    },
  ],
  navigations: [
    {
      id: 'dashboard',
      title: 'Dashboard',
    },
    {
      id: 'events',
      title: 'Events',
    },
  ],
}

/// Events Example
export const sampleEvents = {
  publicEvents: [
    {
      budget: '300000',
      bundlePackage: 'free',
      description:
        "Join us for a retail recruiting event. Promoters needed for a new product launch. Don't miss the opportunity!",
      durationDays: '2',
      durationHours: '5',
      email: 'event1@company.com',
      endDate: '2024-10-14',
      endTime: '16:00',
      estimatedFee: '1200000',
      id: 'event1public',
      image: 'https://indonesiaretailsummit.com/wp-content/uploads/2024/09/IRM07512-scaled.webp',
      industry: 'retail',
      listPromotor: [{ invitationStatus: 'INVITED', name: 'Anna', spgCode: 'SPG001' }],
      promotorNumber: '1',
      startDate: '2024-10-12',
      startTime: '11:00',
      status: '',
      timestamp: '1727674496328',
      timezone: 'Asia/Jakarta',
      title: 'Retail Promoter Event',
      type: 'Public',
      company: 'Ace Hardware',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Ace_Hardware_Logo.svg',
    },
    {
      budget: '150000',
      bundlePackage: 'basic',
      description:
        'Help us promote our new fashion line in the heart of the city. Experienced promoters are welcome!',
      durationDays: '1',
      durationHours: '6',
      email: 'event2@company.com',
      endDate: '2024-10-15',
      endTime: '17:00',
      estimatedFee: '800000',
      id: 'event2public',
      image:
        'https://www.cascadeproductions.co.uk/uploads/Images/_1920xAUTO_crop_center-center_90_none/DSC_3092-20.jpg',
      industry: 'fashion',
      listPromotor: [],
      promotorNumber: '0',
      startDate: '2024-10-15',
      startTime: '11:00',
      status: '',
      timestamp: '1727674496328',
      timezone: 'Asia/Bangkok',
      title: 'Fashion Promotion Day',
      type: 'Public',
      company: '3 Second',
      companyLogo: 'https://seeklogo.com/images/1/3-second-logo-5363B2B494-seeklogo.com.png',
    },
    {
      budget: '100000',
      bundlePackage: 'free',
      description:
        'Tech event recruiting promoters for gadget launches in retail outlets. Enthusiastic promoters needed!',
      durationDays: '3',
      durationHours: '8',
      email: 'event3@company.com',
      endDate: '2024-10-20',
      endTime: '18:00',
      estimatedFee: '500000',
      id: 'event3public',
      image:
        'https://eventmerch.com/wp-content/uploads/2014/05/Gadgershoweventmerchandiseshop-e1400146585887-500x315.jpg',
      industry: 'tech',
      listPromotor: [],
      promotorNumber: '0',
      startDate: '2024-10-18',
      startTime: '10:00',
      status: '',
      timestamp: '1727674496328',
      timezone: 'Asia/Singapore',
      title: 'Gadget Launch Promoter Recruitment',
      type: 'Public',
      company: 'Erafone',
      companyLogo:
        'https://res.cloudinary.com/df2knrwm3/image/upload/v1563932925/ahbdzwpuwtluibsk9j73.png',
    },
    {
      budget: '250000',
      bundlePackage: 'premium',
      description:
        'Join our retail campaign to promote exclusive product lines. Ideal for experienced promoters!',
      durationDays: '2',
      durationHours: '5',
      email: 'event4@company.com',
      endDate: '2024-10-25',
      endTime: '17:00',
      estimatedFee: '1500000',
      id: 'event4public',
      image: 'https://www.word-nerds.com.au/wp-content/uploads/2015/04/Event-Promotion.jpg',
      industry: 'retail',
      listPromotor: [],
      promotorNumber: '0',
      startDate: '2024-10-23',
      startTime: '12:00',
      status: '',
      timestamp: '1727674496328',
      timezone: 'Asia/Bangkok',
      title: 'Exclusive Product Launch Promotion',
      type: 'Public',
      company: 'Astra International',
      companyLogo:
        'https://media.kompas.tv/library/image/content_article/article_img/20240305003715.jpg',
    },
    {
      budget: '500000',
      bundlePackage: 'free',
      description: 'Exciting retail promoter opportunity for our biggest store launch of the year!',
      durationDays: '3',
      durationHours: '6',
      email: 'event5@company.com',
      endDate: '2024-10-30',
      endTime: '19:00',
      estimatedFee: '2000000',
      id: 'event5public',
      image: 'https://business.getonbloc.com/wp-content/uploads/2022/02/event-promotion-ideas.png',
      industry: 'retail',
      listPromotor: [],
      promotorNumber: '0',
      startDate: '2024-10-28',
      startTime: '11:00',
      status: '',
      timestamp: '1727674496328',
      timezone: 'Asia/Kuala_Lumpur',
      title: 'Mega Store Launch Promoter Recruitment',
      type: 'Public',
      company: 'Astra International',
      companyLogo:
        'https://media.kompas.tv/library/image/content_article/article_img/20240305003715.jpg',
    },
    {
      budget: '180000',
      bundlePackage: 'free',
      description:
        'Promoters needed for an international cosmetics fair. Enhance your career with this global event!',
      durationDays: '2',
      durationHours: '8',
      email: 'event6@company.com',
      endDate: '2024-11-05',
      endTime: '20:00',
      estimatedFee: '1200000',
      id: 'event6public',
      image:
        'https://img.freepik.com/premium-photo/makeup-collection-cosmetics-cosmetics-black-background_950347-1405.jpg',
      industry: 'beauty',
      listPromotor: [],
      promotorNumber: '0',
      startDate: '2024-11-03',
      startTime: '12:00',
      status: '',
      timestamp: '1727674496328',
      timezone: 'Asia/Tokyo',
      title: 'Cosmetics Fair Promoter Recruitment',
      type: 'Public',
      company: 'Wardah',
      companyLogo:
        'https://assets-a1.kompasiana.com/items/album/2019/05/05/logo-wardah-4-5cceb20e3ba7f7490d331262.png',
    },
    {
      budget: '120000',
      bundlePackage: 'basic',
      description:
        'Be part of our automotive show promotion team. Promoters needed for an exclusive car show!',
      durationDays: '1',
      durationHours: '9',
      email: 'event7@company.com',
      endDate: '2024-11-10',
      endTime: '17:00',
      estimatedFee: '1000000',
      id: 'event7public',
      image: 'https://i.pinimg.com/originals/40/69/49/40694904e2aa2276390edfc973bef5c8.jpg',
      industry: 'automotive',
      listPromotor: [],
      promotorNumber: '0',
      startDate: '2024-11-10',
      startTime: '08:00',
      status: '',
      timestamp: '1727674496328',
      timezone: 'Asia/Jakarta',
      title: 'Car Show Promoter Recruitment',
      type: 'Public',
      company: 'Astra International',
      companyLogo:
        'https://media.kompas.tv/library/image/content_article/article_img/20240305003715.jpg',
    },
    {
      budget: '140000',
      bundlePackage: 'premium',
      description:
        'Join us at our home appliance fair. Promoters needed to demonstrate new products!',
      durationDays: '1',
      durationHours: '7',
      email: 'event8@company.com',
      endDate: '2024-11-15',
      endTime: '18:00',
      estimatedFee: '900000',
      id: 'event8public',
      image: 'https://wowevents.in/wp-content/uploads/2018/12/1-1.jpg',
      industry: 'home appliances',
      listPromotor: [],
      promotorNumber: '0',
      startDate: '2024-11-15',
      startTime: '11:00',
      status: '',
      timestamp: '1727674496328',
      timezone: 'Asia/Bangkok',
      title: 'Home Appliance Fair Promoter Recruitment',
      type: 'Public',
      company: 'Ace Hardware',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Ace_Hardware_Logo.svg',
    },
  ],
  invitedEvents: [
    {
      budget: '250000',
      bundlePackage: 'premium',
      description: 'Exclusive invited-only retail event for our top promoters.',
      durationDays: '3',
      durationHours: '5',
      email: 'invite1@company.com',
      endDate: '2024-10-31',
      endTime: '18:00',
      estimatedFee: '1500000',
      id: 'inviteevent1',
      image: 'https://i.pinimg.com/736x/9c/5c/52/9c5c52b3914a05352a2712fe6c280c0b.jpg',
      industry: 'retail',
      listPromotor: [{ invitationStatus: 'INVITED', name: 'Max', spgCode: 'INV001' }],
      promotorNumber: '1',
      startDate: '2024-10-29',
      startTime: '12:00',
      status: '',
      timestamp: '1727674496328',
      timezone: 'Asia/Bangkok',
      title: 'Exclusive Promoter Invitation',
      type: 'Invited',
      company: 'Ace Hardware',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Ace_Hardware_Logo.svg',
    },
    {
      budget: '200000',
      bundlePackage: 'basic',
      description: 'VIP cosmetics event for selected promoters. Help launch a new luxury brand!',
      durationDays: '2',
      durationHours: '6',
      email: 'invite2@company.com',
      endDate: '2024-11-02',
      endTime: '19:00',
      estimatedFee: '1300000',
      id: 'inviteevent2',
      image:
        'https://corsinievents-com.s3.eu-central-1.amazonaws.com/corsini/wp-content/uploads/2017/05/fashion-week-dubai.jpg',
      industry: 'beauty',
      listPromotor: [{ invitationStatus: 'INVITED', name: 'Sophia', spgCode: 'INV002' }],
      promotorNumber: '1',
      startDate: '2024-11-01',
      startTime: '13:00',
      status: '',
      timestamp: '1727674496328',
      timezone: 'Asia/Jakarta',
      title: 'Luxury Brand Launch',
      type: 'Invited',
      company: '3 Second',
      companyLogo: 'https://seeklogo.com/images/1/3-second-logo-5363B2B494-seeklogo.com.png',
    },
  ],
  upcomingEvents: [
    {
      budget: '120000',
      bundlePackage: 'basic',
      description: 'Upcoming beauty expo with exclusive opportunities for experienced promoters.',
      durationDays: '2',
      durationHours: '5',
      email: 'upcoming1@company.com',
      endDate: '2024-12-15',
      endTime: '18:00',
      estimatedFee: '800000',
      id: 'upcomingevent1',
      image: 'https://img.harianjogja.com/posts/2023/05/26/1136531/beauty.jpg',
      industry: 'beauty',
      listPromotor: [],
      promotorNumber: '0',
      startDate: '2024-12-14',
      startTime: '12:00',
      status: 'Accepted',
      timestamp: '1727674496328',
      timezone: 'Asia/Bangkok',
      title: 'Beauty Expo Promoter Recruitment',
      type: 'Public',
      company: 'Erigo',
      companyLogo:
        'https://www.researchgate.net/publication/369899532/figure/fig1/AS:11431281140842108@1680995360651/Raise-the-logo-ERIGOs-participation-in-the-prestigious-New-York-Fashion-Week-in.png',
    },
    {
      budget: '140000',
      bundlePackage: 'free',
      description:
        'Recruitment for electronics expo promoters. Exciting opportunities for enthusiastic promoters!',
      durationDays: '3',
      durationHours: '6',
      email: 'upcoming2@company.com',
      endDate: '2024-12-18',
      endTime: '17:00',
      estimatedFee: '900000',
      id: 'upcomingevent2',
      image: 'https://www.jcc.co.id/userfiles/slider/5e14475940fd3.jpg',
      industry: 'electronics',
      listPromotor: [],
      promotorNumber: '0',
      startDate: '2024-12-16',
      startTime: '11:00',
      status: 'Accepted',
      timestamp: '1727674496328',
      timezone: 'Asia/Singapore',
      title: 'Electronics Expo Promoter Recruitment',
      type: 'Public',
      company: 'Ace Hardware',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Ace_Hardware_Logo.svg',
    },
    {
      budget: '180000',
      bundlePackage: 'free',
      description: 'Upcoming automotive fair - promoters needed for luxury car show!',
      durationDays: '1',
      durationHours: '7',
      email: 'upcoming3@company.com',
      endDate: '2024-12-22',
      endTime: '20:00',
      estimatedFee: '1100000',
      id: 'upcomingevent3',
      image:
        'https://emceelester.com/wp-content/uploads/2022/09/Car-launch-event-emcee-singapore-Volvo-XC60.jpg',
      industry: 'automotive',
      listPromotor: [],
      promotorNumber: '0',
      startDate: '2024-12-22',
      startTime: '13:00',
      status: 'Accepted',
      timestamp: '1727674496328',
      timezone: 'Asia/Kuala_Lumpur',
      title: 'Luxury Car Show Promoter Recruitment',
      type: 'Public',
      company: 'Erigo',
      companyLogo:
        'https://www.researchgate.net/publication/369899532/figure/fig1/AS:11431281140842108@1680995360651/Raise-the-logo-ERIGOs-participation-in-the-prestigious-New-York-Fashion-Week-in.png',
    },
  ],
  pastEvents: [
    {
      budget: '100000',
      bundlePackage: 'free',
      description:
        'Past event for a retail product launch. Great success with promoter involvement.',
      durationDays: '2',
      durationHours: '4',
      email: 'past1@company.com',
      endDate: '2024-08-10',
      endTime: '18:00',
      estimatedFee: '600000',
      id: 'pastevent1',
      image:
        'https://img.bizbash.com/files/base/bizbash/bzb/image/2022/05/Photo_Credit__Heidi_Lee_29__1_.627bed2a8fc8b.png?auto=format%2Ccompress&fit=max&q=70&w=400',
      industry: 'retail',
      listPromotor: [],
      promotorNumber: '0',
      startDate: '2024-08-08',
      startTime: '11:00',
      status: 'Pending',
      timestamp: '1727674496328',
      timezone: 'Asia/Jakarta',
      title: 'Retail Product Launch - Past',
      type: 'Public',
      company: 'Erigo',
      companyLogo:
        'https://www.researchgate.net/publication/369899532/figure/fig1/AS:11431281140842108@1680995360651/Raise-the-logo-ERIGOs-participation-in-the-prestigious-New-York-Fashion-Week-in.png',
    },
    {
      budget: '120000',
      bundlePackage: 'premium',
      description:
        'This past event featured promoters for a beauty product showcase. High attendance!',
      durationDays: '1',
      durationHours: '6',
      email: 'past2@company.com',
      endDate: '2024-08-18',
      endTime: '16:00',
      estimatedFee: '800000',
      id: 'pastevent2',
      image: 'https://hypeabis.id/assets/content/202405281713471716891227_crop.jpg',
      industry: 'beauty',
      listPromotor: [],
      promotorNumber: '0',
      startDate: '2024-08-18',
      startTime: '10:00',
      status: 'Cancelled',
      timestamp: '1727674496328',
      timezone: 'Asia/Bangkok',
      title: 'Beauty Product Showcase - Past',
      type: 'Public',
      company: '3 Second',
      companyLogo: 'https://seeklogo.com/images/1/3-second-logo-5363B2B494-seeklogo.com.png',
    },
    {
      budget: '180000',
      bundlePackage: 'basic',
      description:
        'This event promoted a major car brand launch. Promoters helped make this event a success.',
      durationDays: '3',
      durationHours: '7',
      email: 'past3@company.com',
      endDate: '2024-09-05',
      endTime: '20:00',
      estimatedFee: '1300000',
      id: 'pastevent3',
      image:
        'https://aliveeventsagency.com.au/wp-content/uploads/2021/09/New-Porsche-911-Car-1024x682.jpg',
      industry: 'automotive',
      listPromotor: [],
      promotorNumber: '0',
      startDate: '2024-09-03',
      startTime: '12:00',
      status: 'Paid',
      timestamp: '1727674496328',
      timezone: 'Asia/Singapore',
      title: 'Car Brand Launch - Past',
      type: 'Public',
      company: 'Erigo',
      companyLogo:
        'https://www.researchgate.net/publication/369899532/figure/fig1/AS:11431281140842108@1680995360651/Raise-the-logo-ERIGOs-participation-in-the-prestigious-New-York-Fashion-Week-in.png',
    },
    {
      budget: '140000',
      bundlePackage: 'free',
      description:
        'Past electronics event featuring new product demos. Promoters successfully engaged with the crowd.',
      durationDays: '2',
      durationHours: '6',
      email: 'past4@company.com',
      endDate: '2024-09-25',
      endTime: '18:00',
      estimatedFee: '1000000',
      id: 'pastevent4',
      image:
        'https://everythingtradeshows.com/wp-content/uploads/2022/07/what-type-of-promotion-takes-place-at-trade-shows.jpeg',
      industry: 'electronics',
      listPromotor: [],
      promotorNumber: '0',
      startDate: '2024-09-23',
      startTime: '10:00',
      status: 'Paid',
      timestamp: '1727674496328',
      timezone: 'Asia/Jakarta',
      title: 'Electronics Fair - Past',
      type: 'Public',
      company: 'Erigo',
      companyLogo:
        'https://www.researchgate.net/publication/369899532/figure/fig1/AS:11431281140842108@1680995360651/Raise-the-logo-ERIGOs-participation-in-the-prestigious-New-York-Fashion-Week-in.png',
    },
  ],
}

/// Sample Earnings
export const sampleEarnings = [
  {
    id: 'AAPS0L',
    company: 'Chase & Co.',
    event: 'Luxury Brand Day',
    date: '2024-10-12',
    duration: '2 days',
    fee: '300.000',
    totalFee: '600.000',
  },
  {
    id: 'BTPW4K',
    company: 'Fashion Forward',
    event: 'Fashion Week Event',
    date: '2024-10-01',
    duration: '3 days',
    fee: '250.000',
    totalFee: '750.000',
  },
  {
    id: 'CTYF7X',
    company: 'Tech Innovators',
    event: 'Gadget Expo 2024',
    date: '2024-09-15',
    duration: '4 days',
    fee: '200.000',
    totalFee: '800.000',
  },
  {
    id: 'DXR9Z2',
    company: 'Beauty World',
    event: 'Cosmetics Showcase',
    date: '2024-09-10',
    duration: '2 days',
    fee: '280.000',
    totalFee: '560.000',
  },
  {
    id: 'ETGH8V',
    company: 'AutoMaster Inc.',
    event: 'Automotive Fair',
    date: '2024-09-02',
    duration: '5 days',
    fee: '350.000',
    totalFee: '1.750.000',
  },
  {
    id: 'FWQJ1M',
    company: 'HomeStyle',
    event: 'Appliance Expo',
    date: '2024-08-21',
    duration: '3 days',
    fee: '220.000',
    totalFee: '660.000',
  },
  {
    id: 'GVCK2P',
    company: 'Retail Pros',
    event: 'Retail Promotion Drive',
    date: '2024-07-15',
    duration: '1 day',
    fee: '400.000',
    totalFee: '400.000',
  },
  {
    id: 'HTRB6N',
    company: 'Green Grocers',
    event: 'Sustainable Living Expo',
    date: '2024-07-12',
    duration: '4 days',
    fee: '260.000',
    totalFee: '1.040.000',
  },
  {
    id: 'JKMB4S',
    company: 'Elite Automobiles',
    event: 'Luxury Car Launch',
    date: '2024-07-08',
    duration: '3 days',
    fee: '450.000',
    totalFee: '1.350.000',
  },
  {
    id: 'LMNO5T',
    company: 'HealthWise',
    event: 'Wellness Fair',
    date: '2024-07-05',
    duration: '2 days',
    fee: '300.000',
    totalFee: '600.000',
  },
  {
    id: 'NZXL3W',
    company: 'Tech Titans',
    event: 'Tech Summit 2024',
    date: '2024-06-28',
    duration: '5 days',
    fee: '320.000',
    totalFee: '1.600.000',
  },
  {
    id: 'OPST9K',
    company: 'Glamour Cosmetics',
    event: 'Beauty Expo',
    date: '2024-06-22',
    duration: '3 days',
    fee: '280.000',
    totalFee: '840.000',
  },
  {
    id: 'QWVZ8L',
    company: 'Luxury Goods',
    event: 'Exclusive Fashion Event',
    date: '2024-06-01',
    duration: '4 days',
    fee: '370.000',
    totalFee: '1.480.000',
  },
  {
    id: 'RNYX2J',
    company: 'Auto World',
    event: 'Motor Show 2024',
    date: '2024-05-25',
    duration: '3 days',
    fee: '340.000',
    totalFee: '1.020.000',
  },
  {
    id: 'SAVF3H',
    company: 'Retail Masters',
    event: 'Grand Store Opening',
    date: '2024-04-30',
    duration: '2 days',
    fee: '310.000',
    totalFee: '620.000',
  },
]