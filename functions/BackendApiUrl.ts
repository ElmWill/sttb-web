// Centralized API URLs definition
const baseUrl = "/api/gateway";

export const BackendApiUrl = {
  // Authentication
  login: baseUrl + "/api/authentication/login",
  register: baseUrl + "/api/authentication/register",
  changePassword: baseUrl + "/api/authentication/change-password",
  
  // Users
  getUserList: baseUrl + "/api/users/list",
  getUserById: baseUrl + "/api/users", // GET /{userId}
  createUser: baseUrl + "/api/users/create",
  updateUser: baseUrl + "/api/users/update",
  deleteUser: baseUrl + "/api/users", // DELETE /{userId}
  updateUserStatus: baseUrl + "/api/users", // PATCH /{userId}/status

  // Categories
  getCategoryList: baseUrl + "/api/categories/list",
  createCategory: baseUrl + "/api/categories/create",
  updateCategory: baseUrl + "/api/categories/update",
  deleteCategory: baseUrl + "/api/categories", // DELETE /{categoryId}

  // Posts (News, Articles, Seminars, etc)
  getPostList: baseUrl + "/api/posts/list",
  createPost: baseUrl + "/api/posts/create",
  updatePost: baseUrl + "/api/posts/update",
  deletePost: baseUrl + "/api/posts", // DELETE /{postId}
  publishPost: baseUrl + "/api/posts", // POST /{postId}/publish

  // Pages (Static content that can be dynamically updated)
  getPageList: baseUrl + "/api/pages/list",
  getPageById: baseUrl + "/api/pages", // GET /{pageId}
  getPageBySlug: baseUrl + "/api/pages/slug", // GET /{slug}
  createPage: baseUrl + "/api/pages/create",
  updatePage: baseUrl + "/api/pages/update",
  deletePage: baseUrl + "/api/pages", // DELETE /{pageId}
  publishPage: baseUrl + "/api/pages", // POST /{pageId}/publish

  // Media
  getMediaList: baseUrl + "/api/media/list",
  getMediaById: baseUrl + "/api/media", // GET /{mediaId}
  uploadMedia: baseUrl + "/api/media/upload",
  deleteMedia: baseUrl + "/api/media", // DELETE /{mediaId}

  // Menus (Navigation)
  getMenuList: baseUrl + "/api/menus/list",
  getMenuById: baseUrl + "/api/menus", // GET /{menuId}
  createMenu: baseUrl + "/api/menus/create",
  updateMenu: baseUrl + "/api/menus/update",
  deleteMenu: baseUrl + "/api/menus", // DELETE /{menuId}

  // Contact Messages
  getContactMessageList: baseUrl + "/api/contactmessages/list",
  getContactMessageById: baseUrl + "/api/contactmessages", // GET /{contactMessageId}
  createContactMessage: baseUrl + "/api/contactmessages/create",
  updateContactMessageStatus: baseUrl + "/api/contactmessages", // PATCH /{contactMessageId}/status
  deleteContactMessage: baseUrl + "/api/contactmessages", // DELETE /{contactMessageId}
};

// URL builder functions mapped to the real APIs
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
