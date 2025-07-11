/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    users: User;
    media: Media;
    files: File;
    'private-files': PrivateFile;
    posts: Post;
    category: Category;
    comments: Comment;
    redirects: Redirect;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    files: FilesSelect<false> | FilesSelect<true>;
    'private-files': PrivateFilesSelect<false> | PrivateFilesSelect<true>;
    posts: PostsSelect<false> | PostsSelect<true>;
    category: CategorySelect<false> | CategorySelect<true>;
    comments: CommentsSelect<false> | CommentsSelect<true>;
    redirects: RedirectsSelect<false> | RedirectsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    resume: Resume;
  };
  globalsSelect: {
    resume: ResumeSelect<false> | ResumeSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean | null;
  apiKey?: string | null;
  apiKeyIndex?: string | null;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  sessions?:
    | {
        id: string;
        createdAt?: string | null;
        expiresAt: string;
      }[]
    | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  caption?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "files".
 */
export interface File {
  id: number;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "private-files".
 */
export interface PrivateFile {
  id: number;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: number;
  title: string;
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  /**
   * A short summary or snippet of the post content
   */
  excerpt: string;
  commentsEnabled?: boolean | null;
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  publishedAt?: string | null;
  views?: number | null;
  viewsCache?:
    | {
        ipAddress: string;
        timestamp: string;
        id?: string | null;
      }[]
    | null;
  category?: (number | null) | Category;
  authors?: (number | User)[] | null;
  slug?: string | null;
  slugLock?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "category".
 */
export interface Category {
  id: number;
  title: string;
  /**
   * A short description for the category.
   */
  description: string;
  meta?: {
    title?: string | null;
    description?: string | null;
  };
  slug?: string | null;
  slugLock?: boolean | null;
  parent?: (number | null) | Category;
  breadcrumbs?:
    | {
        doc?: (number | null) | Category;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "comments".
 */
export interface Comment {
  id: number;
  displayName: string;
  /**
   * The email is for internal use only and will not be displayed publicly.
   */
  email: string;
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  post: number | Post;
  author?: (number | null) | User;
  /**
   * The IP address from which the comment was made.
   */
  ipAddress: string;
  /**
   * The browser user agent at the time the comment was submitted.
   */
  userAgent: string;
  /**
   * Determines whether the comment author receives notifications for replies to this comment.
   */
  notifyOnReply: boolean;
  parent?: (number | null) | Comment;
  breadcrumbs?:
    | {
        doc?: (number | null) | Comment;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects".
 */
export interface Redirect {
  id: number;
  from: string;
  to?: {
    type?: ('reference' | 'custom') | null;
    reference?:
      | ({
          relationTo: 'posts';
          value: number | Post;
        } | null)
      | ({
          relationTo: 'category';
          value: number | Category;
        } | null);
    url?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'files';
        value: number | File;
      } | null)
    | ({
        relationTo: 'private-files';
        value: number | PrivateFile;
      } | null)
    | ({
        relationTo: 'posts';
        value: number | Post;
      } | null)
    | ({
        relationTo: 'category';
        value: number | Category;
      } | null)
    | ({
        relationTo: 'comments';
        value: number | Comment;
      } | null)
    | ({
        relationTo: 'redirects';
        value: number | Redirect;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  enableAPIKey?: T;
  apiKey?: T;
  apiKeyIndex?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
  sessions?:
    | T
    | {
        id?: T;
        createdAt?: T;
        expiresAt?: T;
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  caption?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "files_select".
 */
export interface FilesSelect<T extends boolean = true> {
  title?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "private-files_select".
 */
export interface PrivateFilesSelect<T extends boolean = true> {
  title?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts_select".
 */
export interface PostsSelect<T extends boolean = true> {
  title?: T;
  content?: T;
  excerpt?: T;
  commentsEnabled?: T;
  meta?:
    | T
    | {
        title?: T;
        description?: T;
      };
  publishedAt?: T;
  views?: T;
  viewsCache?:
    | T
    | {
        ipAddress?: T;
        timestamp?: T;
        id?: T;
      };
  category?: T;
  authors?: T;
  slug?: T;
  slugLock?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "category_select".
 */
export interface CategorySelect<T extends boolean = true> {
  title?: T;
  description?: T;
  meta?:
    | T
    | {
        title?: T;
        description?: T;
      };
  slug?: T;
  slugLock?: T;
  parent?: T;
  breadcrumbs?:
    | T
    | {
        doc?: T;
        url?: T;
        label?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "comments_select".
 */
export interface CommentsSelect<T extends boolean = true> {
  displayName?: T;
  email?: T;
  content?: T;
  post?: T;
  author?: T;
  ipAddress?: T;
  userAgent?: T;
  notifyOnReply?: T;
  parent?: T;
  breadcrumbs?:
    | T
    | {
        doc?: T;
        url?: T;
        label?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects_select".
 */
export interface RedirectsSelect<T extends boolean = true> {
  from?: T;
  to?:
    | T
    | {
        type?: T;
        reference?: T;
        url?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "resume".
 */
export interface Resume {
  id: number;
  resumeFile: number | PrivateFile;
  passwords?:
    | {
        password: string;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "resume_select".
 */
export interface ResumeSelect<T extends boolean = true> {
  resumeFile?: T;
  passwords?:
    | T
    | {
        password?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CodeBlock".
 */
export interface CodeBlock {
  language:
    | 'auto'
    | '1c'
    | 'abnf'
    | 'accesslog'
    | 'actionscript'
    | 'ada'
    | 'angelscript'
    | 'apache'
    | 'applescript'
    | 'arcade'
    | 'arduino'
    | 'armasm'
    | 'asciidoc'
    | 'aspectj'
    | 'autohotkey'
    | 'autoit'
    | 'avrasm'
    | 'awk'
    | 'axapta'
    | 'bash'
    | 'basic'
    | 'bnf'
    | 'brainfuck'
    | 'c'
    | 'csharp'
    | 'cpp'
    | 'cal'
    | 'capnproto'
    | 'ceylon'
    | 'clean'
    | 'clojure'
    | 'clojure-repl'
    | 'cmake'
    | 'coffeescript'
    | 'coq'
    | 'cos'
    | 'crmsh'
    | 'crystal'
    | 'csp'
    | 'css'
    | 'd'
    | 'dart'
    | 'delphi'
    | 'diff'
    | 'django'
    | 'dns'
    | 'dockerfile'
    | 'dos'
    | 'dsconfig'
    | 'dts'
    | 'dust'
    | 'ebnf'
    | 'elixir'
    | 'elm'
    | 'erb'
    | 'erlang'
    | 'erlang-repl'
    | 'excel'
    | 'fsharp'
    | 'fix'
    | 'flix'
    | 'fortran'
    | 'gcode'
    | 'gams'
    | 'gauss'
    | 'gherkin'
    | 'glsl'
    | 'gml'
    | 'go'
    | 'golo'
    | 'gradle'
    | 'graphql'
    | 'groovy'
    | 'haml'
    | 'handlebars'
    | 'haskell'
    | 'haxe'
    | 'hsp'
    | 'http'
    | 'hy'
    | 'inform7'
    | 'ini'
    | 'irpf90'
    | 'isbl'
    | 'java'
    | 'javascript'
    | 'jboss-cli'
    | 'json'
    | 'julia'
    | 'julia-repl'
    | 'kotlin'
    | 'lasso'
    | 'latex'
    | 'ldif'
    | 'leaf'
    | 'less'
    | 'lisp'
    | 'livecodeserver'
    | 'livescript'
    | 'llvm'
    | 'lsl'
    | 'lua'
    | 'makefile'
    | 'markdown'
    | 'mathematica'
    | 'matlab'
    | 'maxima'
    | 'mel'
    | 'mercury'
    | 'mipsasm'
    | 'mizar'
    | 'mojolicious'
    | 'monkey'
    | 'moonscript'
    | 'n1ql'
    | 'nestedtext'
    | 'nginx'
    | 'nim'
    | 'nix'
    | 'node-repl'
    | 'nsis'
    | 'objectivec'
    | 'ocaml'
    | 'openscad'
    | 'oxygene'
    | 'parser3'
    | 'perl'
    | 'pf'
    | 'php'
    | 'php-template'
    | 'plaintext'
    | 'pony'
    | 'pgsql'
    | 'powershell'
    | 'processing'
    | 'profile'
    | 'prolog'
    | 'properties'
    | 'protobuf'
    | 'puppet'
    | 'purebasic'
    | 'python'
    | 'python-repl'
    | 'q'
    | 'qml'
    | 'r'
    | 'reasonml'
    | 'rib'
    | 'roboconf'
    | 'routeros'
    | 'rsl'
    | 'ruby'
    | 'ruleslanguage'
    | 'rust'
    | 'sas'
    | 'scala'
    | 'scheme'
    | 'scilab'
    | 'scss'
    | 'shell'
    | 'smali'
    | 'smalltalk'
    | 'sml'
    | 'sqf'
    | 'sql'
    | 'stan'
    | 'stata'
    | 'step21'
    | 'stylus'
    | 'subunit'
    | 'swift'
    | 'taggerscript'
    | 'tap'
    | 'tcl'
    | 'thrift'
    | 'tp'
    | 'twig'
    | 'typescript'
    | 'vala'
    | 'vbnet'
    | 'vbscript'
    | 'vbscript-html'
    | 'verilog'
    | 'vhdl'
    | 'vim'
    | 'wasm'
    | 'wren'
    | 'x86asm'
    | 'xl'
    | 'xml'
    | 'xquery'
    | 'yaml'
    | 'zephir';
  code: string;
  id?: string | null;
  blockName?: string | null;
  blockType: 'code';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "MediaBlock".
 */
export interface MediaBlock {
  mediaDark: number | Media;
  mediaLight?: (number | null) | Media;
  widthOverride?: number | null;
  heightOverride?: number | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'mediaBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FileBlock".
 */
export interface FileBlock {
  file: number | File;
  id?: string | null;
  blockName?: string | null;
  blockType: 'file';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "EmbedBlock".
 */
export interface EmbedBlock {
  url: string;
  title?: string | null;
  width?: number | null;
  height?: number | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'embed';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}