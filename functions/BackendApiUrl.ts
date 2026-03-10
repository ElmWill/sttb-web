// Centralized API URLs definition
const baseUrl = "/api/gateway";

export const BackendApiUrl = {
  // Authentication
  login: baseUrl + "/auth/login",
  
  // Dashboard & Misc
  getDashboardStats: baseUrl + "/dashboard/stats",
  
  // News (Berita)
  getNewsList: baseUrl + "/news",
  getNewsDetail: baseUrl + "/news",
  createNews: baseUrl + "/news/create",
  updateNews: baseUrl + "/news",
  deleteNews: baseUrl + "/news",

  // Events (Kegiatan)
  getEventList: baseUrl + "/events",
  getEventDetail: baseUrl + "/events",
  createEvent: baseUrl + "/events/create",
  updateEvent: baseUrl + "/events",
  deleteEvent: baseUrl + "/events",

  // Media
  getMediaList: baseUrl + "/media",
  createMedia: baseUrl + "/media/create",
  updateMedia: baseUrl + "/media",
  deleteMedia: baseUrl + "/media",

  // Programs (Akademik)
  getProgramList: baseUrl + "/programs",
  getProgramDetail: baseUrl + "/programs",
  
  // People (Dewan Dosen, Yayasan)
  getLecturerList: baseUrl + "/lecturers",
  getFoundationBoardList: baseUrl + "/foundation",
};

// Example URL builder functions
export function GetNewsList(page: number, search?: string) {
  const param = new URLSearchParams();
  param.append("page", page.toString());
  if (search) param.append("search", search);
  return BackendApiUrl.getNewsList + "?" + param.toString();
}

export function GetEventList(page: number, search?: string) {
  const param = new URLSearchParams();
  param.append("page", page.toString());
  if (search) param.append("search", search);
  return BackendApiUrl.getEventList + "?" + param.toString();
}
