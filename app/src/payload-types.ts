/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    files: File;
    posts: Post;
    category: Category;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  locale: null;
  user: User & {
    collection: 'users';
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
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
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
  excerpt: string;
  meta?: {
    title?: string | null;
    image?: (number | null) | Media;
    description?: string | null;
  };
  publishedAt?: string | null;
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
  media: number | Media;
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