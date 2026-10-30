// Fixed interface labels. Project and profile text lives in /content.
const strings = {
  navProjects: { tr: "Projeler", en: "Projects" },
  navAi: { tr: "AI Mühendisliği", en: "AI Engineering" },
  navWorkflow: { tr: "İş Akışı", en: "Workflow" },
  navSkills: { tr: "Beceriler", en: "Skills" },
  navEvidence: { tr: "Kanıtlar", en: "Evidence" },
  navExperience: { tr: "Deneyim", en: "Experience" },
  navContact: { tr: "İletişim", en: "Contact" },
  menu: { tr: "Menü", en: "Menu" },
  switchLang: { tr: "Switch to English", en: "Türkçeye geç" },

  ctaProjects: { tr: "Projelerimi İncele", en: "Explore My Projects" },
  ctaAi: { tr: "AI Mühendisliği", en: "AI Engineering" },
  ctaGithub: { tr: "GitHub'da Gör", en: "View GitHub" },
  ctaCv: { tr: "CV İndir", en: "Download CV" },
  cvOnRequest: { tr: "CV için LinkedIn", en: "CV via LinkedIn" },
  auditedOn: { tr: "Kanıtlar denetlendi:", en: "Evidence audited:" },

  projectsTitle: { tr: "Öne Çıkan Projeler", en: "Featured Projects" },
  projectsIntro: {
    tr: "Durum etiketleri tamamlanan ve devam eden işleri ayırıyor. Özel (private) depolar erişim izni gerektirir.",
    en: "Status labels separate finished from ongoing work. Private repositories need access permission.",
  },
  otherProjects: { tr: "Diğer Projeler", en: "Other Projects" },
  filterAll: { tr: "Tümü", en: "All" },
  filterByTech: { tr: "Teknoloji", en: "Technology" },
  clearFilters: { tr: "Filtreleri temizle", en: "Clear filters" },
  noMatch: { tr: "Bu filtrelerle eşleşen proje yok.", en: "No project matches these filters." },
  viewCaseStudy: { tr: "Vaka çalışmasını gör", en: "View Case Study" },
  repo: { tr: "Depo", en: "Repository" },

  cat_ai_ml: { tr: "AI / ML", en: "AI / ML" },
  cat_agents: { tr: "Agent'lar", en: "Agents" },
  cat_security: { tr: "Güvenlik", en: "Security" },
  cat_software: { tr: "Yazılım", en: "Software" },
  cat_testing: { tr: "Test", en: "Testing" },
  cat_data: { tr: "Veri", en: "Data" },
  cat_game: { tr: "Oyun", en: "Game" },

  status_completed: { tr: "Tamamlandı", en: "Completed" },
  status_ongoing: { tr: "Devam ediyor", en: "Ongoing" },
  status_prototype: { tr: "Prototip", en: "Prototype" },
  status_archived: { tr: "Arşiv", en: "Archived" },
  public: { tr: "Public", en: "Public" },
  private: { tr: "Private · erişim izniyle", en: "Private · access on request" },
  privateShort: { tr: "Private", en: "Private" },

  auth_own_code: { tr: "Kendi kodum", en: "My own code" },
  auth_ai_assisted: { tr: "AI destekli", en: "AI-assisted" },
  auth_mixed: { tr: "Karma", en: "Mixed" },

  aiTitle: { tr: "AI Engineering, Agents & Validation", en: "AI Engineering, Agents & Validation" },
  demonstrated: { tr: "Kanıtlanmış Deneyim", en: "Demonstrated Experience" },
  demonstratedSub: { tr: "Gerçekte yaptığım işler", en: "Work I have actually done" },
  transferable: { tr: "Aktarılabilir Mühendislik Becerileri", en: "Transferable Engineering Skills" },
  transferableSub: {
    tr: "Agent geliştirmeye aktarılabilir; tamamlanmış agent ürünleri değil",
    en: "Transfer to agent development; not finished agent products",
  },
  developing: { tr: "Geliştirmekte Olduğum Alanlar", en: "Areas I'm Developing" },
  developingSub: { tr: "Öğrenme hedefleri, kanıtlanmış yetkinlik değil", en: "Learning goals, not proven skills" },
  contributionTitle: { tr: "Bir AI agent ekibine katkı sağlayabileceğim alanlar", en: "Where I can contribute to an AI agent team" },
  seeIn: { tr: "Kanıt:", en: "Evidence:" },

  workflowTitle: { tr: "Geliştirme Akışı", en: "Development Workflow" },
  owner_me: { tr: "Ben", en: "Me" },
  owner_ai: { tr: "AI ajanı", en: "AI agent" },
  owner_automated: { tr: "Otomatik", en: "Automated" },
  owner_shared: { tr: "Ortak", en: "Shared" },
  realExample: { tr: "Gerçek örnek", en: "Real example" },
  stage: { tr: "Aşama", en: "Stage" },

  skillsTitle: { tr: "Beceriler", en: "Skills" },
  withoutAi: { tr: "AI olmadan", en: "Without AI" },
  withoutAiSub: { tr: "Kendi yazdığım kodla desteklenen", en: "Backed by code I wrote myself" },
  aiAssisted: { tr: "AI destekli geliştirme", en: "AI-Assisted Development" },
  aiAssistedSub: { tr: "Süreç ve doğrulama becerileri", en: "Process and validation skills" },

  evidenceTitle: { tr: "Engineering Evidence Explorer", en: "Engineering Evidence Explorer" },
  evidenceIntro: {
    tr: "Bir yetkinlik seçin; onu destekleyen proje ve kod bağlantıları listelensin.",
    en: "Pick a competency to list the projects and code links that support it.",
  },

  experienceTitle: { tr: "Deneyim ve Eğitim", en: "Experience & Education" },
  work: { tr: "İş", en: "Work" },
  education: { tr: "Eğitim", en: "Education" },

  contactTitle: { tr: "İletişim", en: "Contact" },
  contactText: {
    tr: "Özel depolara erişim, CV veya projeler hakkında sorular için LinkedIn üzerinden ulaşabilirsiniz.",
    en: "For access to private repositories, my CV or questions about the projects, reach me on LinkedIn.",
  },

  back: { tr: "Tüm projeler", en: "All projects" },
  cs_problem: { tr: "Problem", en: "Problem" },
  cs_approach: { tr: "Teknik Yaklaşım", en: "Technical Approach" },
  cs_architecture: { tr: "Mimari", en: "Architecture" },
  cs_implementation: { tr: "Uygulama", en: "Implementation" },
  cs_contribution: { tr: "Benim Katkım", en: "My Contribution" },
  cs_testing: { tr: "Test ve Doğrulama", en: "Testing & Validation" },
  cs_results: { tr: "Sonuçlar", en: "Results" },
  cs_limitations: { tr: "Mevcut Sınırlamalar", en: "Current Limitations" },
  cs_evidence: { tr: "Kanıt / GitHub", en: "Evidence / GitHub" },
  authorship: { tr: "Kodun kaynağı", en: "Who wrote the code" },
  noResults: { tr: "Bu proje için ölçülmüş sonuç gösterilmiyor.", en: "No measured results are shown for this project." },
  privateLinkNote: {
    tr: "Kilitli bağlantılar özel depolara gider; görüntülemek için erişim izni gerekir.",
    en: "Locked links go to private repositories; viewing them needs access permission.",
  },
  expandAll: { tr: "Tümünü aç", en: "Expand all" },
  collapseAll: { tr: "Tümünü kapat", en: "Collapse all" },
  clickNode: { tr: "Ayrıntı için bir adıma tıklayın.", en: "Click a step for details." },
  node_done: { tr: "Uygulandı", en: "Implemented" },
  node_pending: { tr: "Bekliyor", en: "Pending" },
  node_planned: { tr: "Planlandı", en: "Planned" },

  ver_reproduced: { tr: "Denetimde yeniden üretildi", en: "Reproduced in audit" },
  ver_ci_log: { tr: "CI logundan", en: "From CI log" },
  ver_repo_file: { tr: "Depodaki dosyadan", en: "From repo file" },
  ver_self_reported: { tr: "Beyan (yeniden kontrol edilmedi)", en: "Self-reported (not re-checked)" },

  footer: {
    tr: "Statik site · Next.js · Ücretli API çağrısı yok",
    en: "Static site · Next.js · No paid API calls",
  },
  notFound: { tr: "Sayfa bulunamadı.", en: "Page not found." },
} as const;

export type UiKey = keyof typeof strings;
export const ui: Record<UiKey, { tr: string; en: string }> = strings;
