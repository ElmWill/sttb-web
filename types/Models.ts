export interface Page {
    id: number;
    title: string;
    slug: string;
    content: string;
    status: 'Draft' | 'Published';
    featuredImageId?: number;
    categoryId?: number;
    createdAt: string;
    updatedAt?: string;
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    status: 'Draft' | 'Published';
    featuredImageId?: number;
    categoryId?: number;
    createdAt: string;
    updatedAt?: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

export interface Media {
    id: number;
    fileName: string;
    contentType: string;
    sizeBytes: number;
    uploadedAt: string;
}

// Common generic shape expected from STTB Backend (usually wrapped in MediatR requests)
// For list responses, it usually returns an array or a paged result depending on implementation.
export interface PagedResult<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}
