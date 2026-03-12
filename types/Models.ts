export interface Page {
    pageId: number;
    title: string;
    slug: string;
    content: string;
    status: string;
    createdBy?: number;
    updatedBy?: number;
    createdAt: string;
    updatedAt?: string;
    // PascalCase fallbacks
    PageId?: number;
    Title?: string;
    Slug?: string;
    Content?: string;
    Status?: string;
    CreatedAt?: string;
}

export interface PageListItem {
    pageId: number;
    title: string;
    slug: string;
    status: string;
    createdAt: string;
    // PascalCase fallbacks
    PageId?: number;
    Title?: string;
    Slug?: string;
    Status?: string;
    CreatedAt?: string;
}

export interface User {
    userId: number;
    name: string;
    email: string;
    roleName: string;
    token?: string;
    permissions?: string[];
    // PascalCase fallbacks
    UserId?: number;
    Name?: string;
    Email?: string;
    RoleName?: string;
}

export interface Post {
    postId: number;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    status: string;
    authorId: number;
    authorName: string;
    featuredImageId?: number;
    featuredImageUrl?: string;
    categories: Category[];
    publishedAt?: string;
    createdAt: string;
    updatedAt?: string;
    // PascalCase fallbacks
    PostId?: number;
    Title?: string;
    Slug?: string;
    Content?: string;
    AuthorName?: string;
    PublishedAt?: string;
    CreatedAt?: string;
}

export interface PostListItem {
    postId: number;
    title: string;
    slug: string;
    excerpt?: string;
    status: string;
    authorName: string;
    categories: string[];
    publishedAt?: string;
    createdAt: string;
    // PascalCase fallbacks
    PostId?: number;
    Title?: string;
    Slug?: string;
    AuthorName?: string;
    PublishedAt?: string;
    CreatedAt?: string;
}

export interface Category {
    categoryId: number;
    name: string;
    slug: string;
    description?: string;
    // PascalCase fallbacks
    CategoryId?: number;
    Name?: string;
    Slug?: string;
}

export interface Media {
    mediaId: number;
    fileName: string;
    filePath: string;
    fileType: string;
    fileSize: number;
    uploadedBy: number;
    createdAt: string;
    // PascalCase fallbacks
    MediaId?: number;
    FileName?: string;
    FilePath?: string;
    FileType?: string;
    FileSize?: number;
    CreatedAt?: string;

    // legacy/generic compatibility
    id?: number;
    sizeBytes?: number;
}

export interface Course {
    courseId: number;
    courseName: string;
    credits: number;
    // PascalCase fallbacks
    CourseId?: number;
    CourseName?: string;
    Credits?: number;
}

export interface CourseCategory {
    categoryId: number;
    categoryName: string;
    courses: Course[];
    // PascalCase fallbacks
    CategoryId?: number;
    CategoryName?: string;
    Courses?: Course[];
}

export interface CourseListItem {
    courseId: number;
    courseName: string;
    description?: string;
    // PascalCase fallbacks
    CourseId?: number;
    CourseName?: string;
}

export interface StudyProgram {
    programId: number;
    programName: string;
    degreeLevel: string;
    degreeTitle: string;
    totalCredits: number;
    studyDuration: string;
    description: string;
    slug?: string;
    courseCategories: CourseCategory[];
    createdAt?: string;
    updatedAt?: string;
    // PascalCase fallbacks
    ProgramId?: number;
    ProgramName?: string;
    DegreeLevel?: string;
    DegreeTitle?: string;
    TotalCredits?: number;
    StudyDuration?: string;
    Description?: string;
    Slug?: string;
    CourseCategories?: CourseCategory[];
}

export interface StudyProgramListItem {
    programId: number;
    programName: string;
    degreeLevel?: string;
    degreeTitle?: string;
    totalCredits?: number;
    studyDuration?: string;
    description?: string;
    slug?: string;
    createdAt?: string;
    // PascalCase fallbacks
    ProgramId?: number;
    ProgramName?: string;
    Description?: string;
    Slug?: string;
}

// Common generic shape expected from STTB Backend
export interface PagedResult<T> {
    items?: T[]; // Generic fallback
    posts?: T[]; // For GetPostListResponse
    programs?: T[]; // For GetStudyProgramListResponse
    pages?: T[]; // For GetPageListResponse
    courses?: T[]; // For GetCourseListResponse
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages?: number;
    // PascalCase fallbacks
    Items?: T[];
    Posts?: T[];
    Programs?: T[];
    Pages?: T[];
    TotalCount?: number;
}
