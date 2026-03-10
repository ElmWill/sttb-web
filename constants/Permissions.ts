/**
 * Permission constants — mirrors sttbproject.Commons.Constants.PermissionNames
 * These are the exact string values returned in LoginResponse.permissions[]
 */

// User Management
export const Permissions = {
  // Users
  UsersView: "users.view",
  UsersCreate: "users.create",
  UsersEdit: "users.edit",
  UsersDelete: "users.delete",

  // Pages
  PagesView: "pages.view",
  PagesCreate: "pages.create",
  PagesEdit: "pages.edit",
  PagesDelete: "pages.delete",
  PagesPublish: "pages.publish",

  // Posts
  PostsView: "posts.view",
  PostsCreate: "posts.create",
  PostsEdit: "posts.edit",
  PostsDelete: "posts.delete",
  PostsPublish: "posts.publish",

  // Media
  MediaView: "media.view",
  MediaUpload: "media.upload",
  MediaDelete: "media.delete",

  // Categories & Menus
  CategoriesManage: "categories.manage",
  MenusManage: "menus.manage",

  // Contact Messages
  MessagesView: "messages.view",
  MessagesManage: "messages.manage",
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];

/**
 * Role names — mirrors sttbproject.Commons.Constants.RoleNames
 * These are the exact strings returned in LoginResponse.roleName
 */
export const RoleNames = {
  SuperAdmin: "SuperAdmin",
  Admin: "Admin",
  Editor: "Editor",
  Author: "Author",
  Subscriber: "Subscriber",
} as const;

export type RoleName = (typeof RoleNames)[keyof typeof RoleNames];
