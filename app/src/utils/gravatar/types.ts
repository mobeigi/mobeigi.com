export type GravatarProfile = {
  hash: string;
  display_name: string;
  profile_url: string;
  avatar_url: string;
  avatar_alt_text: string;
  location: string;
  description: string;
  job_title: string;
  company: string;
  verified_accounts: {
    shortname: string;
    url: string;
  }[];
  pronunciation: string;
  pronouns: string;
};
