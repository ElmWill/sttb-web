// Centralized API URLs definition
const baseUrl = "/api/gateway";

export const BackendApiUrl = {
  // Authentication
  login: baseUrl + "/api/Authentication/login",
  register: baseUrl + "/api/Authentication/register",
  changePassword: baseUrl + "/api/Authentication/change-password",

  // Users
  getUserList: baseUrl + "/api/Users/list",
  getUserById: baseUrl + "/api/Users", // GET /{userId}
  createUser: baseUrl + "/api/Users/create",
  updateUser: baseUrl + "/api/Users/update",
  deleteUser: baseUrl + "/api/Users", // DELETE /{userId}
  updateUserStatus: baseUrl + "/api/Users", // PATCH /{userId}/status

  // Categories
  getCategoryList: baseUrl + "/api/Categories/list",
  getCategoryById: baseUrl + "/api/Categories", // GET /{categoryId}
  getCategoryBySlug: baseUrl + "/api/Categories/slug", // GET /{slug}
  createCategory: baseUrl + "/api/Categories/create",
  updateCategory: baseUrl + "/api/Categories/update",
  deleteCategory: baseUrl + "/api/Categories", // DELETE /{categoryId}

  // Posts (News, Articles, Seminars, etc)
  getPostList: baseUrl + "/api/Posts/list",
  getPostById: baseUrl + "/api/Posts", // GET /{postId}
  getPostBySlug: baseUrl + "/api/Posts/slug", // GET /{slug}
  createPost: baseUrl + "/api/Posts/create",
  updatePost: baseUrl + "/api/Posts/update",
  deletePost: baseUrl + "/api/Posts", // DELETE /{postId}
  publishPost: baseUrl + "/api/Posts", // POST /{postId}/publish

  // Pages (Static content that can be dynamically updated)
  getPageList: baseUrl + "/api/Pages/list",
  getPageById: baseUrl + "/api/Pages", // GET /{pageId}
  getPageBySlug: baseUrl + "/api/Pages/slug", // GET /{slug}
  createPage: baseUrl + "/api/Pages/create",
  updatePage: baseUrl + "/api/Pages/update",
  deletePage: baseUrl + "/api/Pages", // DELETE /{pageId}
  publishPage: baseUrl + "/api/Pages", // POST /{pageId}/publish

  // Media
  getMediaList: baseUrl + "/api/Media/list",
  getMediaById: baseUrl + "/api/Media", // GET /{mediaId}
  uploadMedia: baseUrl + "/api/Media/upload",
  deleteMedia: baseUrl + "/api/Media", // DELETE /{mediaId}

  // Menus (Navigation)
  getMenuList: baseUrl + "/api/Menus/list",
  getMenuById: baseUrl + "/api/Menus", // GET /{menuId}
  createMenu: baseUrl + "/api/Menus/create",
  updateMenu: baseUrl + "/api/Menus/update",
  deleteMenu: baseUrl + "/api/Menus", // DELETE /{menuId}

  // Contact Messages
  getContactMessageList: baseUrl + "/api/ContactMessages/list",
  getContactMessageById: baseUrl + "/api/ContactMessages", // GET /{contactMessageId}
  createContactMessage: baseUrl + "/api/ContactMessages/create",
  updateContactMessageStatus: baseUrl + "/api/ContactMessages", // PATCH /{contactMessageId}/status
  deleteContactMessage: baseUrl + "/api/ContactMessages", // DELETE /{contactMessageId}

  // Study Programs
  getStudyProgramList: baseUrl + "/api/StudyPrograms/list",
  getStudyProgramById: baseUrl + "/api/StudyPrograms", // GET /{programId}
  getStudyProgramBySlug: baseUrl + "/api/StudyPrograms/slug", // GET /{slug}
  createStudyProgram: baseUrl + "/api/StudyPrograms/create",
  updateStudyProgram: baseUrl + "/api/StudyPrograms/update",
  deleteStudyProgram: baseUrl + "/api/StudyPrograms", // DELETE /{programId}

  // Courses
  getCourseList: baseUrl + "/api/Courses/list",
  createCourse: baseUrl + "/api/Courses/create",
  updateCourse: baseUrl + "/api/Courses/update",
  deleteCourse: baseUrl + "/api/Courses", // DELETE /{courseId}
};

// URL builder functions for parameterized endpoints
export function GetUserList(page: number, search: string) {
  const param = new URLSearchParams();
  param.append("page", page.toString());
  if (search) param.append("search", search);
  return BackendApiUrl.getUserList + "?" + param.toString();
}

export function GetPostList(page: number, search?: string) {
  const param = new URLSearchParams();
  param.append("page", page.toString());
  if (search) param.append("search", search);
  return BackendApiUrl.getPostList + "?" + param.toString();
}

export function GetPageList(page: number, search?: string) {
  const param = new URLSearchParams();
  param.append("page", page.toString());
  if (search) param.append("search", search);
  return BackendApiUrl.getPageList + "?" + param.toString();
}

export function GetStudyProgramList(page: number, search?: string) {
  const param = new URLSearchParams();
  param.append("pageNumber", page.toString());
  if (search) param.append("searchTerm", search);
  return BackendApiUrl.getStudyProgramList + "?" + param.toString();
}

export function GetCourseList(page: number, search?: string) {
  const param = new URLSearchParams();
  param.append("page", page.toString());
  if (search) param.append("search", search);
  return BackendApiUrl.getCourseList + "?" + param.toString();
}

export function GetMediaList(page: number, search?: string) {
  const param = new URLSearchParams();
  param.append("page", page.toString());
  if (search) param.append("search", search);
  return BackendApiUrl.getMediaList + "?" + param.toString();
}
