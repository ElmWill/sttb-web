import { BackendApiUrl } from "../BackendApiUrl";
import { Post, PostListItem, PagedResult } from "@/types/Models";
import { tryFetchJson } from "../tryFetchJson";

export const postsApi = {
  keys: {
    list: (page: number, search?: string) => {
      const params = new URLSearchParams();
      params.append("pageNumber", page.toString());
      if (search) params.append("searchTerm", search);
      return `${BackendApiUrl.getPostList}?${params.toString()}`;
    },
    detail: (id: number | string) => {
      if (typeof id === 'number') {
        return `${BackendApiUrl.getPostById}/${id}`;
      }
      return `${BackendApiUrl.getPostBySlug}/${id}`;
    },
  },

  getList: async (page = 1, search?: string) => {
    return await tryFetchJson<PagedResult<PostListItem>>(postsApi.keys.list(page, search));
  },

  getByIdOrSlug: async (id: number | string) => {
    return await tryFetchJson<Post>(postsApi.keys.detail(id));
  },
};
