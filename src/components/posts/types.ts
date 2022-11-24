
import { Record } from "pocketbase";

export interface PostType{
  body: string
  collectionId: string
  collectionName: string
  created: string
  emp: string
  expand?: Expand
  id: string
  like_count: number
  media: string
  title: string
  updated: string
}

export interface Expand {
  emp: Emp;
}

export interface Emp {
  avatar: string;
  bio: string;
  collectionId: string;
  collectionName: string;
  country: string;
  created: string;
  cv: string;
  email: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  phone: string;
  updated: string;
  username: string;
  verified: boolean;
}
