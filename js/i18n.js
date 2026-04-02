/**
 * ZATCA — Internationalization (i18n) Module
 *
 * Handles EN/AR translation with RTL/LTR switching.
 * Uses data-i18n attributes on HTML elements.
 * Persists language choice in localStorage.
 *
 * @usage
 *   <span data-i18n="sidebar.dashboard">Dashboard</span>
 *   <input data-i18n-placeholder="topbar.search">
 *   <button data-i18n-label="topbar.notifications">
 */

const I18n = (() => {
  'use strict';

  const STORAGE_KEY = 'zatca-lang';
  const DEFAULT_LANG = 'en';

  const translations = {

    en: {
      /* Sidebar */
      'sidebar.brand':           'ZATCA Suite',
      'sidebar.badge':           'Compliance Active',
      'sidebar.dashboard':       'Dashboard',
      'sidebar.invoices':        'Invoices',
      'sidebar.subscriptions':   'Subscriptions',
      'sidebar.apiSettings':     'API Settings',
      'sidebar.companyName':     'Acme Compliance Corp',
      'sidebar.companyRole':     'Enterprise License',
      'sidebar.logout':          'Log Out',

      /* Topbar */
      'topbar.search':           'Search Invoices...',
      'topbar.notifications':    'Notifications',
      'topbar.help':             'Help',
      'topbar.userName':         'Compliance Officer',

      /* Page Header */
      'page.overline':           'Overview',
      'page.title':              'Operational Performance',
      'page.filterDays':         'Last 30 Days',
      'page.newInvoice':         'New Invoice',

      /* Stats */
      'stats.totalInvoices':     'Total Invoices',
      'stats.approved':          'Approved',
      'stats.rejected':          'Rejected',
      'stats.pending':           'Pending',
      'stats.actionReq':         'Action Req.',

      /* Chart */
      'chart.title':             'Submission Frequency',
      'chart.subtitle':          'Daily invoice volume vs compliance score',
      'chart.volume':            'Volume',
      'chart.errors':            'Errors',

      /* Compliance */
      'compliance.title':        'Compliance Health',
      'compliance.index':        'Index',
      'compliance.phase2':       'Phase 2 Status',
      'compliance.active':       'Active',
      'compliance.authTokens':   'Auth Tokens',
      'compliance.expires':      'Expires in 12d',

      /* Transaction Log */
      'txlog.title':             'Recent Transaction Log',
      'txlog.viewAll':           'View All Registry',
      'txlog.timestamp':         'Timestamp',
      'txlog.invoiceUuid':       'Invoice UUID',
      'txlog.vendor':            'Vendor/Entity',
      'txlog.value':             'Value',
      'txlog.response':          'ZATCA Response',
      'txlog.action':            'Action',

      /* Footer */
      'footer.copy':             'ZATCA Compliance Suite. Fully compliant with Phase 2 requirements.',
      'footer.support':          'Support',

      /* Auth */
      'auth.tagline':            'Compliance Phase 2 ready architecture',
      'auth.loginTitle':         'Welcome back',
      'auth.loginSubtitle':      'Sign in to your compliance dashboard',
      'auth.signupTitle':        'Create your account',
      'auth.signupSubtitle':     'Enter your organization details to begin onboarding',
      'auth.google':             'Continue with Google',
      'auth.orDivider':          'or continue with email',
      'auth.workEmailLabel':     'Work Email',
      'auth.emailPlaceholder':   'name@company.com',
      'auth.companyLabel':       'Company Name',
      'auth.companyPlaceholder': 'e.g. Saudi Industrial Co.',
      'auth.mobileLabel':        'Mobile Number',
      'auth.mobilePlaceholder':  '+966 5x xxx xxxx',
      'auth.passwordLabel':      'Password',
      'auth.passwordPlaceholder':'Enter your password',
      'auth.createPasswordLabel':'Create Password',
      'auth.createPasswordPlaceholder':'Min. 12 characters',
      'auth.confirmPasswordLabel':'Confirm Password',
      'auth.confirmPasswordPlaceholder':'Repeat password',
      'auth.rememberMe':         'Remember me',
      'auth.forgotPassword':     'Forgot password?',
      'auth.loginBtn':           'Sign In',
      'auth.signupBtn':          'Create Account',
      'auth.termsPrefix':        'By clicking "Create Account", you agree to our',
      'auth.termsLink':          'Terms of Service',
      'auth.termsAnd':           'and',
      'auth.privacyLink':        'Privacy Policy',
      'auth.hasAccount':         'Already have an account?',
      'auth.signInLink':         'Sign In',
      'auth.noAccount':          "Don't have an account?",
      'auth.signUpLink':         'Sign Up',

      /* Controls */
      'ctrl.theme':              'Toggle theme',
      'ctrl.lang':               'عربي'
    },

    ar: {
      /* Sidebar */
      'sidebar.brand':           'ZATCA Suite',
      'sidebar.badge':           'الامتثال نشط',
      'sidebar.dashboard':       'لوحة التحكم',
      'sidebar.invoices':        'الفواتير',
      'sidebar.subscriptions':   'الاشتراكات',
      'sidebar.apiSettings':     'إعدادات API',
      'sidebar.companyName':     'شركة أكمي للامتثال',
      'sidebar.companyRole':     'ترخيص مؤسسي',
      'sidebar.logout':          'تسجيل الخروج',

      /* Topbar */
      'topbar.search':           'بحث في الفواتير...',
      'topbar.notifications':    'الإشعارات',
      'topbar.help':             'المساعدة',
      'topbar.userName':         'مسؤول الامتثال',

      /* Page Header */
      'page.overline':           'نظرة عامة',
      'page.title':              'الأداء التشغيلي',
      'page.filterDays':         'آخر 30 يوم',
      'page.newInvoice':         'فاتورة جديدة',

      /* Stats */
      'stats.totalInvoices':     'إجمالي الفواتير',
      'stats.approved':          'معتمدة',
      'stats.rejected':          'مرفوضة',
      'stats.pending':           'قيد الانتظار',
      'stats.actionReq':         'إجراء مطلوب',

      /* Chart */
      'chart.title':             'تكرار الإرسال',
      'chart.subtitle':          'حجم الفواتير اليومي مقابل درجة الامتثال',
      'chart.volume':            'الحجم',
      'chart.errors':            'الأخطاء',

      /* Compliance */
      'compliance.title':        'صحة الامتثال',
      'compliance.index':        'المؤشر',
      'compliance.phase2':       'حالة المرحلة 2',
      'compliance.active':       'نشط',
      'compliance.authTokens':   'رموز المصادقة',
      'compliance.expires':      'تنتهي خلال 12 يوم',

      /* Transaction Log */
      'txlog.title':             'سجل المعاملات الأخيرة',
      'txlog.viewAll':           'عرض كل السجلات',
      'txlog.timestamp':         'التوقيت',
      'txlog.invoiceUuid':       'معرّف الفاتورة',
      'txlog.vendor':            'المورد/الجهة',
      'txlog.value':             'القيمة',
      'txlog.response':          'استجابة ZATCA',
      'txlog.action':            'الإجراء',

      /* Footer */
      'footer.copy':             'ZATCA Compliance Suite. متوافقة بالكامل مع متطلبات المرحلة الثانية.',
      'footer.support':          'الدعم',

      /* Controls */
      'ctrl.theme':              'تبديل المظهر',
      /* Auth */
      'auth.tagline':            'بنية جاهزة لامتثال المرحلة الثانية',
      'auth.loginTitle':         'مرحبًا بعودتك',
      'auth.loginSubtitle':      'سجّل الدخول إلى لوحة الامتثال',
      'auth.signupTitle':        'إنشاء حسابك',
      'auth.signupSubtitle':     'أدخل بيانات منشأتك لبدء التسجيل',
      'auth.google':             'المتابعة مع Google',
      'auth.orDivider':          'أو المتابعة بالبريد الإلكتروني',
      'auth.workEmailLabel':     'البريد الإلكتروني للعمل',
      'auth.emailPlaceholder':   'name@company.com',
      'auth.companyLabel':       'اسم الشركة',
      'auth.companyPlaceholder': 'مثال: الشركة السعودية الصناعية',
      'auth.mobileLabel':        'رقم الجوال',
      'auth.mobilePlaceholder':  '+966 5x xxx xxxx',
      'auth.passwordLabel':      'كلمة المرور',
      'auth.passwordPlaceholder':'أدخل كلمة المرور',
      'auth.createPasswordLabel':'إنشاء كلمة المرور',
      'auth.createPasswordPlaceholder':'12 حرف على الأقل',
      'auth.confirmPasswordLabel':'تأكيد كلمة المرور',
      'auth.confirmPasswordPlaceholder':'أعد كتابة كلمة المرور',
      'auth.rememberMe':         'تذكرني',
      'auth.forgotPassword':     'نسيت كلمة المرور؟',
      'auth.loginBtn':           'تسجيل الدخول',
      'auth.signupBtn':          'إنشاء الحساب',
      'auth.termsPrefix':        'بالنقر على "إنشاء الحساب"، أنت توافق على',
      'auth.termsLink':          'شروط الخدمة',
      'auth.termsAnd':           'و',
      'auth.privacyLink':        'سياسة الخصوصية',
      'auth.hasAccount':         'لديك حساب بالفعل؟',
      'auth.signInLink':         'تسجيل الدخول',
      'auth.noAccount':          'ليس لديك حساب؟',
      'auth.signUpLink':         'إنشاء حساب',

      'ctrl.lang':               'English'
    }
  };


  let _currentLang = DEFAULT_LANG;


  /** Initialise: read saved language, apply it. */
  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    _currentLang = (saved && translations[saved]) ? saved : DEFAULT_LANG;
    _apply(_currentLang);
  }


  /** Toggle between en ↔ ar. */
  function toggle() {
    const next = _currentLang === 'en' ? 'ar' : 'en';
    _apply(next);
  }


  /** Set a specific language. */
  function setLang(lang) {
    if (translations[lang]) _apply(lang);
  }


  /** @returns {string} Current language code. */
  function getLang() {
    return _currentLang;
  }


  /** Apply translations + direction to the DOM. */
  function _apply(lang) {
    _currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    const dict = translations[lang];

    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });

    // Aria-labels
    document.querySelectorAll('[data-i18n-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-label');
      if (dict[key]) el.setAttribute('aria-label', dict[key]);
    });
  }


  return { init, toggle, setLang, getLang };

})();

document.addEventListener('DOMContentLoaded', I18n.init);
