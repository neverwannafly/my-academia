import { timeSince } from './datetime';

export default function parseActivity({
  created_at: createdAt,
  params,
  trackable: {
    title,
    id,
  },
  owner: {
    username,
    profile_pic: profilePic,
  },
  key,
}) {
  switch (key) {
    case 'classroom_resource.complete':
      return {
        text: `@${username} completed the resource ${title} and earned ${params.score} points`,
        link: `/discuss/classroom_resource/${id}/`,
        profilePic,
        time: timeSince(createdAt),
        key,
      };
    case 'classroom_resource.create':
      return {
        text: `@${username} created the resource ${title}`,
        link: `/discuss/classroom_resource/${id}/`,
        profilePic,
        time: timeSince(createdAt),
        key,
      };
    case 'comment.create':
      return {
        text: `@${username} added a comment - ${title}`,
        link: `/discuss/comment/${id}/`,
        profilePic,
        time: timeSince(createdAt),
        key,
      };
    default:
      return {};
  }
}
