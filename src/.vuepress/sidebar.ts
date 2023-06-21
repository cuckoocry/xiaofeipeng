import { sidebar } from "vuepress-theme-hope";
import { aboutTheBlogs } from "./sidebar/about-the-blogs";
import { personalCollection } from "./sidebar/personal-collection";
import { other } from "./sidebar/other";
import { learnNote } from "./sidebar/learn-note";
import {essay} from "./sidebar/essay";
import {tools} from "./sidebar/tools";
import {interviewRelated} from "./sidebar/interview-related";

// @ts-ignore
export const sidebarConfig = sidebar({
  // 导航栏每一项对应自己的目录
  "/study-notes/": learnNote,
  "/interview-related/":interviewRelated,
  "/tools/":tools,
  "/about-the-blogs/": aboutTheBlogs,

  "/personal-collection/": personalCollection,
  "/posts/": essay,
  "/other/": other,

  // 这是总的目录
  // "/": [
  //
  // ],
});
