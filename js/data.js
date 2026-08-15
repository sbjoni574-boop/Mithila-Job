// Mithila Job - Data (locations, categories, sample jobs)

const LOCATIONS = [
  'दरभंगा', 'मधुबनी', 'समस्तीपुर', 'सीतामढ़ी', 'मुज़फ़्फ़रपुर',
  'बेगूसराय', 'सहरसा', 'सुपौल', 'मधेपुरा', 'शिवहर', 'जनकपुर'
];

const CATEGORIES = [
  { name: 'शिक्षा / Teaching', icon: 'fa-chalkboard-user', color: 'red' },
  { name: 'कंप्यूटर / IT', icon: 'fa-computer', color: 'blue' },
  { name: 'ड्राइवर', icon: 'fa-car', color: 'green' },
  { name: 'दुकान / Sales', icon: 'fa-store', color: 'orange' },
  { name: 'स्वास्थ्य / Medical', icon: 'fa-user-doctor', color: 'pink' },
  { name: 'खेती / Agriculture', icon: 'fa-wheat-awn', color: 'yellow' },
  { name: 'निर्माण / Construction', icon: 'fa-helmet-safety', color: 'gray' },
  { name: 'अन्य / Others', icon: 'fa-briefcase', color: 'purple' }
];

const SAMPLE_JOBS = [
  {
    id: 1,
    title: 'Computer Operator',
    company: 'Mithila Digital Seva Kendra',
    location: 'दरभंगा',
    category: 'कंप्यूटर / IT',
    type: 'Full Time',
    salary: '₹8,000 - ₹12,000',
    qualification: '12वीं पास + Basic Computer',
    phone: '9800000001',
    description: 'CSC सेंटर के लिए कंप्यूटर ऑपरेटर चाहिए। MS Office, टाइपिंग (हिंदी/अंग्रेज़ी) और ऑनलाइन फॉर्म भरने का अनुभव ज़रूरी। समय: सुबह 9 से शाम 6 बजे।',
    postedAt: '2026-08-14'
  },
  {
    id: 2,
    title: 'Primary Teacher (हिंदी/गणित)',
    company: 'Saraswati Vidya Mandir',
    location: 'मधुबनी',
    category: 'शिक्षा / Teaching',
    type: 'Full Time',
    salary: '₹10,000 - ₹15,000',
    qualification: 'Graduate + D.El.Ed पसंदीदा',
    phone: '9800000002',
    description: 'कक्षा 1-5 के लिए हिंदी और गणित पढ़ाने हेतु शिक्षक/शिक्षिका की आवश्यकता। बच्चों के साथ धैर्य से काम करने वाले उम्मीदवार आवेदन करें।',
    postedAt: '2026-08-14'
  },
  {
    id: 3,
    title: 'Delivery Driver (Bike)',
    company: 'Mithila Fresh Mart',
    location: 'दरभंगा',
    category: 'ड्राइवर',
    type: 'Full Time',
    salary: '₹9,000 + Petrol भत्ता',
    qualification: 'Driving License ज़रूरी',
    phone: '9800000003',
    description: 'किराना सामान की होम डिलीवरी के लिए बाइक ड्राइवर चाहिए। अपनी बाइक होना ज़रूरी। पेट्रोल खर्च अलग से मिलेगा।',
    postedAt: '2026-08-13'
  },
  {
    id: 4,
    title: 'Sales Girl / Sales Boy',
    company: 'Janki Vastralaya',
    location: 'समस्तीपुर',
    category: 'दुकान / Sales',
    type: 'Full Time',
    salary: '₹7,000 - ₹10,000',
    qualification: '10वीं पास',
    phone: '9800000004',
    description: 'कपड़े की दुकान के लिए सेल्स स्टाफ चाहिए। ग्राहकों से अच्छा व्यवहार और हिंदी/मैथिली बोलना ज़रूरी। खाने की व्यवस्था दुकान से।',
    postedAt: '2026-08-13'
  },
  {
    id: 5,
    title: 'ANM / Staff Nurse',
    company: 'Mithila Health Care Clinic',
    location: 'सीतामढ़ी',
    category: 'स्वास्थ्य / Medical',
    type: 'Full Time',
    salary: '₹12,000 - ₹18,000',
    qualification: 'ANM / GNM कोर्स',
    phone: '9800000005',
    description: 'प्राइवेट क्लिनिक के लिए अनुभवी नर्स चाहिए। इंजेक्शन, ड्रेसिंग और मरीज़ों की देखभाल का अनुभव आवश्यक। रहने की सुविधा उपलब्ध।',
    postedAt: '2026-08-12'
  },
  {
    id: 6,
    title: 'Makhana Processing Worker',
    company: 'Mithila Makhana Udyog',
    location: 'मधुबनी',
    category: 'खेती / Agriculture',
    type: 'Contract',
    salary: '₹300 - ₹450 / दिन',
    qualification: 'कोई योग्यता नहीं',
    phone: '9800000006',
    description: 'मखाना प्रोसेसिंग यूनिट में काम करने के लिए मज़दूर चाहिए। मखाना छांटना, पैकिंग और लोडिंग का काम। रोज़ाना पेमेंट की सुविधा।',
    postedAt: '2026-08-12'
  },
  {
    id: 7,
    title: 'Mobile Repairing Technician',
    company: 'Raja Mobile Point',
    location: 'मुज़फ़्फ़रपुर',
    category: 'कंप्यूटर / IT',
    type: 'Full Time',
    salary: '₹10,000 - ₹15,000',
    qualification: 'Mobile Repairing कोर्स/अनुभव',
    phone: '9800000007',
    description: 'मोबाइल की दुकान के लिए अनुभवी टेक्नीशियन चाहिए। सॉफ्टवेयर + हार्डवेयर दोनों का काम आना चाहिए। कमीशन अलग से।',
    postedAt: '2026-08-11'
  },
  {
    id: 8,
    title: 'राजमिस्त्री / Mason',
    company: 'Shree Construction',
    location: 'बेगूसराय',
    category: 'निर्माण / Construction',
    type: 'Contract',
    salary: '₹500 - ₹700 / दिन',
    qualification: 'अनुभव ज़रूरी',
    phone: '9800000008',
    description: 'मकान निर्माण के लिए अनुभवी राजमिस्त्री और हेल्पर चाहिए। लंबा काम है, कम से कम 6 महीने। रहने की व्यवस्था साइट पर।',
    postedAt: '2026-08-11'
  },
  {
    id: 9,
    title: 'Tuition Teacher (Science)',
    company: 'Vidyapati Coaching Center',
    location: 'दरभंगा',
    category: 'शिक्षा / Teaching',
    type: 'Part Time',
    salary: '₹6,000 - ₹9,000',
    qualification: 'B.Sc / M.Sc',
    phone: '9800000009',
    description: 'कक्षा 9-10 के छात्रों को Science पढ़ाने के लिए शिक्षक चाहिए। शाम 4 से 8 बजे तक। कॉलेज के छात्र भी आवेदन कर सकते हैं।',
    postedAt: '2026-08-10'
  },
  {
    id: 10,
    title: 'Medical Store Helper',
    company: 'Janaki Medical Hall',
    location: 'जनकपुर',
    category: 'स्वास्थ्य / Medical',
    type: 'Full Time',
    salary: '₹8,000 - ₹11,000',
    qualification: '12वीं पास (Science पसंदीदा)',
    phone: '9800000010',
    description: 'दवा दुकान पर काम करने के लिए हेल्पर चाहिए। दवाइयों के नाम पढ़ना और ग्राहकों को देना। धीरे-धीरे pharmacy का काम सिखाया जाएगा।',
    postedAt: '2026-08-10'
  },
  {
    id: 11,
    title: 'Auto / E-Rickshaw Driver',
    company: 'Mithila Transport Service',
    location: 'सहरसा',
    category: 'ड्राइवर',
    type: 'Full Time',
    salary: '₹9,000 - ₹13,000',
    qualification: 'Driving License',
    phone: '9800000011',
    description: 'ई-रिक्शा चलाने के लिए ड्राइवर चाहिए। गाड़ी मालिक की तरफ से मिलेगी। रोज़ का हिसाब रोज़। ईमानदार उम्मीदवार ही संपर्क करें।',
    postedAt: '2026-08-09'
  },
  {
    id: 12,
    title: 'Cook / रसोइया',
    company: 'Mithila Bhoj Restaurant',
    location: 'समस्तीपुर',
    category: 'अन्य / Others',
    type: 'Full Time',
    salary: '₹10,000 - ₹14,000',
    qualification: 'खाना बनाने का अनुभव',
    phone: '9800000012',
    description: 'रेस्टोरेंट के लिए मैथिल भोजन (दाल-भात, तरकारी, माछ) बनाने वाले रसोइया चाहिए। खाना + रहना फ्री। अनुभवी को ज़्यादा सैलरी।',
    postedAt: '2026-08-09'
  }
];
